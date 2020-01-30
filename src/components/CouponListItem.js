import React, {Component} from 'react'
import './CouponListItem.css'
import CouponPop from './CouponPop'
import styled from 'styled-components'

class CouponListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: '',
            expiration_date: '',
            url: '',
            setEdit: false,
            showCouponPop: false
        }

        this.toggleCouponPop = this.toggleCouponPop.bind(this)
    }

    componentDidMount() {
        this.setState({
            product: this.props.product,
            expiration_date: this.props.expiration_date,
            url: this.props.url
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
    
    toggleCouponPop(e) {
        this.setState({
            showCouponPop: !this.state.showCouponPop
        })
    }


    render() {
        const{product, expiration_date} = this.state
        return (
            <div>
                {!this.state.setEdit
                ?
                <CoupDiv className='couponContainer'>
                    <img src={this.state.url} onClick={e => this.toggleCouponPop(e)}/>
                    <h2>{this.state.product}</h2>
                    <div>Expires on: {this.state.expiration_date}</div>
                    <EditButton onClick={() => {this.editToggle()}} >Edit</EditButton> <EditButton onClick={() => this.props.deleteCoupon(this.props.id)}>Delete</EditButton>
                </CoupDiv>
                :
                <EditCoup className='editCoupon'>
                    product: <input value={this.state.product} onChange={e => this.handleEditProductChange(e)}/>
                    Expires on: <input type='date' value={this.state.expiration_date} onChange={e => this.handleEditExpirationDateChange(e)}/> 
                    <button onClick={() => {
                        this.props.updateCoupon(this.props.id, product, expiration_date)
                        this.editToggle()
                    }}>Save</button>
                </EditCoup>
                }
                {this.state.showCouponPop && <CouponPop closePopup={this.toggleCouponPop} url={this.state.url}/>}
            </div>
        )
    }
}

export default CouponListItem

const CoupDiv = styled.div`
box-shadow: 5px 5px 15px 5px lightgrey;
padding: 20px;
margin: 10px;
`

const EditButton = styled.button`
background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`

const EditCoup = styled.div`
box-shadow: 5px 5px 15px 5px lightgrey;
padding: 20px;
margin: 10px;
`