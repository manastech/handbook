import styles from '../styles/FootnoteDefinition.module.css'

function FootnoteDefinition({identifier, label, children}) {
    return <p key={identifier} id={`fn:${identifier}`} className={styles.footnoteDefinition}><span>{`${label}.`}</span><a href={`#fnref:${identifier}`} role='doc-backlink'>{children}</a></p>
}

export default FootnoteDefinition