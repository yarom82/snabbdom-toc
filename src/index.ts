import h from 'snabbdom/h'
import { VNode } from 'snabbdom/vnode'
import { selectorParser } from 'snabbdom-selector'
import decontextify from 'snabbdom-decontextify'

const snabbdomToc = (content: VNode[]): VNode => {
  const toc = h('ul', [])
  const reg = new RegExp('h([1-6])')
  const headers = content.filter((vnode) => {
    return vnode && vnode.sel && reg.test(vnode.sel)
  })

  const latestLis = {
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null
  } as { [depth: number]: VNode | null }

  for (const header of headers) {
    const { tagName, id } = selectorParser(header)
    const hX = Number(tagName.slice(1, 2))
    const a = decontextify(header)
    a.sel = 'a'
    if (id) {
      a.data = { attrs: { href: '#' + id } }
    }
    const li = h('li', [ a ])

    let parentLi
    let level = hX - 1
    while (!parentLi && level > 0) {
      parentLi = latestLis[level--]
    }

    let ul
    if (!parentLi) {
      ul = toc
    } else {
      const parentLiChildren = (parentLi.children as VNode[])
      ul = parentLiChildren[1]
      if (!ul) {
        ul = h('ul', [])
        parentLiChildren.push(ul)
      }
    }

    (ul.children as VNode[]).push(li)
    latestLis[hX] = li
    for (let i = hX + 1; i <= 6; i++) {
      latestLis[i] = null
    }
  }

  return toc
}

export default snabbdomToc
