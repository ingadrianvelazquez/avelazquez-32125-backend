import { PORT, app, httpServer, io } from './controllers/server.controllers.js'
import { socketController } from './controllers/socket.controllers.js'
import { fakerRouter } from './routes/faker.routes.js'
import { sessionRouter } from './routes/session.routes.js'
import { infoRouter } from './routes/info.routes.js'
import { randomRouter } from './routes/random.routes.js'

app.use('/api/products-test', fakerRouter)
app.use('/api/randoms', randomRouter)
app.use('/info', infoRouter)
app.use('/', sessionRouter)
//default
app.all('*', (req, res) => {
    res.status(404).json({ 'error': -1, 'description': `${req.method} on ${req.path} not implemented` })
})

//listener
httpServer.listen(PORT, () => console.log(`Server UP on ${PORT}`));

io.on('connection', socket => socketController(socket))