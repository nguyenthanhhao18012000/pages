jQuery(function ($) {
    const iconMap = {
        'i-custom_arrow-left': 'fa-arrow-left',
        'i-custom_arrow-right': 'fa-arrow-right',
        'i-custom_calendar-alt': 'fa-calendar-alt',
        'i-custom_phone': 'fa-phone',
        'i-custom_comment': 'fa-comment',
        'i-custom_trophy': 'fa-trophy',
        'i-custom_shield-virus': 'fa-shield-virus'
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


    jQuery(function ($) {
        $('._cards-box').each(function () {
            const $box = $(this);
            const $imageNodes = $box.find('._card:not(._hide)');
            const arrIndexes = [];

            for (let i = 0; i < $imageNodes.length; i++) {
                arrIndexes.push(i);
            }

            function setIndex(arr) {
                $imageNodes.each(function (i) {
                    $(this).attr('data-slide', arr[i]);
                });
            }

            function nextSlide() {
                arrIndexes.push(arrIndexes.shift());
                setIndex(arrIndexes);
            }

            $box.on('click', function () {
                nextSlide();
            });

            let autoplay = setInterval(nextSlide, 3000);

            $box.on('mouseenter', function () {
                clearInterval(autoplay);
            });

            $box.on('mouseleave', function () {
                autoplay = setInterval(nextSlide, 3000);
            });

            setIndex(arrIndexes);
        });
    });

});
