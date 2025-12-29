export interface Event {
	id: string
	userId: string
	userName: string
	title: string
	description: string | null
	startDate: string | null
	endDate: string | null
	location: string | null
	place: string
	street: string
}
