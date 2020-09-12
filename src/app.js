// Lanciare nodemon .\src\app.js -e js,hbs

const path = require('path');

const express = require('express');
const hbs = require('hbs'); // richiesto per usare i 'partials'
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// prova con una mia libreria
// uso la destrutturazione prendendo la funzione che mi serve e rinominandola in
// first2low
const {fistCharacterLow:first2low} = require('./stringstrong');

//----------------------------------------------------------
console.log(__dirname);
console.log(path.join(__dirname + '/../public')); // oppure
console.log(path.join(__dirname, '../public'));
//----------------------------------------------------------

//-------------- Inizializzo Express------------------------
const app = express();
//----------------------------------------------------------

//---------------- Directory per i partials-----------------
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);
//-----------------------------------------------------------

//-------------- Dico a Express di prendere una cartella per le views-------------
const viewsPath = path.join(__dirname, '../templates/views') // definisco la cartella di default di hbs che normalmente è views.
app.set('views', viewsPath); // dico ad express di puntare a tempaltes e non a views
//--------------------------------------------------------------------------------

//--------- dico ad express quale plugin usare come template handler -------------
app.set('view engine', 'hbs'); // per default serve la cartella views
//--------------------------------------------------------------------------------

//---------- Definisco una cartella per servire i file statici -------------------
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory)); // usata anche come default route /. Va a prendersi index.html
//--------------------------------------------------------------------------------

//----------------------------- Definisco le rotte -------------------------------
//--------------------------------------------------------------------------------

/**
 * Con il view template uso res.render al posto di res.send.
 *  res.render ha due argomenti:
 * 1) il nome della view, senza l'estensione;
 * 2) un oggetto che matcha i placeholder nella pagina html (view).
 * Nella view il placeholder ha la sintassi {{nome_placeholder}}
 */

app.get('', (req, res) => {
    res.render('index', { // passo un oggetto con i tag da sostituire nella pagina web
        title: 'Weather App',
        name: 'Antonio Fisone'
    }); // usa la pagina dinamica HBS
});

app.get('/about', (req, res) => {
    res.render('about', {
        data: '10/09/2020',
        title: 'About',
        name: 'Antonio Fisone'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page',
        data: '10/09/2020',
        title: 'Help',
        name: 'Antonio Fisone'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address supplied!'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (error) {
            console.log('errore!!')
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            });

        });

    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

/** -----------------------------------------------------------------------
 *                      Gestione errore 404
 * ------------------------------------------------------------------------
 */

// personalizza la pagina 404 per il path /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Antonio Fisone',
        errorMessage: 'Help article not found'
    });
});

//---------------------------------------------------------------------------
//                  questa sezione va per ultima nel routing
//---------------------------------------------------------------------------
app.get('*', (req, res) => { // per tutto il resto ritorna errore 404
    res.render('404', {
        title: '404',
        name: 'Antonio Fisone',
        errorMessage: 'Page not found'
    });
});
//---------------------------------------------------------------------------


//---------------------------------------------------------------------------
//                              Start Web Server                            -
//---------------------------------------------------------------------------
app.listen(3000, () => {
    console.log('Server is runnning on port 3000');
});
//---------------------------------------------------------------------------
