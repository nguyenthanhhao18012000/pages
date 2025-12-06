<?php
if (! defined('ABSPATH')) {
    exit;
}

$title = woocommerce_page_title(false);

if ($title === 'Products' || empty($title)) {
    $title = 'Sản phẩm';
}
?>

<p class="woocommerce-result-count bevita-result-count" role="alert" aria-relevant="all">
    <span class="bevita-result-title">
        <?php echo esc_html($title); ?>
    </span>
    <span class="bevita-result-total">
        (<?php echo intval($total); ?>)
    </span>
</p>