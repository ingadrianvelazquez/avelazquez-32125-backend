import CartDto from '../dtos/CartDto.js'
import CartDaoFactory from '../daos/cart/CartDaoFactory.js'
const cart = CartDaoFactory.getDaoSource();

export const cartControllerCreate = async (req, res) => {
    const data = req.body
    const newCart = new CartDto(data.products)
    res.json(await cart.save(newCart))
}

export const cartControllerGet = async (req, res) => {
    const elem = await cart.getById(req.params.id)
    res.json(elem)
}

export const cartControllerDelete = async (req, res) => {
    res.json(await cart.deleteById(req.params.id))
}

export const cartControllerAddProd = async (req, res) => {
    const idCart = req.params.id
    // BEFORE :: const prod = await catalog.getById(req.body.id_prod)
    // NOW :: normalized
    const prod = req.body.id_prod
    const actualCart = await cart.getById(idCart)
    if (actualCart.error)
        res.json(actualCart)
    else {
        actualCart.products.push(prod)
        res.json(await cart.update(idCart, actualCart))
    }
}

export const cartControllerDeleteProd = async (req, res) => {
    const idCart = req.params.id
    const actualCart = await cart.getById(idCart)
    if (actualCart.error)
        res.json(actualCart)
    else {
        const idProd = req.params.id_prod
        console.log(idProd)
        if (actualCart.products.find(elem => elem === idProd || elem._id.toString() === idProd)) {
            actualCart.products = actualCart.products.filter(elem => elem !== idProd && elem._id.toString() !== idProd)
            res.json(await cart.update(idCart, actualCart))
        } else
            res.json({ 'error': 2, 'description': `Element ID ${idProd} Not Found` })
    }
}
