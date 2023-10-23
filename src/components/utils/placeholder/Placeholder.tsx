import { Box } from 'components/layout/box/Box'

interface Props {
	height?: string | number
	width?: string | number
}

const resolveToPxIfUnitless = (value: string | number) =>
	typeof value === 'string' && /[0-9]$/.test(value) ? `${value}px` : value

export const Placeholder = ({ width = 120, height = 120 }: Props) => {
	return (
		<Box
			position="relative"
			overflow="hidden"
			display="flex"
			alignItems="center"
			justifyContent="center"
			style={{
				width: resolveToPxIfUnitless(width),
				height: resolveToPxIfUnitless(height),
				backgroundColor: 'rgba(51,51,51,.08)',
				border: '2px solid rgba(51,51,51,.3)'
			}}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%'
				}}>
				<line style={{ strokeWidth: '2px', stroke: 'rgba(51,51,51,.1)' }} x1={0} y1={0} x2="100%" y2="100%" />
				<line style={{ strokeWidth: '2px', stroke: 'rgba(51,51,51,.1)' }} x1="100%" y1={0} x2={0} y2="100%" />
			</svg>
		</Box>
	)
}
