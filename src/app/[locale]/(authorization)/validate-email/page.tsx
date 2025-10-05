import { validateEmail } from 'api/services/settings'

interface Props {
	searchParams: {
		uid: string
	}
}

const ValidateEmailPage = async ({ searchParams }: Props) => {
	const uid = searchParams.uid?.split('/')[0]
	const hashUid = searchParams.uid?.split('/')[1]
	const response = await validateEmail(uid, hashUid)
	console.log('Matijaaaaaaaa response 666666', response)

	return null
}

export default ValidateEmailPage
