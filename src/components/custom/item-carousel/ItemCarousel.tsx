import { itemCarouselButton, itemCarouselButtonIcon } from './ItemCarousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { Carousel } from 'react-responsive-carousel'
import { Button } from '@/components/inputs/button'
import { ReactChild } from 'react'
import { Box } from '@/components/layout/box'
import { CaretLeftIcon } from '@/components/icons/caret-circle-left-icon'
import { CaretRightIcon } from '@/components/icons/caret-circle-right-icon'

interface Props {
	children: ReactChild[]
}

export const ItemCarousel = ({ children }: Props) => {
	return (
		<Carousel
			showThumbs={false}
			swipeable={false}
			showIndicators={false}
			showStatus={false}
			showArrows={true}
			infiniteLoop
			selectedItem={0}
			renderArrowPrev={(onClickHandler, hasPrev, label) => {
				return hasPrev ? (
					<Button
						variant="adaptive"
						size="auto"
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							onClickHandler()
						}}
						aria-label={label}
						className={itemCarouselButton}
						style={{
							left: '4px'
						}}>
						<Box className={itemCarouselButtonIcon}>
							<CaretLeftIcon color="neutral.500" />
						</Box>
					</Button>
				) : null
			}}
			renderArrowNext={(onClickHandler, hasNext, label) => {
				return hasNext ? (
					<Button
						variant="adaptive"
						size="auto"
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							onClickHandler()
						}}
						aria-label={label}
						className={itemCarouselButton}
						style={{
							right: '4px'
						}}>
						<Box className={itemCarouselButtonIcon}>
							<CaretRightIcon color="neutral.500" />
						</Box>
					</Button>
				) : null
			}}>
			{children}
		</Carousel>
	)
}
