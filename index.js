const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const app = express();
//app.use(express.json());
app.use(cors());
const url = process.env.LINK_URL;//o link do site que você quiser;

app.get('/', (req, res) => {
    res.json("this is my app!");
});

app.get('/result', (req, res) => {
    axios(url).then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = [];
    
        $('.fc-slice-wrapper', html).each(function(){  //o nome da classe onde estão os links;
            const title = $(this).text();
            const link =  $(this).find('a').attr('href');
            articles.push({
                title,
                link
            });
        });
        res.json(articles);  
    }).catch(error => console.log(error));
});

// axios(url).then(res => {
//     const html = res.data
//     const $ = cheerio.load(html)
//     const articles = [];

//     $('.class', html).each(function(){  //o nome da classe onde estão os links;
//         const title = $(this).text();
//         const link =  $(this).find('a').attr('href');
//         articles.push({
//             title,
//             link
//         });
//     });
//     console.log(articles);
//     fs.writeFile('links.json', JSON.stringify(articles), (err) => { //cria um arquivo json com os links;
//         if(err){ throw new err }
//         else{ console.log("created!"); }
//     })
// }).catch(error => console.log(error));

app.listen(PORT, () => console.log(`running at ${PORT}`));