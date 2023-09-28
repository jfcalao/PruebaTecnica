const AbstractPeople = require('./abstractPeople');

class CommonPeople extends AbstractPeople {
    constructor(id, app){
        super(id, app);
    }
}

module.exports = CommonPeople;
