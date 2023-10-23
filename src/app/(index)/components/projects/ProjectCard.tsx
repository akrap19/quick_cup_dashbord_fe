import Image from 'next/image'

import { Columns } from '@/components/layout/columns'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import type { Project } from '@/services/contentful/api/project'

type Props = { project: Project }

export const ProjectCard = ({ project }: Props) => {
	const mappedTopics = project.topics.map(topic => (
		<Text key={topic} textTransform="uppercase" fontWeight="bold" color="neutral.400">
			{topic}
		</Text>
	))

	return (
		<Stack gap={4} key={project.slug}>
			{project.image !== null && (
				<div style={{ backgroundColor: project.backgroundColor }}>
					<Image
						src={`https://${project.image.src}`}
						sizes="100vw"
						alt={project.title}
						width={project.image.width}
						height={project.image.height}
						style={{
							width: '100%',
							height: 'auto'
						}}
					/>
				</div>
			)}
			<Inline gap={4}>{mappedTopics}</Inline>
			<Text variant="h2" dangerouslySetInnerHTML={{ __html: project.title }} />
			<Columns gap={0}>
				<Columns.Item columns={{ mobile: 12, tablet: 8, desktop: 6 }}>
					<Text color="neutral.500">{project.description}</Text>
				</Columns.Item>
			</Columns>
		</Stack>
	)
}
