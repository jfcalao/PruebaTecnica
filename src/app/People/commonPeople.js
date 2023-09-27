const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {
    constructor(id, app){
        super(id, app);
        // throw new Error("To be implemented");
    }
}

module.exports = CommonPeople;
