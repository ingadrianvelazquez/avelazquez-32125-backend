import ProductDaoFactory from '../daos/product/ProductDaoFactory.js'
const catalog = ProductDaoFactory.getDaoSource();
import { loggerConsole } from './server.controllers.js'

export const productCategoryControllerGet = async (req, res) => {
    loggerConsole.info({ 'url': req.originalUrl, 'method': req.method })
    const datos = await catalog.getLeanByKeyValue('category', req.params.category)
    res.render('category.hbs', { username: req.session.passport.user.username, category: req.params.category, datos: datos, ruta: '.' })
}
