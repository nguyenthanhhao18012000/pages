<?php
add_action('init', function () {
    if (isset($_GET['mode']) && $_GET['mode'] === 'localhost') {
        setcookie(
            'bevita_localhost_mode',
            '1',
            time() + 3600,
            COOKIEPATH,
            COOKIE_DOMAIN
        );

        $_COOKIE['bevita_localhost_mode'] = '1';
    }
});

// Enqueue CSS + JS
add_action('wp_enqueue_scripts', 'bevita_enqueue_custom_assets', 99);
function bevita_enqueue_custom_assets()
{
    $is_localhost_mode = !empty($_COOKIE['bevita_localhost_mode']);

    $localhost_css = 'http://localhost/pages/v2.bevita.vn/assets/css/style.css';
    $github_css    = 'https://nguyenthanhhao18012000.github.io/pages/v2.bevita.vn/assets/css/style.css';

    $localhost_js  = 'http://localhost/pages/v2.bevita.vn/assets/js-min/script.js';
    $github_js     = 'https://nguyenthanhhao18012000.github.io/pages/v2.bevita.vn/assets/js-min/script.js';

    $css_url = $is_localhost_mode ? $localhost_css : $github_css;
    $js_url  = $is_localhost_mode ? $localhost_js  : $github_js;

    wp_enqueue_style(
        'bevita-style',
        $css_url,
        [],
        time(),
        'all'
    );

    wp_enqueue_script(
        'bevita-script',
        $js_url,
        ['jquery'],
        time()
    );

    wp_enqueue_style('fontawesome-pro', 'https://nguyenthanhhao18012000.github.io/pages/v2.bevita.vn/assets/plugins/fontawesome/css/all-pro.css');
}
