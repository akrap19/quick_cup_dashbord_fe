import { Stack } from '@/components/layout/stack'
import { fetchProjects } from '@/services/contentful/api/project'

import { ProjectCard } from './ProjectCard'

export const Projects = async () => {
	const projects = await fetchProjects()

	const mappedProjectCards = projects
		.filter(project => project.featured)
		.map(project => <ProjectCard key={project.slug} project={project} />)

	return <Stack gap={16}>{mappedProjectCards}</Stack>
}
