import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import { Columns as ColumnsAtoms, columnsAtoms, grid } from './Columns.css'
import { Atoms, atoms } from '../../../style/atoms.css'

interface Props {
	children: ReactNode
	gap: Atoms['gap']
}

interface Item {
	children: ReactNode
	columns: ColumnsAtoms['columns']
}

interface ColumnsComposition {
	Item: FC<Item>
}

export const Columns: FC<Props> & ColumnsComposition = ({ children, gap = 4 }: Props) => {
	return <div className={clsx(grid, atoms({ gap }))}>{children}</div>
}

Columns.Item = ({ columns = 12, children }: Item) => {
	return <div className={columnsAtoms({ columns })}>{children}</div>
}
