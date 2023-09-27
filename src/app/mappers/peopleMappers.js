
const peopleAPIToPeopleDB = async (peopleAPI, app) => {
    // console.log({peopleAPI})
    const planetID = Number(peopleAPI.homeworld.match(/\/planets\/(\d+)/)?.[1]);
    console.log({ planetID });
    return {
        id: peopleAPI.id,
        name: peopleAPI.name,
        mass: peopleAPI.mass,
        height: peopleAPI.height,
        // homeworld_name: planetName, TODO
        homeworld_id: planetID,
    };
};

module.exports = {
    peopleAPIToPeopleDB,
};
