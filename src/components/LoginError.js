import React from 'react'
import {Link} from 'react-router-dom'

const LoginError = (props) => {
    const { location } = props || {}
    const { state } = location || {}
    const { message} = state || ''

    return (
        <div>
            <div> Login Error </div>
            <div>{message}</div>
            <Link to='/'>Back to Login</Link>
        </div>
    )
}

export default LoginError