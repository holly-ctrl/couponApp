import React, {Component} from 'react'
import './CouponListItem.css'

class CouponListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: '',
            expiration_date: '',
            setEdit: false
        }
    }

    componentDidMount() {
        this.setState({
            product: this.props.product,
            expiration_date: this.props.expiration_date,
        })
    }

    editToggle() {
        this.setState({
            setEdit: !this.state.setEdit
        })
    }

    handleEditProductChange(e) {
        this.setState({
            product: e.target.value
        })
    }

    handleEditExpirationDateChange(e) {
        this.setState({
            expiration_date: e.target.value
        })
    }

    render() {
        const{product, expiration_date} = this.state
        return (
            <div>
                {!this.state.setEdit
                ?
                <div className='couponContainer'>
                    <div>{this.state.product}</div>
                    <div>Expires on: {this.state.expiration_date}</div>
                    <button onClick={() => {this.editToggle()}} >Edit</button> <button onClick={() => this.props.deleteCoupon(this.props.id)}>Delete</button>
                </div>
                :
                <div className='editCoupon'>
                    product: <input value={this.state.product} onChange={e => this.handleEditProductChange(e)}/>
                    Expires on: <input type='date' value={this.state.expiration_date} onChange={e => this.handleEditExpirationDateChange(e)}/> 
                    <button onClick={() => {
                        this.props.updateCoupon(this.props.id, product, expiration_date)
                        this.editToggle()
                    }}>Save</button>
                </div>
                }
            </div>
        )
    }
}

export default CouponListItem