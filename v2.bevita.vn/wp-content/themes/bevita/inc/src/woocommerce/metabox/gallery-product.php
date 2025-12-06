<?php

function add_gallery_metabox($post_type)
{
	$types = array('product');
	if (in_array($post_type, $types)) {
		add_meta_box(
			'gallery-metabox',
			'Hình ảnh sản phẩm [tỉ lệ: 687x385]',
			'gallery_meta_callback',
			$post_type,
			'normal',
			'high'
		);
	}
}
add_action('add_meta_boxes', 'add_gallery_metabox');

function gallery_meta_callback($post)
{
	wp_nonce_field(basename(__FILE__), 'gallery_meta_nonce');
	$ids = get_post_meta($post->ID, 'tdc_gallery_id', true);
	$linkYt = get_post_meta($post->ID, 'tdc_youtube', true);
	?>
	<table class="form-table">
		<tr>
			<td>
				<a class="gallery-add button" data-uploader-title="Thêm hình ảnh" data-uploader-button-text="Thêm nhiều hình ảnh">Thêm hình ảnh</a>
				<ul id="gallery-metabox-list">
					<?php if ($ids) : foreach ($ids as $key => $value) : $image = get_image_id($value); ?>
							<li>
								<input type="hidden" name="tdc_gallery_id[<?php echo $key; ?>]" value="<?php echo $value; ?>">
								<img class="image-preview" src="<?php echo $image[0]; ?>">
								<small><a class="remove-image" href="#">Xóa hình</a></small>
							</li>
					<?php endforeach;
					endif; ?>
				</ul>
			</td>
		</tr>
		<div style="padding: 15px 10px;">
		<label for="tdc_youtube"><strong>Link Youtube</strong> </label>
		<input type="text" style="margin-top: 5px;width:100%" name="tdc_youtube" id="tdc_youtube" value="<?php echo $linkYt ?>">
		</div>
	</table>
<?php }

function gallery_meta_save($post_id)
{
	if (!isset($_POST['gallery_meta_nonce']) || !wp_verify_nonce($_POST['gallery_meta_nonce'], basename(__FILE__))) return;
	if (!current_user_can('edit_post', $post_id)) return;
	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

	if (isset($_POST['tdc_gallery_id'])) {
		update_post_meta($post_id, 'tdc_gallery_id', $_POST['tdc_gallery_id']);
	} else {
		delete_post_meta($post_id, 'tdc_gallery_id');
	}
	if (isset($_POST['tdc_youtube'])) {
		update_post_meta($post_id, 'tdc_youtube', $_POST['tdc_youtube']);
	} else {
		delete_post_meta($post_id, 'tdc_youtube');
	}
}
add_action('save_post', 'gallery_meta_save');

function mytheme_admin_scripts() {
     
    wp_enqueue_script( 'mytheme-gallery-js', get_stylesheet_directory_uri().'/assets/js/gallery-custom.js', array('jquery'), null, true );   
	wp_enqueue_style('edit_post-style', get_stylesheet_directory_uri() . '/assets/css/edit_post.css', false, time());
     
}
add_action( 'admin_enqueue_scripts','mytheme_admin_scripts' );