#!/usr/bin/env zx
$.sync = true

const emojis = require('./assets/emoji.json')

// get from https://www.unicode.org/Public/17.0.0/emoji/emoji-test.txt
const content = $`cat emoji-test.txt`.stdout

let category = ''
const categories = []
const groups = {}
let group = null
let groupUnicodes = []

content.split('\n').forEach((line, lineNo) => {
  if (line.startsWith('# group: ')) {
    category = line.replace('# group: ', '').trim()
    categories.push(category)
    return
  }
  if (line.startsWith('# subgroup: ')) {
    if (group !== null) {
      // last group
      groups[group] = {
        unicodes: groupUnicodes,
        name: group,
        icon: groupUnicodes[0],
      }
    }
    group = line.replace('# subgroup: ', '').trim()
groupUnicodes = []
  }

  if (!(line.startsWith('1F') && line.includes('fully-qualified'))) {
    return
  }
  const unicode = line.slice(0, line.indexOf(' ')).toLowerCase()
  const name = line.slice(
    line.indexOf(' ', line.indexOf(' E', line.lastIndexOf('# ') + 2) + 2) + 1,
  )
groupUnicodes.push(unicode)
  if (!emojis[unicode]) {
    emojis[unicode] = {
      unicode,
      unicode_alternates: '',
      name,
      shortname: '',
      category,
      emoji_order: `${lineNo}`,
      aliases: [],
      aliases_ascii: [],
      keywords: [],
    }
  }
})

fs.writeFileSync('./assets/categories.json', JSON.stringify(categories))
fs.writeFileSync('./assets/groups.json', JSON.stringify(groups))
fs.writeFileSync('./assets/emoji.json', JSON.stringify(emojis))
