import { getServiceLocation } from 'api/services/serviceLocations'

import ServiceLocationEdit from './ServiceLocationEdit'

interface Props {
	params: {
		id: string
		locationId: string
	}
}

const ServiceLocationEditPage = async ({ params }: Props) => {
	const { data: serviceLocationData } = await getServiceLocation(params.locationId)

	return <ServiceLocationEdit serviceLocation={serviceLocationData} serviceId={params.id} />
}

export default ServiceLocationEditPage

