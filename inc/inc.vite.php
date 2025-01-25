<?php
// Exit if accessed directly
if (!defined('ABSPATH'))
  exit;
/*
 * VITE  development
 * Inspired by https://github.com/andrefelipe/vite-php-setup
 *
 */
// enqueue hook
add_action('wp_enqueue_scripts', function () {
  if (defined('IS_VITE_DEVELOPMENT') && IS_VITE_DEVELOPMENT === true) {
    // insert hmr into head for live reload
    function vite_head_module_hook()
    {
      echo '<script type="module" crossorigin src="http://localhost:3000/main.ts"></script>';
    }
    add_action('wp_head', 'vite_head_module_hook');
  } else {
    require_once __DIR__ . '/theme-styles.php';
    //include generated styles and scripts
    $manifest_path = get_stylesheet_directory() . '/dist/manifest.json';
    $main_file = 'main.ts';
    if (file_exists($manifest_path)) {
      $manifest = json_decode(file_get_contents($manifest_path), true);
      if (isset($manifest[$main_file])) {
        $script_url = get_template_directory_uri() . '/dist/' . $manifest[$main_file]['file'];
        wp_enqueue_script('ar-translate-js', $script_url, array(), null, true);
        if (isset($manifest[$main_file]['css'])) {
          foreach ($manifest[$main_file]['css'] as $css_file) {
            $style_url = get_stylesheet_directory_uri() . '/dist/' . $css_file;
            wp_enqueue_style('ar-translate-css', $style_url, array(), null);
          }
        }
      }
    }
    // add type module to main.js
    add_filter('script_loader_tag', function ($tag, $handle) {
      if ($handle === 'build-js') {
        $tag = str_replace(' src', ' type="module" src', $tag);
      }
      return $tag;
    }, 10, 2);
  }
}, 20);
