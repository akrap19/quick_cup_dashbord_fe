import { getPractitioner } from 'api/services/practitioners'

import PractitionerEdit from './PractitionerEdit'

const PractitionerEditPage = async ({ params }: { params: { id: string } }) => {
	const { data } = await getPractitioner(params.id)

	return <PractitionerEdit practitioner={data.practitioner} />
}

export default PractitionerEditPage
