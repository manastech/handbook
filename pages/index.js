import fs from 'fs'
import { default as router} from 'path'
import Head from 'next/head'
import Handbook from '../components/Handbook'
import matter from 'gray-matter'

function Index({languages}) {
  return (
    <>
      <Head>
        <title>Manas handbook</title>
        <link rel="icon" href="/favicon.png" type="image/x-icon"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
      </Head>
      <Handbook languages={languages}></Handbook>
    </>
  )
}

export async function getStaticProps() {
  const languages = {
    en: getContents(router.join(process.cwd(), 'content/en')),
    es: getContents(router.join(process.cwd(), 'content/es')),
  }
  return {
    props: {
      languages
    }
  }
}

function getContents(base, directory = '', level = 0, contents = []) {
  const entries = fs.readdirSync(router.join(base, directory), {withFileTypes: true})
  entries.forEach((entry, i) => {
    const path = `${directory.length? `${directory}/` : ''}${entry.name}`
    if(entry.isDirectory()) {
      contents.push(...getContents(base, path, level + 1))
    } else if (RegExp('^.*\.md$').test(entry.name)) {
      const file = matter(fs.readFileSync(router.join(base, path), 'utf8'))
      contents.push({
        level: level? level + (i? 1 : 0) : 1,
        path,
        data: file.data,
        content: file.content
      })
    }
  })
  return contents
}

export default Index
