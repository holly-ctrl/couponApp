import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Wallet.css'
import axios from 'axios'
import CouponListItem from './CouponListItem'

class Wallet extends Component {
    constructor() {
        super()

        this.state = {
            grocery: [],
            household: [],
            pharmacy: [],
            personal: [],
            pets: []
        }

        this.deleteCoupon = this.deleteCoupon.bind(this)
        this.updateCoupon = this.updateCoupon.bind(this)
    }

    componentDidMount() {
        axios
            .get('/api/getAllCoupons')
            .then(res => {
                const grocery = res.data.filter(coupon => coupon.category_id === 1)
                const household = res.data.filter(coupon => coupon.category_id ===2)
                const pharmacy = res.data.filter(coupon => coupon.category_id === 3)
                const personal = res.data.filter(coupon => coupon.category_id === 4)
                const pets = res.data.filter(coupon => coupon.category_id === 5)
                this.setState({
                    grocery,
                    household,
                    pharmacy,
                    personal,
                    pets
                })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.grocery.length !== this.state.grocery.length ||
            prevState.household.length !== this.state.household.length ||
            prevState.pharmacy.length !== this.state.pharmacy.length ||
            prevState.personal.length !== this.state.personal.length ||
            prevState.pets.length !== this.state.pets.length
            )
            {axios
            .get('/api/getAllCoupons')
            .then(res => {
                const grocery = res.data.filter(coupon => coupon.category_id === 1)
                const household = res.data.filter(coupon => coupon.category_id ===2)
                const pharmacy = res.data.filter(coupon => coupon.category_id === 3)
                const personal = res.data.filter(coupon => coupon.category_id === 4)
                const pets = res.data.filter(coupon => coupon.category_id === 5)
                this.setState({
                    grocery,
                    household,
                    pharmacy,
                    personal,
                    pets
                })
            })}
    }

    deleteCoupon(id) {
        axios
            .delete(`/api/deleteCoupon/${id}`)
            .then((res) => {
                const grocery = res.data.filter(coupon => coupon.category_id === 1)
                const household = res.data.filter(coupon => coupon.category_id === 2)
                const pharmacy = res.data.filter(coupon => coupon.category_id === 3)
                const personal = res.data.filter(coupon => coupon.category_id === 4)
                const pets = res.data.filter(coupon => coupon.category_id === 5)
                this.setState({
                    grocery,
                    household,
                    pharmacy,
                    personal,
                    pets
                })
            })
    }

    updateCoupon(id, product, expiration_date) {
        axios
            .put(`/api/editCoupon/${id}`, {
                product,
                expiration_date,
            })
            .then(res => {
                const grocery = res.data.filter(coupon => coupon.category_id === 1)
                const household = res.data.filter(coupon => coupon.category_id === 2)
                const pharmacy = res.data.filter(coupon => coupon.category_id === 3)
                const personal = res.data.filter(coupon => coupon.category_id === 4)
                const pets = res.data.filter(coupon => coupon.category_id === 5)
                this.setState({
                    grocery,
                    household,
                    pharmacy,
                    personal,
                    pets
                })
            })
    }
    render() {
        return(
            <div>
                <nav>
                    <Link to='/welcome'><img className='addImg' src='https://image.flaticon.com/icons/png/512/32/32339.png' /></Link>
                </nav>
                <div className='cat'>
                    <h1>Grocery</h1>
                    {this.state.grocery.map((coupons) => (
                        <CouponListItem
                        key={coupons.id}
                        id={coupons.id}
                        product={coupons.product}
                        store={coupons.store}
                        expiration_date={coupons.expiration_date}
                        url={coupons.url}
                        deleteCoupon={this.deleteCoupon}
                        updateCoupon={this.updateCoupon}
                        handleEditProductChange={this.handleEditProductChange}
                        handleEditExpirationDateChange={this.handleEditExpirationDateChange}
                        />
                    ))}
                </div>
                <div className='cat'>
                    <h1>Household</h1>
                    {this.state.household.map((coupons) => (
                        <CouponListItem
                        key={coupons.id}
                        id={coupons.id}
                        product={coupons.product}
                        store={coupons.store}
                        expiration_date={coupons.expiration_date}
                        url={coupons.url}
                        deleteCoupon={this.deleteCoupon}
                        updateCoupon={this.updateCoupon}
                        handleEditProductChange={this.handleEditProductChange}
                        handleEditExpirationDateChange={this.handleEditExpirationDateChange}
                        />
                    ))}
                </div>
                <div className='cat'>
                    <h1>Pharmacy</h1>
                    {this.state.pharmacy.map((coupons) => (
                        <CouponListItem
                        key={coupons.id}
                        id={coupons.id}
                        product={coupons.product}
                        store={coupons.store}
                        expiration_date={coupons.expiration_date}
                        url={coupons.url}
                        deleteCoupon={this.deleteCoupon}
                        updateCoupon={this.updateCoupon}
                        handleEditProductChange={this.handleEditProductChange}
                        handleEditExpirationDateChange={this.handleEditExpirationDateChange}
                        />
                    ))}
                </div>
                <div className='cat'>
                    <h1>Personal</h1>
                    {this.state.personal.map((coupons) => (
                        <CouponListItem
                        key={coupons.id}
                        id={coupons.id}
                        product={coupons.product}
                        store={coupons.store}
                        expiration_date={coupons.expiration_date}
                        url={coupons.url}
                        deleteCoupon={this.deleteCoupon}
                        updateCoupon={this.updateCoupon}
                        handleEditProductChange={this.handleEditProductChange}
                        handleEditExpirationDateChange={this.handleEditExpirationDateChange}
                        />
                    ))}
                </div>
                <div className='cat'>
                    <h1>Pets</h1>
                    {this.state.pets.map((coupons) => (
                        <CouponListItem
                        key={coupons.id}
                        id={coupons.id}
                        product={coupons.product}
                        store={coupons.store}
                        expiration_date={coupons.expiration_date}
                        url={coupons.url}
                        deleteCoupon={this.deleteCoupon}
                        updateCoupon={this.updateCoupon}
                        handleEditProductChange={this.handleEditProductChange}
                        handleEditExpirationDateChange={this.handleEditExpirationDateChange}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Wallet 