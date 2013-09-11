<?php get_header(); ?>

 <div id="hero-image"></div>

 <div id="main">

		<?php if ( is_home() ) {
		
				get_template_part( 'includes/recent-products' );
		} ?>

<?php get_footer(); ?>
