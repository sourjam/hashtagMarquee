import React from 'react';
import { connect } from 'react-redux';
import SimpleMarquee from '../components/SimpleMarquee'

class MarqueeWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.marqueeData = []
    this.state.tagsLoaded = []
    this.searchHashtag = this.searchHashtag.bind(this)
    console.log(props)
  }
  searchHashtag(hashtag) {
    let localUrl = "http://localhost:5000/search/" + hashtag
    return new Promise((resolve, reject) => {
      fetch(localUrl).then(resp => resp.json()).then((data) => {
        console.log('here be data', data)
        resolve(data)
      }).catch(err => reject(err))
    })
  }
  componentWillUpdate(newState) {
    console.log('updating', newState)
    newState.hashtags.forEach((tag) => {
      if (!this.state.tagsLoaded.includes(tag)) {
        this.searchHashtag(tag).then((result) => {
          if (result.length > 0) {
            console.log(result)
            let newData = this.state.marqueeData;
            let newTags = this.state.tagsLoaded;
            newData.push(result)
            newTags.push(tag)
            this.setState({marqueeData: newData, tagsLoaded: newTags}, () => {
              console.log('marqueestate', this.state)
            })
          }
        })
      }
    })
  }
  render() {
    console.log('rendering...')
    return (
      <div>
        { this.state.marqueeData.length > 0 ?
          <div>
            { this.state.marqueeData.map((datum, i) => {
              return <SimpleMarquee index={i} data={datum} />
            })}
          </div> : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    hashtags: state.hashtagReducer,
  }
}
export default connect(mapStateToProps)(MarqueeWrapper);
