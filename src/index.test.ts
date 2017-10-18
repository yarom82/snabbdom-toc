import { test, AssertContext } from 'ava'
import { VNode } from 'snabbdom/vnode'
import { ul, li, a, h1, h2, h3, h4, h5, h6, p } from '@cycle/dom'
import subject from '.'

const io = (t: AssertContext, input: VNode[], expected: VNode) => {
  const actual = subject(input)
  t.deepEqual(actual, expected)
}

test(
  'empty',
  io,
  [] as VNode[],
  ul([])
)

test(
  'single heading',
  io,
  [
    h1('#1a', '1a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a')
    ])
  ])
)

test(
  'single heading with paragraphs',
  io,
  [
    p('0'),
    h1('#1a', '1a'),
    p('0-1a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a')
    ])
  ])
)

test(
  'two headings',
  io,
  [
    h2('#2a', '2a'),
    h2('#2b', '2b')
  ],
  ul([
    li([
      a({ attrs: { href: '#2a' } }, '2a')
    ]),
    li([
      a({ attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'two headings with paragraphs',
  io,
  [
    h2('#2a', '2a'),
    p('0-2a'),
    h2('#2b', '2b'),
    p('0-2b'),
    p('1-2b')
  ],
  ul([
    li([
      a({ attrs: { href: '#2a' } }, '2a')
    ]),
    li([
      a({ attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'nested heading',
  io,
  [
    h1('#1a', '1a'),
    h2('#1a-2a', '1a-2a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a')
        ])
      ])
    ])
  ])
)

test(
  'nested heading with paragraphs',
  io,
  [
    h1('#1a', '1a'),
    p('0-1a'),
    h2('#1a-2a', '1a-2a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a')
        ])
      ])
    ])
  ])
)

