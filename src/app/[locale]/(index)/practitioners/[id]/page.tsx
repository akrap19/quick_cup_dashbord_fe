import { getPractitioner } from 'api/services/practitioners'

import { PractitionerDetails } from './PractitionerDetails'

const PractitionersDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getPractitioner(params.id)

	return <PractitionerDetails practitioner={data.practitioner} />
}

export default PractitionersDetailsPage
