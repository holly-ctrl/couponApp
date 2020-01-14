import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../ducks/reducer'
import './Landing.css'

class Landing extends Component {
      constructor() {
          super()

          this.state = {
              nameInput: '',
              emailInput: '',
              passwordInput: '',
              user: {}
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

      render() {
          return (
              <div>
                <header>
                    <h1>couponApp</h1>
                    <div className='signIn'>
                        <input placeholder='email' value={this.state.emailInput} onChange={e => this.handleEmailInput(e.target.value)} /> 
                        <input placeholder='password' type="password" value={this.state.passwordInput} onChange={e => this.handlePasswordInput(e.target.value)} /> 
                        <button className='button' onClick={() => this.login()}>Login</button>
                    </div>
                </header>
                <div className='signUp'>
                    <input placeholder='name' onChange={e => this.setState({nameInput: e.target.value})} /> 
                    <input placeholder='email' onChange={e => this.setState({ emailInput: e.target.value })} /> 
                    <input placeholder='password' type="password" onChange={e => this.setState({ passwordInput: e.target.value })} /> 
                    <button className='button' onClick={() => this.signup()}>Sign Up</button>
                </div>
              </div>
          )
      }
}

export default withRouter(connect(null, {setUser}) (Landing))