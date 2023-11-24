import { useTranslations } from 'next-intl'
import { ComponentProps, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { getChildByType, overridePropsDeep } from 'react-nanny'

import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { Box } from '@/components/layout/box'
import { Stack } from 'components/layout/stack'
import { Text } from 'components/typography/text'

import { Label } from '../label'
import { NumericInput } from '../numeric-input'
import { PasswordInput } from '../password-input'
import { PatternInput } from '../pattern-input'
import { Select } from '../select'
import { Textarea } from '../text-area'
import { TextInput } from '../text-input'

type Props = { name: string; maxLength?: string; children: ReactNode }

export const FormControl = ({ name, maxLength, children }: Props) => {
	const {
		control,
		formState: { errors },
		watch
	} = useFormContext()
	const label = getChildByType(children, [FormControl.Label])
	const charactersCount = getChildByType(children, [FormControl.CharactersCount])
	const message = getChildByType(children, [FormControl.Message])
	const input = getChildByType(children, [
		TextInput,
		Select,
		Textarea,
		NumericInput,
		PatternInput,
		PasswordInput,
		AudioUpload,
		PhotoUpload
	])

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
					maxLength,
					onChange: field.onChange,
					onBlur: field.onBlur
				}))

				return (
					<Box position="relative">
						<Stack gap={1}>
							{overridePropsDeep(label, props => ({ props, htmlFor: name }))}
							{overriddenInput}
						</Stack>
						{overridePropsDeep(charactersCount, () => ({
							length: watch(name)?.length === undefined ? 0 : watch(name)?.length,
							maxLength
						}))}
						{overridePropsDeep(message, () => ({ children: errorMessage }))}
					</Box>
				)
			}}
		/>
	)
}

FormControl.Label = ({ children, htmlFor }: ComponentProps<typeof Label>) => <Label htmlFor={htmlFor}>{children}</Label>

FormControl.CharactersCount = ({ length, maxLength }: { length?: number; maxLength?: string }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const t = useTranslations()

	if (maxLength) {
		return (
			<Box position="absolute" paddingTop={1} style={{ right: '0' }}>
				<Text fontSize="xsmall" lineHeight="xxlarge" color="neutral.800">
					{`${length?.toString()}/${maxLength}${t('General.characters')}`}
				</Text>
			</Box>
		)
	}

	return null
}

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
