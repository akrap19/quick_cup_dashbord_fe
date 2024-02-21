'use client'

import { getBarnahus } from 'api/services/barnahuses'

import { BarnahusDetails } from './BarnahusDetails'

const BarnahusDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getBarnahus(params.id)

	return <BarnahusDetails barnahus={data.barnahus} />
}

export default BarnahusDetailsPage
