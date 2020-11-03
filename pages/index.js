import fs from 'fs'
import path from 'path'
import Handbook from '../components/Handbook'
import matter from 'gray-matter'

function Index({ contents }) {
  return <Handbook contents={contents}></Handbook>
}

export async function getStaticProps() {
  return {
    props: {
      contents: getContents(path.join(process.cwd(), 'content/en'))
    }
  }
}

function getContents(directory, level = 0, contents = []) {
  const entries = fs.readdirSync(directory, {withFileTypes: true})
  entries.forEach((entry, i) => {
      const path = `${directory}/${entry.name}`
      if(entry.isDirectory()) {
        contents.push(...getContents(path, level + 1))
      } else if (RegExp('^.*\.md$').test(entry.name)) {
        const file = matter(fs.readFileSync(path, 'utf8'))
        contents.push({
          level: level? level + (i? 1 : 0) : 1,
          data: file.data,
          content: file.content
        })
      }
  })
  return contents
}

export default Index
