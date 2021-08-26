import styles from "./Button.module.css"
const Input = ({ style, children, onClick }) => {
    return <button onClick={onClick} className={styles.button} style={style}>
        {children}
    </button>
}

export default Input