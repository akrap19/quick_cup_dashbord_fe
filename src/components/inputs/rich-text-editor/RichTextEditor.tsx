import dynamic from 'next/dynamic'
import { TextareaHTMLAttributes, useEffect, useMemo } from 'react'

import { removeHtmlTags } from '@/utils/removeHtmlTags'

import 'react-quill/dist/quill.snow.css'
import './RichTextEditor.css'

interface CustomRichTextEditorProps {
	hasSuccess?: string
}

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & CustomRichTextEditorProps

export const RichTextEditor = ({ placeholder, value, onChange, maxLength, hasSuccess }: Props) => {
	const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

	const onChangeWithMaxLengthCheck = (value: string, delta: any, source: any, editor: any) => {
		const textWithoutHtmlTags = removeHtmlTags(value)

		if (onChange && textWithoutHtmlTags.length <= 500) {
			onChange(value as any)
		}
		if (maxLength && editor.getLength() > maxLength) {
			// Truncate the content if it exceeds the maximum length
			editor.deleteText(maxLength, editor.getLength())
		}
	}

	useEffect(() => {
		const quillContainer: any = document.querySelector('.ql-container.ql-snow')

		if (quillContainer) {
			if (hasSuccess && removeHtmlTags(hasSuccess)) {
				quillContainer.style.borderColor = '#22c55e'
			} else {
				quillContainer.style.borderColor = '#d6d6dd'
			}
		}
	}, [hasSuccess])

	return (
		<ReactQuill theme="snow" placeholder={placeholder} value={value as any} onChange={onChangeWithMaxLengthCheck} />
	)
}
