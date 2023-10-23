import { Atoms, atoms } from 'style/atoms.css'

export const filterAtomsFromNativeAttributes = (attributes: Record<string, unknown>) => {
	const atomsProps: Record<string, unknown> = {}
	const elementNativeProps: Record<string, unknown> = {}

	// Filter out non-atoms props
	Object.keys(attributes).forEach(key => {
		if (atoms.properties.has(key as keyof Atoms)) {
			atomsProps[key] = attributes[key as keyof typeof attributes]
		} else {
			elementNativeProps[key] = attributes[key as keyof typeof attributes]
		}
	})

	return { atomsProps, elementNativeProps }
}
