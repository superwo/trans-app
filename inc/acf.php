<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
if ( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page( array(
		'page_title' => 'Acf Settings',
		'menu_title' => 'Acf Settings',
		'menu_slug'  => 'theme-general-settings',
		'capability' => 'edit_posts',
		'redirect'   => false
	) );
}
