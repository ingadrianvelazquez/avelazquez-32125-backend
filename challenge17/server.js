import { PORT, app, httpServer, io, MODE, numCPUs, loggerConsole, loggerWarning } from './controllers/server.controllers.js'
import { socketController } from './controllers/socket.controllers.js'
import { fakerRouter } from './routes/faker.routes.js'
import { sessionRouter } from './routes/session.routes.js'
import { infoRouter } from './routes/info.routes.js'
import { randomRouter } from './routes/random.routes.js'
import cluster from 'cluster'

app.use('/api/products-test', fakerRouter)
app.use('/api/randoms', randomRouter)
app.use('/info', infoRouter)
app.use('/', sessionRouter)
//default
app.all('*', (req, res) => {
    loggerConsole.warn({ 'url': req.originalUrl, 'method': req.method })
    loggerWarning.warn({ 'url': req.originalUrl, 'method': req.method })
    res.status(404).json({ 'error': -1, 'description': `${req.method} on ${req.path} not implemented` })
})

//import { createFromScratch } from './utils/init.js'
//createFromScratch();

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