<?php

namespace BevitaTheme\Inc\Src\WooCommerce\MetaBox;

use BevitaTheme\Inc\Src\Traits\Singleton;

class Mtb_Products
{
    use Singleton;

    protected $tp;
    protected $productUsage;
    protected $list_results;

    public function __construct()
    {
        add_action('add_meta_boxes', [$this, 'metaboxs']);
        add_action('save_post', [$this, 'save_post']);
        add_action('wp', [$this, 'modify_hooks'], 20);
        $this->list_results = $this->_getAllKeywords();
    }
    public function modify_hooks()
    {
        add_filter('woocommerce_product_tabs', [$this, 'woo_new_product_tab']);
        add_filter('woocommerce_product_tabs', [$this, 'woo_new_productUsage_tab']);
    }
    function metaboxs()
    {
        add_meta_box(
            'product-metabox-thanhphan',
            'Thành phần sản phẩm',
            [$this, '_metabox'],
            'product',
            'normal',
            'high'
        );
    }
    function _metabox()
    {
        wp_nonce_field(basename(__FILE__), 'product_meta_nonce');
        global $post;

        $tp = get_post_meta($post->ID, 'tp', true);
        $i = 0;
?>
        <table id="table_tp" class="table table-tp">
            <thead>
                <tr>
                    <th>Tên thành phần</th>
                    <th>Định lượng</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($tp) foreach ($tp as $item) if ($item['title']) : ?>
                    <tr>
                        <td><input type="text" name="tp[<?php echo $i ?>][title]" value="<?php echo $item['title'] ?>" /></td>
                        <td><input type="text" value="<?php echo $item['size'] ?>" name="tp[<?php echo $i ?>][size]" /></td>
                        <td>[<a onclick="return removeItem(this);" href="#">Xóa</a>]</td>
                    </tr>
                <?php $i++;
                endif; ?>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" align="right">
                        <a href="#" class="button" onclick="return addNewItem();" id="addNew">+ Thêm mới</a>
                    </td>
                </tr>
            </tfoot>
        </table>
        <style>
            .table-tp {
                width: 100%
            }

            .table-tp thead th {
                background: #333;
                color: #fff;
                text-align: left;
                padding: 5px 10px
            }

            .table-tp tbody tr td {
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;
                padding: 5px
            }

            .table-tp tbody tr:nth-child(even) {
                background: #eee
            }
        </style>
        <script type="text/javascript">
            var i = <?php echo $i ?>;

            function addNewItem() {
                $html = '<tr><td><input type="text" name="tp[' + i + '][title]"/></td><td><input type="text" name="tp[' + i +
                    '][size]"/></td><td>[<a onclick="return removeItem(this);" href="#">Xóa</a>]</td></tr>';
                if (jQuery("#table_tp tbody tr").length) {
                    jQuery("#table_tp tbody tr:last-child").after($html);

                } else
                    jQuery("#table_tp tbody").html($html);
                i++;
                return false;
            }

            function removeItem(obj) {
                jQuery(obj).closest("tr").remove();
                return false;
            }
        </script>
    <?php
    }
    function save_post($post_id)
    {
        if (!isset($_POST['product_meta_nonce']) || !wp_verify_nonce($_POST['product_meta_nonce'], basename(__FILE__))) return;
        if (!current_user_can('edit_post', $post_id)) return;
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

        if (isset($_POST['tp'])) {
            update_post_meta($post_id, 'tp', $_POST['tp']);
        } else {
            delete_post_meta($post_id, 'tp');
        }
    }
    function _checkTP($post_id)
    {
        $tp = get_post_meta($post_id, 'tp', true);
        return $tp;
    }
    function woo_new_product_tab($tabs)
    {
        global $post;

        if ($this->tp = $this->_checkTP($post->ID)) {

            $tabs['tab_tp'] = array(
                'title'     => __('Thành phần', 'bevita'),
                'priority'  => 30,
                'callback'  => [$this, 'woo_new_product_tab_content']
            );
        }
        return $tabs;
    }
    function woo_new_product_tab_content()
    {
        $list_items = $this->tp;

    ?>
        <table class="table">
            <?php foreach ($list_items as $item) : ?>
                <tr>
                    <td><?php echo $this->_getListKeywords($item['title']); ?></td>
                    <td><?php echo $item['size']; ?></td>

                </tr>
            <?php endforeach; ?>

        </table>
    <?php
    }
    function _checkProductUsage($post_id)
    {
        if (function_exists('get_custom_field')) {

            $productUsage = get_custom_field('productUsage', $post_id);
            return $productUsage;
        }
        return false;
    }
    function woo_new_productUsage_tab($tabs)
    {
        global $post;
        if ($this->productUsage = $this->_checkProductUsage($post->ID)) {
            $tabs['productUsage'] = array(
                'title'     => __('Hướng dẫn sử dụng', 'bevita'),
                'priority'  => 20,
                'callback'  => [$this, 'woo_new_productUsage_tab_content']
            );
        }
        return $tabs;
    }
    function woo_new_productUsage_tab_content()
    {
        $productUsage = $this->productUsage;
        if (!$productUsage) return false;

    ?>
        <div class="productUsage">
            <?php echo $productUsage; ?>
        </div>
<?php
    }
    function _getListKeywords($keyword)
    {
        // global $wpdb;
        // $sql="SELECT title,link FROM ".$wpdb->prefix."keywords where title='".$keyword."' status='A'";
        // $results=$wpdb->get_results($sql);

        foreach ($this->list_results as $row) {

            if ($row->title == $keyword) {

                return sprintf('<a href="%s" title="%s" target="_blank">%s</a>', $row->link, $keyword, $keyword);
            }
        }

        return $keyword;
    }
    function _getAllKeywords()
    {
        global $wpdb;
        $sql = "SELECT title,link FROM " . $wpdb->prefix . "keywords where status='A'";
        $results = $wpdb->get_results($sql);
        return $results;
    }
}
?>