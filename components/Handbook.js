import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
// import footnotes from 'remark-footnotes'
import Nav from './Nav'
import Illustration from './Illustration'
import Link from './Link'
import Paragraph from './Paragraph'
import LangSelector from './LangSelector'
import styles from '../styles/Handbook.module.css'


function Handbook({languages}) {

    const [currentSection, setCurrentSection] = useState()
    const [currentLang, setCurrentLang] = useState('en')

    const scrollTo = (section) => {
        section.ref.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const handleLang = (lang) => {
        setCurrentLang(lang)
    }

    useEffect(() => {
        const handleScroll = () => {
          const selectedSection = contents.find(({ref}) => ref.offsetTop <= window.scrollY && window.scrollY < ref.offsetTop + ref.clientHeight)
          if (selectedSection !== currentSection) {
            setCurrentSection(selectedSection)
          } else if (!selectedSection && currentSection) {
            setCurrentSection(undefined)
          }
        }
    
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [currentSection])

// close menu on selection
// update nav current

// internal links
// mobile
// print

// review content
// change file names 
// footnotes

    const renderers = {
        image: Illustration,
        link: Link,
        paragraph: Paragraph
    }

    const contents = languages[currentLang]
    return (
        <div className={styles.handbook}>
            <LangSelector currentLang={currentLang} languages={Object.keys(languages)} handleLang={handleLang}></LangSelector>
            <Nav currentSection={currentSection} contents={contents} scrollTo={scrollTo}></Nav>
            {contents.map((section, i) => (
                <section key={i} ref={ref => section.ref = ref}>
                    <ReactMarkdown escapeHtml={false} renderers={renderers} source={section.content} />
                </section>
            ))}
        </div>
    )
}

export default Handbook