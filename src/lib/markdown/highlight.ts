import hljs from 'highlight.js/lib/core'

import css from 'highlight.js/lib/languages/css'
import diff from 'highlight.js/lib/languages/diff'
import go from 'highlight.js/lib/languages/go'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import pgsql from 'highlight.js/lib/languages/pgsql'
import plaintext from 'highlight.js/lib/languages/plaintext'
import typescript from 'highlight.js/lib/languages/typescript'
import yaml from 'highlight.js/lib/languages/yaml'

hljs.registerLanguage('css', css)
hljs.registerLanguage('diff', diff)
hljs.registerLanguage('go', go)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('pgsql', pgsql)
hljs.registerAliases('sql', { languageName: 'pgsql' })
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('ts', typescript)
hljs.registerAliases(['javascript', 'js', 'jsx'], { languageName: 'ts' })
hljs.registerLanguage('yaml', yaml)

hljs.registerLanguage('tree', hljs => {
	return {
		contains: [
			{
				className: 'separator',
				begin: /[/\\]/
			},
			{
				className: 'tree',
				begin: /[│├└─]/,
				end: /[^│├└─]/,
				excludeEnd: true
			},
			{
				className: 'ellipsis',
				begin: /\.{3}/
			},
			{
				className: 'path-var',
				begin: '<',
				end: '>',
				illegal: '\n'
			},
			hljs.COMMENT('#', '$', { illegal: '\n' })
		],
		aliases: ['path']
	}
})

export default function (code: string, language: string) {
	if (!hljs.getLanguage(language)) {
		console.warn(`Highlight.js: Unrecognized language "${language}".`)
		language = 'plaintext'
	}

	const result = hljs.highlight(code, { language })
	return result.illegal ? code : result.value
}
