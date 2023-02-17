import { serve } from "https://deno.land/std@0.52.0/http/server.ts";
import * as colors from "https://deno.land/std@0.168.0/fmt/colors.ts"

const port = 4000
const server = serve({ port: port });
console.log(`Server UP on PORT ${port}`);

let colores = [];

const header = `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<title>DENO Server</title>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n\t<link href="css/style.css" rel="stylesheet">\n</head>\n<body>\n`;
const form = `<h1>Simple Deno Server Form</h1>\n\t<form id=form method=post onSubmit="upColor()">\n\t\t<input type=text placerholder=color id=color name=color>\n\t\t<input type=submit value=Send>\n\t</form>\n\t`;
const script = `<script>function upColor() {\n\tlet color = document.getElementById("color").value;\n\tdocument.getElementById("form").action = "/color=" + color;\n}\n</script>\n`;
const footer = `</body>\n</html>\n`;

const getColors = () => {
    return '<ul>' + colores.map(elem => `<li>${elem}</li>`).join('') + '</ul>';
}

for await (const req of server) {

    if (req.method == 'POST') {
        const color = req.url.replace('/color=', '');
        colores.push(color);
        console.log(colors[color](color))
    }
    req.respond({
        body: `${header}${form}<pre>${getColors()}</pre>\n${script}${footer}`
    })
}

