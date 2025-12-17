import { getServiceLocation } from 'api/services/serviceLocations'

import { ServiceLocationDetails } from './ServiceLocationDetails'

interface Props {
	params: {
		id: string
		locationId: string
	}
}

const ServiceLocationDetailsPage = async ({ params }: Props) => {
	const { data: serviceLocationData } = await getServiceLocation(params.locationId)

	return <ServiceLocationDetails serviceLocation={serviceLocationData} serviceId={params.id} />
}

export default ServiceLocationDetailsPage

