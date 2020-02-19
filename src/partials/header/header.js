$(document).ready(function () {
    $('.header__burger').click(function () {
        $('.header__burger, .header__menu').toggleClass('active');
        $('.arrow-down').removeClass('arrow-down');
        $('.button--sign').css('margin-right', '15px');
    });
})