import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import css from './client.css'
import AddHashtag from './containers/addHashtag'
import MarqueeWrapper from './containers/MarqueeWrapper'

const store = createStore(reducer)

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  componentWillMount() {
    console.log('url', window.location.href)
  }
  searchHashtag(hashtag) {
    // let localUrl = "http://localhost:5000/search/" + hashtag
    let localUrl = "https://hashtagmarquee.herokuapp.com/search/" + hashtag
    return new Promise((resolve, reject) => {
      fetch(localUrl).then(resp => resp.json()).then((data) => {
        console.log('here be data', data)
        resolve(data)
      }).catch(err => reject(err))
    })
  }
  renderMarquee(data) {
    this.setState({marquee: data}, () => {
      console.log(this.state.marquee)
    })
  }
  render() {
    return (
      <div>
        <h3>#hashtagMarquee</h3>
        <AddHashtag></AddHashtag>
        <br></br>
        <MarqueeWrapper></MarqueeWrapper>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('hashtagMarqueeApp')
)
