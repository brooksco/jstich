<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Recent Products Component
 *
 * Display X recent products
 *
 * @author Matty
 * @since 1.0.0
 * @package WooFramework
 * @subpackage Component
 */
$settings = array(
				'thumb_single' => 'false',
				'single_w' => 200,
				'single_h' => 200,
				'thumb_single_align' => 'alignleft',
				'homepage_recent_products_title' => '',
				'homepage_recent_products_limit' => 4,
				'homepage_posts_sidebar' => 'true'
				);

$settings = woo_get_dynamic_values( $settings );
?>

	<section id="recent-products" class="woocommerce-columns-4">

	<?php if( ! is_active_sidebar( 'homepage' ) && $settings['homepage_recent_products_title'] ) { ?>
		<header>
			<h2><?php echo stripslashes( $settings['homepage_recent_products_title'] ); ?></h2>
		</header>
	<?php } ?>

	<?php echo do_shortcode( '[recent_products per_page="' . $settings['homepage_recent_products_limit'] . '" columns="4" orderby="date" order="desc"]' ); ?>

	</section>

<div class="fix"></div>