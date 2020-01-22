import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Dropzone from 'react-dropzone'
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
            image: null,
            isUploading: false,
            showPopup: false
        }

        this.getSignedRequest = this.getSignedRequest.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.onAddCouponClick = this.onAddCouponClick.bind(this)
    }

    onProductChange(e) {
        this.setState({
            product: e.target.value
        })
    }

    onStoreChange(e) {
        this.setState({
            store: e.target.store
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

    togglePopup(e) {
        e.preventDefault()
        let image = null 
        if (this.fileInput.current) {
            image = this.fileInput.current.files[0] 
        }
        if (image && image.size > 1048576) {
            window.alert('image too big, max 10Mb')
            return
        }
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    imageSelect(e) {
        console.log('e.target.files[0]', e.target.files[0])
        this.setState({
            image: e.target.files[0]
        })
    }

    getSignedRequest([file]) {
        this.setState({isUploading: true})

        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
        console.log(fileName)
        axios.get('/sign-s3', {
            params: {
              'file-name': fileName,
              'file-type': file.type
            }
          }).then( (response) => {
            const { signedRequest, url } = response.data 
            // this.uploadFile(file, signedRequest, url)

            console.log('signed request from aws:', signedRequest)
            console.log('url from aws:', url);

          }).catch( err => {
            console.log(err)
          })
    }

    onAddCouponClick(category) {
        const imageData = new FormData()
        console.log('this.state.image', this.state.image)
        imageData.append('imageData', this.state.image)
        for (const v of imageData.values()) {
            console.log('value of imageData', v)
        }

        axios
            .post('/api/addCouponImage', imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
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
                    <div className='form'>
                        <Dropzone 
                            onDropAccepted={this.getSignedRequest}
                            // style={{
                            //     position: 'relative',
                            //     width: 200,
                            //     height: 200,
                            //     borderWidth: 7,
                            //     marginTop: 100,
                            //     borderColor: 'rgb(102, 102, 102)',
                            //     borderStyle: 'dashed',
                            //     borderRadius: 5,
                            //     display: 'flex',
                            //     justifyContent: 'center',
                            //     alignItems: 'center',
                            //     fontSize: 28,
                            // }}
                            accept='image/*'
                            multiple={false} 
                        > 
                            {({getRootProps, getInputProps}) => (
                                this.state.isUploading
                                    ? <div>file uploading</div>
                                    : <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div>drag and drop or click to upload image</div>
                                    </div>
                            )}
                        </Dropzone> 
                        Product Name:<input value={this.product} onChange={e => this.onProductChange(e)}  ></input>
                        Expiration Date: <input type='date' value={this.expiration_date} onChange={e => this.onExpirationDateChange(e)} placeholder='Expiration Date'></input>
                        <button onClick={e => this.togglePopup(e)} className='addButton'>Add</button>
                    </div>
                </div>
                {this.state.showPopup && <Popup closePopup={this.togglePopup} onAddCouponClick={this.onAddCouponClick} />}
                <button className='logoutButton' onClick={() => this.logout()}>Logout</button>
            </div>
        )
    }
}

export default Welcome 