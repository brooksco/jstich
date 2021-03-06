<?php
// File Security Check
if ( ! function_exists( 'wp' ) && ! empty( $_SERVER['SCRIPT_FILENAME'] ) && basename( __FILE__ ) == basename( $_SERVER['SCRIPT_FILENAME'] ) ) {
    die ( 'You do not have sufficient permissions to access this page!' );
}
?><?php
/**
 * Index Template
 *
 * Here we setup all logic and XHTML that is required for the index template, used as both the homepage
 * and as a fallback template, if a more appropriate template file doesn't exist for a specific context.
 *
 * @package WooFramework
 * @subpackage Template
 */
	get_header();
	global $woo_options;

	$settings = array(
				'homepage_enable_features' => 'true',
				'homepage_enable_content' => 'true',
				'homepage_enable_recent_products' => 'true',
				'homepage_posts_sidebar' => 'true',
				'homepage_content_type' => 'posts',
				'homepage_enable_testimonials' => 'true',
				'homepage_enable_promo_message' => 'true',
				'homepage_number_of_features' => 3,
				'homepage_number_of_testimonials' => 2,
				'homepage_features_area_title' => '',
				'homepage_testimonials_area_title' => ''
				);

	$settings = woo_get_dynamic_values( $settings );

?>

	</div><!-- /.wrapper -->

	<?php woo_featured_slider_loader(); ?>

	<div class="wrapper">

    <div id="content" class="col-full home">

    	<?php woo_main_before(); ?>

    	<section class="homepage-area fullwidth">

		<?php if ( is_home() && ! dynamic_sidebar( 'homepage' ) ) {

			if ( 'true' == $settings['homepage_enable_features'] ) {
				$args = array( 'title' => stripslashes( $settings['homepage_features_area_title'] ), 'size' => 250, 'per_row' => 3, 'limit' => $settings['homepage_number_of_features'] );
				$args['before'] = '<section id="features" class="widget widget_woothemes_features home-section"><div class="inner">';
				$args['after'] = '</div></section>';
				$args['before_title'] = '<header class="block"><h2>';
				$args['after_title'] = '</h2></header>';

				do_action( 'woothemes_features', $args );
			}

			if ( 'true' == $settings['homepage_enable_testimonials'] ) {
				$args = array( 'title' => stripslashes( $settings['homepage_testimonials_area_title'] ), 'size' => 60, 'per_row' => 2, 'limit' => $settings['homepage_number_of_testimonials'] );
				$args['before'] = '<section id="testimonials" class="widget widget_woothemes_testimonials home-section"><div class="inner">';
				$args['after'] = '</div></section>';
				$args['before_title'] = '<header class="block"><h2>';
				$args['after_title'] = '</h2></header>';

				do_action( 'woothemes_testimonials', $args );
			}

			if ( is_woocommerce_activated() && 'true' == $settings['homepage_enable_recent_products'] ) {
				get_template_part( 'includes/recent-products' );
			}

		} ?>

		</section><!-- /#main -->

	</div>

	<div class="col-full">
		<?php
			if ( 'true' == $settings['homepage_enable_content'] ) {
				switch ( $settings['homepage_content_type'] ) {
					case 'page':
					get_template_part( 'includes/specific-page-content' );
					break;

					case 'posts':
					default:
					get_template_part( 'includes/blog-posts' );
					break;
				}
			}
		?>
	</div>

	<?php woo_main_after(); ?>

    </div><!-- /#content -->

<?php get_footer(); ?>