module.exports = {
    addCoupon: (req, res) => {
        const db= req.app.get('db')
        const { product, expiration_date, category_id } = req.body

        db.add_coupon(product, expiration_date, category_id)
            .then(result => {
                res.status(200).send(result)
            })
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
    }
}