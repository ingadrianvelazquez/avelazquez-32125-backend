export const viewOnConsole = () => {
    console.log('Arguments: ', process.argv)
    console.log('S.O.: ', process.env.OS)
    console.log('Platform: ', process.platform)
    console.log('Process ID: ', process.pid)
    console.log('Node: ', process.version)
    console.log('Total memory reserved (RSS): ', process.memoryUsage().rss)
    console.log('Exec Path: ', process.execPath)
    console.log('Project Folder: ', process.cwd())
}
