const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.site.com';//o link do site que você quiser;

const app = express();
// app.get('/', (req, res) => {
//     res.json("this is my app!");
// });

// app.get('/result', () => {});
// app.post('/', () => {});
// app.put('/', () => {});
// app.delete('/', () => {});


axios(url).then(res => {
    const html = res.data
    const $ = cheerio.load(html)
    const articles = [];

    $('.class', html).each(function(){  //o nome da classe onde estão os links;
        const title = $(this).text();
        const link =  $(this).find('a').attr('href');
        articles.push({
            title,
            link
        });
    });
    console.log(articles);
    fs.writeFile('links.json', JSON.stringify(articles), (err) => { //cria um arquivo json com os links;
        if(err){ throw new err }
        else{ console.log("created!"); }
    })
}).catch(error => console.log(error));

app.listen(PORT, () => console.log(`running at ${PORT}`));