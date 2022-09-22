const express = require("express");
const app = express();

const Container = require("./challenge2.js");
const productFile = new Container("./datafiles/products.txt");
const htmlFile = new Container("./public/home.html");

const getAllProducts = productFile.getAll();

const FOOTER = '</section></body></html>'

app.get("/", async (req, res) => {
    const common = await htmlFile.getPlainFile();
    res.send(common)
})

app.get("/products", async (req, res) => {
    const common = await htmlFile.getPlainFile();
    const result = await getAllProducts;
    res.send(common + `<pre>${JSON.stringify(result, null, 2)}</pre>` + FOOTER);
});

app.get("/randomProduct", async (req, res) => {
    const common = await htmlFile.getPlainFile();
    const result = await getAllProducts;
    const random = result[Math.floor(Math.random() * result.length)];
    res.send(common + `<pre>${JSON.stringify(random, null, 2)}</pre>` + FOOTER);
});

app.listen(process.env.PORT || 8080, () => console.log('Server UP'));

