jQuery(function ($) {
    $('.i-custom_arrow-left').each(function () {
        $(this).children('i').first().replaceWith('<i class="fas fa-arrow-left"></i>');
        $(this).addClass('has-changed');
    });
    $('.i-custom_arrow-right').each(function () {
        $(this).children('i').first().replaceWith('<i class="fas fa-arrow-right"></i>');
        $(this).addClass('has-changed');
    });
});


jQuery(document).ready(function ($) {
    jQuery('.row-testimonial-slider').flickity({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        groupCells: 3,
        wrapAround: false,
        // freeScroll: true
    });

});
