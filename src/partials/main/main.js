$(document).ready(function () {




    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентрябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    console.log((new Date(2020, 2)).getDay());
    console.log(typeof daysInMonth(1, 2020));
    console.log(daysInMonth(3, 2020));




    function showCalendar(month, year) {
        let firstDay = (new Date(year, month)).getDay();
        if(firstDay == 0) {
            firstDay = 7;
        }
        let date = 1;
        let n = 1;
        for (let i = 2; i <= 7; i++) {
            for (let j = 1; j <= 7; j++) {
                let item = $(`.main__calendar-list:nth-child(${j}) .main__calendar-item:nth-child(${i})`);
                item.removeClass('main__calendar-today');
                item.css('opacity', '0.9');
                if (i === 2 && j < firstDay) {
                    item.html(String(daysInMonth(month, year) - firstDay + j + 1)).css('opacity', '0.4');
                } else if(date > daysInMonth(month + 1, year)) {
                    item.html(String(n++)).css('opacity', '0.4');
                } else {
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        item.addClass('main__calendar-today');
                    } // color today's date
                    item.html(String(date));
                    date++;
                }
            }
        }
    }

    showCalendar(currentMonth, currentYear);




    $('.main__calendar-header h2').html(months[today.getMonth()] + ' ' + today.getFullYear());

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




    // click on button 'clear'
    $('#clear').click(function () {
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
        $('.main__guests').toggle();
        $('.main__guests').css('display') == 'none' ? $('.main__guest-field').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px') : $('.main__guest-field').css('border-bottom-left-radius', '0').css('border-bottom-right-radius', '0');
    });
    $('.arrow-calendar, .main__date-field').click(function () {
        $('.main__guests').css('display', 'none');
        $('.main__guest-field').css('border-bottom-left-radius', '4px').css('border-bottom-right-radius', '4px');
        $('.main__calendar').toggle();
    });

});







// $(':not(.main__guests, .arrow-guest, .main__guest-field)').click(function (e) {
//     if (this === e.target) {
//         console.log('hello');
//         $('.main__guests').css('display', 'none');
//     }
// });