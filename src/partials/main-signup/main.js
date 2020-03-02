$(document).ready(function () {

    let today = new Date(),
        currentMonth = today.getMonth(),
        currentYear = today.getFullYear(),
        months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентрябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        markBirthDayYear = currentYear,
        markBirthDayMonth = currentMonth,
        markBirthDayRow,
        markBirthDayСolumn,
        markBirthDay,
        mark = 'main__calendar-birthday';

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
                    } // color today's date
                    item.html(String(date));
                    date++;
                }
            }
        }

        // if item have marked

        if (markBirthDayRow) {
            if (markBirthDayYear == year) {
                if (markBirthDayMonth == month) {
                    $(`.main__calendar-list:nth-child(${markBirthDayСolumn}) .main__calendar-item:nth-child(${markBirthDayRow})`).addClass(mark);
                }
            }
        }

        if (row == 7) {
            $('.main__calendar-item').css('line-height', '34px');
            $('.main__calendar-birthday, .main__calendar-today').addClass('main__calendar--small');
        }

        $('.main__calendar-item').click(function () {
            if ($(this).css('opacity') != '0.4') {

                $('.main__calendar-item').removeClass('mark-between');

                markBirthDayYear = currentYear;
                markBirthDayMonth = currentMonth;
                markBirthDayRow = $(this).index() + 1;
                markBirthDayСolumn = $(this).parent().index() + 1;

                // set mark

                if ($(this).index() != 0) {
                    $('.main__calendar-item').removeClass(mark);
                    $(this).addClass(mark);

                    if (row == 7) {
                        $('.main__calendar-birthday, .main__calendar-today').addClass('main__calendar--small');
                    }
                }

            }

            markBirthDay = $('.main__calendar-birthday').html();

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

    //click on calendar 'apply'

    $('.main__calendar #apply').click(function () {

        // output date in input

        $('.main__birthday-field').attr('placeholder', markBirthDay + '.' + (Number(markBirthDayMonth) + 1) + '.' + markBirthDayYear);
        $('.main__calendar').css('display', 'none');
    })

    //click on calendar 'clear'

    $('.main__calendar #clear').click(function () {
        $('.main__birthday-field, .main__departure-field').attr('placeholder', 'ДД.ММ.ГГГГ');
    })







    // click on radio and next neighbour

    $('.main__radio, .main__special-offer, p').click(function () {
        if ($(this).hasClass('main__radio') || $(this).prev().hasClass('main__radio')) {
            $('.main__radio').removeClass('switch-active');
        }

        if ($(this).prev().hasClass('main__radio') || $(this).prev().hasClass('main__special-offer')) {
            console.log(123);
            $(this).prev().toggleClass('switch-active');
        } else {
            $(this).toggleClass('switch-active');
        }
    })

    $('.main__date-field').click(function () {

        $('.main__calendar').toggle();

    });

});