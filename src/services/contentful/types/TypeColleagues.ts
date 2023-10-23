import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeColleaguesFields {
	name: EntryFieldTypes.Symbol
	position: EntryFieldTypes.Symbol
	description: EntryFieldTypes.Symbol
	image: EntryFieldTypes.AssetLink
}

export type TypeColleaguesSkeleton = EntrySkeletonType<TypeColleaguesFields, 'colleagues'>
export type TypeColleagues<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeColleaguesSkeleton,
	Modifiers,
	Locales
>
