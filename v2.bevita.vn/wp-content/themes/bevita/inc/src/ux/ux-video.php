<?php

namespace BevitaTheme\Inc\Src\UX;

use BevitaTheme\Inc\Src\Traits\Singleton;

if (! defined('ABSPATH')) exit;

class UX_Video
{

    use Singleton;

    public function __construct()
    {
        // Register shortcode for WP
        add_shortcode('ux_video_card', [$this, 'shortcode_video_card']);
        add_shortcode('ux_video_card_list', [$this, 'shortcode_video_card_list']);

        // Register in UX Builder
        add_action('ux_builder_setup', [$this, 'register_ux_elements']);
    }

    /**
     * Register elements with UX Builder
     */
    public function register_ux_elements()
    {
        /**
         * Video Card (1 item)
         */
        add_ux_builder_shortcode('ux_video_card', [
            'name'     => __('Video Card'),
            'category' => __('Bevita Modules'),
            'require'   => ['ux_video_card_list'],
            'options'  => [
                'video_id' => [
                    'type'    => 'select',
                    'heading' => __('Chọn Video'),
                    'options' => $this->get_video_posts(),
                ],
            ],
        ]);

        /**
         * Video Card List
         */
        add_ux_builder_shortcode('ux_video_card_list', [
            'name'     => __('Video Card List'),
            'category' => __('Bevita Modules'),
            'type'      => 'container',
            'allow'     => ['ux_video_card'],
            'options'  => [
                'video_id' => [
                    'type'    => 'select',
                    'heading' => __('Chọn Video'),
                    'options' => $this->get_video_posts(),
                ],
            ],
        ]);
    }

    /**
     * Shortcode render: review card
     */
    public function shortcode_video_card($atts = [])
    {
        $atts = shortcode_atts([
            'video_id' => '',
        ], $atts);

        ob_start();
?>
        <article class="video-card">
            <div class="video-card__thumbnail">
                <img src="https://framerusercontent.com/images/KmqbKGvHM7iR87ZcnMlaonlB5Y.png?width=717&height=1024"
                    alt="Hành trình của Ngọc Anh" />
                <a href="https://www.youtube.com/watch?v=WbI1kcINX0k" class="open-video" role="button"
                    aria-label="Open video in lightbox" data-flatsome-role-button="attached">
                    <button class="video-card__play-btn">

                    </button>
                </a>
            </div>
            <div class="video-card__body">
                <h3 class="video-card__title">Hành trình của Ngọc Anh</h3>
                <ul class="video-card__meta">
                    <li class="video-card__meta-item">
                        <span class="video-card__meta-label">Mục tiêu da</span>
                        <span class="video-card__meta-value">Giảm mụn</span>
                    </li>
                    <li class="video-card__meta-item">
                        <span class="video-card__meta-label">Thời gian</span>
                        <span class="video-card__meta-value">2 tháng</span>
                    </li>
                </ul>
                <div class="video-card__verified">
                    Đánh giá đã xác thực
                </div>
            </div>
        </article>
    <?php
        return ob_get_clean();
    }
    /**
     * Shortcode render: review card list
     */
    public function shortcode_video_card_list($atts = [], $content)
    {
        $atts = shortcode_atts([
            'video_id' => '',
        ], $atts);
        ob_start();
    ?>
        <div class="video_card__list">
            <?php echo do_shortcode($content) ?>
        </div>
<?php
        return ob_get_clean();
    }

    /**
     * Load Post list for UX Builder select field
     */
    private function get_video_posts()
    {
        $posts = get_posts([
            'post_type' => 'video',
            'numberposts' => -1,
        ]);

        $options = [];

        foreach ($posts as $p) {
            $options[$p->ID] = $p->post_title;
        }

        return $options;
    }
}
