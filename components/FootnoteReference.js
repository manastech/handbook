import styles from '../styles/FootnoteReference.module.css'

function FootnoteReference({identifier, label}) {
    return <sup id={`fnref:${identifier}`} role='doc-noteref'><a href={`#fn:${identifier}`} className={styles.footnoteReference}>{label}</a></sup>
}

export default FootnoteReference