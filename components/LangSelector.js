import React, { useEffect, useState } from 'react'
import styles from '../styles/LangSelector.module.css'

function Nav({currentLang, languages, handleLang}) {

    let root

    const handleClick = (e) => {
        handleLang(e.target.getAttribute('data-lang'))
    }

    useEffect(() => {
        const handleToggle = (e) => {
            if(root) {
                console.log('toggle')
                if(root.classList.contains(styles.opened)) {
                    root.classList.remove(styles.opened)
                } else if(root.contains(e.target) || root === e.targe) {
                    root.classList.add(styles.opened)
                }
            }
        }
    
        window.addEventListener('click', handleToggle)
        return () => {
          window.removeEventListener('click', handleToggle)
        }
    })

    return (
        <nav ref={ref => root = ref} className={styles.langSelector}>
            <div className={styles.selected}>
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