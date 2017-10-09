import * as actionType from '../actions/actionType'

const hashtagReducer = (state = [], action) => {
  let newState;
  switch(action.type) {
    case actionType.ADD_HASHTAG:
    // add action here
    console.log('reducer', state)
      return newState = state.concat([action.payload])
    case actionType.REMOVE_HASHTAG:
    // add action here
      return newState = state - action.payload;
    default:
      return state;
  }
}

export default hashtagReducer;
