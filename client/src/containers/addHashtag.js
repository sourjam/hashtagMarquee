import React from 'react';
import { connect } from 'react-redux';
import { addHashtag } from '../actions';
import { bindActionCreators } from 'redux';

class AddHashtag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.userInput = ''
    this.updateInput = this.updateInput.bind(this)
    this.clearInput = this.clearInput.bind(this)
    this.keypressHandler = this.keypressHandler.bind(this)
  }
  keypressHandler(event) {
    if (event.charCode == 13) {
      event.preventDefault();
      this.props.dispatch(addHashtag(this.state.userInput));
      this.clearInput();
    }
  }
  clearInput() {
    this.setState({userInput: ''})
  }
  updateInput(event) {
    this.setState({userInput:event.target.value })
  }
  render() {
    return (
      <div>
        <input onChange={this.updateInput}
          onKeyPress={this.keypressHandler}
          placeholder="Enter hashtag"
          type="text"
          autoFocus="true"
          value={this.state.userInput}>
        </input>
        <button onClick={(e) => {
          e.preventDefault();
          if (this.state.userInput.length > 0) {
            this.props.dispatch(addHashtag(this.state.userInput));
            this.clearInput();
          }
        }}>
          Add hashtag</button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(addHashtag, dispatch)}
}

export default connect(mapDispatchToProps)(AddHashtag);
