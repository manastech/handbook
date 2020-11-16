import {useEffect, useState} from 'react'
import styles from '../styles/LangSelector.module.css'

function Nav({currentLang, languages, handleLang}) {

    const [menu, showMenu] = useState(false);

    const handleClick = (e) => {
        handleLang(e.target.getAttribute('data-lang'))
        showMenu(false)
    }

    useEffect(() => {
        const handleToggle = (e) => {
            showMenu(false)
        }
        window.addEventListener('click', handleToggle)
        return () => {
          window.removeEventListener('click', handleToggle)
        }
    }, [currentLang])

    return (
        <nav className={`${styles.langSelector} ${menu? styles.opened : ''}`}>
            <div className={styles.selected} onClick={e => {e.stopPropagation();showMenu(!menu)}}>
                <span>{currentLang}</span>
            </div>
            <div className={styles.menu}>
               {
                   languages.map((language, i) => <div key={i} data-lang={language} className={`${styles.option} ${language === currentLang? styles.current : ''}`} onClick={handleClick}>{language}</div>)
               }
           </div>
        </nav>
    )
}

export default Nav