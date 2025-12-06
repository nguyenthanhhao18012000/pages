<?php

namespace BevitaTheme\Inc\Src;

class Assets
{

    use Traits\Singleton;

    function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
    }

    public function get_vars()
    {
        return [
            'version'           => BEVITA_THEME_VERSION,
            'admin_ajax'        => admin_url('admin-ajax.php'),
            'nonce'             => wp_create_nonce('ajax-nonce'),
            'site_url'          => site_url('/'),
            'uri_assets'        => BEVITA_THEME_URI,
            'is_mobile'         => wp_is_mobile(),
            'strings'           => [],
        ];
    }


    public function enqueue_scripts()
    {
        // css
        wp_enqueue_style('bevita-theme-style', BEVITA_THEME_URI . 'assets/dist/css/app.css', ['flatsome-main', 'flatsome-shop'], filemtime(BEVITA_THEME_PATH . '/assets/dist/css/app.css'));

        // js
        wp_register_script('bevita-theme-script', BEVITA_THEME_URI . 'assets/dist/js/app.js', ['jquery', 'gsap', 'flatsome-js'], filemtime(BEVITA_THEME_PATH . '/assets/dist/js/app.js'), true);
        wp_localize_script('bevita-theme-script', 'BEVITA_THEME_vars', $this->get_vars());
        wp_enqueue_script('bevita-theme-script');

        // icons
        wp_enqueue_style('font-awesome-5', BEVITA_THEME_URI . 'assets/dist/fonts/font-awesome/css/all.min.css', [], BEVITA_THEME_VERSION);
        wp_enqueue_style('material-icons', BEVITA_THEME_URI . 'assets/dist/fonts/material-icons/material-icons.css');

        // gsap
        wp_register_script('gsap', BEVITA_THEME_URI . 'assets/dist/lib/gsap/gsap.min.js', [], '3.12.2', true);
        wp_enqueue_script('gsap-scrollto-plugin', BEVITA_THEME_URI . 'assets/dist/lib/gsap/ScrollToPlugin.min.js', ['gsap'], '3.2.4', true);
        wp_enqueue_script('gsap-ScrollTrigger.min.js', BEVITA_THEME_URI . 'assets/dist/lib/gsap/ScrollTrigger.min.js', ['gsap'], '3.12.2', true);

        // Swiper
        // wp_enqueue_style('swiper-css', BEVITA_THEME_URI . 'assets/dist/lib/swiper/swiper-bundle.min.css');
        // wp_enqueue_script('swiper-js', BEVITA_THEME_URI . 'assets/dist/lib/swiper/swiper-bundle.min.js', array(), null, false);
        wp_register_style('swiper-css', BEVITA_THEME_URI . 'assets/dist/lib/swiper/swiper-bundle.min.css');
        wp_register_script('swiper-js', BEVITA_THEME_URI . 'assets/dist/lib/swiper/swiper-bundle.min.js');


        // Chỉ load ở trang shop + archive + taxonomy product
        if (is_shop() || is_product_taxonomy() || is_product()) {
            wp_enqueue_script(
                'theme-shop',
                BEVITA_THEME_URI . '/assets/dist/js/shop.js',
                ['jquery', 'flatsome-js'],
                filemtime(BEVITA_THEME_PATH . '/assets/dist/js/shop.js'),
                true
            );
        }
    }
}
