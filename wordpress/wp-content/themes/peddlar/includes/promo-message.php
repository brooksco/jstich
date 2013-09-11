<?php
if ( ! defined( 'ABSPATH' ) ) exit;
/**
 * Promotional Message Component
 *
 * Display a specified promotional message
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
				'homepage_promo_text' => '',
				'homepage_promo_background' => '',
				'homepage_promo_button_link' => '',
				'homepage_promo_button_text' => ''
				);

$settings = woo_get_dynamic_values( $settings );
?>

<?php
if ( $settings['homepage_promo_text'] ) {
	$background = '';
	if ( $settings['homepage_promo_background'] && $settings['homepage_promo_background'] != 'true' ) {
		$background = 'style="background:url(' . $settings['homepage_promo_background'] . ') center center no-repeat; background-size:100%;"';
	}
echo '<div class="footer-shop"' . $background . '>';

	echo '<div class="inner">';

		echo '<div class="footer-shop-content">';

			echo '<p>' . stripslashes( $settings['homepage_promo_text'] ) . '</p>';

			if ( $settings['homepage_promo_button_link'] && $settings['homepage_promo_button_text'] ) {
			 ?><a href="<?php echo esc_url( $settings['homepage_promo_button_link'] ); ?>" class="button"><?php echo stripslashes( $settings['homepage_promo_button_text'] ); ?></a><?php
			}

		echo '</div><!--/.footer-shop-content-->';

	echo '</div><!--/.inner-->';

echo '</div><!--/.footer-shop-->';
}
?>

<div class="fix"></div>