import { PORT, app, httpServer, io, MODE, numCPUs, loggerConsole, loggerWarning } from './controllers/server.controllers.js'
import { socketController } from './controllers/socket.controllers.js'
import { fakerRouter } from './routes/faker.routes.js'
import { sessionRouter } from './routes/session.routes.js'
import { configRouter } from './routes/config.routes.js'
import { infoRouter } from './routes/info.routes.js'
import { randomRouter } from './routes/random.routes.js'
import { productRouter } from './routes/product.routes.js'
import { productWebRouter } from './routes/productweb.routes.js'
import { myCartRouter } from './routes/mycart.routes.js'
import { orderRouter } from './routes/order.routes.js'
import { chatRouter } from './routes/chat.routes.js'
import { cartRouter } from './routes/cart.routes.js'
import cluster from 'cluster'

// passport
import passport from 'passport'
import { initPassport } from './controllers/passport.controllers.js'
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products-test', fakerRouter)
//app.use('/api/products', onlyAdmin, productRouter)
app.use('/api/products', productRouter)
app.use('/api/randoms', randomRouter)
app.use('/api/orders', orderRouter)
app.use('/api/chat', chatRouter)
app.use('/api/cart', cartRouter)
app.use('/products', productWebRouter)
app.use('/mycart', myCartRouter)
app.use('/config', configRouter)
app.use('/info', infoRouter)
app.use('/', sessionRouter)
//default
app.all('*', (req, res) => {
    loggerConsole.warn({ 'url': req.originalUrl, 'method': req.method })
    loggerWarning.warn({ 'url': req.originalUrl, 'method': req.method })
    res.status(404).json({ 'error': -1, 'description': `${req.method} on ${req.path} not implemented` })
})

if (MODE == 'CLUSTER' && cluster.isPrimary) {
    loggerConsole.info(`Threads: ${numCPUs}`)
    for (let aux = 0; aux < numCPUs; aux++)
        cluster.fork()

    cluster.on('exit', worker => {
        loggerConsole.info(`Worker`, worker.process.pid, 'died', new Date().toLocaleString())
        //cluster.fork()  //get up another
    })
} else {
    process.on('exit', code => {
        loggerConsole.info(`Exit code: ${code}`)
    })

    //listener
    httpServer.listen(PORT, () => loggerConsole.info(`Server UP on ${PORT} with processID: ${process.pid}`));
    io.on('connection', socket => socketController(socket))

}
export { httpServer }