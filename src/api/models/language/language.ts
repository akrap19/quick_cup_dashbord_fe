export interface Language {
	languageId: string
	name: string
	code?: string
	status?: string
	autoTranslate: boolean
	translateable: boolean
	isDefault: boolean
}
