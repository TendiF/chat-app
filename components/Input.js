import { Children } from "react"
import styles from "./Input.module.css"
const Input = ({placeholder, style, children}) => {
  return <div className={styles.inputContainer} style={style}>
    <input className={styles.input} type="text" placeholder={placeholder}/>
    {children}
  </div>
}

export default Input