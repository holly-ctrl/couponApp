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
            url: '',
            showPopup: false
        }

        this.getSignedRequest = this.getSignedRequest.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.onAddCouponClick = this.onAddCouponClick.bind(this)
    }

    onUrlChange(e) {
        this.setState({
            url: e.target.value
        })
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
            this.uploadFile(file, signedRequest, url)
            // this.setState({
            //     url
            // }) 
            console.log('signed request from aws:', signedRequest)
            console.log('url from aws:', url);

          }).catch( err => {
            console.log(err)
          })
    }
    uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, url });
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    onAddCouponClick(category) {
        axios
            .post('/api/addCoupon', {
                product: this.state.product,
                expiration_date: this.state.expirationDate,
                category_id: category,
                url: this.state.url
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
                        <h2>Add a new coupon:</h2>
                        <Dropzone 
                            onDropAccepted={this.getSignedRequest}
                            onChange={e => this.onUrlChange(e)}
                            style={{
                                position: 'relative',
                                width: 200,
                                height: 200,
                                borderWidth: 7,
                                marginTop: 100,
                                borderColor: 'rgb(102, 102, 102)',
                                borderStyle: 'dashed',
                                borderRadius: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 28,
                            }}
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