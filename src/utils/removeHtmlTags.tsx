export const removeHtmlTags = (html: string | null | undefined) => {
	if (typeof html !== 'string') {
		return ''
	}
	return html.replace(/<[^>]*>/g, '')
}
