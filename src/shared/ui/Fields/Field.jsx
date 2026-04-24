import styles from './Field.module.scss'

// Component:

const Field = (props) => {
  const {
    className = '',
    id,
    label,
    type = 'text',
    value,
    onInput,
    ref,
    error,
  } = props // Props destructuring

// Render:

  return (
    <div className={`${styles.field} ${className}`}>
          <label
            className={styles.lable}
            htmlFor={id}
          >
            {label}
          </label>
          <input
            className={`${styles.input} ${error ? styles.isInvalid : ''}`}
            id={id}
            placeholder=" "
            autoComplete="off"
            type={type}
            value={value}
            onInput={onInput}
            ref={ref}
          />
          {error && (
            <span className={styles.error} title={error}>{error}</span>
          )}
    </div>
  )
}

export default Field