<?php

/**
 * Breadcrumbs.
 *
 * @package          Flatsome/WooCommerce/Templates
 * @flatsome-version 3.16.0
 */

$classes   = array();
$classes[] = 'is-' . get_theme_mod('breadcrumb_size', 'large');
?>
<div class="<?php echo implode(' ', $classes); ?>">
    <?php
    if (function_exists('rank_math_the_breadcrumbs') || shortcode_exists('rank_math_breadcrumb')) {
        echo do_shortcode('[rank_math_breadcrumb]');
    } else {
        flatsome_breadcrumb();
    }
    ?>
</div>