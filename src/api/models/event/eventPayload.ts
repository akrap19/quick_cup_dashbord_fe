export interface EventPayload {
	id?: string
	userId: string
	title: string
	description: string | null
	startDate: string
	endDate: string
	location?: string
	place: string
	street: string
}
