import React, {Component} from 'react'
import './CouponListItem.css'

class CouponListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: '',
            expiration_date: ''
        }
    }

    componentDidMount() {
        this.setState({
            product: this.props.product,
            expiration_date: this.props.expiration_date
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div className='couponContainer'>
                    <div>{this.state.product}</div>
                    <div>Expires on: {this.state.expiration_date}</div>
                    <button>Edit</button> <button onClick={() => this.props.deleteCoupon(this.props.id)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default CouponListItem