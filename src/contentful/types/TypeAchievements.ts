import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeAchievementsFields {
	name: EntryFieldTypes.Symbol
	value: EntryFieldTypes.Symbol
}

export type TypeAchievementsSkeleton = EntrySkeletonType<TypeAchievementsFields, 'achievements'>
export type TypeAchievements<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeAchievementsSkeleton,
	Modifiers,
	Locales
>
