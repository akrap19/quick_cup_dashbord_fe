/* eslint-disable no-undef */
import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'

import { textarea, textareaHasError } from './Textarea.css'

interface CustomTextareaProps {
	hasError?: boolean
}

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & CustomTextareaProps

export const Textarea = ({ hasError, ...rest }: Props) => {
	return <textarea {...rest} className={clsx(textarea, hasError && textareaHasError)} />
}
