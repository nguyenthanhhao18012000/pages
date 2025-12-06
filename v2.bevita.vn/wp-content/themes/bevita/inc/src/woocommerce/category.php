<?php

namespace BevitaTheme\Inc\Src\WooCommerce;

use BevitaTheme\Inc\Src\Traits\Singleton;

class Category
{
    use Singleton;

    public function __construct()
    {
        add_action('wp', [$this, 'modify_category_title_hooks'], 20);
    }

    public function modify_category_title_hooks()
    {

        remove_action(
            'flatsome_category_title_alt',
            'flatsome_woocommerce_result_count',
            20
        );
        remove_action(
            'flatsome_category_title_alt',
            'flatsome_woocommerce_catalog_ordering',
            30
        );

        remove_action('woocommerce_archive_description', 'woocommerce_taxonomy_archive_description', 10);
        remove_action('woocommerce_archive_description', 'woocommerce_product_archive_description', 10);

        if (is_product_category()) {
            add_action(
                'woocommerce_before_main_content',
                [$this, 'render_category_header'],
                20
            );
        }
    }
    public function render_category_header()
    {
?>
        <div class="bevita-category-header">
            <div class="left">
                <?php woocommerce_result_count(); ?>
            </div>
            <div class="right">
                <?php echo $this->render_custom_sorting(); ?>
            </div>
        </div>

    <?php
    }
    public function render_custom_sorting()
    {
        // Lấy orderby hiện tại
        $current_orderby = isset($_GET['orderby']) ? sanitize_text_field($_GET['orderby']) : 'menu_order';

        // Giữ nguyên URL hiện tại nhưng thay orderby
        $base_url = remove_query_arg('orderby');

        $low_to_high_url = add_query_arg('orderby', 'price', $base_url);
        $high_to_low_url = add_query_arg('orderby', 'price-desc', $base_url);
    ?>

        <div class="bevita-sorting-buttons">
            <a href="<?php echo esc_url($low_to_high_url); ?>"
                class="button white is-outline sort-btn <?php echo $current_orderby === 'price' ? 'active' : ''; ?>">
                <span>Giá thấp đến cao</span>
            </a>

            <a href="<?php echo esc_url($high_to_low_url); ?>"
                class="button white is-outline sort-btn <?php echo $current_orderby === 'price-desc' ? 'active' : ''; ?>">
                <span>Giá cao đến thấp</span>
            </a>
        </div>

<?php
    }
}
