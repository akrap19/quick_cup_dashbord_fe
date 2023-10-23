import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Stack } from 'components/layout/stack'

import { FormControl } from './FormControl'
import { Button } from '../button'
import { NumericInput } from '../numeric-input'
import { PatternInput } from '../pattern-input'
import { Select } from '../select'
import { TextInput } from '../text-input'

export default {
	title: 'UI/Inputs/FormControl',
	component: FormControl
}

const formSchema = z.object({
	name: z.string().min(1, { message: 'This field is required' }),
	select: z.string().min(1, { message: 'This field is required' }),
	number: z.coerce.number().min(1, { message: 'This field is required' }),
	date: z.string().min(1, { message: 'This field is required' })
})

type Schema = z.infer<typeof formSchema>

export const Default = () => {
	const form = useForm<Schema>({
		mode: 'onBlur',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', select: '', date: '' }
	})

	const onSubmit = async (data: Schema) => {
		console.log(data)
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Stack gap={4}>
					<FormControl name="name">
						<FormControl.Label>Name</FormControl.Label>
						<TextInput placeholder="Enter your first name." />
						<FormControl.Message />
					</FormControl>
					<FormControl name="select">
						<FormControl.Label>Select</FormControl.Label>
						<Select
							options={[
								{ value: '', label: 'Select option.' },
								{ value: 'A', label: 'A' },
								{ value: 'B', label: 'B' },
								{ value: 'C', label: 'C' }
							]}
						/>
						<FormControl.Message />
					</FormControl>
					<FormControl name="number">
						<FormControl.Label>Name</FormControl.Label>
						<NumericInput placeholder="Enter a number." />
						<FormControl.Message />
					</FormControl>
					<FormControl name="date">
						<FormControl.Label>Name</FormControl.Label>
						<PatternInput format="##/##/####" mask="_" placeholder="Enter a date." />
						<FormControl.Message />
					</FormControl>
					<Button type="submit">Submit</Button>
				</Stack>
			</form>
		</FormProvider>
	)
}
