import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import './Welcome.css'

class Welcome extends Component {
    constructor() {
        super()

        this.state = {
            product: '',
            expirationDate: '',
            image: ''
        }
    }

    logout() {
        axios.delete('/auth/logout')
        
        .then((res) => {
            console.log(res.data.message)
            if(res.data.message === 'logged out') {
                this.props.history.push('/')
            } 
        })
    }

    render() {
        return (
            <div className='container'>
                <nav>
                    <Link to='/wallet'><img className='walletImg' src='http://icons.iconarchive.com/icons/iconsmind/outline/512/Wallet-2-icon.png'/></Link>
                </nav>
                <div>
                    <form>
                        <input placeholder='Product' ></input>
                        <input placeholder='Expiration Date'></input>
                        <input placeholder='Image'></input>
                        <button className='addButton'>Add</button>
                    </form>
                </div>
                <button className='logoutButton' onClick={() => this.logout()}>Logout</button>
            </div>
        )
    }
}

export default Welcome 