import styles from '../styles/Nav.module.css'

function Nav({ contents, handleClick }) {
    return (
        <nav className={styles.nav}>
            {
                contents.map((entry, i) => 
                    <div key={i}>
                        <a style={{paddingLeft: `${18 * entry.level}px`}} id={`ref-${i}`} href='#' onClick={e => handleClick(entry)}>{entry.data.title}</a>
                    </div>
                )
            }
        </nav>
    )
}

export default Nav