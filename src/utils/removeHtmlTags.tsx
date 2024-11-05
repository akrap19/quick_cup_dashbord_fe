export const removeHtmlTags = (html: string | null) => {
	return html?.replace(/<[^>]*>/g, '')
}
