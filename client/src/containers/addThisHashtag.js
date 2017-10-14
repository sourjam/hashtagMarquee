import React from 'react';
import { connect } from 'react-redux';
import { addHashtag } from '../actions';
import { bindActionCreators } from 'redux';

class AddThisHashtag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dispatchAction = this.dispatchAction.bind(this)
    console.log('loaded')
  }
  dispatchAction() {
    console.log('hi')
  }
  render() {
    return (
      <div></div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addHashtag, dispatch)}
}

export default connect(mapDispatchToProps)(AddThisHashtag);
