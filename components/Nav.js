import {useEffect, useState} from 'react';
import styles from '../styles/Nav.module.css'

function Nav({ currentSection, contents }) {

    let container, header
    const [menu, showMenu] = useState(false);

    const handleClick = (e) => {
        showMenu(!menu)
    }

    useEffect(() => {
        if(currentSection && currentSection.nav) {
            if(currentSection.nav.offsetTop < container.scrollTop + header.clientHeight) {
                container.scrollTo({
                    behavior: 'smooth',
                    top: currentSection.nav.offsetTop - header.clientHeight
                })
            } else if(container.scrollTop + window.innerHeight < currentSection.nav.offsetTop + currentSection.nav.clientHeight ) {
                container.scrollTo({
                    behavior: 'smooth',
                    top: currentSection.nav.offsetTop + currentSection.nav.clientHeight - window.innerHeight
                })
            }
        }
    }, [currentSection])

    return (
        <nav ref={ref => container = ref} className={`${styles.nav} ${menu? styles.open : ''}`}>
            <div ref={ref => header = ref} className={styles.header} onClick={handleClick}>
                <div className={styles.icon}></div>
                <span>Manas handbook</span>
            </div>
            {
                contents.map((entry, i) => (
                    <div key={i} ref={ref => entry.nav = ref} className={entry === currentSection? styles.current : null}>
                        <a href={`#${entry.path}`} style={{paddingLeft: `${18 * entry.level}px`}} onClick={handleClick}>{entry.data.title}</a>
                    </div>
                ))
            }
        </nav>
    )
}

export default Nav