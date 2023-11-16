import Image from 'next/image'

type BrandLogoProps = { addHomeLink?: boolean }

export const BrandLogo = ({ addHomeLink }: BrandLogoProps) => {
	const image = <Image src="/images/journeys-logo.svg" width={135} height={33} alt="logo" />

	if (addHomeLink) {
		return <a href="/">{image}</a>
	}

	return image
}
