const PARAM_SEPARATOR = ';'
const PARAM_ASSIGNMENT = '='
const VALUES_SEPARATOR = ','

const paramProcessors = {
	title: s => s,
	lines: s => (s === undefined ? 1 : parseInt(s)),
	continue: _ => true,
	highlight: processHighlight,
	height: s => s
} satisfies Record<string, (s?: string) => unknown | undefined>

type CodeParams = Partial<{
	[K in keyof typeof paramProcessors]: ReturnType<(typeof paramProcessors)[K]>
}>

function isSupportedParam(param: string): param is keyof CodeParams {
	return param in paramProcessors
}

export function parseCodeMeta(meta: string | null | undefined): CodeParams {
	if (!meta) return {}

	const params = {} as CodeParams

	meta.split(PARAM_SEPARATOR).forEach(paramDef => {
		const [param, rawValue] = paramDef
			.trim()
			.split(PARAM_ASSIGNMENT)
			.map(s => s.trim())

		if (isSupportedParam(param)) {
			const processed = paramProcessors[param](rawValue)
			if (processed !== undefined) (params[param] as CodeParams[typeof param]) = processed
		}
	})

	return params
}

type IsInRange = (line: number) => boolean

function processHighlight(rawValue?: string): IsInRange | undefined {
	if (!rawValue) return

	const ranges: IsInRange[] = []

	rawValue
		.split(VALUES_SEPARATOR)
		.map(s => s.trim())
		.forEach(range => {
			const [min, max] = range
				.split('-')
				.map(s => parseInt(s.trim()))
				.sort((a, b) => a - b)

			if (min === undefined || Number.isNaN(min)) return
			if (max == undefined || Number.isNaN(max)) {
				ranges.push(n => n === min)
			} else {
				ranges.push(n => min <= n && n <= max)
			}
		})

	return line => ranges.some(range => range(line))
}
