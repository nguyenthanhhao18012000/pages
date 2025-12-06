<?php

namespace BevitaTheme\Inc;

class Init
{

    use \BevitaTheme\Inc\Src\Traits\Singleton;

    function __construct()
    {
        Src\Assets::instance();

        // UX Builder
        Src\UX\UX_Review::instance();
        Src\UX\UX_Swiper::instance();
        Src\UX\UX_Video::instance();

        // WooCommerce
        Src\WooCommerce\Category::instance();
        Src\WooCommerce\Product::instance();
        Src\WooCommerce\MetaBox\Mtb_Products::instance();
    }
}
