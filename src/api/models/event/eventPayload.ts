export interface EventPayload {
	id?: string
	userId: string
	name: string
	description: string | null
	startDate: string
	endDate: string
	location: string
}
