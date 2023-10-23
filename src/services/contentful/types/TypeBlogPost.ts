import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeBlogPostFields {
	title: EntryFieldTypes.Symbol
	slug: EntryFieldTypes.Symbol
	isFeatured: EntryFieldTypes.Boolean
	highlighted?: EntryFieldTypes.Boolean
	topic: EntryFieldTypes.Symbol<'Design' | 'Development' | 'HR' | 'Marketing' | 'PM' | 'QA' | 'Sales'>
	author: EntryFieldTypes.Symbol
	description: EntryFieldTypes.Text
	image: EntryFieldTypes.AssetLink
	dateWritten: EntryFieldTypes.Date
	content: EntryFieldTypes.RichText
	similarBlogsWithLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlogPostSkeleton>>
	similarBlogs: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
	metaTitle: EntryFieldTypes.Symbol
	metaDescription: EntryFieldTypes.Symbol
	metaKeywords: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
	metaImage: EntryFieldTypes.AssetLink
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields, 'blogPost'>
export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeBlogPostSkeleton,
	Modifiers,
	Locales
>
