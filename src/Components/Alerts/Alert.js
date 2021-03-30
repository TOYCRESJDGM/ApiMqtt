import React, { Component } from 'react'
import './Styles.css'

class Alert extends Component {
  closeAlert = () => {
    document.getElementById('alert').style.display = 'none'
    this.props.handleError()

    return
  }

  render() {
    let type = this.props.type
    let text = this.props.text

    switch (type) {
      case 'attention':
        return (
          <div id='alert' className='a-container attention-border'>
            <div className='a-icon-container attention-background'>
              <img
                className='a-icon'
                src='./attention_white.png'
                alt='attention'
              />
            </div>
            <div className='a-body-container'>{text}</div>
            <div className='a-close-container'>
              <img
                className='a-icon'
                src='./close_gray.png'
                alt='attention'
                onClick={this.closeAlert}
              />
            </div>
          </div>
        )
    }
  }
}

export default Alert
