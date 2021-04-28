import styles from '../styles/FootnoteDefinition.module.css'

function FootnoteDefinition({identifier, label, children}) {
    return <div key={identifier} id={`fn:${identifier}`} className={styles.footnoteDefinition}><span>{`${label}.`}</span><a href={`#fnref:${identifier}`} role='doc-backlink'>{children}</a></div>
}

export default FootnoteDefinition