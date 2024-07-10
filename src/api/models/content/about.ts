interface AboutImage {
	aboutImageId: string
	url: string
}

export interface About {
	aboutId: string
	aboutTranslationId: string
	title: string
	description: string
	updated: string
	status: string
	aboutimages: AboutImage[]
}
