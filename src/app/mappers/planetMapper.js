const planetAPIToPlanetDB = (planetAPI) => {
  return {
      id: planetAPI.id,
      name: planetAPI.name,
      gravity: Number(planetAPI.gravity.match(/\d+.\d+|\d+/)?.[0]),
  };
};

module.exports = {
  planetAPIToPlanetDB,
};
