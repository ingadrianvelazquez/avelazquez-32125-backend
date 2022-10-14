const express = require('express')
const prodRouter = require('./routes/product.js')
const cartRouter = require('./routes/cart.js')
const PORT = process.env.PORT || 8080

let admin = false;
// to test this, I implemented querying the request header
// http://expressjs.com/en/api.html#req.get
// Authorization: admin

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const onlyAdmin = (req, res, next) => {
    admin = req.get('Authorization') && req.get('Authorization') === 'admin' ? true : false
    if (admin || req.method === 'GET') {
        next()
    } else {
        res.status(401)
            .json(
                {
                    'error': -1,
                    'description': `${req.method} on ${req.baseUrl}${req.path} not authorized`
                })
    }
}

app.use('/api/products', onlyAdmin, prodRouter)
app.use('/api/cart', cartRouter)

app.all('*', (req, res) => {
    res.status(404)
        .json(
            {
                'error': -1,
                'description': `${req.method} on ${req.path} not implemented`
            })
})

app.listen(PORT, () => console.log(`Server UP on ${PORT}`));
