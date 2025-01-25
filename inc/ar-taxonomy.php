<?php
if (!defined('ABSPATH')) {
  exit;
}
// хук для регистрации
add_action('init', 'create_taxonomy');
function create_taxonomy()
{
  $field = "Categorie";
  register_taxonomy('categorie', ['lezioni'], [
    'label' => '',
    'labels' => [
      'name' => $field,
      'singular_name' => $field,
      'search_items' => 'Cerca' . $field,
      'all_items' => 'Tutto' . $field,
      'view_item' => 'Visualizza' . $field,
      'parent_item' => 'Genitore' . $field,
      'parent_item_colon' => 'Genitore :.$field',
      'edit_item' => 'Modifica' . $field,
      'update_item' => 'Aggiorna' . $field,
      'add_new_item' => 'Aggiungi nuovo' . $field,
      'new_item_name' => 'Nuovo',
      'menu_name' => $field,
    ],
    'description' => '',
    'public' => true,
    'hierarchical' => false,
    'rewrite' => true,
    'capabilities' => array(),
    'meta_box_cb' => null,
    'show_admin_column' => true,
    'show_in_rest' => null,
    'rest_base' => null,
  ]);
}
