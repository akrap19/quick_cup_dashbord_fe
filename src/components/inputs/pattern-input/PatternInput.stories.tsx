import { Stack } from 'components/layout/stack'

import { PatternInput } from './PatternInput'
// import { FormControl } from '../form-control'

export default {
	title: 'UI/Inputs/PatternInput',
	component: PatternInput
}

export const Default = () => {
	return (
		<Stack gap={4}>
			{/* <FormControl> */}
			{/*	<FormControl.Label>Date</FormControl.Label> */}
			{/*	<PatternInput format="##/##/####" mask="_" allowEmptyFormatting /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>Phone Number</FormControl.Label> */}
			{/*	<PatternInput format="+385 ## ### ####" allowEmptyFormatting /> */}
			{/* </FormControl> */}
			{/* <FormControl> */}
			{/*	<FormControl.Label>OIB</FormControl.Label> */}
			{/*	<PatternInput format="#### ### ####" allowEmptyFormatting /> */}
			{/* </FormControl> */}
		</Stack>
	)
}
