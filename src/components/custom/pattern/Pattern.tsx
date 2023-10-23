import { ReactNode } from 'react'

import * as styles from './Pattern.css'

export const Pattern = ({ children }: { children: ReactNode }) => {
	return <div className={styles.pattern}>{children}</div>
}
