import h from 'snabbdom/h'
import { test, AssertContext } from 'ava'
import { VNode } from 'snabbdom/vnode'
import subject from '.'

const io = (t: AssertContext, input: VNode[], expected: VNode) => {
  const actual = subject(input)
  t.deepEqual(actual, expected)
}

test(
  'empty',
  io,
  [] as VNode[],
  h('ul', [])
)

test(
  'single heading',
  io,
  [
    h('h1#1a', '1a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a')
    ])
  ])
)

test(
  'single heading with paragraphs',
  io,
  [
    h('p', '0'),
    h('h1#1a', '1a'),
    h('p', '0-1a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a')
    ])
  ])
)

test(
  'two headings',
  io,
  [
    h('h2#2a', '2a'),
    h('h2#2b', '2b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#2a' } }, '2a')
    ]),
    h('li', [
      h('a', { attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'two headings with paragraphs',
  io,
  [
    h('h2#2a', '2a'),
    h('p', '0-2a'),
    h('h2#2b', '2b'),
    h('p', '0-2b'),
    h('p', '1-2b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#2a' } }, '2a')
    ]),
    h('li', [
      h('a', { attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'nested heading',
  io,
  [
    h('h1#1a', '1a'),
    h('h2#1a-2a', '1a-2a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a')
        ])
      ])
    ])
  ])
)

test(
  'nested heading with paragraphs',
  io,
  [
    h('h1#1a', '1a'),
    h('p', '0-1a'),
    h('h2#1a-2a', '1a-2a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a')
        ])
      ])
    ])
  ])
)

