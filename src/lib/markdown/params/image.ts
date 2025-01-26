import type { Params, ProcessorConfig } from './parser'

export const imageParamsProcessors = {
	center: _ => true,
	width: s => s
} satisfies ProcessorConfig

export type ImageParams = Params<typeof imageParamsProcessors>
