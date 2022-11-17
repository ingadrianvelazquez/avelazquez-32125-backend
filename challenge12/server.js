import { PORT, app, httpServer, io } from './controllers/server.controllers.js'
import { socketController } from './controllers/socket.controllers.js'
import { fakerRouter } from './routes/faker.routes.js'
import { sessionRouter } from './routes/session.routes.js'

app.use('/api/products-test', fakerRouter)
app.use('/', sessionRouter)

//listener
httpServer.listen(PORT, () => console.log(`Server UP on ${PORT}`));

io.on('connection', socket => socketController(socket))