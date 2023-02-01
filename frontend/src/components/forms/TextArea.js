import styles from './TextArea.module.css'


function TextArea({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  maxLength,
  value,

}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <textarea
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        maxLength={maxLength}
        value={value}
    
       
      />
    </div>
  )
}

export default TextArea