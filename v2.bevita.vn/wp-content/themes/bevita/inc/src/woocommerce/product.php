<?php

namespace BevitaTheme\Inc\Src\WooCommerce;

use BevitaTheme\Inc\Src\Traits\Singleton;

class Product
{
    use Singleton;

    public function __construct()
    {
        add_action('wp', [$this, 'modify_product_title_hooks'], 20);
    }
    public function modify_product_title_hooks()
    {
        add_filter('woocommerce_breadcrumb_defaults', [$this, 'bevita_custom_breadcrumbs'], 99);
        remove_action('woocommerce_single_product_summary', 'flatsome_woocommerce_product_breadcrumb',  0);

        // Tabs
        remove_action('woocommerce_after_single_product_summary', 'woocommerce_upsell_display', 15);
        /**
         * Rename product data tabs
         */
        add_filter('woocommerce_product_tabs', [$this, 'woo_rename_tabs'], 98);

        // Add RankMath breadcrumb instead
        // add_action('woocommerce_before_main_content', [$this, 'render_rankmath_breadcrumb'], 20);

        // product_related
        add_filter('woocommerce_product_related_products_heading', function () {
            return 'Có thể bạn quan tâm';
        });
    }

    public function bevita_custom_breadcrumbs($defaults)
    {

        // $defaults['delimiter'] = '<span class="divider"> › </span>';

        $defaults['delimiter'] = ' • ';

        $defaults['wrap_before'] = '<nav class="woocommerce-breadcrumb breadcrumbs" aria-label="Breadcrumb">';
        $defaults['wrap_after']  = '</nav>';

        $defaults['home'] = 'Trang chủ';

        return $defaults;
    }

    public function render_rankmath_breadcrumb()
    {
        if (function_exists('rank_math_the_breadcrumbs')) {
            echo '<div class="bevita-breadcrumb-wrapper">';
            rank_math_the_breadcrumbs();
            echo '</div>';
        }
    }

    function woo_rename_tabs($tabs)
    {

        $tabs['description']['title'] = 'Thông tin chung';
        unset($tabs['additional_information']);
        $tabs['reviews']['priority'] = 60;
        // if (comments_open()) {
        //   $tabs['reviews']['title'] = 'Hỏi đáp';
        // } else {
        //   unset($tabs['reviews']);
        // }
        unset($tabs['reviews']);
        return $tabs;
    }
}
