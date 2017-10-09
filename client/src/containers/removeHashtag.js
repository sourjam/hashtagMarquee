import React from 'react';
import { connect } from 'react-redux';
import { removeHashtag } from '../actions';
import { bindActionCreators } from 'redux';

class RemoveHashtag extends React.Component {
  constructor(props) {
    super(props)
    console.log('removeprops', props)
  }
  render() {
    return (
      <div className="marqueeButton trouble"
        onClick={e => {
          e.preventDefault()
          this.props.remove(this.props.tag)
          this.props.dispatch(removeHashtag(this.props.tag))
        }}
        >x</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(removeHashtag, dispatch)}
}

export default connect(mapDispatchToProps)(RemoveHashtag);
