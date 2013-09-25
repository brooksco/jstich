/*-----------------------------------------------------------------------------------*/
/* GENERAL SCRIPTS */
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function(){

	
	jQuery('.page-item-4').attr("data-toggle", "tooltip");
	// jQuery('.page-item-4').attr("data-delay", '{"show":"200", "hide":"200"}');		
	jQuery('.page-item-4').attr("title", "Knock yourself out");	
	jQuery('.page-item-4').addClass("nav-tooltip");	

	jQuery('.nav-tooltip').tooltip();


	// Check if the current screen is greater than 480px
	// enquire.register("screen and (max-width:800px)", {

	// 		match : function() {
	// 			jQuery('#logo').find("img").attr("src","http://localhost/jstitch/wordpress/wp-content/uploads/2013/09/Jstitch-2-1024x397.png");
				
	// 	    },      // REQUIRED

	// 	    unmatch : function() {
	// 	    	jQuery('#logo').find("img").attr("src","http://localhost/jstitch/wordpress/wp-content/uploads/2013/09/Jstitch-2-invert-1024x397.png");
	// 	    }, 

	// });

	



	// Table alt row styling
	jQuery( '.entry table tr:odd' ).addClass( 'alt-table-row' );

	// FitVids - Responsive Videos
	jQuery( '.post, .widget, .panel, .page, #featured-slider .slide-media, .slide-content' ).fitVids();

	// Add class to parent menu items with JS until WP does this natively
	jQuery("ul.sub-menu, ul.children").parents('li').addClass('parent');

	// Responsive Navigation (switch top drop down for select)
	jQuery('ul#top-nav').mobileMenu({
	    switchWidth: 800,                   //width (in px to switch at)
	    topOptionText: 'Select a page',     //first option text
	    indentString: '&nbsp;&nbsp;&nbsp;'  //string for indenting nested items
	});

  	// Show/hide the main navigation
  	jQuery('.nav-toggle').click(function() {
	  jQuery('#navigation').slideToggle('fast', function() {
	  	return false;
	    // Animation complete.
	  });
	});

	// Stop the navigation link moving to the anchor (Still need the anchor for semantic markup)
	jQuery('.nav-toggle a').click(function(e) {
        e.preventDefault();
    });

    

});