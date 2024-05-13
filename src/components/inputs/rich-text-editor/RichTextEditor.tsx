import { TextareaHTMLAttributes } from 'react'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import './RichTextEditor.css'

interface CustomRichTextEditorProps {
	hasError?: boolean
}

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & CustomRichTextEditorProps

export const RichTextEditor = ({ placeholder, value, onChange, maxLength }: Props) => {
	function removeHtmlTags(html: string): string {
		return html.replace(/<[^>]*>/g, '')
	}
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

	return (
		<ReactQuill theme="snow" placeholder={placeholder} value={value as any} onChange={onChangeWithMaxLengthCheck} />
	)
}
