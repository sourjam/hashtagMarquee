import React from 'react';
import { connect } from 'react-redux';
import SimpleMarquee from '../components/SimpleMarquee'
import { addHashtag } from '../actions';
import { bindActionCreators } from 'redux';

class MarqueeWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.children = {}
    this.intervals = {}
    this.state = {}
    this.state.marqueeData = []
    this.state.tagsLoaded = [] // index of tag is the same index of the data
    this.searchHashtag = this.searchHashtag.bind(this)
    this.updateHashtag = this.updateHashtag.bind(this)
    this.mergeTweetsToUnique = this.mergeTweetsToUnique.bind(this)
    this.removeMarquee = this.removeMarquee.bind(this)
    this.components = props.components
    console.log('mwrapper', this.components)
  }
  searchHashtag(hashtag) {
    // let localUrl = "http://localhost:5000/search/" + hashtag
    let localUrl = "https://hashtagmarquee.herokuapp.com/search/" + hashtag
    console.log('local', localUrl)
    return new Promise((resolve, reject) => {
      fetch(localUrl).then(resp => resp.json()).then((data) => {
        console.log('here be data', data)
        resolve(data)
      }).catch(err => reject(err))
    })
  }
  mergeTweetsToUnique(a, b) {
    let total = a.concat(b)
    let m = {}
    let result = total.filter((t) => {
      if (!m[t.text]) {
        m[t.text] = true
        return t
      }
    })
    return result
  }
  filterTweetsToUnique(a, b) {
    let m = {}
    a.forEach((t) => {
      m[t.text] = true
    })
    let result = b.filter((t) => {
      if (!m[t.text]) {
        return t
      }
    })
    return result
  }
  updateHashtag(hashtag) {
    console.log('attempting update')
    if (this.state.tagsLoaded.includes(hashtag)) {
      let index = this.state.tagsLoaded.indexOf(hashtag)
      let oldData = this.state.marqueeData[index]
      this.searchHashtag(hashtag).then((latest) => {
        // merge and remove dupes // move to server in future
        let merged = this.mergeTweetsToUnique(oldData, latest)
        let uniques = this.filterTweetsToUnique(oldData, latest)
        if (merged.length !== oldData.length) {
          this.state.marqueeData[index] = merged
          let newMarqueeData = this.state.marqueeData.slice()
          console.log('children', this.children)
          this.children[index].appendTweets(uniques)
          this.state.marqueeData = newMarqueeData
          // this.setState({marqueeData: newMarqueeData})
          // update simple marquee to append new child tweets
        }
      })
    }
  }
  componentWillUpdate(newState) {
    console.log('updating', newState)
    console.log(this.state.tagsLoaded)
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
              this.intervals[tag] = setInterval(()=>{
                this.updateHashtag(tag)
              }, 15000)
              console.log('marqueestate', this.state)
            })
          }
        })
      }
    })
  }
  removeMarquee(hashtag){
    let index = this.state.tagsLoaded.indexOf(hashtag)
    this.state.tagsLoaded[index] = ''
    this.state.marqueeData[index] = []
    clearInterval(this.intervals[hashtag])
    let el = document.getElementById('marqueeOuter-' + index)
    el.style.display = 'none'
    el.remove()
  }
  render() {
    console.log('rendering...')
    return (
      <div>
        { this.state.marqueeData.length > 0 ?
          <div>
            { this.state.marqueeData.map((datum, i) => {
              return <SimpleMarquee key={'SimpleMarquee-' + i}
                ref={instance => {this.children[i] = instance}}
                removeMarquee={this.removeMarquee}
                index={i}
                data={datum} />
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
