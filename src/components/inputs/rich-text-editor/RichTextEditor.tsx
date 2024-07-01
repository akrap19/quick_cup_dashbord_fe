import dynamic from 'next/dynamic'
import { TextareaHTMLAttributes, useEffect, useMemo } from 'react'

import { removeHtmlTags } from '@/utils/removeHtmlTags'

import 'react-quill/dist/quill.snow.css'
import './RichTextEditor.css'
import { tokens } from '@/style/theme.css'

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
			editor?.deleteText(maxLength, editor.getLength())
		}
	}

	useEffect(() => {
		const quillContainer: any = document.querySelector('.ql-editor')

		if (quillContainer) {
			if (hasSuccess && removeHtmlTags(hasSuccess)) {
				quillContainer.style.borderColor = tokens.colors['success.500']
			} else {
				quillContainer.style.borderColor = tokens.colors['neutral.300']
			}
		}
	}, [hasSuccess])

	return (
		<ReactQuill theme="snow" placeholder={placeholder} value={value as any} onChange={onChangeWithMaxLengthCheck} />
	)
}
