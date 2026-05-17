import { client } from './sanity'

export type Collection = {
  _id: string
  title: string
  slug: { current: string }
  coverImage: { asset: { _ref: string }; hotspot?: object; alt?: string }
  accentColor?: string
  description?: string
  location?: string
  category?: string
  featured?: boolean
  photoCount: number
  seoTitle?: string
  seoDescription?: string
}

export type Photo = {
  _id: string
  image: { asset: { _ref: string }; hotspot?: object }
  alt: string
  caption?: string
  order?: number
}

export type Print = {
  _id: string
  title: string
  photo: { image: { asset: { _ref: string } }; alt: string }
  description?: string
  sizesAvailable: string[]
  priceRange?: string
  available: boolean
}

export type AboutDoc = {
  portrait?: { asset: { _ref: string } }
  bio?: unknown[]
  gearList?: { label: string; items: string[] }[]
}

export async function getCollections(): Promise<Collection[]> {
  return client.fetch(
    `*[_type == "collection"] | order(featured desc, publishedAt desc) {
      _id, title, slug, coverImage, accentColor, description, location, category, featured,
      "photoCount": count(photos),
      seoTitle, seoDescription
    }`
  )
}

export async function getCollection(slug: string): Promise<(Collection & { photos: Photo[] }) | null> {
  return client.fetch(
    `*[_type == "collection" && slug.current == $slug][0] {
      _id, title, slug, coverImage, accentColor, description, location, category, featured,
      seoTitle, seoDescription,
      "photos": photos[defined(@->)]->{ _id, image, alt, caption, order }
    }`,
    { slug }
  )
}

export async function getPrints(): Promise<Print[]> {
  return client.fetch(
    `*[_type == "print" && available == true] | order(_createdAt desc) {
      _id, title, "photo": photo->{ image, alt }, description, sizesAvailable, priceRange, available
    }`
  )
}

export async function getAbout(): Promise<AboutDoc | null> {
  return client.fetch(`*[_type == "about"][0] { portrait, bio, gearList }`)
}
