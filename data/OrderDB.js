const {Orders} = require('../data/MemoryData');


const AddOrder = (order)=>{
    Orders.push(order);
}

module.exports = {AddOrder}