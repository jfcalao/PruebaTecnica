const { peopleFactory } = require('../../app/People');
const { Planet } = require('../../app/Planet');

const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const peopleId = req.params.id;
        const lang = _isWookieeFormat(req) ? 'wookie' : '';
        const people = await peopleFactory(peopleId, lang, app);
        const response = {
            name: people.getName(),
            mass: people.getMass(),
            height: people.getHeight(),
            homeworldName: people.getHomeworldName(),
            homeworldId: people.getHomeworldId(),
        }
        res.status(200).json(response);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const planetId = req.params.id;
        const planet = new Planet(planetId, app);
        await planet.init();
        const response = {
            name: planet.getName(),
            gravity: planet.getGravity()
        }
        res.status(200).json(response);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        const MAX_PEOPLE_SWAPI = 82;
        const MAX_PLANETS_SWAPI = 60;
        const peopleRandomId = Math.floor(Math.random() * MAX_PEOPLE_SWAPI) + 1;
        const planetRandomId = Math.floor(Math.random() * MAX_PLANETS_SWAPI) + 1;
        const people = await peopleFactory(peopleRandomId, '', app);
        const peopleWeight = await people.getWeightOnPlanet(planetRandomId);
        res.send({ peopleWeight });
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;