import {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import footnote from 'remark-footnotes'
import Nav from './Nav'
import Illustration from './Illustration'
import Link from './Link'
import Paragraph from './Paragraph'
import LangSelector from './LangSelector'
import FootnoteReference from './FootnoteReference'
import FootnoteDefinition from './FootnoteDefinition'
import styles from '../styles/Handbook.module.css'


function Handbook({languages}) {

    const [currentSection, setCurrentSection] = useState()
    const [currentLang, setCurrentLang] = useState('en')

    const handleLang = (lang) => {
        setCurrentLang(lang)
    }

    useEffect(() => {
        const handleScroll = () => {
          const selectedSection = contents.find(({ref}) => ref.offsetTop - 10 <= window.scrollY && window.scrollY < -10 + ref.offsetTop + ref.clientHeight)
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
      }, [currentSection, currentLang])

    const renderers = {
        image: Illustration,
        link: Link,
        paragraph: Paragraph,
        footnoteReference: FootnoteReference,
        footnoteDefinition: FootnoteDefinition
    }

    const contents = languages[currentLang]
    return (
        <div className={styles.handbook}>
            <Nav currentSection={currentSection} contents={contents}></Nav>
            <LangSelector currentLang={currentLang} languages={Object.keys(languages)} handleLang={handleLang}></LangSelector>
            {contents.map((section, i) => (
                <section key={i} id={section.path} ref={ref => section.ref = ref}>
                    <ReactMarkdown escapeHtml={false} renderers={renderers} plugins={[footnote]} source={section.content} />
                </section>
            ))}
        </div>
    )
}

export default Handbook