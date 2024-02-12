import { Barnahus } from 'api/models/barnahuses/barnahus'

export const getBarnahuses = async (): Promise<Array<Barnahus>> => {
	return [
		{
			id: '1234541245',
			name: 'Zagreb 1',
			location: 'Zagreb',
			assignedAdmin: 'Karlo Kis',
			numberOfPractitioners: 8
		},
		{
			id: '1234541245',

			name: 'Stockholm 2',
			location: 'Stockholm',
			assignedAdmin: 'Jon Anderson',
			numberOfPractitioners: 12
		},
		{
			id: '1234541245',
			name: 'Dublin care',
			location: 'Dublin',
			assignedAdmin: 'Clara Robinson',
			numberOfPractitioners: 9
		}
	]
}
