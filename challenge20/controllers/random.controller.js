import { fork } from 'child_process'
import { loggerConsole } from '../controllers/server.controllers.js'

export const randomControllerGet = (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const cnt = req.params.count && !isNaN(req.params.count) ? req.params.count : process.env.COUNT_RANDOM_NUMBERS
    const forked = fork('./utils/random.js')
    forked.on('message', msg => {
        if (msg == 'ready')
            forked.send(cnt)
        else
            res.json(msg.map(elem => `[${elem.number}] => ${elem.count} times`))
    })
}
