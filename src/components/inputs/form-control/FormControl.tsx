import { useTranslations } from 'next-intl'
import { ComponentProps, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { getChildByType, overridePropsDeep } from 'react-nanny'

import { SearchDropdown } from '@/components/custom/search-dropdown/SearchDropdown'
import { AudioUpload } from '@/components/custom/upload/audio-upload'
import { FileUpload } from '@/components/custom/upload/file-upload'
import { PhotoUpload } from '@/components/custom/upload/photo-upload'
import { CheckIcon } from '@/components/icons/check-icon'
import { ErrorIcon } from '@/components/icons/error-icon'
import { Box } from '@/components/layout/box'
import { removeHtmlTags } from '@/utils/removeHtmlTags'
import { Stack } from 'components/layout/stack'
import { Text } from 'components/typography/text'

import { Checkbox } from '../checkbox'
import { CheckboxGroup } from '../checkbox-group'
import { Label } from '../label'
import { NumericInput } from '../numeric-input'
import { PasswordInput } from '../password-input'
import { PatternInput } from '../pattern-input'
import { RadioGroup } from '../radio-group'
import { RichTextEditor } from '../rich-text-editor'
import { Select } from '../select'
import { Textarea } from '../text-area'
import { TextInput } from '../text-input'
import { FormTable } from '@/components/custom/form-table/FormTable'
import { ProductStateFormTable } from '@/components/custom/product-state-form-table/ProductStateFormTable'

type Props = {
	name: string
	maxLength?: string
	successMessageString?: string
	errorMessageString?: string
	children: ReactNode
}

export const FormControl = ({ name, maxLength, successMessageString, errorMessageString, children }: Props) => {
	const {
		control,
		formState: { errors, touchedFields },
		watch
	} = useFormContext()
	const label = getChildByType(children, [FormControl.Label])
	const charactersCount = getChildByType(children, [FormControl.CharactersCount])
	const message = getChildByType(children, [FormControl.Message])
	const input = getChildByType(children, [
		RichTextEditor,
		TextInput,
		Select,
		Textarea,
		NumericInput,
		PatternInput,
		PasswordInput,
		AudioUpload,
		FileUpload,
		PhotoUpload,
		Checkbox,
		CheckboxGroup,
		SearchDropdown,
		RadioGroup,
		FormTable,
		ProductStateFormTable
	])

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				// Use fieldState.error as primary source, fallback to errors object
				const fieldError = fieldState.error || errors[field.name]
				const errorMessage = fieldError?.message?.toString() || errorMessageString
				const successMessage = !fieldError && field.value && (successMessageString ?? ' ')
				const hasError = fieldError !== undefined
				// Check if field has a value - for numeric inputs, any number (including 0) means user has entered something
				// For string inputs, check it's not empty
				const isNumeric = typeof field.value === 'number'
				const hasValue = field.value !== undefined && field.value !== null && (isNumeric || (typeof field.value === 'string' && field.value !== ''))
				const isTouched = touchedFields[field.name] !== undefined || fieldState.isTouched
				// Show error if there's an error AND (field has value OR field is touched)
				// This ensures errors show when user has entered something or interacted with the field
				const shouldShowError = hasError && (hasValue || isTouched)
				const overriddenInput = overridePropsDeep(input, () => ({
					hasError: shouldShowError,
					hasSuccess: !hasError && hasValue,
					endIcon: field.value ? (
						fieldError ? (
							<ErrorIcon size="medium" color="destructive.500" />
						) : (
							<CheckIcon size="medium" color="success.500" />
						)
					) : undefined,
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
							length: removeHtmlTags(watch(name))?.length === undefined ? 0 : removeHtmlTags(watch(name))?.length,
							maxLength
						}))}
						{overridePropsDeep(message, () => ({ errorMessage, successMessage }))}
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

FormControl.Message = ({
	errorMessage,
	successMessage,
	instructionMessage
}: {
	errorMessage?: string
	successMessage?: string
	instructionMessage?: string
}) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const t = useTranslations()
	const labelColor = errorMessage ? 'destructive.500' : successMessage ? 'success.500' : 'neutral.500'
	const labelMessage = errorMessage || successMessage || instructionMessage

	return (
		<Box position="absolute" paddingTop={1}>
			<Text color={labelColor} fontSize="small">
				{t(labelMessage)}
			</Text>
		</Box>
	)
}
