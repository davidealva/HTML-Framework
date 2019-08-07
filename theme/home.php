<?php get_header(); ?>

<section class="space--sm">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="masonry masonry-blog-list">
          <div class="masonry-filter-container text-center d-flex justify-content-center align-items-center">
            <span>Category:</span>
            <div class="masonry-filter-holder">
              <div
                class="masonry__filters"
                data-filter-all-text="All Categories"
              ></div>
            </div>
          </div>
          <hr />

          <div class="masonry__container">
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
              <article class="masonry__item" data-masonry-filter="">
                <div class="article__title text-center">
                  <a href="<?php the_permalink(); ?>">
                    <h2><?php the_title(); ?></h2>
                  </a>
                  <span><?php the_time('F jS, Y') ?> by <a href=""><a href="#"><?php the_author(); ?></a></span>
                  <span>
                    <a href="#"><?php the_category( ', ' ); ?></a>
                  </span>
                </div>
                <!--end article title-->

                <div class="article__body">
                  <a href="#">
                    <?php the_post_thumbnail(); ?>
                  </a>
                  <p>
                    <?php the_excerpt(); ?>
                  </p>

                </div>

              </article>
              <!--end item-->
            <?php endwhile; endif; ?>
          </div>
          <!--end of masonry container-->
          <div class="pagination">
            <a class="pagination__prev" href="#" title="Previous Page"
              >&laquo;</a
            >
            <ol>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li class="pagination__current">3</li>
              <li>
                <a href="#">4</a>
              </li>
            </ol>
            <a class="pagination__next" href="#" title="Next Page">&raquo;</a>
          </div>
        </div>
        <!--end masonry-->
      </div>
    </div>
    <!--end of row-->
  </div>
  <!--end of container-->
</section>

<?php get_footer(); ?>
