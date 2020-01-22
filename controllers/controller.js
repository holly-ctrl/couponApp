const  FormData = require('form-data')
const aws = require('aws-sdk')
const {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

module.exports = {
    addCoupon: (req, res) => {
        const db= req.app.get('db')
        const { product, expiration_date, category_id, url } = req.body
        console.log('weeeee',url)

        db.add_coupon([product, expiration_date, category_id, url])
            .then(result => {
                res.status(200).send(result)
            })
    },
    addCouponImage: (req, res) => {
        console.log('req.body', req.body)
        
        res.status(200).send(':ok res from addCouponImage')
    },
    getAllCoupons: (req, res) => {
        const db = req.app.get('db')

        db.get_all_coupons()
            .then(result => {
                res.status(200).send(result)
            })
    },
    deleteCoupon: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        db.delete_coupon(id)
        .then(data => res.status(200).send(data))
    },
    editCoupon: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const{product, expiration_date} = req.body

        db.edit_coupon([ product, expiration_date, +id])
        .then(data => 
            res.status(200).send(data))
    },
    signedRequest: (req, res) => {
        console.log(req.query)
        aws.config = {
          region: 'us-west-1',
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
          Expires: 60,
          ContentType: fileType,
          ACL: 'public-read'
        };
      
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            console.log(err, data)
          if(err){
            console.log(err);
            return res.end();
          }
          const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
          };
      
          return res.send(returnData)
        })
      }
}