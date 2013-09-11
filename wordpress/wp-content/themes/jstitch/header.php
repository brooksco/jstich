<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Header Template
 *
 * Here we setup all logic and XHTML that is required for the header section of all screens.
 *
 * @package WooFramework
 * @subpackage Template
 */

 global $woo_options, $woocommerce;

?>

<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" charset="utf-8" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico" />

	<title><?php wp_title('|',1,'right'); ?> <?php bloginfo('name'); ?></title>

	<link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">

	<?php wp_head(); ?>
</head>

<body>

	<header>

		<nav class="top-nav">
			
			<a href="<?php echo site_url(); ?>">
			<img id="header-logo" src="/jstitch/wordpress/wp-content/themes/jstitch/img/logo-light.png" />
			</a>

			<?php if (sizeof($woocommerce->cart->cart_contents)>0) :?>
					<li id="header-cart"><a href="<?php echo $woocommerce->cart->get_cart_url()?>" title="<?php _e('Cart','woothemes') ?>">
					<?php _e('Cart','woothemes') ?>
					</a></li>
				<?php endif; ?>
		</nav>

		<nav class="site-nav">
			<ul class="nav">
				<?php wp_list_pages(array('title_li' => '', 'exclude' => '5, 6, 9, 13, 14')); ?>

				
			</ul>
		</nav>

	</header>

	

				<!-- Sidebar -->
				<?php get_sidebar(); ?>
				<!-- End Sidebar -->


