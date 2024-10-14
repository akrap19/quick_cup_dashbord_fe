export interface StaffImage {
	staffImageId: string
	url: string
}

export interface Staff {
	staffId: string
	staffTranslationId: string
	name: string
	title: string
	description: string
	updated: string
	status: string
	staffImages: StaffImage[]
}
