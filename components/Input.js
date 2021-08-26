import styles from "./Input.module.css"
const Input = ({placeholder, style}) => {
  return <div className={styles.inputContainer} style={style}>
    <input className={styles.input} type="text" placeholder={placeholder}/>
  </div>
}

export default Input