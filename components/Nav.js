import React, {useEffect} from 'react';
import styles from '../styles/Nav.module.css'

function Nav({ current, contents, scrollTo }) {

    let container

    useEffect(() => {
        if(current) {
            if(current.nav.offsetTop < container.scrollTop) {
                container.scrollTo({
                    behavior: 'smooth',
                    top: current.nav.offsetTop
                })
            } else if(container.scrollTop + container.clientHeight < current.nav.offsetTop + current.nav.clientHeight ) {
                container.scrollTo({
                    behavior: 'smooth',
                    top: current.nav.offsetTop + current.nav.clientHeight - container.clientHeight
                })
            }
        }
    });

    return (
        <nav ref={ref => container = ref} className={styles.nav}>
            {
                contents.map((entry, i) => 
                    <div key={i} ref={ref => entry.nav = ref} className={entry === current? styles.current : null}>
                        <a style={{paddingLeft: `${18 * entry.level}px`}} onClick={e => scrollTo(entry)}>{entry.data.title}</a>
                    </div>
                )
            }
        </nav>
    )
}

export default Nav