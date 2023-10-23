import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeIntroPhotoFields {
	project: EntryFieldTypes.Symbol
	imageDesktop: EntryFieldTypes.AssetLink
	imageMobile: EntryFieldTypes.AssetLink
	imageBackgroundColor?: EntryFieldTypes.Symbol
}

export type TypeIntroPhotoSkeleton = EntrySkeletonType<TypeIntroPhotoFields, 'introPhoto'>
export type TypeIntroPhoto<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeIntroPhotoSkeleton,
	Modifiers,
	Locales
>
