import React, {useEffect} from 'react';
import styles from '../styles/Nav.module.css'

function Nav({ currentSection, contents, scrollTo }) {

    let container

    useEffect(() => {
        if(currentSection && currentSection.nav) {
            if(currentSection.nav.offsetTop < container.scrollTop) {
                container.scrollTo({
                    behavior: 'smooth',
                    top: currentSection.nav.offsetTop
                })
            } else if(container.scrollTop + container.clientHeight < currentSection.nav.offsetTop + currentSection.nav.clientHeight ) {
                container.scrollTo({
                    behavior: 'smooth',
                    top: currentSection.nav.offsetTop + currentSection.nav.clientHeight - container.clientHeight
                })
            }
        }
    }, [currentSection]);

    return (
        <nav ref={ref => container = ref} className={styles.nav}>
            {
                contents.map((entry, i) => 
                    <div key={i} ref={ref => entry.nav = ref} className={entry === currentSection? styles.currentSection : null}>
                        <a style={{paddingLeft: `${18 * entry.level}px`}} onClick={e => scrollTo(entry)}>{entry.data.title}</a>
                    </div>
                )
            }
        </nav>
    )
}

export default Nav