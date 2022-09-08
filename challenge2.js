const fs = require('fs')

class Container {
    constructor(pathFile) {
        this.pathFile = pathFile
        //create file if not exists
        if (!fs.existsSync(this.pathFile)) {
            fs.writeFileSync(this.pathFile, '[]', { encoding: "utf-8" })
        }
    }

    #readFile = async () => {
        try {
            const content = await fs.promises.readFile(this.pathFile, 'utf-8')
            const parsedContent = await JSON.parse(content)
            return parsedContent
        } catch (err) {
            console.error(err);
        }
    }

    save = async (object) => {
        const content = await this.#readFile()
        try {
            // I don't call the getProductCount method to not read the file again
            const idCreated = await content.length > 0 ? content[content.length - 1].id + 1 : 1
            await fs.promises.writeFile(this.pathFile, JSON.stringify([...content, { ...object, id: idCreated }], null, 2), 'utf-8')
            return idCreated
        } catch (err) {
            console.log('SAVE error > ' + err)
        }
    }

    getById = async (id) => {
        const content = await this.#readFile()
        console.log(content.filter(prod => prod.id === id))
    }

    getAll = async () => {
        const content = await this.#readFile()
        console.log(content)
    }

    deleteById = async (id) => {
        let content = await this.#readFile()
        content = await content.filter(prod => prod.id !== id)
        await fs.promises.writeFile(this.pathFile, JSON.stringify(content, null, 2), 'utf-8')
        console.log('delete OK')
    }

    deleteAll = async () => {
        await fs.promises.writeFile(this.pathFile, '[]', 'utf-8')
        console.log('delete OK')
    }

    getProductCount = async () => {
        let content = await this.#readFile()
        console.log('--> #Prods: ' + content.length);
    }

}

const testing = async () => {
    const testContainer = new Container('./datafiles/products.txt')

    console.log('--- add products --- ')
    for (let idx = 1; idx < 4; idx++) {
        let newID = await testContainer.save({ title: 'producto #' + idx, prices: idx * 123, thumbnail: 'https://cf.shopee.sg/file/06b4f2ae620ef8577b3ed6a0bb00c26e' })
        console.log('new ID > ' + newID)
    }

    await testContainer.getProductCount()

    console.log('--- getAll ---')
    await testContainer.getAll();

    console.log('--- getById(2) :: founded ---')
    await testContainer.getById(2);

    console.log('--- delete prod id:2 ---')
    await testContainer.deleteById(2);

    console.log('--- getById(2) :: deleted ---')
    await testContainer.getById(2);

    await testContainer.getProductCount()

    console.log('--- deleteAll ---')
    await testContainer.deleteAll(2);

    await testContainer.getProductCount()
}

testing();

