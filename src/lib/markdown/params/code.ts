import { PARAM_VALUES_SEPARATOR, type Params, type ProcessorConfig } from './parser'

export const codeParamsProcessors = {
	title: s => s,
	lines: linesProcessor,
	continue: _ => true,
	highlight: highlightProcessor,
	height: s => s
} satisfies ProcessorConfig

export type CodeParams = Params<typeof codeParamsProcessors>

function linesProcessor(rawValue?: string): number {
	if (!rawValue) return 1
	const value = parseInt(rawValue)
	return Number.isNaN(value) ? 1 : value
}

type IsInRange = (line: number) => boolean

function highlightProcessor(rawValue?: string): IsInRange | undefined {
	if (!rawValue) return

	const ranges: IsInRange[] = []

	rawValue
		.split(PARAM_VALUES_SEPARATOR)
		.map(s => s.trim())
		.forEach(range => {
			const [min, max] = range
				.split('-')
				.map(s => parseInt(s.trim()))
				.sort((a, b) => a - b)

			if (min === undefined || Number.isNaN(min)) return
			if (max === undefined || Number.isNaN(max)) {
				ranges.push(n => n === min)
			} else {
				ranges.push(n => min <= n && n <= max)
			}
		})

	return line => ranges.some(range => range(line))
}
