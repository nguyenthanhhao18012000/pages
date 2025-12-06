jQuery(function ($) {
    const iconMap = {
        'i-custom_arrow-left': 'fas fa-arrow-left',
        'i-custom_arrow-right': 'fas fa-arrow-right',
        'i-custom_calendar-alt': 'fas fa-calendar-alt',
        'i-custom_phone': 'fas fa-phone',
        'i-custom_house': 'fa-regular fa-house',
        'i-custom_comment': 'fas fa-comment',
        'i-custom_trophy': 'fas fa-trophy',
        'i-custom_shield-virus': 'fas fa-light fa-shield-check',
        'i-custom_badge-check': 'fas fa-light fa-badge-check'
    };

    $.each(iconMap, function (customClass, faIcon) {
        // $(this).find('i').replaceWith('<i class="fas ' + faIcon + '"></i>');
        $('.' + customClass + '').each(function () {
            $(this).find('i.icon-500px').addClass(faIcon).removeClass('icon-500px');
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

            let autoplay = setInterval(nextSlide, 5000);

            $box.on('mouseenter', function () {
                clearInterval(autoplay);
            });

            $box.on('mouseleave', function () {
                autoplay = setInterval(nextSlide, 5000);
            });

            setIndex(arrIndexes);
        });
    });

});
