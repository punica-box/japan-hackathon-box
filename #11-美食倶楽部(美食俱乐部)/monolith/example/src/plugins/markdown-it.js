import { mavonEditor } from 'mavon-editor'
import hljs from 'highlight.js/lib/highlight'

const langs = [
  'javascript',
  'ruby',
  'python',
]
for (const lang of langs) {
  hljs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`))
}

const markdownIt = mavonEditor.getMarkdownIt()

markdownIt.options.highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (__) {}
  }
}

export default markdownIt
