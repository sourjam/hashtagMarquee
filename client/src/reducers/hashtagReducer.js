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
      let index = state.indexOf(action.payload)
      let newState = state.slice()
      let refund = newState.splice(index, 1)
      console.log('removinghashtag', newState, refund)
      return newState;
    default:
      return state;
  }
}

export default hashtagReducer;
