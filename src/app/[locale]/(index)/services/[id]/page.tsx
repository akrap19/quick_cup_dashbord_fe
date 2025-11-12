import { getService } from 'api/services/services'

import { ServiceDetails } from './ServiceDetails'

interface Props {
	params: {
		id: string
	}
}

const ServiceDetailsPage = async ({ params }: Props) => {
	const { data: serviceData } = await getService(params.id)

	return <ServiceDetails service={serviceData} />
}

export default ServiceDetailsPage
