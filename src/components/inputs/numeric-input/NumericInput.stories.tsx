import { Stack } from 'components/layout/stack'

import { NumericInput } from './NumericInput'
// import { FormControl } from '../form-control'

export default {
	title: 'UI/Inputs/NumericInput',
	component: NumericInput
}

export const Default = () => {
	return (
		<Stack gap={4}>
			<NumericInput value="" />
			{/* <FormControl> */}
			{/*	<FormControl.Label>With label and error message</FormControl.Label> */}
			{/*	<NumericInput value="" placeholder="With error message" hasError /> */}
			{/*	<FormControl.Error>Error message to display</FormControl.Error> */}
			{/* </FormControl> */}
		</Stack>
	)
}
