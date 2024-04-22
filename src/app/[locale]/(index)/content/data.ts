import { ROUTES } from 'parameters'

export const dummyData = [
	{
		contentType: 'General introduction',
		updated: '07/09/2023',
		language: 'English',
		status: 'Open'
	},
	{
		contentType: 'What to expect',
		updated: '07/09/2023',
		language: 'Croatian',
		status: 'Closed'
	},
	{
		contentType: 'What after Barnahus',
		updated: '07/09/2023',
		language: 'English',
		status: 'Open'
	},
	{
		contentType: 'Working hours',
		updated: '07/09/2023',
		language: 'Swedish',
		status: 'In progress'
	}
]

export const contentSectionData = {
	aboutBarnahus: {
		buttonLabel: 'ManageContent.addAbout',
		buttonLink: ROUTES.ADD_CONTENT
	},
	rooms: {
		buttonLabel: 'ManageContent.addRoom',
		buttonLink: ROUTES.ADD_CONTENT
	},
	staff: {
		buttonLabel: 'ManageContent.addStaff',
		buttonLink: ROUTES.ADD_CONTENT
	}
}
