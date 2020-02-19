$(document).ready(function () {
    $(window).scroll(function() {
        if($(window).width() <= 1000) {
            $('.main-footer__item:first-child').addClass('arrow-down');

            $('.main-footer__item:first-child, .main-footer__item:first-child.arrow-down:before').click(function(e) {
                $(this).toggleClass('arrow-active');
                $(this).siblings().toggleClass('item-active');
            })
        } else {
            $('.main-footer__item:first-child').removeClass('arrow-down');
        }
     });
})