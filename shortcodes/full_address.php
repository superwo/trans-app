<?php
if (! defined('ABSPATH')) {
  exit; // Exit if accessed directly
}
function full_address()
{
  ob_start();
?>
<?php
  global $footer_page_id;
  $footer = get_field('footer', $footer_page_id);
  $full_address = $footer['full_address'];
?>
	<?php $full_address = $full_address ? $full_address : '<span class="red">Add full_address from Admin -> Acf settings</span>'; ?>
	<?php return $full_address; ?>
	<?php
}
add_shortcode('full_address', 'full_address');
  ?>
