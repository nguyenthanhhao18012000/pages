<?php

namespace BevitaTheme\Inc\Src\UX;

use BevitaTheme\Inc\Src\Traits\Singleton;

class UX_Swiper
{
    use Singleton;

    public function __construct()
    {

        // Register shortcode for WP
        add_shortcode('ux_swiper_review_container', [$this, 'shortcode_swiper_review_container']);
        add_shortcode('ux_swiper_slide', [$this, 'shortcode_swiper_slide']);

        // Register in UX Builder
        add_action('ux_builder_setup', [$this, 'register_swiper']);
    }

    /**
     * Đăng ký Swiper container và Swiper slide item
     */
    public function register_swiper()
    {
        // Đăng ký container Swiper
        add_ux_builder_shortcode('ux_swiper_review_container', [
            'name'      => __('Review Slider'),
            'category'  => __('Bevita Modules'),
            'type'      => 'container',
            'options'   => [
                'heading_title' => [
                    'type'      => 'textfield',
                    'heading'   => 'Heading Title',
                    'default'   => 'Reviews Slider',
                ],
            ],
            'allow'     => ['ux_swiper_slide'],
        ]);

        // Đăng ký slide item trong Swiper
        add_ux_builder_shortcode('ux_swiper_slide', [
            'name'      => __('Review Slide Item'),
            'category'  => __('Bevita Modules'),
            'type'      => 'container',
            'require'   => ['ux_swiper_review_container'],
            // 'options'   => [
            //     'review_id' => [
            //         'type'      => 'select',
            //         'heading'   => __('Select Review'),
            //         'options'   => $this->get_review_posts(),
            //     ]
            // ]
        ]);
    }

    public function shortcode_swiper_review_container($atts = [], $content)
    {
        wp_enqueue_script('swiper-js');
        wp_enqueue_style('swiper-css');
        $unique_id = 'swiper_' . uniqid();

        ob_start();
?>
        <div class="swiper-container" id="<?php echo $unique_id; ?>">
            <div class="swiper-button-header">

                <div class="swiper-button-prev-custom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15.75 19.5L8.25 12L15.75 4.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                </div>
                <div class="swiper-button-next-custom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.25 4.5L15.75 12L8.25 19.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="swiper mySwiper ">
                <div class="swiper-wrapper">
                    <?php echo do_shortcode($content); ?>
                </div>
                <!-- <div class="swiper-pagination"></div> -->
            </div>
            <script>
                document.addEventListener("DOMContentLoaded", function() {
                    var swiper_<?php echo $unique_id; ?> = new Swiper('#<?php echo $unique_id; ?> .swiper', {
                        loop: false,
                        slidesPerView: 3,
                        spaceBetween: 24,
                        navigation: {
                            nextEl: '#<?php echo $unique_id; ?> .swiper-button-next-custom',
                            prevEl: '#<?php echo $unique_id; ?> .swiper-button-prev-custom',
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        autoplay: {
                            delay: 3000,
                        },
                        breakpoints: {
                            "@0.00": {
                                slidesPerView: 1,
                            },
                            "@0.75": {
                                slidesPerView: 2,
                            },
                            "@1.00": {
                                slidesPerView: 3,
                            },
                        },
                    });
                });
            </script>
        </div>
    <?php
        return ob_get_clean();
    }

    public function shortcode_swiper_slide($atts = [], $content)
    {
        $atts = shortcode_atts([], $atts);
        ob_start();
    ?>
        <div class="swiper-slide">
            <?php echo do_shortcode($content); ?>
        </div>
<?php
        return ob_get_clean();
    }


    /**
     * Lấy danh sách các bài review để chọn
     */
    private function get_review_posts()
    {
        $posts = get_posts([
            'post_type' => 'review',
            'numberposts' => -1,
        ]);

        $options = [];
        foreach ($posts as $post) {
            $options[$post->ID] = $post->post_title;
        }

        return $options;
    }
}
