import { types } from '../constants/PhotoConstants'

const handlers = {}

handlers[types.SET_PHOTOS] = (state, action) => {
  return state.set('photos', action.photos)
}

handlers[types.SET_PHOTOS_BY_TAG] = (state, action) => {
  const photosByTag = {}
  action.photosByTag.forEach(tagData => {
    const tag = tagData._id
    photosByTag[tag] = {
      tag,
      photos: tagData.photos
    }
  })
  return state.set('photosByTag', photosByTag)
}

handlers[types.SET_TAGS] = (state, action) => {
  const tags = []
  action.photosByTag.forEach(tagData =>
    tags.push({
      tag: tagData._id,
      count: tagData.count
    })
  )
  return state.set('tags', tags)
}

handlers[types.RESET_PHOTOS] = (state, action) => {
  return state.set('photos', [])
}

export default handlers