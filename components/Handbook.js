import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import footnotes from 'remark-footnotes'
import Nav from './Nav'
import Illustration from './Illustration'
import Link from './Link'
import Paragraph from './Paragraph'
import styles from '../styles/Handbook.module.css'


function Handbook({ contents }) {

    const [current, setCurrent] = useState()

    function scrollTo(section) {
        section.ref.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    useEffect(() => {
        const handleScroll = () => {
          const selected = contents.find(({ref}) => ref.offsetTop <= window.scrollY && window.scrollY < ref.offsetTop + ref.clientHeight)
          if (selected !== current) {
            setCurrent(selected);
          } else if (!selected && current) {
            setCurrent(undefined);
          }
        };
    
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [current]);
// lang selector
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

    // console.log(contents)
    return (
        <div className={styles.handbook}>
            <Nav current={current} contents={contents} scrollTo={scrollTo}></Nav>
            {/* <section id='handbook'>
                <div class='logo'></div>
                <div class='picture' style='background-image:url(images/ceci-nest-pas-une-societe-de-logiciels.svg);'></div>
            </section>
        <section id='legal'>
            <div class='legal'>
                <img class='main' src='images/creative-commons.svg'>
                <span><b>Attribution-NonCommercial-ShareAlike<br>CC BY-NC-SA</b></span>
                <img src='images/attribution.svg'>
                <span><b>Attribution</b> &#8212 You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).</span>
                <img src='images/non-commercial.svg'>
                <span><b>Noncommercial</b> &#8212 You may not use this work for commercial purposes.</span>
                <img src='images/share-alike.svg'>
                <span><b>Share Alike</b> &#8212 If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
            </div>
        </section>
        <section id='introduction'>
            <h1>Introduction</h1>
            <p>This text serves two simultaneous purposes that mutually feedback each other: it is a user manual which explains how some processes work inside Manas and it's also an instruction manual, as it describes certain goals we want to achieve. True to our principles, the text is in a repository where you can comment on it and send your change proposals. This text will always be a beta version. If you agree with a chapter of the manual, but you don't think it is being implemented correctly in reality, let your voice be heard loud and clear and help us correct what we can. If you disagree with parts of the manual, please suggest the change you'd like to see and help us implement it.</p>
        </section> */}
            {contents.map((section, i) => (
                <section key={i} ref={ref => section.ref = ref}>
                    <ReactMarkdown escapeHtml={false} renderers={renderers} source={section.content} />
                </section>
            ))}
        </div>
    )
}

export default Handbook