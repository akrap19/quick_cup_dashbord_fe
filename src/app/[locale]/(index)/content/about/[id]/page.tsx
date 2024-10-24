import { getAbout } from 'api/services/content/about'
import { AboutDetails } from './AboutDetails'

const AboutPage = async ({ params }: { params: { id: string } }) => {
	const { data: aboutData } = await getAbout(params.id)

	return <AboutDetails about={aboutData?.aboutTranslation} />
}

export default AboutPage
