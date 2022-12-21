import { loggerConsole } from '../controllers/server.controllers.js'
const child = loggerConsole.child({ 'childON': 'ProcessInfo' })

export const viewOnConsole = () => {
    child.info('Arguments: ', process.argv)
    child.info('S.O.: ', process.env.OS)
    child.info('Platform: ', process.platform)
    child.info('Process ID: ', process.pid)
    child.info('Node: ', process.version)
    child.info('Total memory reserved (RSS): ', process.memoryUsage().rss)
    child.info('Exec Path: ', process.execPath)
    child.info('Project Folder: ', process.cwd())
}
