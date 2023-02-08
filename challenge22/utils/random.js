let number = 0
const number_min = 1
const number_max = 1000

const generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

process.on('message', msg => {
    let ret = []
    for (let i = 0; i < msg; i++) {
        number = generateRandom(number_min, number_max)
        let found = ret.find(elem => elem.number === number)
        if (found)
            found.count++
        else
            ret.push({ number: number, count: 1 })
    }
    process.send(ret)
})

process.send('ready')
