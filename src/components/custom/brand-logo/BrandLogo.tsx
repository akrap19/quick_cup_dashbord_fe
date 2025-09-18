import Image from 'next/image'

type BrandLogoProps = { addHomeLink?: boolean; height?: number }

export const BrandLogo = ({ addHomeLink, height }: BrandLogoProps) => {
	const image = (
		<Image
			src="/images/QuickCup_logo.png"
			width={0}
			height={height ?? 90}
			sizes="100vw"
			style={{ width: 'auto' }}
			alt="QuickCup logo"
		/>
	)

	if (addHomeLink) {
		return <a href="/">{image}</a>
	}

	return image
}
