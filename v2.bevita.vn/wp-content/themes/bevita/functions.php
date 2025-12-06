<?php
/*
 * call the framework
 *
 */
require get_stylesheet_directory() . '/inc/autoload.php';



if (!function_exists('get_custom_field')) {
    function get_custom_field($field_key, $post_id = false)
    {
        if (function_exists('get_field')) {
            return get_field($field_key, $post_id);
        } else {
            // Nếu ACF không hoạt động, lấy giá trị mặc định từ post meta
            return get_post_meta($post_id, $field_key, true);
        }
    }
}
