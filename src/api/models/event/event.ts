export interface Event {
	id: string
	userId: string
	title: string
	description: string | null
	startDate: string | null
	endDate: string | null
	location: string | null
}
