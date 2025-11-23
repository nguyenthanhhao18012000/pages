jQuery(function ($) {
    // ===== Set CSS variable --fusion-tb-header =====
    setTimeout(function () {
        var $header = $('.fusion-tb-header');

        if ($header.length) {
            var headerHeight = $header.outerHeight();
            var $adminBar = $('#wpadminbar');
            var adminBarHeight = $adminBar.length ? $adminBar.outerHeight() : 0;
            var totalHeight = headerHeight + adminBarHeight;

            document.documentElement.style.setProperty(
                '--fusion-tb-header',
                totalHeight + 'px'
            );
        }
    }, 200);

    var isMobile = window.matchMedia('(max-width: 1200px)').matches;

    // ===== Xử lý menu mega từ table =====
    var $links = $(
        '#header-style-braze_menu-trigger th div > a, #header-style-braze_menu-trigger td div > a'
    );

    $links.each(function () {
        var $link = $(this);
        var text = $.trim($link.text());
        var slug = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        var $thElement = $link.closest('th');
        if (!$thElement.length) {
            return;
        }

        var dataSlug = 'menu-mega__' + slug;
        $thElement.attr('data-slug', dataSlug);

        if (isMobile) {
            $link.on('click', function (e) {
                if (!$thElement.hasClass('has-child')) {
                    return;
                }

                e.preventDefault();

                $('#header-style-braze_menu-trigger th.has-child, #header-style-braze_menu-trigger td.has-child').each(function () {
                    var $otherTh = $(this);
                    if (!$otherTh.is($thElement)) {
                        $otherTh.removeClass('active');

                        var otherSlug = $otherTh.attr('data-slug');
                        if (otherSlug) {
                            $('#' + otherSlug).removeClass('active');
                        }
                    }
                });

                $thElement.toggleClass('active');

                var $targetDiv = $('#' + dataSlug);
                if ($thElement.hasClass('active')) {
                    $targetDiv.removeClass('slide-out');
                    $targetDiv.addClass('active');
                } else {
                    $targetDiv.removeClass('active');
                }
            });
        } else {
            $link.on('mouseenter', function () {
                if (!$thElement.hasClass('has-child')) {
                    return;
                }
                $thElement.addClass('active');
                var $targetDiv = $('#' + dataSlug);
                $targetDiv.addClass('active');
            });

            $link.on('mouseleave', function () {
                if (!$thElement.hasClass('has-child')) {
                    return;
                }
                $thElement.removeClass('active');
                var $targetDiv = $('#' + dataSlug);
                $targetDiv.removeClass('active');
            });
        }

    });

    // ===== Dọn class / attr cho các div menu mega =====
    var $targetDivs = $(
        "[id^='menu-mega__'] > div, [id^='menu-mega__'] > div > div"
    );

    $targetDivs.each(function () {
        var $div = $(this);

        $div.removeAttr('style').removeAttr('data-scroll-devices');

        var classes = this.className ? this.className.split(/\s+/) : [];
        var fusionClasses = $.grep(classes, function (cls) {
            return cls.indexOf('fusion') === 0;
        });

        $.each(fusionClasses, function (i, cls) {
            $div.removeClass(cls);
        });

        $div.addClass('handle-with-js');
    });

    // ===== Append các block mega menu vào th có data-slug =====
    $('[data-slug]').each(function () {
        var $el = $(this);
        var slug = $el.attr('data-slug');
        var $targetDiv = $('#' + slug);

        if ($targetDiv.length) {
            $el.addClass('has-child');

            if ($(window).width() > 1200) {
                $el.append($targetDiv);
            }
        }
    });

    // ===== Mobile nav icon =====
    function updateNavIcon() {
        var $wrapper = $('#header-style-braze_menu-option > .fusion-column-wrapper');
        var $navIconOuter = $('.nav-icon-wrapper');

        // CASE 1 — Màn hình mobile/tablet (<= 1200)
        if ($(window).width() <= 1200) {

            // Nếu chưa tồn tại icon → tạo mới
            if (!$navIconOuter.length && $wrapper.length) {

                var $outer = $('<div>', { class: 'nav-icon-wrapper' });
                var $navIcon = $(
                    '<div id="nav-icon-animation"><span></span><span></span><span></span></div>'
                );

                $outer.append($navIcon);

                $outer.on('click', function () {
                    $navIcon.toggleClass('open');
                    var isOpen = $navIcon.hasClass('open');

                    $('#header-style-braze_menu-trigger').toggleClass('open', isOpen);
                    $('body').toggleClass('lock-scroll', isOpen);

                    if (!isOpen) {
                        $('#header-style-braze_menu-trigger th.has-child, #header-style-braze_menu-trigger td.has-child')
                            .removeClass('active');

                        $('[data-slug]').each(function () {
                            var slug = $(this).attr('data-slug');
                            if (slug) {
                                $('#' + slug).removeClass('active');
                            }
                        });
                    }
                });

                $wrapper.append($outer);
            }
        }

        // CASE 2 — Width > 1200 → remove icon hoàn toàn
        else {
            if ($navIconOuter.length) {
                $navIconOuter.remove();
            }

            // Reset các trạng thái mobile nếu còn sót
            $('#nav-icon-animation').removeClass('open');
            $('#header-style-braze_menu-trigger').removeClass('open');
            $('body').removeClass('lock-scroll');
        }
    }

    // Init + resize
    updateNavIcon();
    $(window).on('resize', updateNavIcon);


    if (isMobile) {
        rebuildMegaTableForMobile();
        insertBackToLevel1();
    }

    function rebuildMegaTableForMobile() {
        // Chỉ chạy cho table bên trong các block menu-mega__
        $("[id^='menu-mega__'] table").each(function () {
            var $table = $(this);

            // Tránh convert nhiều lần
            if ($table.data('converted-to-div')) {
                return;
            }
            $table.data('converted-to-div', true);

            var $theadRow = $table.find('thead tr').first();
            if (!$theadRow.length) {
                return;
            }

            var $headCells = $theadRow.children('th, td');
            var $rows = $table.find('tbody tr');

            // Wrapper mới thay cho table
            var $wrapper = $('<div class="mega-table-as-div"></div>');

            $headCells.each(function (colIndex) {
                var $headCell = $(this);

                // Gom tất cả cell theo cột (kể cả rỗng)
                var colCells = [];
                $rows.each(function () {
                    var $row = $(this);
                    var $cell = $row.children('td, th').eq(colIndex);
                    if ($cell.length) {
                        colCells.push($cell);
                    }
                });

                // ===== Tạo cấu trúc div cho 1 cột =====
                var $col = $('<div class="mega-col"></div>');

                // Head
                var $colHead = $('<div class="mega-col-head"></div>');
                // DI CHUYỂN contents từ th/td head sang (không clone)
                $colHead.append($headCell.contents());

                // 👉 Đánh dấu các heading rỗng bên trong head
                $colHead.find('h1,h2,h3,h4,h5,h6').each(function () {
                    var $h = $(this);
                    // không có text + không có child element nào khác
                    if ($.trim($h.text()) === '' && $h.children().length === 0) {
                        $h.addClass('empty-content');
                    }
                });

                $col.append($colHead);

                // Body
                var $colBody = $('<div class="mega-col-body"></div>');

                $.each(colCells, function (_, $cell) {
                    var $item = $('<div class="mega-col-item"></div>');
                    // Di chuyển nội dung gốc từ td/th sang item
                    $item.append($cell.contents());

                    // 👉 Đánh dấu các heading rỗng bên trong item
                    $item.find('h1,h2,h3,h4,h5,h6').each(function () {
                        var $h = $(this);
                        if ($.trim($h.text()) === '' && $h.children().length === 0) {
                            $h.addClass('empty-content');
                        }
                    });

                    $colBody.append($item);
                });

                $col.append($colBody);
                $wrapper.append($col);
            });

            // Thay hẳn <table> bằng cấu trúc <div> mới
            $table.replaceWith($wrapper);
        });
    }

    function insertBackToLevel1() {
        var backHtml =
            '<div class="back-to-level-1">' +
            '<span class="icon-back"></span>' +
            '<span class="text-back">Back</span>' +
            '</div>';

        $("[id^='menu-mega__'] > .handle-with-js > .col-left.handle-with-js")
            .each(function () {
                var $col = $(this);
                if (!$col.find('.back-to-level-1').length) {
                    $col.prepend(backHtml);
                }
            });
    }


    $(document).on('click', '.back-to-level-1', function (e) {
        e.preventDefault();
        $this = jQuery(this);
        $("[id^='menu-mega__']").removeClass('active');
        $this.closest("[id^='menu-mega__']").addClass('slide-out');

        $('#header-style-braze_menu-trigger th.has-child, #header-style-braze_menu-trigger td.has-child')
            .removeClass('active');
    });

});
