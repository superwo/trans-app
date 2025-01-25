<?php

if (! defined('ABSPATH')) {
	exit;
}

add_action('init', 'my_custom_init');
function my_custom_init()
{
	$label = 'Lezioni';
	register_post_type('lezioni', array(
		'labels'             => array(
			'name'              => $label,
			'singular_name'     => $label,
			'add_new'           => __("Aggiungi $label"),
			'add_new_item'      => __("Aggiungi $label"),
			'edit_item'         => __("Modifica $label"),
			'new_item'          => __("Nuova $label"),
			'view_item'         => __('Vedi'),
			'search_items'      => __('Cerca'),
			'parent_item_colon' => '',
			'menu_name'         => $label
		),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => true,
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 20,
		'menu_icon'          =>  'dashicons-welcome-learn-more',
		'supports'           => array('title', 'thumbnail')
	));
}
