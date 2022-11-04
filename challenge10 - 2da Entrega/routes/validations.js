const onlyAdmin = (req, res, next) => {
    let admin = req.get('Authorization') && req.get('Authorization') === 'admin' ? true : false
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

module.exports = onlyAdmin