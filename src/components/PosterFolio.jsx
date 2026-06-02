import React, { useMemo } from 'react';
import styles from './PosterFolio.module.css';

const defaultPosters = [
  '/optimized/posters/harmonica-main-01.jpg',
  '/optimized/posters/showcase/post-28-square.jpg',
  '/optimized/posters/showcase/post-23.jpg',
  '/optimized/posters/showcase/post-26-square.jpg',
  '/optimized/posters/showcase/post-04-square.jpg',
  '/optimized/posters/showcase/post-20.jpg',
  '/optimized/posters/harmonica-botbagh-04.jpg',
  '/optimized/posters/showcase/post-18-square.jpg',
  '/optimized/posters/showcase/post-13.jpg',
  '/optimized/posters/showcase/post-02.jpg',
  '/optimized/posters/showcase/post-12-square.jpg',
  '/optimized/posters/harmonica-pres-03.jpg',
  '/optimized/posters/showcase/post-25.jpg',
  '/optimized/posters/showcase/post-33.jpg',
  '/optimized/posters/showcase/post-31-square.jpg',
  '/optimized/posters/showcase/post-34-square.jpg'
];

export default function PosterFolio({
  posters = defaultPosters,
  speedSeconds = 42
}) {
  const safePosters = Array.isArray(posters) && posters.length > 0 ? posters : defaultPosters;

  const loopedPosters = useMemo(() => {
    return [...safePosters, ...safePosters];
  }, [safePosters]);

  return (
    <section className={styles.section} aria-label="Poster folio gallery">
      <div className={styles.viewport}>
        <div className={styles.rail}>
          <div
            className={styles.track}
            style={{ '--folio-duration': `${speedSeconds}s` }}
          >
            {loopedPosters.map((src, index) => {
              const originalIndex = index % safePosters.length;

              return (
                <article
                  className={styles.card}
                  key={`${src}-${index}`}
                >
                  <img
                    src={src}
                    alt={`Poster ${originalIndex + 1}`}
                    className={styles.poster}
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
