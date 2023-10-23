// https://maxschmitt.me/posts/nextjs-contentful-typescript
import { Entry } from 'contentful'

import { contentfulClient } from '../client'
import { ContentfulImage, parseContentfulImage } from '../image'
import { TypeProjectCardSkeleton } from '../types'

type ProjectEntry = Entry<TypeProjectCardSkeleton, undefined, string>

// Our simplified version of a Project.
// We don't need all the data that Contentful gives us.
export interface Project {
	slug: string
	title: string
	description: string
	image: ContentfulImage | null
	topics: Array<string>
	backgroundColor?: string
	featured?: boolean
}

// A function to transform a Contentful project
// into our own Project object.
export function parseContentfulProject(projectEntry: ProjectEntry): Project {
	return {
		slug: projectEntry.fields.slug,
		title: projectEntry.fields.title,
		description: projectEntry.fields.description,
		image: parseContentfulImage(projectEntry.fields.image),
		topics: projectEntry.fields.topics,
		backgroundColor: projectEntry.fields.imageBackgroundColor,
		featured: projectEntry.fields.showOnHomepage
	}
}

export async function fetchProjects(): Promise<Array<Project>> {
	try {
		const response = await contentfulClient.getEntries<TypeProjectCardSkeleton>({
			content_type: 'projectCard'
		})

		return response.items.map(projectEntry => parseContentfulProject(projectEntry))
	} catch (e) {
		throw new Error('Could not load projects')
	}
}
