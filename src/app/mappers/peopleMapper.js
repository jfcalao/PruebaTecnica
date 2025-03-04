const { Planet } = require("../Planet");

const peopleAPIToPeopleDB = async (id, peopleAPI) => {
    const planetID = Number(peopleAPI.homeworld.match(/\/planets\/(\d+)/)?.[1]);
    const planet = new Planet(planetID);
    await planet.init();
    return {
        id,
        name: peopleAPI.name,
        mass: peopleAPI.mass,
        height: peopleAPI.height,
        homeworld_name: planet.name,
        homeworld_id: planetID,
    };
};

module.exports = {
    peopleAPIToPeopleDB,
};
