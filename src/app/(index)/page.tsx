import { AgileTeam } from './components/agile-team'
import { Contact } from './components/contact'
import { Hero } from './components/hero'
import { Projects } from './components/projects'
import { Services } from './components/services'

const HomePage = () => (
	<>
		<Hero />
		<Projects />
		<Services />
		<AgileTeam />
		<Contact />
	</>
)

export default HomePage
