import { ComponentProps, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { getChildByType, overridePropsDeep } from 'react-nanny'

import { Box } from '@/components/layout/box'
import { Stack } from 'components/layout/stack'
import { Text } from 'components/typography/text'

import { Label } from '../label'
import { NumericInput } from '../numeric-input'
import { PasswordInput } from '../password-input'
import { PatternInput } from '../pattern-input'
import { Select } from '../select'
import { TextInput } from '../text-input'

type Props = { name: string; children: ReactNode }

export const FormControl = ({ name, children }: Props) => {
	const {
		control,
		formState: { errors }
	} = useFormContext()
	const label = getChildByType(children, [FormControl.Label])
	const message = getChildByType(children, [FormControl.Message])
	const input = getChildByType(children, [TextInput, Select, NumericInput, PatternInput, PasswordInput])

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const errorMessage = errors[field.name]?.message?.toString()
				const overriddenInput = overridePropsDeep(input, () => ({
					hasError: errors[field.name] !== undefined,
					value: field.value,
					id: name,
					name: field.name,
					onChange: field.onChange,
					onBlur: field.onBlur
				}))

				return (
					<div>
						<Stack gap={1}>
							{overridePropsDeep(label, props => ({ props, htmlFor: name }))}
							{overriddenInput}
						</Stack>
						{overridePropsDeep(message, () => ({ children: errorMessage }))}
					</div>
				)
			}}
		/>
	)
}

FormControl.Label = ({ children, htmlFor }: ComponentProps<typeof Label>) => <Label htmlFor={htmlFor}>{children}</Label>

FormControl.Message = ({ children }: { children?: string }) => {
	if (children) {
		return (
			<Box position="absolute" paddingTop={1}>
				<Text color="destructive.500" fontSize="small">
					{children}
				</Text>
			</Box>
		)
	}

	return null
}
