<?php

// Replaces the excerpt "Read More" text by a link
function new_excerpt_more($more) {
    global $post;
 return '<a class="moretag" href="'. get_permalink($post->ID) . '"> Read more...</a>';
}
add_filter('excerpt_more', 'new_excerpt_more');

function theme_setup() {
    
    add_theme_support( 'post-thumbnails' );

    register_nav_menus(array(
    'primary' => __('Menu', "theme"),
    ));
}

add_action('after_setup_theme', 'theme_setup');

?>