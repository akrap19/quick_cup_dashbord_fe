import { Barnahus } from 'api/models/barnahuses/barnahus'

export const getBarnahuses = async (): Promise<Array<Barnahus>> => {
	return [
		{
			name: 'Matija',
			location: 'Zagreb',
			assignedAdmin: 'Karlo',
			numberOfPractitioners: 1000
		},
		{
			name: 'John',
			location: '3 picke materine',
			assignedAdmin: 'John2',
			numberOfPractitioners: 1000
		},
		{
			name: 'Papa Ivan Pavao 2.',
			location: 'Kuala Lumpur',
			assignedAdmin: 'Jahve',
			numberOfPractitioners: 1000
		}
	]
}
