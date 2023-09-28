const { swapiFunctions, db } = require('..');
const { Planet } = require('../Planet');
const { peopleAPIToPeopleDB } = require('../mappers/peopleMapper');

class AbstractPeople {
    constructor(id) {
        this.id = id;
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    async init() {
        let peopleDB = await db.swPeople.findByPk(this.id);
        if (!peopleDB) {
            const peopleSWAPI = await swapiFunctions.genericRequest(
                process.env.SWAPI_URL + `people/${this.id}`,
                'GET'
            );
            peopleDB = await peopleAPIToPeopleDB(this.id, peopleSWAPI);
            await db.swPeople.create(peopleDB);
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

    async getWeightOnPlanet(planetId) {
        if (Number(planetId) === Number(this.homeworldId))
            throw new Error('Is the same planet');

        const planet = new Planet(planetId);
        await planet.init();
        return swapiFunctions.getWeightOnPlanet(
            this.mass,
            planet.getGravity()
        );
    }
}
module.exports = AbstractPeople;
