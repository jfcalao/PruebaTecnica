const AbstractPeople = require('./abstractPeople');
const { Planet } = require('../Planet');

class WookieePeople extends AbstractPeople {
    constructor(id, app) {
        super(id, app);
    }

    async init() {
        const peopleSWAPI = await this.app.swapiFunctions.genericRequest(
            process.env.SWAPI_URL + `people/${this.id}?format=wookiee`,
            'GET'
        );
        let peopleFormated = await this.translateFromWookie(peopleSWAPI);

        this.name = peopleFormated.name;
        this.mass = peopleFormated.mass;
        this.height = peopleFormated.height;
        this.homeworldName = peopleFormated.homeworld_name;
        this.homeworldId = peopleFormated.homeworld_id;
    }

    async translateFromWookie(wookieeAPIPeople) {
        const planetID = Number(
            wookieeAPIPeople.acooscwoohoorcanwa.match(
                /\/akanrawhwoaoc\/(\d+)/
            )?.[1]
        );
        const planet = new Planet(planetID, this.app);
        await planet.init();
        return {
            id: this.id,
            name: wookieeAPIPeople.whrascwo,
            mass: wookieeAPIPeople.scracc,
            height: wookieeAPIPeople.acwoahrracao,
            homeworld_name: planet.name,
            homeworld_id: planetID,
        };
    }
}

module.exports = WookieePeople;
