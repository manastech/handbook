import ReactMarkdown from 'react-markdown'
import footnotes from 'remark-footnotes'
import Nav from './Nav'
import Illustration from './Illustration'
import Link from './Link'
import styles from '../styles/Handbook.module.css'


function Handbook({ contents }) {

    function handleClick(section) {
        console.log(section.ref)
        console.log(section.ref.offsetTop)
        section.ref.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
        // window.scrollTo({
        //     behavior: 'smooth',
        //     top: section.ref.offsetTop,
        // })
    }

    // function handleScroll(e) {
    //     let current = document.querySelector('.current')
    //     if(current) {
    //         current.classList.remove('current')
    //     }
    //     current = sections.find(section => {
    //         return section.offsetTop <= window.scrollY && window.scrollY < section.offsetTop + section.clientHeight
    //     })
    //     if(current) {
    //         document.querySelector(`#reference-${current.id}`).classList.add('current')
    //     }
    // }
    /*
    
    
    
cover
legal    
nav
internal links
footnotes
preface
readme


import React, { useRef, useEffect, useState } from "react";
import "./App.css";

const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = ele => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

function App() {
  const [visibleSection, setVisibleSection] = useState();

  const headerRef = useRef(null);
  const leadershipRef = useRef(null);
  const providerRef = useRef(null);
  const operationsRef = useRef(null);

  const sectionRefs = [
    { section: "Leadership", ref: leadershipRef },
    { section: "Providers", ref: providerRef },
    { section: "Operations", ref: operationsRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);
  return (
    <div className="App">
      <div className="top-spacer" />

      <div className="content">
        <div className="sticky">
          <div className="header" ref={headerRef}>
            <button
              type="button"
              className={`header_link ${visibleSection === "Leadership" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(leadershipRef.current);
              }}
            >
              Leadership
            </button>
            <button
              type="button"
              className={`header_link ${visibleSection === "Providers" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(providerRef.current);
              }}
            >
              Providers
            </button>
            <button
              type="button"
              className={`header_link ${visibleSection === "Operations" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(operationsRef.current);
              }}
            >
              Operations
            </button>
          </div>
        </div>
        <div className="section" id="Leadership" ref={leadershipRef} />
        <div className="section" id="Providers" ref={providerRef} />
        <div className="section" id="Operations" ref={operationsRef} />
      </div>

      <div className="bottom-spacer" />
    </div>
  );
}

export default App;*/

    const renderers = {
        image: Illustration,
        link: Link
    }

    // console.log(contents)
    return (
        <div className={styles.handbook}>
            <Nav contents={contents} handleClick={handleClick}></Nav>
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
                <section key={i} id={i} ref={ref => section.ref = ref}>
                    <ReactMarkdown escapeHtml={false} renderers={renderers} source={section.content} />
                </section>
            ))}
        </div>
    )
}

export default Handbook