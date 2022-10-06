const socket = io()

const buttonChat = document.querySelector('#btnChat')
buttonChat.addEventListener('click', e => {
    e.preventDefault()
    const emailInput = document.querySelector('#email').value
    const messageInput = document.querySelector('#message').value
    socket.emit('sendMessage', { email: emailInput, msg: messageInput })
    document.querySelector('#webchatForm').reset()
})

const buttonProd = document.querySelector('#btnProd')
buttonProd.addEventListener('click', e => {
    e.preventDefault()
    const titleInput = document.querySelector('#title').value
    const priceInput = document.querySelector('#price').value
    const thumbInput = document.querySelector('#thumbnail').value
    socket.emit('addProduct', { title: titleInput, price: priceInput, thumbnail: thumbInput })
    document.querySelector('#catalogForm').reset()
})

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
    //const msgs = webchat.map(msg => `<p><i>${msg.date}</i><br>${msg.email} | ${msg.msg}</p>`).join('')
    const msgs = await renderTemplate('webchat', webchat)
    document.querySelector('#messageList').innerHTML = msgs
})
