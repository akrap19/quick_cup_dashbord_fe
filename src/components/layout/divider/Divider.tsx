import { divider } from './Divider.css'

export const Divider = ({ backgroundColor }: { backgroundColor?: string }) => {
	return <div className={divider} style={{ backgroundColor }} />
}
