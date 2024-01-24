import { Barnahus } from 'api/models/barnahuses/barnahus'

export const getBarnahuses = async (): Promise<Array<Barnahus>> => {
	return [
		{
			name: 'Zagreb 1',
			location: 'Zagreb',
			assignedAdmin: 'Karlo Kis',
			numberOfPractitioners: 8
		},
		{
			name: 'Stockholm 2',
			location: 'Stockholm',
			assignedAdmin: 'Jon Anderson',
			numberOfPractitioners: 12
		},
		{
			name: 'Dublin care',
			location: 'Dublin',
			assignedAdmin: 'Clara Robinson',
			numberOfPractitioners: 9
		}
	]
}
