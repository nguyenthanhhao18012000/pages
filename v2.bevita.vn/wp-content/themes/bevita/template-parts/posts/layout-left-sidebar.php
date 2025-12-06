<?php
do_action('flatsome_before_blog');
if (is_archive() || is_search()):
?>
	<div class="row">
		<div class="post-sidebar large-2 col">
			<?php flatsome_sticky_column_open('blog_sticky_sidebar'); ?>
			<?php get_sidebar(); ?>
			<?php flatsome_sticky_column_close('blog_sticky_sidebar'); ?>
		</div>

		<div class="large-6 col">
			<?php
			echo do_shortcode('
			[section class="section-blog-title"]
			[row label="Row Title" class="row-title"]
			[col span__sm="12"]
			[title text="Tin tức mới nhất" tag_name="h2"]
			[/col]
			[/row]
			[/section]
			');

			if (get_theme_mod('blog_style_archive', '') && (is_archive() || is_search())) {
				get_template_part('template-parts/posts/archive', get_theme_mod('blog_style_archive', ''));
			} else {
				get_template_part('template-parts/posts/archive', get_theme_mod('blog_style', 'normal'));
			}
			?>
		</div>

		<div class="large-4 col">
			<?php flatsome_sticky_column_open('blog_sticky_sidebar'); ?>
			<?php echo do_shortcode('[block id="sidebar-right-blog"]'); ?>
			<?php flatsome_sticky_column_close('blog_sticky_sidebar'); ?>
		</div>
	</div>

<?php
else: ?>
	<?php if (!is_single() && get_theme_mod('blog_featured', '') == 'top') {
		get_template_part('template-parts/posts/featured-posts');
	} ?>
	<div class="row row-large <?php if (get_theme_mod('blog_layout_divider', 1)) echo 'row-divided '; ?>">

		<div class="post-sidebar large-3 col">
			<?php flatsome_sticky_column_open('blog_sticky_sidebar'); ?>
			<?php get_sidebar(); ?>
			<?php flatsome_sticky_column_close('blog_sticky_sidebar'); ?>
		</div>

		<div class="large-9 col medium-col-first">
			<?php if (!is_single() && get_theme_mod('blog_featured', '') == 'content') {
				get_template_part('template-parts/posts/featured-posts');
			} ?>
			<?php
			if (is_single()) {
				get_template_part('template-parts/posts/single');
				comments_template();
			} elseif (get_theme_mod('blog_style_archive', '') && (is_archive() || is_search())) {
				get_template_part('template-parts/posts/archive', get_theme_mod('blog_style_archive', ''));
			} else {
				get_template_part('template-parts/posts/archive', get_theme_mod('blog_style', 'normal'));
			}	?>
		</div>

	</div>
<?php
endif;
do_action('flatsome_after_blog');
?>