import { collectionType } from './schemaTypes/collection'
import { photoType } from './schemaTypes/photo'
import { printType } from './schemaTypes/print'
import { aboutType } from './schemaTypes/about'

export const schema = {
  types: [collectionType, photoType, printType, aboutType],
}
