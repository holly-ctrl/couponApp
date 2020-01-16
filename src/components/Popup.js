import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Popup.css'

class Popup extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className='popup'>
                <div className='innerPop' >
                    <Link to='/wallet'><button className='butt' onClick= {() => {this.props.onAddCouponClick(1)}} >Grocery</button></Link>
                    <Link to='/wallet'><button className='butt' onClick= {() => {this.props.onAddCouponClick(2)}}>Household</button></Link>
                    <Link to='/wallet'><button className='butt' onClick= {() => {this.props.onAddCouponClick(3)}}>Pharmacy</button></Link>
                    <Link to='/wallet'><button className='butt' onClick= {() => {this.props.onAddCouponClick(4)}}>Personal</button></Link>
                    <Link to='/wallet'><button className='butt' onClick= {() => {this.props.onAddCouponClick(5)}}>Pets</button></Link>
                    <button className='x' onClick={this.props.closePopup}>X</button>
                </div>
            </div>
        )
    }
}

export default Popup