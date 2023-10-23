import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeProjectWorkflowFields {
	project: EntryFieldTypes.Symbol
	title: EntryFieldTypes.Symbol
	icon: EntryFieldTypes.AssetLink
	text: EntryFieldTypes.Symbol
}

export type TypeProjectWorkflowSkeleton = EntrySkeletonType<TypeProjectWorkflowFields, 'projectWorkflow'>
export type TypeProjectWorkflow<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeProjectWorkflowSkeleton,
	Modifiers,
	Locales
>
