import dynamic from 'next/dynamic'
import { TextareaHTMLAttributes, useEffect, useMemo } from 'react'

import { removeHtmlTags } from '@/utils/removeHtmlTags'

import 'react-quill/dist/quill.snow.css'
import './RichTextEditor.css'
import { tokens } from '@/style/theme.css'
import ReactQuill from 'react-quill'
import { CheckIcon } from '@/components/icons/check-icon'
import { Box } from '@/components/layout/box'

interface CustomRichTextEditorProps {
	hasSuccess?: string
	hasError?: boolean
}

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & CustomRichTextEditorProps

export const RichTextEditor = ({ placeholder, value, onChange, maxLength, hasSuccess, hasError, id }: Props) => {
	const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

	function removeAllLastHtmlTags(htmlString: string) {
		const regex = /<\/[^>]*>$/

		while (regex.test(htmlString)) {
			htmlString = htmlString.replace(regex, '')
		}

		return htmlString
	}

	function extractLastHtmlTags(htmlString: string) {
		const regex = /(<\/[^>]*>)+$/
		const match = htmlString.match(regex)

		if (match) {
			return match[0]
		} else {
			return ''
		}
	}

	const onChangeWithMaxLengthCheck = (
		value: string,
		delta: any,
		source: any,
		editor: ReactQuill.UnprivilegedEditor
	) => {
		const textWithoutHtmlTags = removeHtmlTags(value)

		if (onChange && maxLength) {
			if (textWithoutHtmlTags.length <= maxLength) {
				onChange(value as any)
			} else {
				const valueForReplace = textWithoutHtmlTags.slice(500)
				const stringWithoutLastHtmlTags = removeAllLastHtmlTags(value)
				const lastIndex = stringWithoutLastHtmlTags.lastIndexOf(valueForReplace)
				const valueForChange =
					stringWithoutLastHtmlTags.slice(0, lastIndex) +
					stringWithoutLastHtmlTags.slice(lastIndex + valueForReplace.length)
				const finalValue = valueForChange + extractLastHtmlTags(value)

				onChange(finalValue as any)
			}
		}
	}

	useEffect(() => {
		if (!id) return

		const checkQuillContainer = (resolve: () => void) => {
			const quillContainer = document.getElementById(id)
			if (quillContainer) {
				const qlEditor = quillContainer.querySelector('.ql-editor') as HTMLElement | null
				if (qlEditor) {
					if (hasSuccess && removeHtmlTags(hasSuccess) && !hasError) {
						qlEditor.style.borderColor = tokens.colors['success.500']
					} else if (hasError) {
						qlEditor.style.borderColor = tokens.colors['destructive.500']
					} else {
						qlEditor.style.borderColor = tokens.colors['neutral.300']
					}
					resolve()
				}
			} else {
				setTimeout(() => checkQuillContainer(resolve), 100)
			}
		}

		new Promise<void>(resolve => checkQuillContainer(resolve))
	}, [hasSuccess, hasError, id, tokens])

	return (
		<Box position="relative">
			{hasSuccess && removeHtmlTags(hasSuccess) && (
				<Box position="absolute" zIndex="over" style={{ top: '50px', right: '8px' }}>
					<CheckIcon size="medium" color="success.500" />
				</Box>
			)}
			<ReactQuill
				id={id}
				className={'ql-test'}
				theme="snow"
				placeholder={placeholder}
				value={value as any}
				onChange={onChangeWithMaxLengthCheck}
			/>
		</Box>
	)
}
