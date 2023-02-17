import { serve } from "https://deno.land/std@0.52.0/http/server.ts";
import * as colors from "https://deno.land/std@0.168.0/fmt/colors.ts"

const port = 4000
const server = serve({ port: port });
console.log(`Server UP on PORT ${port}`);

let colores = [];

const header = `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<title>DENO Server</title>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n\t<link href="css/style.css" rel="stylesheet">\n</head>\n<body>\n`;
const script = `<script>function upColor() {\n\tlet color = document.getElementById("color").value;\n\tdocument.getElementById("form").action = "/color=" + color;\n}\n</script>\n`;
const footer = `</body>\n</html>\n`;

const getColors = () => {
    return '<ul>' + colores.map(elem => `<li>${elem}</li>`).join('') + '</ul>';
}

const showColors = () => {
    for (const color of colores) {
        console.log(colors[color](color))
    }
}

for await (const req of server) {

    if (req.method == 'POST') {
        const color = req.url.replace('/color=', '');
        colores.push(color);
        console.log(colors[color](color))

        req.respond({
            body: `${header}<h1>Simple Deno Server Form</h1>\n\t<form id=form method=post onSubmit="upColor()">\n\t\t<input type=text placerholder=color id=color name=color>\n\t\t<input type=submit>\n\t</form>\n\t<pre>${getColors()}</pre>\n${script}${footer}`
        })

    } else {

        req.respond({
            body: `${header}<h1>Simple Deno Server Form</h1>\n\t<form id=form method=post onSubmit="upColor()">\n\t\t<input type=text placerholder=color id=color name=color>\n\t\t<input type=submit>\n\t</form>\n\t<pre>${getColors()}</pre>\n${script}${footer}`
        })
    }
}