test(
  'double nested heading',
  io,
  [
    h1('#1a', '1a'),
    h2('#1a-2a', '1a-2a'),
    h3('#1a-2a-3a', '1a-2a-3a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a'),
          ul([
            li([
              a({ attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a')
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'double nested heading with paragraphs',
  io,
  [
    h1('#1a', '1a'),
    p('0-1a'),
    h2('#1a-2a', '1a-2a'),
    h3('#1a-2a-3a', '1a-2a-3a'),
    p('0-1a-2a-3a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a'),
          ul([
            li([
              a({ attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a')
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'level decrease',
  io,
  [
    h2('#2a', '2a'),
    h3('#2a-3a', '2a-3a'),
    h2('#2b', '2b')
  ],
  ul([
    li([
      a({ attrs: { href: '#2a' } }, '2a'),
      ul([
        li([
          a({ attrs: { href: '#2a-3a' } }, '2a-3a')
        ])
      ])
    ]),
    li([
      a({ attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'level decrease with paragraphs',
  io,
  [
    h2('#2a', '2a'),
    p('0-2a'),
    h3('#2a-3a', '2a-3a'),
    p('0-2a-3a'),
    p('1-2a-3a'),
    h2('#2b', '2b'),
    p('0-2b')
  ],
  ul([
    li([
      a({ attrs: { href: '#2a' } }, '2a'),
      ul([
        li([
          a({ attrs: { href: '#2a-3a' } }, '2a-3a')
        ])
      ])
    ]),
    li([
      a({ attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'content without ids',
  io,
  [
    h1('1a'),
    h3('#1a-3a', '1a-3a'),
    h4('1a-3a-4a')
  ],
  ul([
    li([
      a('1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-3a' } }, '1a-3a'),
          ul([
            li([
              a('1a-3a-4a')
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'content without ids',
  io,
  [
    h1('1a'),
    p('0-1a'),
    h3('#1a-3a', '1a-3a'),
    p('0-1a-3a'),
    h4('1a-3a-4a')
  ],
  ul([
    li([
      a('1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-3a' } }, '1a-3a'),
          ul([
            li([
              a('1a-3a-4a')
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'skipping heading levels',
  io,
  [
    h1('#1a', '1a'),
    h3('#1a-3a', '1a-3a'),
    h4('#1a-3a-4a', '1a-3a-4a'),
    h2('#1a-2a', '1a-2a'),
    h5('#1a-2a-5a', '1a-2a-5a'),
    h2('#1a-2b', '1a-2b'),
    h4('#1a-2b-4a', '1a-2b-4a'),
    h4('#1a-2b-4b', '1a-2b-4b')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-3a' } }, '1a-3a'),
          ul([
            li([
              a({ attrs: { href: '#1a-3a-4a' } }, '1a-3a-4a')
            ])
          ])
        ]),
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a'),
          ul([
            li([
              a({ attrs: { href: '#1a-2a-5a' } }, '1a-2a-5a')
            ])
          ])
        ]),
        li([
          a({ attrs: { href: '#1a-2b' } }, '1a-2b'),
          ul([
            li([
              a({ attrs: { href: '#1a-2b-4a' } }, '1a-2b-4a')
            ]),
            li([
              a({ attrs: { href: '#1a-2b-4b' } }, '1a-2b-4b')
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'skipping heading levels with content',
  io,
  [
    h1('#1a', '1a'),
    p('0-1a'),
    h3('#1a-3a', '1a-3a'),
    p('0-1a-3a'),
    h4('#1a-3a-4a', '1a-3a-4a'),
    p('0-1a-3a-4a'),
    h2('#1a-2a', '1a-2a'),
    p('0-1a-2a'),
    h5('#1a-2a-5a', '1a-2a-5a'),
    p('0-1a-2a-5a'),
    p('1-1a-2a-5a'),
    h2('#1a-2b', '1a-2b'),
    p('0-1a-2b'),
    h4('#1a-2b-4a', '1a-2b-4a'),
    p('0-1a-2b-4a'),
    h4('#1a-2b-4b', '1a-2b-4b'),
    p('0-1a-2b-6a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-3a' } }, '1a-3a'),
          ul([
            li([
              a({ attrs: { href: '#1a-3a-4a' } }, '1a-3a-4a')
            ])
          ])
        ]),
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a'),
          ul([
            li([
              a({ attrs: { href: '#1a-2a-5a' } }, '1a-2a-5a')
            ])
          ])
        ]),
        li([
          a({ attrs: { href: '#1a-2b' } }, '1a-2b'),
          ul([
            li([
              a({ attrs: { href: '#1a-2b-4a' } }, '1a-2b-4a')
            ]),
            li([
              a({ attrs: { href: '#1a-2b-4b' } }, '1a-2b-4b')
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'big and complex',
  io,
  [
    h1('#1a', '1a'),
    h2('#1a-2a', '1a-2a'),
    h3('#1a-2a-3a', '1a-2a-3a'),
    h4('#1a-2a-3a-4a', '1a-2a-3a-4a'),
    h2('#1a-2b', '1a-2b'),
    h2('#1a-2c', '1a-2c'),
    h2('#1a-2d', '1a-2d'),
    h3('#1a-2d-3a', '1a-2d-3a'),
    h6('#1a-2d-3a-6a', '1a-2d-3a-6a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a'),
          ul([
            li([
              a({ attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a'),
              ul([
                li([
                  a({ attrs: { href: '#1a-2a-3a-4a' } }, '1a-2a-3a-4a')
                ])
              ])
            ])
          ])
        ]),
        li([
          a({ attrs: { href: '#1a-2b' } }, '1a-2b')
        ]),
        li([
          a({ attrs: { href: '#1a-2c' } }, '1a-2c')
        ]),
        li([
          a({ attrs: { href: '#1a-2d' } }, '1a-2d'),
          ul([
            li([
              a({ attrs: { href: '#1a-2d-3a' } }, '1a-2d-3a'),
              ul([
                li([
                  a({ attrs: { href: '#1a-2d-3a-6a' } }, '1a-2d-3a-6a')
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
)

test(
  'big and complex',
  io,
  [
    h1('#1a', '1a'),
    p('0-1a'),
    p('1-1a'),
    p('2-1a'),
    h2('#1a-2a', '1a-2a'),
    h3('#1a-2a-3a', '1a-2a-3a'),
    p('0-1a-2a-3a'),
    h4('#1a-2a-3a-4a', '1a-2a-3a-4a'),
    h2('#1a-2b', '1a-2b'),
    h2('#1a-2c', '1a-2c'),
    h2('#1a-2d', '1a-2d'),
    p('0-1a-2d'),
    h3('#1a-2d-3a', '1a-2d-3a'),
    h6('#1a-2d-3a-6a', '1a-2d-3a-6a')
  ],
  ul([
    li([
      a({ attrs: { href: '#1a' } }, '1a'),
      ul([
        li([
          a({ attrs: { href: '#1a-2a' } }, '1a-2a'),
          ul([
            li([
              a({ attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a'),
              ul([
                li([
                  a({ attrs: { href: '#1a-2a-3a-4a' } }, '1a-2a-3a-4a')
                ])
              ])
            ])
          ])
        ]),
        li([
          a({ attrs: { href: '#1a-2b' } }, '1a-2b')
        ]),
        li([
          a({ attrs: { href: '#1a-2c' } }, '1a-2c')
        ]),
        li([
          a({ attrs: { href: '#1a-2d' } }, '1a-2d'),
          ul([
            li([
              a({ attrs: { href: '#1a-2d-3a' } }, '1a-2d-3a'),
              ul([
                li([
                  a({ attrs: { href: '#1a-2d-3a-6a' } }, '1a-2d-3a-6a')
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
)
