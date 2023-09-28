const { swapiFunctions } = require('..');
const db = require('../db');
const { planetAPIToPlanetDB } = require('../mappers/planetMapper');

class Planet {
    constructor(id) {
        this.id = id;
    }

    async init() {
        let planetDB = await db.swPlanet.findByPk(this.id);
        if (!planetDB) {
            const planetSWAPI = await swapiFunctions.genericRequest(
                process.env.SWAPI_URL + `planets/${this.id}`,
                'GET'
            );
            planetDB = planetAPIToPlanetDB(this.id, planetSWAPI);
            await db.swPlanet.create(planetDB);
        }
        this.name = planetDB.name;
        this.gravity = planetDB.gravity;
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }
}
module.exports = Planet;
