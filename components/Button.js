import styles from "./Button.module.css"
const Input = ({ style, children }) => {
    return <button className={styles.button} style={style}>
        {children}
    </button>
}

export default Input