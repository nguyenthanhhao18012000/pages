<?php

/**
 * Single Product tabs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/tabs.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see              https://woocommerce.com/document/template-structure/
 * @package          WooCommerce\Templates
 * @version          9.9.0
 * @flatsome-version 3.19.13
 */

if (! defined('ABSPATH')) {
    exit;
}

$tabs_style = get_theme_mod('product_display', 'tabs');

// Get sections instead of tabs if set.
if ($tabs_style == 'sections') {
    wc_get_template_part('single-product/tabs/sections');

    return;
}

// Get accordion instead of tabs if set.
if ($tabs_style == 'accordian' || $tabs_style == 'accordian-collapsed') {
    wc_get_template_part('single-product/tabs/accordian');

    return;
}

/**
 * Filter tabs and allow third parties to add their own.
 *
 * Each tab is an array containing title, callback and priority.
 *
 * @see woocommerce_default_product_tabs()
 */
$product_tabs = apply_filters('woocommerce_product_tabs', array());

$tab_count   = 0;
$panel_count = 0;

?>
<div class="row product-footer__row">
    <div class="col large-8 product-footer__tabs">
        <div class="col-inner">
            <?php
            if (! empty($product_tabs)) : ?>
                <div class="woocommerce-tabs wc-tabs-wrapper container tabbed-content">
                    <ul class="tabs wc-tabs product-tabs small-nav-collapse <?php flatsome_product_tabs_classes(); ?>"
                        role="tablist">
                        <?php foreach ($product_tabs as $key => $product_tab) : ?>
                            <li role="presentation"
                                class="<?php echo esc_attr($key); ?>_tab <?php if ($tab_count == 0) echo 'active'; ?>"
                                id="tab-title-<?php echo esc_attr($key); ?>">
                                <a href="#tab-<?php echo esc_attr($key); ?>" role="tab"
                                    aria-selected="<?php echo $tab_count == 0 ? 'true' : 'false'; ?>"
                                    aria-controls="tab-<?php echo esc_attr($key); ?>"
                                    <?php echo $tab_count != 0 ? ' tabindex="-1"' : ''; ?>>
                                    <?php echo wp_kses_post(apply_filters('woocommerce_product_' . $key . '_tab_title', $product_tab['title'], $key)); ?>
                                </a>
                            </li>
                            <?php $tab_count++; ?>
                        <?php endforeach; ?>
                    </ul>
                    <div class="tab-panels">
                        <?php foreach ($product_tabs as $key => $product_tab) : ?>
                            <div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--<?php echo esc_attr($key); ?> panel entry-content <?php if ($panel_count == 0) echo 'active'; ?>"
                                id="tab-<?php echo esc_attr($key); ?>" role="tabpanel"
                                aria-labelledby="tab-title-<?php echo esc_attr($key); ?>">
                                <?php if ($key == 'description' && ux_builder_is_active()) echo flatsome_dummy_text(); // phpcs:ignore WordPress.Security.EscapeOutput 
                                ?>
                                <?php
                                if (isset($product_tab['callback'])) {
                                    call_user_func($product_tab['callback'], $key, $product_tab);
                                }
                                ?>
                            </div>
                            <?php $panel_count++; ?>
                        <?php endforeach; ?>
                        <?php do_action('woocommerce_product_after_tabs'); ?>
                        <div class="tab-panels__btn-showmore">
                            <a class="button is-link">
                                <span>Xem thêm</span>
                                <i class="icon-angle-down" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="col large-4 product-footer__news">
        <div class="is-sticky-column">
            <div class="is-sticky-column__inner">
                <div class="col-inner">
                    <div class="product-footer__news--heading">
                        <h3>Tin tức</h3>
                        <a href="/blog-lam-dep/" class="button is-link">Xem thêm</a>
                    </div>
                    <?php
                    // Option 1: Tự động lấy post mới nhất
                    echo do_shortcode('[blog_posts style="vertical" type="row" columns="1" columns__md="1" posts="5" show_date="false" excerpt="false" show_category="label" comments="false" text_align="left"]');

                    // Option 2: Chọn post custom theo đúng với sản phẩm, bằng ACF thông qua get_field()
                    // echo do_shortcode('[blog_posts style="vertical" type="row" columns="1" columns__md="1" ids="58415,58407,57979" show_date="false" show_category="label" comments="false" image_height="80%" image_width="34" text_align="left"]'); 
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>