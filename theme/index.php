<?php get_header(); ?>
<section>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
					<article>
						<div class="article__title text-center">
							<h1 class="h2"><?php the_title(); ?></h1>
							<span><?php the_time('F jS, Y') ?> by <a href="#"><?php the_author(); ?></span>
							<span>
								<a href="#"><?php the_category( ', ' ); ?></a>
							</span>
						</div>
						<!--end article title-->
						<div class="article__body">
							<?php
								$thumbnail_id = get_post_thumbnail_id(); 
								$thumbnail_url = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail-size', true );
								$thumbnail_meta = get_post_meta( $thumbnail_id, '_wp_attachment_image_alt', true);                
							?>
							<img alt="<?php echo $thumbnail_meta; ?>" src="<?php echo $thumbnail_url[0]; ?>" />
							<p>
								<?php the_content(); ?>
							</p>

						</div>
						<div class="article__share text-center">
							<a class="btn bg--facebook btn--icon" href="#">
								<span class="btn__text">
									<i class="socicon socicon-facebook"></i>
									Share on Facebook
								</span>
							</a>
							<a class="btn bg--twitter btn--icon" href="#">
								<span class="btn__text">
									<i class="socicon socicon-twitter"></i>
									Share on Twitter
								</span>
							</a>
						</div>
					</article>
					<!--end item-->
				<?php endwhile; endif; ?>
      </div>
    </div>
    <!--end of row-->
  </div>
  <!--end of container-->
</section>

<?php get_footer(); 