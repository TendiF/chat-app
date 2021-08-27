import { Children } from "react"
import styles from "./Input.module.css"
const Input = ({placeholder, style, children, onInput}) => {
  return <div className={styles.inputContainer} style={style}>
    <input onInput={onInput} className={styles.input} type="text" placeholder={placeholder}/>
    {children}
  </div>
}

export default Input