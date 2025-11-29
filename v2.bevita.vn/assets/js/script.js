jQuery(function ($) {
    const iconMap = {
        'i-custom_arrow-left': 'fa-arrow-left',
        'i-custom_arrow-right': 'fa-arrow-right',
        'i-custom_calendar-alt': 'fa-calendar-alt',
        'i-custom_phone': 'fa-phone',
        'i-custom_comment': 'fa-comment'
    };

    $.each(iconMap, function (customClass, faIcon) {
        $('.' + customClass).each(function () {
            $(this).children('i').first().replaceWith('<i class="fas ' + faIcon + '"></i>');
            $(this).addClass('has-changed');
        });
    });
});



jQuery(document).ready(function ($) {
    jQuery('.row-slider-3').flickity({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        groupCells: 3,
        wrapAround: false,
        // freeScroll: true
    });
    jQuery('.row-slider-2').flickity({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        groupCells: 2,
        wrapAround: false,
        // freeScroll: true
    });
});
