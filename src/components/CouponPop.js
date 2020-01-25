import React, {Component} from 'react'
import './CouponPop.css'

class CouponPop extends Component {
    constructor() {
        super()
    }
    render() {
          
        return (
            <div className='coupPopContainer'>
                <img src={this.props.url} className='bigImg'/>
                <button onClick={this.props.closePopup} >X</button>
            </div>
        )
    }
}

export default CouponPop