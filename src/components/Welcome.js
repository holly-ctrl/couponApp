import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import Popup from './Popup'
import './Welcome.css'

class Welcome extends Component {
    constructor() {
        super()

        this.state = {
            product: '',
            expirationDate: '',
            image: '',
            showPopup: false
        }

        this.togglePopup = this.togglePopup.bind(this)
        this.onAddCouponClick = this.onAddCouponClick.bind(this)
    }

    onProductChange(e) {
        this.setState({
            product: e.target.value
        })
    }

    onExpirationDateChange(e) {
        this.setState({
            expirationDate: e.target.value
        })
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

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    onAddCouponClick(category) {
        axios
            .post('/api/addCoupon', {
                product: this.state.product,
                expiration_date: this.state.expirationDate,
                category_id: category
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='container'>
                <nav>
                    <Link to='/wallet'><img className='walletImg' src='http://icons.iconarchive.com/icons/iconsmind/outline/512/Wallet-2-icon.png'/></Link>
                </nav>
                <div>
                    <form>
                        {/* <input placeholder='Image'></input> */}
                        Product Name:<input value={this.product} onChange={e => this.onProductChange(e)}  ></input>
                        Expiration Date: <input type='date' value={this.expiration_date} onChange={e => this.onExpirationDateChange(e)} placeholder='Expiration Date'></input>
                        <button onClick={ () => {this.togglePopup()}} className='addButton'>Add</button>
                    </form>
                </div>
                {this.state.showPopup && <Popup closePopup={this.togglePopup} onAddCouponClick={this.onAddCouponClick} />}
                <button className='logoutButton' onClick={() => this.logout()}>Logout</button>
            </div>
        )
    }
}

export default Welcome 