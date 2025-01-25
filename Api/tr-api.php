<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function all_site_content()
{
    register_rest_route('tr/v1', 'content', [
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'allContentResults',
    ]);
}

add_action('rest_api_init', 'all_site_content');

function allContentResults($data)
{
    global $wpdb;
    $post_types = get_post_types(['public' => true], 'names');
    // Remove the post types that are not needed
    $post_types = array_diff($post_types, ['attachment', 'revision', 'nav_menu_item', 'custom_css', 'customize_changeset', 'oembed_cache', 'user_request', 'wp_block', 'wpcf7_contact_form', 'elementor_library', 'elementor_font', 'elementor_global', 'elementor_icons', 'elementor_shape_divider', 'elementor_template', 'elementor_widget', 'elementor_pro_form', 'elementor_pro_form_action', 'elementor_pro_form_field', 'elementor_pro_form_record', 'elementor_pro_form_submissions', 'elementor_pro_links', 'elementor_pro_templates', 'elementor_pro_widgets', 'elementor_pro_widget_type', 'elementor_pro_widget_type_meta', 'elementor_pro_widget_type_tax', 'elementor_pro_widget_type_template', 'elementor_pro_widget_type_template_meta', 'elementor_pro_widget_type_template_tax', 'elementor_pro_widget_type_template_tax_meta', 'elementor_pro_widget_type_template_tax_relationship', 'elementor_pro_widget_type_template_tax_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship_relationship_relationship_relationship', 'elementor_pro_widget_type_template_tax_relationship_relationship_relationship_relationship_relationship_relationship_relationship_relationship_meta', 'elementor_pro_widget_type_template_tax' ]);
    $results = [];

    $installed_languages = WPGlobus::Config()->enabled_languages;
    $default_language = WPGlobus::Config()->default_language;

    $results['languages'] = $installed_languages;
    $results['default_language'] = $default_language;

    $post_id = $data->get_param('id');

    foreach ($post_types as $post_type) {
        $query_args = [
            'post_type' => $post_type,
            'posts_per_page' => -1,
        ];

        if ($post_id) {
            $query_args['p'] = $post_id; // Filter by specific post ID
        }

        $query = new WP_Query($query_args);
        $post_results = [];

        while ($query->have_posts()) {
            $query->the_post();
            $current_post_id = get_the_ID();

            // Get the raw post title from the database
            $post = get_post($current_post_id);
            $raw_title = $post->post_title;  // This contains the full WPGlobus format

            $acf_fields = get_post_meta($current_post_id); // Gets all fields in raw format
            // Filter out the fields with keys starting with '_'
            $acf_fields = array_filter($acf_fields, function ($key) {
                return strpos($key, '_') !== 0;
            }, ARRAY_FILTER_USE_KEY);

            // Filter out the fields that are objects
            $acf_fields = array_filter($acf_fields, function ($field) {
                return !is_object($field);
            });

            // Filter out the fields that are only numbers in string
            $acf_fields = array_filter($acf_fields, function ($field) {
                return !is_numeric(implode($field));
            });

            $post_results[] = [
                'id' => $current_post_id,
                'title' => $raw_title,  // Raw WPGlobus format with {:lang} tags
                'url' => get_the_permalink(),
                'content' => get_the_content(),
                'fields' => get_fields($current_post_id),
                'acf_fields' => $acf_fields,
            ];
        }

        if (!$post_id || !empty($post_results)) {
            $results[$post_type] = $post_results;
        }
    }

    return $results;
}
