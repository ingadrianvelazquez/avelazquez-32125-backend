import ProductDto from '../dtos/ProductDto.js'
import ProductDaoFactory from '../daos/product/ProductDaoFactory.js'
const catalog = ProductDaoFactory.getDaoSource();

export const productControllerGet = async (req, res) => {
    if (req.params.id)
        res.json(await catalog.getById(req.params.id))
    else
        res.json(await catalog.getAll())
}

export const productControllerCreate = async (req, res) => {
    const data = req.body
    //const prod = new ProductDto(data.name, data.desc, data.code, data.url, data.price, data.stock)
    const prod = new ProductDto(data)
    res.json(await catalog.save(prod))
}
