<?php

namespace BevitaTheme\Inc\Src\UX;

use BevitaTheme\Inc\Src\Traits\Singleton;

if (! defined('ABSPATH')) exit;

class UX_Review
{

    use Singleton;

    public function __construct()
    {

        // Register shortcode for WP
        add_shortcode('ux_review_card', [$this, 'shortcode_review_card']);
        add_shortcode('ux_review_section', [$this, 'shortcode_review_section']);

        // Register in UX Builder
        add_action('ux_builder_setup', [$this, 'register_ux_elements']);
    }

    /**
     * Register elements with UX Builder
     */
    public function register_ux_elements()
    {

        /**
         * Review Card (1 item)
         */
        add_ux_builder_shortcode('ux_review_card', [
            'name'     => __('Review Card'),
            'category' => __('Bevita Modules'),
            'options'  => [
                'review_id' => [
                    'type'    => 'select',
                    'heading' => __('Chọn Review'),
                    'options' => $this->get_review_posts(),
                ],
            ],
        ]);

        /**
         * Review Section (Home Section)
         */
        add_ux_builder_shortcode('ux_review_section', [
            'name'     => __('Review Section'),
            'category' => __('Bevita Modules'),
            'type'     => 'container',
            'options'  => [
                'heading_title' => [
                    'type' => 'textfield',
                    'heading' => __('Heading'),
                ],
                'sub_title' => [
                    'type' => 'textarea',
                    'heading' => __('Sub Heading'),
                ],
                'limit' => [
                    'type'    => 'textfield',
                    'heading' => __('Số lượng review'),
                    'default' => 3,
                ]
            ],
        ]);
    }

    /**
     * Shortcode render: review card
     */
    public function shortcode_review_card($atts = [])
    {

        $atts = shortcode_atts([
            'review_id' => '',
        ], $atts);

        // $id = $atts['review_id'] ?? '1111';
        // if (! $id) return '';

        // Fields
        // $location = get_field('location', $id)?? ;
        $statement = 'Da sạch mụn, giảm 90% thâm sau 8 tuần';
        $before =  'https://framerusercontent.com/images/2Z9SwHoL7BWperUTq5qAWZt3Z0.png?scale-down-to=512&width=612&height=408';
        $after = 'https://framerusercontent.com/images/iq4RgjtioSCRotYTHyWrPpohM.png?width=639&height=422';

        ob_start();
?>

        <article class="review-card">
            <div class="review-card__content">
                <div class="review-card__meta">
                    <p>Chị Minh - 28 tuổi - TP.HCM</p>
                </div>

                <div class="review-card__text">
                    <p>"<?php echo $statement; ?>"</p>
                </div>
            </div>

            <div class="review-card__images">
                <div class="review-card__img before">
                    <img src="<?php echo $before; ?>" alt="">
                    <span class="tag">Trước</span>
                </div>
                <div class="review-card__img after">
                    <img src="<?php echo $after; ?>" alt="">
                    <span class="tag">Sau</span>
                </div>
            </div>
        </article>

    <?php
        return ob_get_clean();
    }

    /**
     * Shortcode render: Home Review Section
     */
    public function shortcode_review_section($atts = [], $content = null)
    {

        $atts = shortcode_atts([
            'heading_title' => '5,000+ khách hàng đã có làn da khoẻ đẹp',
            'sub_title'     => '',
            'limit'         => 3,
        ], $atts);

        $reviews = get_posts([
            'post_type' => 'review',
            'posts_per_page' => intval($atts['limit']),
        ]);

        ob_start();
    ?>

        <section class="home-review">
            <div class="home-review__container">

                <div class="home-review__header">
                    <h2 class="home-review__title"><?php echo $atts['heading_title']; ?></h2>
                    <p class="home-review__desc"><?php echo $atts['sub_title']; ?></p>
                </div>

                <div class="home-review__list">

                    <?php foreach ($reviews as $rv): ?>
                        <?php echo do_shortcode('[ux_review_card review_id="' . $rv->ID . '"]'); ?>
                    <?php endforeach; ?>

                </div>

                <div class="home-review__cta">
                    <a class="btn btn-primary" href="#">Thiết kế phác đồ cho tôi</a>
                    <a class="btn btn-outline" href="/review">Xem tất cả đánh giá</a>
                </div>

            </div>
        </section>

<?php
        return ob_get_clean();
    }

    /**
     * Load Post list for UX Builder select field
     */
    private function get_review_posts()
    {

        $posts = get_posts([
            'post_type' => 'review',
            'numberposts' => -1,
        ]);

        $options = [];

        foreach ($posts as $p) {
            $options[$p->ID] = $p->post_title;
        }

        return $options;
    }
}
