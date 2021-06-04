import styles from '../styles/Illustration.module.css'

function Illustration({src}) {

    return (
        <img className={styles.illustration} src={src}/>
    )
}

export default Illustration
