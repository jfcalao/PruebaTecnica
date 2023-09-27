const { planetAPIToPlanetDB } = require("../mappers/planetMapper");

class Planet {
    constructor(id, app){
        this.id = id;
        this.app = app;
    }

    async init(){
        let planetDB = await this.app.db.swPlanet.findByPk(this.id);
        if (!planetDB) {
            const planetSWAPI = await this.app.swapiFunctions.genericRequest(
                process.env.SWAPI_URL + `planets/${this.id}`,
                'GET'
            );
            planetDB = planetAPIToPlanetDB(planetSWAPI);
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
module.exports = Planet
