import React from 'react';

export default class SimpleMarquee extends React.Component {
  constructor(props) {
    super()
    this.index = props.index
    this.marqueeData = props.data
    this.marqueeEl = document.createElement('div')
    this.marqueeEl.classList.add('marqueeScroll')
    props.data.forEach((tweet) => {
        let t = document.createElement('div')
        t.innerText = tweet.text
        this.marqueeEl.appendChild(t)
    })
    console.log('this.marqueeEl', this.marqueeEl)
  }
  componentDidMount() {
    let marquee = document.getElementById('marquee-' + this.index)
    marquee.appendChild(this.marqueeEl)
    let cloned = this.marqueeEl.cloneNode(true)
    marquee.appendChild(cloned)
  }
  render() {
    return (
      <div className="marquee" id={'marquee-' + this.index}></div>
    )
  }
}