test(
  'double nested heading',
  io,
  [
    h('h1#1a', '1a'),
    h('h2#1a-2a', '1a-2a'),
    h('h3#1a-2a-3a', '1a-2a-3a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a')
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
    h('h1#1a', '1a'),
    h('p', '0-1a'),
    h('h2#1a-2a', '1a-2a'),
    h('h3#1a-2a-3a', '1a-2a-3a'),
    h('p', '0-1a-2a-3a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a')
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
    h('h2#2a', '2a'),
    h('h3#2a-3a', '2a-3a'),
    h('h2#2b', '2b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#2a' } }, '2a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#2a-3a' } }, '2a-3a')
        ])
      ])
    ]),
    h('li', [
      h('a', { attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'level decrease with paragraphs',
  io,
  [
    h('h2#2a', '2a'),
    h('p', '0-2a'),
    h('h3#2a-3a', '2a-3a'),
    h('p', '0-2a-3a'),
    h('p', '1-2a-3a'),
    h('h2#2b', '2b'),
    h('p', '0-2b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#2a' } }, '2a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#2a-3a' } }, '2a-3a')
        ])
      ])
    ]),
    h('li', [
      h('a', { attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'content without ids',
  io,
  [
    h('h1', '1a'),
    h('h3#1a-3a', '1a-3a'),
    h('h4', '1a-3a-4a')
  ],
  h('ul', [
    h('li', [
      h('a', '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-3a' } }, '1a-3a'),
          h('ul', [
            h('li', [
              h('a', '1a-3a-4a')
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
    h('h1', '1a'),
    h('p', '0-1a'),
    h('h3#1a-3a', '1a-3a'),
    h('p', '0-1a-3a'),
    h('h4', '1a-3a-4a')
  ],
  h('ul', [
    h('li', [
      h('a', '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-3a' } }, '1a-3a'),
          h('ul', [
            h('li', [
              h('a', '1a-3a-4a')
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
    h('h1#1a', '1a'),
    h('h3#1a-3a', '1a-3a'),
    h('h4#1a-3a-4a', '1a-3a-4a'),
    h('h2#1a-2a', '1a-2a'),
    h('h5#1a-2a-5a', '1a-2a-5a'),
    h('h2#1a-2b', '1a-2b'),
    h('h4#1a-2b-4a', '1a-2b-4a'),
    h('h4#1a-2b-4b', '1a-2b-4b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-3a' } }, '1a-3a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-3a-4a' } }, '1a-3a-4a')
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-5a' } }, '1a-2a-5a')
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2b' } }, '1a-2b'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2b-4a' } }, '1a-2b-4a')
            ]),
            h('li', [
              h('a', { attrs: { href: '#1a-2b-4b' } }, '1a-2b-4b')
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
    h('h1#1a', '1a'),
    h('p', '0-1a'),
    h('h3#1a-3a', '1a-3a'),
    h('p', '0-1a-3a'),
    h('h4#1a-3a-4a', '1a-3a-4a'),
    h('p', '0-1a-3a-4a'),
    h('h2#1a-2a', '1a-2a'),
    h('p', '0-1a-2a'),
    h('h5#1a-2a-5a', '1a-2a-5a'),
    h('p', '0-1a-2a-5a'),
    h('p', '1-1a-2a-5a'),
    h('h2#1a-2b', '1a-2b'),
    h('p', '0-1a-2b'),
    h('h4#1a-2b-4a', '1a-2b-4a'),
    h('p', '0-1a-2b-4a'),
    h('h4#1a-2b-4b', '1a-2b-4b'),
    h('p', '0-1a-2b-6a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-3a' } }, '1a-3a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-3a-4a' } }, '1a-3a-4a')
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-5a' } }, '1a-2a-5a')
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2b' } }, '1a-2b'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2b-4a' } }, '1a-2b-4a')
            ]),
            h('li', [
              h('a', { attrs: { href: '#1a-2b-4b' } }, '1a-2b-4b')
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
    h('h1#1a', '1a'),
    h('h2#1a-2a', '1a-2a'),
    h('h3#1a-2a-3a', '1a-2a-3a'),
    h('h4#1a-2a-3a-4a', '1a-2a-3a-4a'),
    h('h2#1a-2b', '1a-2b'),
    h('h2#1a-2c', '1a-2c'),
    h('h2#1a-2d', '1a-2d'),
    h('h3#1a-2d-3a', '1a-2d-3a'),
    h('h6#1a-2d-3a-6a', '1a-2d-3a-6a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a'),
              h('ul', [
                h('li', [
                  h('a', { attrs: { href: '#1a-2a-3a-4a' } }, '1a-2a-3a-4a')
                ])
              ])
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2b' } }, '1a-2b')
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2c' } }, '1a-2c')
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2d' } }, '1a-2d'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2d-3a' } }, '1a-2d-3a'),
              h('ul', [
                h('li', [
                  h('a', { attrs: { href: '#1a-2d-3a-6a' } }, '1a-2d-3a-6a')
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
  'reads `id` attribute from data object',
  io,
  [
    h('h2', { attrs: { id: '2a' } }, '2a'),
    h('h2', { attrs: { id: '2b' } }, '2b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#2a' } }, '2a')
    ]),
    h('li', [
      h('a', { attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'prefers `id` attribute from data object',
  io,
  [
    h('h2#foo', { attrs: { id: '2a' } }, '2a'),
    h('h2#bar', { attrs: { id: '2b' } }, '2b')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#2a' } }, '2a')
    ]),
    h('li', [
      h('a', { attrs: { href: '#2b' } }, '2b')
    ])
  ])
)

test(
  'big and complex',
  io,
  [
    h('h1#1a', '1a'),
    h('p', '0-1a'),
    h('p', '1-1a'),
    h('p', '2-1a'),
    h('h2#1a-2a', '1a-2a'),
    h('h3#1a-2a-3a', '1a-2a-3a'),
    h('p', '0-1a-2a-3a'),
    h('h4#1a-2a-3a-4a', '1a-2a-3a-4a'),
    h('h2#1a-2b', '1a-2b'),
    h('h2#1a-2c', '1a-2c'),
    h('h2#1a-2d', '1a-2d'),
    h('p', '0-1a-2d'),
    h('h3#1a-2d-3a', '1a-2d-3a'),
    h('h6#1a-2d-3a-6a', '1a-2d-3a-6a')
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a'),
              h('ul', [
                h('li', [
                  h('a', { attrs: { href: '#1a-2a-3a-4a' } }, '1a-2a-3a-4a')
                ])
              ])
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2b' } }, '1a-2b')
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2c' } }, '1a-2c')
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2d' } }, '1a-2d'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2d-3a' } }, '1a-2d-3a'),
              h('ul', [
                h('li', [
                  h('a', { attrs: { href: '#1a-2d-3a-6a' } }, '1a-2d-3a-6a')
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
  'nested input',
  io,
  [
    h('div', [
      h('h1#1a', '1a'),
      h('p', '0-1a'),
      h('p', '1-1a'),
      h('p', '2-1a'),
      h('div', [
        h('h2#1a-2a', '1a-2a')
      ])
    ]),
    h('div', [
      h('h3#1a-2a-3a', '1a-2a-3a'),
      h('p', '0-1a-2a-3a'),
      h('h4#1a-2a-3a-4a', '1a-2a-3a-4a'),
      h('h2#1a-2b', '1a-2b')
    ]),
    h('h2#1a-2c', '1a-2c'),
    h('h2#1a-2d', '1a-2d'),
    h('div', [
      h('div', [

        h('p', '0-1a-2d')
      ]),
      h('h3#1a-2d-3a', '1a-2d-3a'),
      h('h6#1a-2d-3a-6a', '1a-2d-3a-6a')
    ])
  ],
  h('ul', [
    h('li', [
      h('a', { attrs: { href: '#1a' } }, '1a'),
      h('ul', [
        h('li', [
          h('a', { attrs: { href: '#1a-2a' } }, '1a-2a'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2a-3a' } }, '1a-2a-3a'),
              h('ul', [
                h('li', [
                  h('a', { attrs: { href: '#1a-2a-3a-4a' } }, '1a-2a-3a-4a')
                ])
              ])
            ])
          ])
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2b' } }, '1a-2b')
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2c' } }, '1a-2c')
        ]),
        h('li', [
          h('a', { attrs: { href: '#1a-2d' } }, '1a-2d'),
          h('ul', [
            h('li', [
              h('a', { attrs: { href: '#1a-2d-3a' } }, '1a-2d-3a'),
              h('ul', [
                h('li', [
                  h('a', { attrs: { href: '#1a-2d-3a-6a' } }, '1a-2d-3a-6a')
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
)
