const socket = io()

const normalizer = normalizr
const denormalize = normalizer.denormalize
const schema = normalizer.schema

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMessage = new schema.Entity('messages', {
    author: schemaAuthor
})
const schemaChat = new schema.Entity('chat', {
    messages: [schemaMessage]
})



const buttonChat = document.querySelector('#btnChat')
buttonChat.addEventListener('click', e => {
    e.preventDefault()
    const emailInput = document.querySelector('#email').value
    const nameInput = document.querySelector('#name').value
    const surnameInput = document.querySelector('#surname').value
    const ageInput = document.querySelector('#age').value
    const aliasInput = document.querySelector('#alias').value
    const avatarInput = document.querySelector('#avatar').value
    const messageInput = document.querySelector('#message').value
    socket.emit('sendMessage', {
        email: emailInput,
        name: nameInput,
        surname: surnameInput,
        age: ageInput,
        alias: aliasInput,
        avatar: avatarInput,
        msg: messageInput
    })
    document.querySelector('#webchatForm').reset()
})

const buttonMsgRandom = document.querySelector('#btnMsgRandom')
buttonMsgRandom.addEventListener('click', e => {
    e.preventDefault()
    socket.emit('addMsgRandom')
})

const buttonProd = document.querySelector('#btnProd')
buttonProd.addEventListener('click', e => {
    e.preventDefault()
    const titleInput = document.querySelector('#name').value
    const descInput = document.querySelector('#desc').value
    const categoryInput = document.querySelector('#category').value
    const thumbInput = document.querySelector('#url').value
    const priceInput = document.querySelector('#price').value
    const stockInput = document.querySelector('#stock').value
    socket.emit('addProduct', { name: titleInput, desc: descInput, category: categoryInput, url: thumbInput, price: priceInput, stock: stockInput })
    document.querySelector('#catalogForm').reset()
})

// const buttonRandom = document.querySelector('#btnRandom')
// buttonRandom.addEventListener('click', e => {
//     e.preventDefault()
//     socket.emit('addProductRandom')
// })

const renderTemplate = (themeFile, data) => {
    return fetch(`../templates/${themeFile}.hbs`)
        .then(response => response.text())
        .then(template => {
            //https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options
            const theme = Handlebars.compile(template)
            const html = theme({ data })
            return html
        })
}

socket.on('updateCatalog', async catalog => {
    const products = await renderTemplate('products', catalog)
    document.querySelector('#productList').innerHTML = products
})

socket.on('updateMessages', async webchat => {
    //const msgs = await renderTemplate('webchat', webchat)
    const denormalizedData = await denormalize(webchat.result, schemaChat, webchat.entities)
    const msgs = await renderTemplate('webchat', denormalizedData.messages)
    document.querySelector('#messageList').innerHTML = msgs
})

socket.on('updateCompressRate', async compressRate => {
    document.querySelector('#compressRate').innerHTML = compressRate
})

socket.on('addToCartOK', async () => {
    document.querySelector('#msgCart').innerHTML = '<div class=msgCart>Add to Cart Success!</div>'
})


const deleteProduct = (id) => {
    socket.emit('deleteProduct', { id: id })
}

const addToCart = (id) => {
    const userEmail = document.querySelector('#username').value
    socket.emit('addToCart', { userEmail: userEmail, id: id })
}
