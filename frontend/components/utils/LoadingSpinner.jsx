// LoadingSpinner.js
'use client';

import { useNoScroll } from '@/utils/hooks';
import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  useNoScroll(true);

  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>  {/* Using correct class name */}
      {/* <h2 className={styles.title}>Loading...</h2>
      <p className={styles.text}>
        This may take a few seconds, please don't close this page.
      </p> */}
    </div>
  );
}
