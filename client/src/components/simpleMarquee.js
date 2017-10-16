import React from 'react';
import RemoveHashtag from '../containers/removeHashtag'
import AddThisHashtag from '../containers/addThisHashtag'
require('../Please-compressed')

let fontRandom = () => {
  let fonts = ['Lato', 'Roboto Slab', 'Monteserrate']
  let random = Math.random()
  if (random < .33) {
    return fonts[0]
  } else if (random >= .33 && random < .66) {
    return fonts[1]
  } else {
    return fonts[2]
  }
}

export default class SimpleMarquee extends React.Component {
  constructor(props) {
    super()
    this.marqueeChildren = {}
    this.currentFont = 1.5
    this.currentMarqueeWidth = 0
    this.tweetsToAppend = []

    this.increaseFont = this.increaseFont.bind(this)
    this.decreaseFont = this.decreaseFont.bind(this)
    this.checkToAppendTweets = this.checkToAppendTweets.bind(this)

    this.index = props.index
    this.marqueeData = props.data
    this.removeMarquee = props.removeMarquee

    this.marqueeEl = document.createElement('div')
    this.marqueeEl.classList.add('marqueeScroll')
    props.data.forEach((tweet) => {
        if (!tweet.text.match('RT @')) {
          let t = document.createElement('div')
          let u = document.createElement('a')
          u.classList.add('marqueeTweetUsername')
          u.setAttribute('target', '_blank')
          u.setAttribute('href', '//twitter.com/' + tweet.screenname)
          u.innerText = '@' + tweet.screenname
          console.log('appending', tweet, u, t)
          t.classList.add('marqueeTweet')
          // parse text into buttons and links

          let tags = tweet.text.match(/\B#\w{3,}/gi)
          console.log(tags)
          if (tags) {
            tags.forEach((tag) => {
              console.log('this tag', tag)
              tweet.text = tweet.text.replace(tag, '<button class="#hashButton">' + tag + '</button>')
            })
          }

          console.log(tweet.text)
          t.innerHTML = tweet.text
          let length = t.innerText.length * 8
          this.currentMarqueeWidth += length
          t.style.width = length + 'px'

          this.marqueeEl.appendChild(u)
          this.marqueeEl.appendChild(t)

        }
    })
    console.log('this.marqueeEl', this.marqueeEl)
  }
  componentDidMount() {
    this.marquee = document.getElementById('marquee-' + this.index)
    this.toolbar = document.getElementById('marqueeToolbar-' + this.index)
    let color = Please.make_color({format: 'hsv', saturation: .5, value: .9})
    let colors = Please.make_scheme(color, {scheme_type: 'mono'})
    this.bgColor = colors[0]
    this.toolbarColor = colors[1]
    this.fontColor = 'black'
    this.marqueeEl.style.backgroundColor = this.bgColor
    this.marqueeEl.style.color = this.fontColor
    this.toolbar.style.backgroundColor = this.toolbarColor
    this.marqueeEl.addEventListener('animationiteration', () => {
      console.log('sky blue iterated')
      this.checkToAppendTweets()
    })
    // calc length of single banner for scroll duration

    let animationDuration = this.currentMarqueeWidth / 50 + 's'
    this.marqueeEl.style.animationDuration = animationDuration
    this.marquee.appendChild(this.marqueeEl)
    let cloned = this.marqueeEl.cloneNode(true)
    // cloned.style.backgroundColor = 'limegreen'
    this.marquee.appendChild(cloned)
    let clonedAgain = cloned.cloneNode(true)
    // cloned.style.backgroundColor = 'coral'
    this.marquee.appendChild(clonedAgain)

    let buttons = document.getElementsByClassName('#hashButton')
    console.log('here is appended', buttons)
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        console.log('button e', e)
        let tag = e.target.innerText
        tag = tag.replace('#', '')
        tag = tag.toLowerCase()
        this.marqueeChildren.store.dispatch({type: 'ADD_HASHTAG', payload: tag})
      })
    }

  }
  checkToAppendTweets() {
    if (this.tweetsToAppend.length > 0) {
      console.log('marquee', this.marquee.children)
      let children = [this.marquee.children[0], this.marquee.children[1], this.marquee.children[2]]
      children.forEach((el, i) => {
        this.tweetsToAppend.forEach((tweet) => {
          if (!tweet.text.match('RT @')) {
            let t = document.createElement('div')
            t.classList.add('marqueeTweet')

            let tags = tweet.text.match(/\B#\w{3,}/gi)
            console.log(tags)
            if (tags) {
              tags.forEach((tag) => {
                tweet.text = tweet.text.replace(tag, '<button class="#hashButton">' + tag + '</button>')
              })
            }

            t.innerHTML = tweet.text
            
            let u = document.createElement('a')
            u.classList.add('marqueeTweetUsername')
            u.setAttribute('target', '_blank')
            u.setAttribute('href', '//twitter.com/' + tweet.screenname)
            u.innerHTML = '@' + tweet.screenname
            let length = t.innerText.length * 8
            if (i === 0) {
              this.currentMarqueeWidth += length
            }
            t.style.width = length + 'px'
            el.appendChild(u)
            el.appendChild(t)


          }
        })
        let duration = this.currentMarqueeWidth / 50 + 's'
        el.style.animationDuration = duration
      })
      this.tweetsToAppend = []
    }
  }
  appendTweets(tweets) {
    this.tweetsToAppend = this.tweetsToAppend.concat(tweets)
    // append to the marquee not showing -- then update other marquee when not showing

    console.log('append dis', tweets)
  }
  increaseFont() {
    let el = document.getElementById('marquee-' + this.index)
    this.currentFont = this.currentFont + .25
    el.style.fontSize = this.currentFont + 'em'
  }
  decreaseFont() {
    let el = document.getElementById('marquee-' + this.index)
    this.currentFont = this.currentFont - .25
    if (this.currentFont < .75) this.currentFont = .5
    el.style.fontSize = this.currentFont + 'em'
  }
  render() {
    return (
      <div className="marqueeOuter" id={'marqueeOuter-' + this.index}>
        <AddThisHashtag ref={instance => this.marqueeChildren = instance}></AddThisHashtag>
        <div className="marqueeToolbar"
          id={'marqueeToolbar-' + this.index}>
          <div className="marqueeLabel" id={'marqueeLabel-' + this.index}>#{this.marqueeData[0].hashtag}</div>
          <div className="marqueeButtons">
            <div className="marqueeButton" onClick={this.increaseFont}>+</div>
            <div className="marqueeButton" onClick={this.decreaseFont}>-</div>
            <RemoveHashtag remove={this.removeMarquee} tag={this.marqueeData[0].hashtag} />
          </div>
        </div>
        <div style={{fontSize: this.currentFont + 'em'}} className="marquee" id={'marquee-' + this.index}></div>
      </div>
    )
  }

}
