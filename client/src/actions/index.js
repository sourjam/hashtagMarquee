import * as actionType from './actionType';

export const addHashtag = (hashtag) => ({
  type: actionType.ADD_HASHTAG,
  payload: hashtag
})

export const removeHashtag = () => ({
  type: actionType.REMOVE_HASHTAG,
  payload: 1
})
