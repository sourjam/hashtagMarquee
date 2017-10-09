import React from 'react';
import randomcolor from 'randomcolor';

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
    this.currentMarqueeWidth = 0
    this.tweetsToAppend = []
    this.checkToAppendTweets = this.checkToAppendTweets.bind(this)
    this.index = props.index
    this.marqueeData = props.data
    this.marqueeEl = document.createElement('div')
    this.marqueeEl.classList.add('marqueeScroll')
    props.data.forEach((tweet) => {
        if (!tweet.text.match('RT @')) {
          let t = document.createElement('div')
          t.classList.add('marqueeTweet')
          t.innerText = tweet.text
          let length = t.innerText.length * 8
          this.currentMarqueeWidth += length
          t.style.width = length + 'px'
          // t.style.fontFamily = fontRandom() + ', sans-serif'
          this.marqueeEl.appendChild(t)
        }
    })
    console.log('this.marqueeEl', this.marqueeEl)
  }
  componentDidMount() {
    this.marquee = document.getElementById('marquee-' + this.index)
    let random = Math.random();
    console.log('random', random)
    if (random > .5) {
      this.marqueeEl.style.backgroundColor = randomcolor({ luminosity: 'bright'})
    } else {
      this.marqueeEl.style.backgroundColor = randomcolor({ luminosity: 'dark'})
      this.marqueeEl.style.color = 'whitesmoke'
    }
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
            t.innerText = tweet.text
            let length = t.innerText.length * 5
            if (i === 0) {
              this.currentMarqueeWidth += length
            }
            t.style.width = length + 'px'
            // t.style.fontFamily = fontRandom() + ', sans-serif'
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
  render() {
    return (
      <div className="marquee" id={'marquee-' + this.index}></div>
    )
  }
}
