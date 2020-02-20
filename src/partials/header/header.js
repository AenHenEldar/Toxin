$(document).ready(function () {
    $('.header__burger').click(function () {
        $('.header__burger, .header__menu').toggleClass('active');
        $('.header .arrow-down').removeClass('arrow-down');
        $('.button--sign').css('margin-right', '15px');
    });
})