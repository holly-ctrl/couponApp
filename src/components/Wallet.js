import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Wallet.css'

class Wallet extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div>
                <nav>
                    <Link to='/welcome'><img className='addImg' src='https://image.flaticon.com/icons/png/512/32/32339.png' /></Link>
                </nav>
                <div className='cat'>
                    <h1>Grocery</h1>
                </div>
                <div className='cat'>
                    <h1>Household</h1>
                </div>
                <div className='cat'>
                    <h1>Pharmacy</h1>
                </div>
                <div className='cat'>
                    <h1>Personal</h1>
                </div>
                <div className='cat'>
                    <h1>Pets</h1>
                </div>
            </div>
        )
    }
}

export default Wallet 