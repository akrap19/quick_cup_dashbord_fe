import NextHead from 'next/head'

interface MetaTags {
	title: string
	description: string
	url?: string
	image?: string
	type?: string
}

type Props = { metaTags: MetaTags }

export const Head = ({ metaTags }: Props) => {
	const { title, description, url, image, type } = metaTags

	return (
		<NextHead>
			<title>{title}</title>
			<meta name="description" content={description} />
			{url && <meta property="og:url" content={url} />}
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} key={title} />
			<meta name="twitter:description" content={description} />
			{image && (
				<>
					<meta name="twitter:image" content={image} key={image} />
					<meta name="twitter:image:alt" content={title} />
				</>
			)}

			<meta property="og:type" content={type || 'website'} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{image && <meta property="og:image" content={image} />}
		</NextHead>
	)
}
