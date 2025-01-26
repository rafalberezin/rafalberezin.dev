const PARAM_SEPARATOR = /(?<!\\)\|/
const PARAM_ASSIGNMENT_SEPARATOR = /(?<!\\)=/
export const PARAM_VALUES_SEPARATOR = /(?<!\\),/

export type ParamProcessor = (rawValue?: string) => unknown | undefined
export type ProcessorConfig = Record<string, ParamProcessor>
// Excluding `undefined` has no functional impact because Partial adds it back.
// However, since the return type of `parseParams` does not unwrap `Partial`,
// excluding `undefined` from the inner type improves visual clarity in type hints.
export type Params<T extends ProcessorConfig> = Partial<{
	[K in keyof T]: Exclude<ReturnType<T[K]>, undefined>
}>

export function parseParams<T extends ProcessorConfig>(
	meta: string | null | undefined,
	processors: T
): Params<T> {
	if (!meta) return {}

	const params: Params<T> = {}

	meta.split(PARAM_SEPARATOR).forEach(paramDefinition => {
		const [param, rawValue] = paramDefinition
			.trim()
			.split(PARAM_ASSIGNMENT_SEPARATOR)
			.map(s => s.trim())

		if (param in processors) {
			const value = processors[param](rawValue)
			if (value !== undefined) (params as Record<string, unknown>)[param] = value
		}
	})

	return params
}
