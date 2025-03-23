'use client';

import styles from './index.module.css';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading'
}) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};