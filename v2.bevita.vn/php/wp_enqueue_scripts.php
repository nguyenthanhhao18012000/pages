<?php
add_action('wp_head', 'bevita_output_custom_css', 999);
function bevita_output_custom_css()
{
    $is_localhost_mode = isset($_GET['mode']) && $_GET['mode'] === 'localhost' && current_user_can('manage_options');
    $ajax_url = admin_url('admin-ajax.php');

    echo '<script>
        var attrCore = {
            ajax_url: "' . esc_url($ajax_url) . '"
        };
    </script>' . "\n";

    if ($is_localhost_mode) {
        echo '<link rel="stylesheet" href="http://localhost/pages/v2.bevita.vn/assets/css/style.css?version=' . time() . '" type="text/css" media="all" />' . "\n";
        return;
    }

    $github_css_url = 'https://nguyenthanhhao18012000.github.io/pages/v2.bevita.vn/assets/css/style.css';
    echo '<link rel="stylesheet" href="' . esc_url($github_css_url) . '?ver=' . time() . '" type="text/css" media="all" />' . "\n";
}
