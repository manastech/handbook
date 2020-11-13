import styles from '../styles/Link.module.css'

function Link({href, children}) {

    return (

        <a className={styles.link} href={href} target={RegExp('^https?://').test(href)? '_blank' : ''}>{children}</a>
    )
}

export default Link