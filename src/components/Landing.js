import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../ducks/reducer'
import './Landing.css'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'

class Landing extends Component {
      constructor() {
          super()

          this.state = {
              nameInput: '',
              emailInput: '',
              passwordInput: '',
              user: {},
              amount: 0
          }
      }

      async signup() {
          let res = await axios.post('/auth/register', {
              name: this.state.nameInput,
              email: this.state.emailInput,
              password: this.state.passwordInput
          })
          this.setState({
              user: res.data.userData
          })
      }

      async login() {
        const {emailInput, passwordInput} = this.state

        axios.post('/auth/login', {
        email: emailInput,
        password: passwordInput
        }).then((res) => {
            console.log(res.data)
            if (res.data.message === 'logged in') {
                this.props.setUser(res.data.userData)
                this.props.history.push('/welcome')
            } else {
                this.props.history.push({pathname: '/loginError', state: { message:  res.data.message}})
            }
        })
      }

      handleNameInput(value) {
          this.setState({nameInput: value})
      }

      handleEmailInput(value) {
          this.setState({emailInput: value})
      }

      handlePasswordInput(value) {
          this.setState({passwordInput: value})
      }

      onOpened = () => {
        console.log('this is opened')
      }

      onClosed = () => {
          console.log('this is closed')
      }

      onToken = (token) => {
          console.log(token)
          let {amount} = this.state
          amount /= 100
          console.log(amount)
          token.card = void 0 
          axios.post('/api/payment', {token, amount: this.state.amount}).then(res => {
              alert(`Congratulations you paid Kevin ${amount}`)
          })
      }

      render() {
          console.log(this.props)
          return (
              <div>
                <header>
                    <LandingH1 className='logo'>couponApp</LandingH1>
                    <div className='signIn'>
                        <LandingInput placeholder='email' value={this.state.emailInput} onChange={e => this.handleEmailInput(e.target.value)} /> 
                        <LandingInput placeholder='password' type="password" value={this.state.passwordInput} onChange={e => this.handlePasswordInput(e.target.value)} /> 
                        <LandingButtons className='button' onClick={() => this.login()}>Login</LandingButtons>
                    </div>
                </header>
                <div className='signUp'>
                    <LandingH1>Create an account!!</LandingH1>
                    <LandingInput placeholder='name' onChange={e => this.setState({nameInput: e.target.value})} /> 
                    <LandingInput placeholder='email' onChange={e => this.setState({ emailInput: e.target.value })} /> 
                    <LandingInput placeholder='password' type="password" onChange={e => this.setState({ passwordInput: e.target.value })} /> 
                    <LandingButtons className='button' onClick={() => this.signup()}>Sign Up</LandingButtons>
                </div>
                <div>
                    <StripeCheckout
                        name='Class'
                        stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        token={this.onToken}
                        amount={this.state.amount}
                        currency='USD'
                        panelLabel='Submit Payment'
                        locale='en'
                        opened={this.onOpened}
                        closed={this.onClosed}
                        billingAddress={false}
                        zipCode={false}
                    >
                    <LandingButtons>Donate</LandingButtons>
                    </StripeCheckout>
                        $
                        <LandingInput 
                        value={this.state.amount}
                        type='number'
                        onChange={ e => this.setState({amount: +e.target.value})}/>
                </div>
              </div>
          )
      }
}

function mapState(state) {
    return state 
}

export default withRouter(connect(mapState, {setUser}) (Landing))

const LandingButtons = styled.button`
      width: 80px;
      height: 49px;
      margin-top: 8px;
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
      border: 2px solid #4CAF50;
`

const LandingInput = styled.input`
    width: 251px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #4CAF50;
`

const LandingH1 = styled.h2`
    font-size: 2.5rem
    color: #4CAF50
    font-family: 'Bebas Neue'
`

