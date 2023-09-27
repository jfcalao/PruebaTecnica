const { peopleAPIToPeopleDB } = require("../mappers/peopleMapper");

class AbstractPeople {

    constructor(id, app) {
        this.id = id;
        this.app = app;
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init(){
        let peopleDB = await this.app.db.swPeople.findByPk(this.id);
        if (!peopleDB) {
            const peopleSWAPI = await this.app.swapiFunctions.genericRequest(
                process.env.SWAPI_URL + `people/${this.id}`,
                'GET'
            );
            peopleDB = await peopleAPIToPeopleDB(peopleSWAPI, this.app);
        }
        this.name = peopleDB.name;
        this.mass = peopleDB.mass;
        this.height = peopleDB.height;
        this.homeworldName = peopleDB.homeworld_name;
        this.homeworldId = peopleDB.homeworld_id;
    }

    getId() {
       return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworldId() {
        return this.homeworldId;
    }

    getWeightOnPlanet(planetId){
        throw new Error('To be implemented');
    }
}
module.exports = AbstractPeople;
