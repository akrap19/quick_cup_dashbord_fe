import { ChangeEvent, useState } from 'react'

import { RadioGroup } from './RadioGroup'
// import { FormControl } from '../form-control'

export default {
	title: 'UI/Inputs/RadioGroup',
	component: RadioGroup
}

export const Default = () => {
	const [value, setValue] = useState('')

	const options = [
		{ label: 'Option A', value: 'A' },
		{ label: 'Option B', value: 'B' },
		{ label: 'Option C', value: 'C' },
		{ label: 'Option D', value: 'D' }
	]

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return <RadioGroup name="radio" value={value} onChange={handleOnChange} options={options} />
}

export const WithFormControl = () => {
	// const [value, setValue] = useState('A')
	//
	// const options = [
	// 	{ label: 'Karlo', value: 'A' },
	// 	{ label: 'Marino', value: 'B' },
	// 	{ label: 'Bruno', value: 'C' },
	// 	{ label: 'Martina', value: 'D' },
	// 	{ label: 'Akrap', value: 'E' }
	// ]
	//
	// const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setValue(event.target.value)
	// }

	return <div />
	// return (
	// 	<FormControl>
	// 		<FormControl.Label>Who is the best developer in Cinnamon?</FormControl.Label>
	// 		<RadioGroup name="radio" value={value} onChange={handleOnChange} options={options} />
	// 		{value !== 'A' && <FormControl.Error>Wrong choice, Try again!</FormControl.Error>}
	// 	</FormControl>
	// )
}
