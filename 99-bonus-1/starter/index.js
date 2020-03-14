const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {

    if (req.url !== '/favicon.ico') {
        
        // true = query parsed into an object
        const pathName = url.parse(req.url, true).pathname;
        const id = url.parse(req.url, true).query.id;

        // PRODUCTS OVERVIEW
        if (pathName === '/products' || pathName === '/') {
            res.writeHead(200, { 'Content-type': 'text/html' });
            // res.end('This is the products page');

            fs.readFile(`${__dirname}/templates/overview.html`, 'utf-8', (err, data) => {

                let overviewOutput = data;

                // Read the CARD template as soon as the OVERVIEW template is read
                fs.readFile(`${__dirname}/templates/card.html`, 'utf-8', (err, data) => {

                    const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');

                    overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

                    res.end(overviewOutput);
                    
                });
            });

        // LAPTOP DETAIL
        } else if (pathName === '/laptop' && id < laptopData.length) {
            res.writeHead(200, { 'Content-type': 'text/html' });
            // res.end(`This is the page for laptop id ${id}`);

            fs.readFile(`${__dirname}/templates/laptop.html`, 'utf-8', (err, data) => {
                const laptop = laptopData[id];
                
                const output = replaceTemplate(data, laptop);

                res.end(output);
            });

        // IMAGES ROUTE (test if pathname contains img extensions)
        } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {

            // No need for character encoding
            fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
                res.writeHead(200, { 'Content-type': 'image/jpeg' });
                res.end(data);
            });
            
        // URL NOT FOUND
        } else {
            res.writeHead(404, { 'Content-type': 'text/html' });
            res.end('URL not found');
        }
    }

});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);

    return output;
}