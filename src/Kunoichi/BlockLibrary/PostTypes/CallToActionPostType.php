<?php

namespace Kunoichi\BlockLibrary\PostTypes;


use Hametuha\SingletonPattern\Singleton;

/**
 * Post type for
 *
 * @package kbl
 */
class CallToActionPostType extends Singleton {

	public $post_type = 'call-to-action';

	/**
	 * Constructor
	 */
	protected function init() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_filter( 'enter_title_here', [ $this, 'enter_title_here' ], 10, 2 );
		add_action( 'save_post', [ $this, 'save_post' ], 10, 2 );
		add_action( 'add_meta_boxes', [ $this, 'add_meta_boxes'] );
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );
	}

	/**
	 * Register call to actions.
	 */
	public function register_post_type() {
		// Post type.
		$args = apply_filters( 'kbl_cta_post_type_args', [
			'label' => __( 'Call To Actions', 'kbl' ),
			'labels' => [
				'singular_name'            => __( 'Call To Action', 'kbl' ),
				'edit_item'                => __( 'Edit CTA', 'kbl' ),
				'new_item'                 => __( 'New CTA', 'kbl' ),
				'view_item'                => __( 'View CTA', 'kbl' ),
				'view_items'               => __( 'View CTA', 'kbl' ),
				'search_items'             => __( 'Search Call To Actions', 'kbl' ),
				'all_items'                => __( 'All CTA', 'kbl' ),
				'attributes'               => __( 'Attributes', 'kbl' ),
				'insert_into_item'         => __( 'Insert into CTA', 'kbl' ),
				'uploaded_to_this_item'    => __( 'Upload to this CTA', 'kbl' ),
				'menu_name'                => __( 'Actions', 'kbl' ),
				'filter_items_list'        => __( 'Filter Call To Actions list', 'kbl' ),
				'item_published'           => __( 'Call To Action has been published.', 'kbl' ),
				'item_published_privately' => __( 'Call To Action has been published.', 'kbl' ),
				'item_reverted_to_draft'   => __( 'Call To Action became draft.', 'kbl' ),
				'item_scheduled'           => __( 'Call To Action has been scheduled.', 'kbl' ),
				'item_updated'             => __( 'Call To Action has been updated.', 'kbl' ),
			],
			'supports'         => [ 'title', 'editor', 'page-attributes' ],
			'public'           => false,
			'show_ui'          => true,
			'menu_icon'        => 'dashicons-warning',
			'menu_position'    => 50,
			'show_in_nav_menu' => false,
			'show_in_rest'     => true,
		] );
		register_post_type( $this->post_type, $args );
		// Taxonomies.
		$tax_args = apply_filters( 'kbl_cta_taxonomy_args', [
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => true,
			'label'        => __( 'Positions', 'kbl' ),
			'labels'       => [
				'singular_name' => __( 'Positions', 'kbl' ),
				'all_items'           => __( 'All Positions', 'kbl' ),
				'edit_item'           => __( 'Edit Position', 'kbl' ),
				'view_item'           => __( 'View Position', 'kbl' ),
				'parent_item'         => __( 'Parent Position', 'kbl' ),
				'update_item'         => __( 'Update Position', 'kbl' ),
				'add_new_item'        => __( 'Add New Position', 'kbl' ),
				'new_item_name'       => __( 'New Position Name', 'kbl' ),
				'search_items'        => __( 'Search Positions', 'kbl' ),
				'add_or_remove_items' => __( 'Add or Remove Position', 'kbl' ),
			],
			'hierarchical' => true,
		] );
		register_taxonomy( 'cta-position', [ $this->post_type ], $tax_args );
	}

	/**
	 * Enter title here.
	 *
	 * @param string $title
	 * @param \WP_Post $post
	 * @return string
	 */
	public function enter_title_here( $title, $post ) {
		if ( $this->post_type !== $post->post_type ) {
			return $title;
		}
		return __( 'Enter Action name(e.g. Buy Now Button）', 'kbl' );
	}

	/**
	 * Save post data.
	 *
	 * @param int      $post_id
	 * @param \WP_Post $post
	 */
	public function save_post( $post_id, $post ) {
        if ( $this->post_type !== $post->post_type ) {
            return;
        }
        if ( ! wp_verify_nonce( filter_input( INPUT_POST, '_ctanonce' ), 'cta_update' ) ) {
            return;
        }
        // Delete all first.
        delete_post_meta( $post_id, '_position' );
        $values = isset( $_POST['cta-position'] ) ? array_filter( array_map( 'trim', (array) $_POST['cta-position'] ) ) : [];
        // Save all
        foreach ( $values as $value ) {
            add_post_meta( $post_id, '_position', $value );
        }
	}

	/**
	 * Render meta box.
	 *
	 * @param string $post_type
	 */
	public function add_meta_boxes( $post_type ) {
		if ( $this->post_type !== $post_type ) {
			return;
		}
		add_meta_box( 'cta-position', __( 'CTA Setting', 'kbl' ), function( \WP_Post $post ) {
			wp_nonce_field( 'cta_update', '_ctanonce', false );
			?>
			<p>
				<label><?php __( 'Predefined Position', 'kbl' ) ?></label><br />
				<?php if ( $positions = $this->get_predefined_positions() ) : ?>
                    <?php foreach ( $positions as $key => $label ) :
                        $saved_positions = get_post_meta( $post->ID, '_position' );
                        ?>
                    <label style="display: block">
                        <input type="checkbox" name="cta-position[]" value="<?php echo esc_attr( $key ) ?>" <?php checked( in_array( $key, $saved_positions ) ) ?> /> <?php echo esc_html( $label ) ?>
                    </label>
                    <?php endforeach; ?>
				<?php else : ?>
				<span style="color: red;"><?php esc_html_e( 'This theme has no predefined position.', 'kbl' ) ?></span>
				<?php endif; ?>
			</p>
            <p class="description">
                <?php esc_html_e( 'Predefined positions are set by themes.', 'kbl' ) ?>
            </p>
			<?php
		}, $this->post_type, 'side', 'high' );
	}

	/**
     * Add CTA positions.
     *
	 * @return array
	 */
	protected function get_predefined_positions() {
		return apply_filters( 'kbl_cta_predefined_positions', [] );
	}

	/**
	 * Add admin menu to CTA
	 */
	public function add_admin_menu() {
	    add_submenu_page( 'edit.php?post_type=call-to-action', __( 'About Call To Actions', 'kbl' ), __( 'About CTA', 'kbl' ), 'edit_pages', 'about-cta', function() {
	        ?>
            <div class="wrap">
                <h1><?php esc_html_e( 'About Call To Actions', 'kbl' ) ?></h1>
                <p>
                    <?php esc_html_e( '"Call To Action" is the name of UIs which requires user to make a action. An abbreviation is "CTA"', 'kbl' ) ?>
                </p>
                <ol>
                    <li><?php esc_html_e( 'Buttons for login, registration, subscription, downloading, and so on.', 'kbl' ) ?></li>
                    <li><?php esc_html_e( 'Clickable banners', 'kbl' ) ?></li>
                    <li><?php esc_html_e( 'Ads', 'kbl' ) ?></li>
                </ol>
                <p><?php esc_html_e( 'This Call To Action can be displayed in widgets, blocks. The only newest one will be displayed. It is similar to ad rotating.', 'kbl' ) ?></p>
                <hr />
                <h3><?php esc_html_e( 'Positions', 'kbl' ) ?></h3>
                <p>
                    <?php esc_html_e( 'You can register original positions. These are useful for filtering in widgets or blocks.', 'kbl' ); ?>
                </p>
                <?php
                $positions = get_terms( [ 'taxonomy' => 'cta-position', 'hide_empty' => false, ] );
                if ( $positions ) : ?>
                    <ol>
                        <?php foreach ( $positions as $position ) : ?>
                            <li>
                                <?php echo esc_html( $position->name ) ?>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                <?php else : ?>
                <p style="color: red;">
                    <?php esc_html_e( 'You have no position.', 'kbl' ) ?>
                </p>
                <?php endif; ?>
                <p>
                    <a href="<?php echo admin_url( 'edit-tags.php?taxonomy=cta-position&post_type=call-to-action' ) ?>" class="button">
                        <?php esc_html_e( 'Manage Positions', 'kbl' ) ?>
                    </a>
                </p>
                <hr />
                <h3><?php esc_html_e( 'Predefined Positions', 'kbl' ) ?></h3>
                <p>
					<?php esc_html_e( 'If theme has predefined positions, specified CTA will be displayed there(e.g. After post content)', 'kbl' ); ?>
                </p>
                <?php if ( $predefined = $this->get_predefined_positions() ) : ?>
                    <ol>
                        <?php foreach ( $predefined as $key => $label ) : ?>
                        <li>
                            <?php echo esc_html( $label ); ?>
                        </li>
                        <?php endforeach; ?>
                    </ol>
                <?php else : ?>
                    <p style="color: red;"><?php esc_html_e( 'This theme has no predefined position.', 'kbl' ) ?></p>
                <?php endif; ?>
            </div>
            <?php
        } );
    }
}
