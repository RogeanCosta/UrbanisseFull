import React from 'react';
import styles from './input.module.css';

const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
