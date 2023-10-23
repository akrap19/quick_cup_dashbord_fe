import { useState } from 'react'

import { CheckboxGroup } from './CheckboxGroup'
// import { FormControl } from '../form-control'

export default {
	title: 'UI/Inputs/CheckboxGroup',
	component: CheckboxGroup
}

export const Default = () => {
	const [values, setValues] = useState<Array<string>>([])

	const options = [
		{ label: 'Option A', value: 'A' },
		{ label: 'Option B', value: 'B' },
		{ label: 'Option C', value: 'C' },
		{ label: 'Option D', value: 'D' }
	]

	return <CheckboxGroup name="checkbox" value={values} onChange={values => setValues(values)} options={options} />
}

export const WithFormControl = () => {
	// const [values, setValues] = useState<Array<string>>([])
	//
	// const options = [
	// 	{ label: 'Karlo', value: 'A' },
	// 	{ label: 'Marino', value: 'B' },
	// 	{ label: 'Bruno', value: 'C' },
	// 	{ label: 'Martina', value: 'D' },
	// 	{ label: 'Akrap', value: 'E' }
	// ]

	return <div />
	// return (
	// 	<FormControl>
	// 		<FormControl.Label>Who is the best developer in Cinnamon?</FormControl.Label>
	// 		<CheckboxGroup name="checkbox" value={values} onChange={values => setValues(values)} options={options} />
	// 		{!values.includes('A') && <FormControl.Error>Wrong choice, Karlo is not selected, Try again!</FormControl.Error>}
	// 	</FormControl>
	// )
}
