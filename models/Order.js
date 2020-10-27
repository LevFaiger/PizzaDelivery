const { v4: uuidv4 } = require('uuid');
class Order {
    constructor(userId,menuItems){
        this.uuid= uuidv4();
        this.userId=userId;
        this.menuItems=menuItems;
    }
}

module.exports = Order