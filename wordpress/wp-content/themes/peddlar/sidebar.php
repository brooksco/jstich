<?php
if ( ! defined( 'ABSPATH' ) ) exit; 
/**
 * Sidebar Template
 *
 * If a `primary` widget area is active and has widgets, display the sidebar.
 *
 * @package WooFramework
 * @subpackage Template
 */
	global $woo_options;
	
	if ( isset( $woo_options['woo_layout'] ) && ( $woo_options['woo_layout'] != 'layout-full' ) && !( is_page('Cart') ) ) {
?>	



<aside id="sidebar" class="col-right">

	<?php woo_sidebar_inside_before(); ?>

	<?php if ( woo_active_sidebar( 'primary' ) ) { ?>
    <div class="primary">
		<?php woo_sidebar( 'primary' ); ?>		           
	</div>        
	<?php } // End IF Statement ?>   
	
	<?php woo_sidebar_inside_after(); ?> 
	
</aside><!-- /#sidebar -->
<?php } else { // End IF Statement ?>

<style>
	/* Floated elements don't respect margin correctly, so swap to padding here */
	#main {
		width: 100%;
		margin-left: 0;
		margin-right: 0;
		padding-left: 2.083333333333333%; 
		padding-right: 2.083333333333333%;
	}
</style>

<?php } // End ELSE Statement ?>