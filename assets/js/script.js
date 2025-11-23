jQuery(document).ready(function ($) {
    $('.template-masterclass .masterclass-banner-video, .template-masterclass .masterclass-banner-video_only-video > .fusion-row').removeAttr('style');

    $('.wp-singular.single-classes .classes_detail_split_video-wrapper .video-column-wrapper')
        .append(
            $('.wp-singular.single-classes .classes_detail_split_video-wrapper .video-description-wrapper')
        );

    function initSlick() {
        $('.tab-items .slick-carousel').not('.slick-initialized').slick({
            slidesToShow: 3,
            slidesToScroll: 2,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
            variableWidth: true,
            infinite: false,
            dots: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true" role="img" class="mc-icon mc-icon--md "><path fill="currentColor" fill-rule="evenodd" d="M15.155 5.47a.75.75 0 0 1 0 1.06L9.685 12l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0" clip-rule="evenodd"></path></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true" role="img" class="mc-icon mc-icon--md "><path fill="currentColor" fill-rule="evenodd" d="M8.845 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06-1.06l5.47-5.47-5.47-5.47a.75.75 0 0 1 0-1.06" clip-rule="evenodd"></path></svg></button>',
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }]
        });
    }

    const preloadStatus = {}; // theo dõi trạng thái preload của từng slug

    $('.classes-tab-list .tab').on('click', function () {
        var $tab = $(this),
            slug = $tab.data('slug');

        $tab.addClass('active').siblings().removeClass('active');

        // Nếu đang preload → chờ preload xong sẽ tự hiển thị
        if (preloadStatus[slug] === 'loading') return;

        var $content = $('.classes-tab-content .tab-items[data-slug="' + slug + '"]');
        if ($content.length) {
            $content.show().siblings('.tab-items').hide();
            initSlick();
        } else {
            preloadStatus[slug] = 'loading';

            $.ajax({
                url: attrCore.ajax_url,
                method: 'POST',
                data: {
                    action: 'load_classes_tab',
                    slug: slug
                },
                success: function (response) {
                    if (response.success) {
                        $('.classes-tab-content').append(
                            '<div class="tab-items" data-slug="' + slug + '">' + response.data + '</div>'
                        );
                        $('.tab-items[data-slug="' + slug + '"]').show().siblings('.tab-items').hide();
                        initSlick();
                        preloadStatus[slug] = 'loaded';
                    }
                },
                error: function () {
                    preloadStatus[slug] = 'error';
                }
            });
        }
    });

    // Init tab đầu tiên
    $('.classes-tab-content .tab-items').hide();
    $('.classes-tab-content .tab-items:first').show();
    initSlick();

    // ✅ Preload các tab còn lại sau 500ms mỗi cái
    $('.classes-tab-list .tab').each(function (i) {
        var $tab = $(this);
        var slug = $tab.data('slug');

        if ($tab.is(':first-child')) return; // bỏ qua tab đầu

        setTimeout(function () {
            // Nếu nội dung đã có → bỏ qua
            if ($('.classes-tab-content .tab-items[data-slug="' + slug + '"]').length) return;

            // Nếu user click trước khi preload chạy → bỏ preload
            if (preloadStatus[slug]) return;

            preloadStatus[slug] = 'loading';

            $.ajax({
                url: attrCore.ajax_url,
                method: 'POST',
                data: {
                    action: 'load_classes_tab',
                    slug: slug
                },
                success: function (response) {
                    if (response.success) {
                        $('.classes-tab-content').append(
                            '<div class="tab-items" data-slug="' + slug + '" style="display:none;">' + response.data + '</div>'
                        );
                        initSlick();
                        preloadStatus[slug] = 'loaded';
                    }
                },
                error: function () {
                    preloadStatus[slug] = 'error';
                }
            });
        }, 500 * (i + 1)); // preload mỗi tab cách nhau 0.5s
    });

    // Trigger khi click
    $('[data-tab^="tab_custom-"]').on('click', function () {
        const $clicked = $(this);
        const tabName = $clicked.data('tab').replace('tab_custom-', '');

        const $wrapper = $clicked.closest('.tab-custom-wrapper');

        // Bỏ active khỏi tất cả tab
        $wrapper.find('[data-tab^="tab_custom-"]').removeClass('active');
        $clicked.addClass('active');

        // Bỏ active khỏi tất cả content
        $wrapper.find('[class*="tab_custom-"]').removeClass('active');

        // Active content tương ứng
        const $targetContent = $wrapper.find('.tab_custom-' + tabName);
        if ($targetContent.length) {
            $targetContent.addClass('active');
        }
    });

    // ✅ Auto kích hoạt tab đầu tiên và content tương ứng
    $('.tab-custom-wrapper').each(function () {
        const $wrapper = $(this);
        const $firstTab = $wrapper.find('[data-tab^="tab_custom-"]').first();

        if ($firstTab.length) {
            $firstTab.trigger('click');
        }
    });
});