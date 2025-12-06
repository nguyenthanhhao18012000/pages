jQuery(document).ready(function ($) {
  $('aside[class*="widget_woocommerce_product_search_filter_"]').each(
    function () {
      var widget = $(this);
      var list = widget.find("ul.product-search-filter-items");

      if (list.length === 0) return;
      if (list.children("li").length <= 6) return;

      var btn = $('<span class="brand-toggle-btn">Xem thêm</span>');
      widget.append(btn);

      btn.on("click", function () {
        list.toggleClass("show-all");

        if (list.hasClass("show-all")) {
          btn.text("Thu gọn");
        } else {
          btn.text("Xem thêm");
        }
      });
    }
  );

  //is product
  $(".tab-panels__btn-showmore .button").on("click", function (e) {
    e.preventDefault();

    let $wrap = $(this).closest(".product-footer__tabs").find(".tab-panels");
    let fullHeight = $wrap[0].scrollHeight;

    $wrap.animate({ maxHeight: fullHeight }, 600, function () {
      $wrap.css("max-height", "none");
    });

    $(this).closest(".tab-panels__btn-showmore").fadeOut(300);
  });
});
