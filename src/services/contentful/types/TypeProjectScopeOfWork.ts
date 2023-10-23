import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectScopeOfWorkFields {
	project: EntryFieldTypes.Symbol
	title: EntryFieldTypes.Symbol
	list: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export type TypeProjectScopeOfWorkSkeleton = EntrySkeletonType<TypeProjectScopeOfWorkFields, 'projectScopeOfWork'>
export type TypeProjectScopeOfWork<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectScopeOfWorkSkeleton,
	Modifiers,
	Locales
>
