$(document).ready(function () {

    let today = new Date(),
        mark,
        arrival,
        todayItem,
        currentMonth = today.getMonth(),
        currentYear = today.getFullYear(),
        months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентрябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        markArrivalYear = currentYear,
        markArrivalMonth = currentMonth,
        markDepartureYear = currentYear,
        markDepartureMonth = currentMonth,
        markArrivalRow,
        markArrivalСolumn,
        markDepartureRow,
        markDepartureСolumn,
        markArrivalDate,
        markDepartureDate,
        markArrival = 'main__calendar-arrival',
        markDeparture = 'main__calendar-departure',
        markArrivalDay,
        markDepartureDay;

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function showCalendar(month, year) {
        let firstDay = (new Date(year, month)).getDay();
        let date = 1;
        let nextMonth = 1;
        let row = 6;

        $('.main__calendar-item:not(:first-child').remove();

        if (firstDay == 0) {
            firstDay = 7;
        }
        if (firstDay == 6 && daysInMonth(month + 1, year) == 31 || firstDay == 7) {
            row = 7;
        }

        for (let i = 2; i <= row; i++) {
            for (let j = 1; j <= 7; j++) {
                $(`.main__calendar-list:nth-child(${j}`).append('<li class="main__calendar-item"></li>');
                let item = $(`.main__calendar-list:nth-child(${j}) .main__calendar-item:nth-child(${i})`);
                item.css('opacity', '0.9');
                if (i === 2 && j < firstDay) {
                    item.html(String(daysInMonth(month, year) - firstDay + j + 1)).css('opacity', '0.4');
                } else if (date > daysInMonth(month + 1, year)) {
                    item.html(String(nextMonth++)).css('opacity', '0.4');
                } else {
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        item.addClass('main__calendar-today');
                        todayItem = item;
                    }
                    item.html(String(date));
                    date++;
                }
            }
        }

        // if mark arrival and departure is set

        if (markArrivalRow) {
            if (markArrivalYear == year) {
                if (markArrivalMonth == month) {
                    $(`.main__calendar-list:nth-child(${markArrivalСolumn}) .main__calendar-item:nth-child(${markArrivalRow})`).addClass(markArrival);
                }
            }
        }
        if (markDepartureRow) {
            if (markDepartureYear == year) {
                if (markDepartureMonth == month) {
                    $(`.main__calendar-list:nth-child(${markDepartureСolumn}) .main__calendar-item:nth-child(${markDepartureRow})`).addClass(markDeparture);
                }
            }
        }

        // set between marks background

        if (markArrivalRow && markDepartureRow && markArrivalDate != markDepartureDate) {
            let markBetween;
            let item;
            for (let j = 2; j <= row; j++) {
                for (let i = 1; i <= 7; i++) {
                    item = $(`.main__calendar-list:nth-child(${i}) .main__calendar-item:nth-child(${j})`)
                    if (item.css('opacity') != '0.4') {
                        markBetween = year * 365 + month * daysInMonth(month, year) + i + j * 7;
                        if (markBetween > markArrivalDate && markBetween < markDepartureDate) {
                            if (item.hasClass('main__calendar-today')) {
                                item.removeClass('main__calendar-today');
                                item.addClass('main__calendar-today-between');
                            }
                            item.addClass('mark-between');
                            $('.main__calendar-arrival').addClass('active');
                            $('.main__calendar-departure').addClass('active');
                        }
                    }

                    if (i == 1) {
                        item.addClass('active-left-round');
                    }
                    if (i == 7) {
                        item.addClass('active-right-round');
                    }
                }
            }
        }

        if (row != 7) {
            $('.main__calendar-item').css('margin-bottom', '5px');
        }

        // click on li element (item)

        $('.main__calendar-item').click(function () {
            if ($(this).css('opacity') != '0.4') {

                $(todayItem).addClass('main__calendar-today');
                $('.main__calendar-item').removeClass('mark-between active-left-round active-right-round active');
                $('.main__calendar-today-between').removeClass('main__calendar-today-between');

                if (markArrival == mark) {
                    markArrivalYear = currentYear;
                    markArrivalMonth = currentMonth;
                    markArrivalRow = $(this).index() + 1;
                    markArrivalСolumn = $(this).parent().index() + 1;
                } else if (markDeparture == mark) {
                    markDepartureYear = currentYear;
                    markDepartureMonth = currentMonth;
                    markDepartureRow = $(this).index() + 1;
                    markDepartureСolumn = $(this).parent().index() + 1;
                }

                // set mark

                if ($(this).index() != 0) {
                    $('.main__calendar-item').removeClass(mark);
                    $(this).addClass(mark);

                    markArrivalDate = markArrivalYear * 365 + markArrivalMonth * daysInMonth(markArrivalMonth, markArrivalYear) + markArrivalСolumn + markArrivalRow * 7;
                    markDepartureDate = markDepartureYear * 365 + markDepartureMonth * daysInMonth(markDepartureMonth, markDepartureYear) + markDepartureСolumn + markDepartureRow * 7;

                    // set between marks background

                    let item;

                    for (let j = 2; j <= row; j++) {
                        for (let i = 1; i <= 7; i++) {
                            item = $(`.main__calendar-list:nth-child(${i}) .main__calendar-item:nth-child(${j})`);

                            if (item.css('opacity') != '0.4') {
                                markBetween = year * 365 + month * daysInMonth(month, year) + i + j * 7;

                                if (markBetween > markArrivalDate && markBetween < markDepartureDate) {
                                    if (item.hasClass('main__calendar-today')) {
                                        item.removeClass('main__calendar-today');
                                        item.addClass('main__calendar-today-between');
                                    }
                                    if (markArrivalRow && markDepartureRow && markArrivalDate != markDepartureDate) {
                                        item.addClass('mark-between');
                                        $('.main__calendar-arrival').addClass('active');
                                        $('.main__calendar-departure').addClass('active');
                                    }
                                    if (i == 1) {
                                        item.addClass('active-left-round');
                                    }
                                    if (i == 7) {
                                        item.addClass('active-right-round');
                                    }

                                }

                            }
                        }
                    }
                }

            }

            mark == 'main__calendar-arrival' ? markArrivalDay = $('.main__calendar-arrival').html() : markDepartureDay = $('.main__calendar-departure').html();

        });

    }

    showCalendar(currentMonth, currentYear);


    // current month and year

    $('.main__calendar-header h2').html(months[today.getMonth()] + ' ' + today.getFullYear());

    // click on arrow to change page of calendar

    $('.arrow-right').click(function () {
        ++currentMonth;
        if (currentMonth >= 12) {
            currentMonth = 0;
            ++currentYear;
        }
        $('.main__calendar-header h2').html(months[currentMonth] + ' ' + currentYear);
        showCalendar(currentMonth, currentYear);
    })

    $('.arrow-left').click(function () {
        --currentMonth;
        if (currentMonth <= -1) {
            currentMonth = 11;
            --currentYear;
        }
        $('.main__calendar-header h2').html(months[currentMonth] + ' ' + currentYear);
        showCalendar(currentMonth, currentYear);
    })

    function addFromToDate() {
        $('.arrow-calendar').removeClass('active');

        if (markArrivalRow) {
            $('.main__arrival-field').attr('placeholder', markArrivalDay + '.' + (Number(markArrivalMonth) + 1) + '.' + markArrivalYear);
        }
        if (markDepartureRow) {
            $('.main__departure-field').attr('placeholder', markDepartureDay + '.' + (Number(markDepartureMonth) + 1) + '.' + markDepartureYear);
        }

    }

    //click on calendar 'clear'

    $('.main__calendar #clear').click(function () {
        $('.main__arrival-field, .main__departure-field').attr('placeholder', 'ДД.ММ.ГГГГ');
    })

    //click on calendar 'apply'

    $('.main__calendar #apply').click(function () {
        addFromToDate();
        $('.main__calendar').css('display', 'none');
    })
    //click on guests 'apply'

    $('.main__guests #apply').click(function () {
        $('.main__guests').css('display', 'none');
        $('.main__guest-field').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px')
    })

    // click on guests 'clear'

    $('.main__guests #clear').click(function () {
        $('.main__guest-field').attr('placeholder', 'Сколько гостей');
        let length = $('.main__numbers li').length;
        for (let i = 1; i <= length; i++) {
            $(`.main__numbers li:nth-child(${i})`).html('0');
            $(`.main__minuses li:nth-child(${i})`).css('opacity', '0.25');
        }
    })

    // output value in input

    function addGuestsNumber() {

        function toDecline(number, declination_forms) {
            n = Math.abs(number) % 100;
            let number2 = number % 10;
            if (number > 10 && number < 20) {
                return declination_forms[2];
            } else if (number2 > 1 && number2 < 5) {
                return declination_forms[1];
            } else if (number2 == 1) {
                return declination_forms[0];
            }
            return declination_forms[2];
        }

        let length = $('.main__numbers li').length;
        let total = 0;
        for (let i = 1; i <= length; i++) {
            total += Number($(`.main__numbers li:nth-child(${i})`).html());
        }
        $('.main__guest-field').attr('placeholder', total + ' ' + toDecline(total, ['гость', 'гостя', 'гостей']));
    }

    // plus 1 or minus 1 or add opacity like disabled for li 

    $('.main__guests-count li').click(function () {
        let index = $(this).index() + 1;
        let curentValue = $(`.main__numbers li:nth-child(${index})`).html();
        let value = curentValue;

        function isDisabled(elem) {
            return elem.css('opacity') == '0.25' ? true : false;
        }

        if ($(this).parents('.main__pluses').length) {
            if (curentValue >= 0) {
                $(`.main__minuses li:nth-child(${index})`).css('opacity', '1');
            }
            value = String(Number(curentValue) + 1);
        } else if ($(this).parents('.main__minuses').length) {
            if (!isDisabled($(this))) {
                if (curentValue == 1) {
                    $(this).css('opacity', '0.25');
                }
                value = String(Number(curentValue) - 1);
            }
        }
        $(`.main__numbers li:nth-child(${index})`).html(value);
        addGuestsNumber();
    });

    // click on arrow or input add submenu and square border for input

    $('.arrow-guest, .main__guest-field').click(function () {
        $('.arrow-guest').toggleClass('active');
        $('.main__guests').toggle();
        $('.main__guests').css('display') == 'none' ? $('.main__guest-field').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px') : $('.main__guest-field').css('border-bottom-left-radius', '0').css('border-bottom-right-radius', '0');
    });

    $('.arrow-calendar, .main__date-field').click(function () {

        if($(this).parents('.main__input-container1').length) {
            $('.main__input-container2 .arrow-calendar').removeClass('active');
        } else if($(this).parents('.main__input-container2').length) {
            $('.main__input-container1 .arrow-calendar').removeClass('active');
        }

        $(this).toggleClass('active');
        $(this).next('.arrow-calendar').toggleClass('active');

        // change display of calendar

        if ($(this).hasClass('main__arrival-field') && arrival === true) {
            $('.main__calendar').toggle();
        } else if ($(this).hasClass('main__departure-field') && arrival === false) {
            $('.main__calendar').toggle();
        } else if ($(this).hasClass('main__arrival-field') && $('.main__calendar').css('display') == 'block' && arrival === false || $(this).hasClass('main__departure-field') && $('.main__calendar').css('display') == 'block' && arrival === true) {
            arrival = !arrival;
        } else if ($(this).hasClass('main__arrival-field')) {
            $('.main__calendar').toggle();
            arrival = true;
        } else if ($(this).hasClass('main__departure-field')) {
            $('.main__calendar').toggle();
            arrival = false;
        }

        // picker

        mark = arrival ? 'main__calendar-arrival' : 'main__calendar-departure';

        $('.arrow-guest').removeClass('active');
        $('.main__guest-field').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px')
        $(".main__guests").hide();
    });

});



// $(document).click(function(event) {
//     if (!$(event.target).is(".arrow-guest, .main__guest-field")) {
//         $('.main__guest-field').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px')
//         $(".main__guests").hide();
//     }
//     if (!$(event.target).is(".arrow-calendar, .main__date-field")) {
//         $('.main__calendar').hide();
//     }
// });