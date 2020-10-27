const Order = require('../models/Order')
const {GetCurrentUser} = require('../data/UserDB')
const {AddOrder} = require('../data/OrderDB')
var https= require('https');


// @desc Create order 
// @route Post /api/v1/orders
// @access public
exports.CreateOrder= async (req,res,next)=>{
    try {
        const { menu } = req.body;
        const user = GetCurrentUser(req);
        if(user && user.uuid){
        const order = new Order(user.uuid,menu)
        AddOrder(order);
        senDataToStripe(res);
        }
        else{
            res.status(200).json({success:false,menu:"user not exist"})
        }
    } catch (error) {
        next(error);
    }
}

const senDataToStripe = (res) =>{
  const requestDetails = {
              protocol: 'https:',
              hostname: 'api.stripe.com',
              port: 443,
              method: 'POST',
              path: '/v1/charges',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength("amount=5000&currency=usd&description=Tiago_1541865841578&source=tok_amex"),
                Authorization: `Bearer ${process.env.STRIPE_KEY}`
              }
            };
        
        
         var req = https.request(requestDetails, function(response){
         console.log(response.statusCode);
         var str = ''
         response.on('data', function (chunk) {
           str += chunk;
         });
       
         response.on('end', function () {
           console.log(str);
           res.status(200).json({success:true,stripe:str})
         });
     });
  
    
     req.on('error',function(e){
       callback(err, e);
     });
  
    
     req.on('timeout',function(){
       callback(true, {'Error': 'The request took much time and got timeout.'})
     });
  
     
     req.write("amount=5000&currency=usd&description=Tiago_1541865841578&source=tok_amex");
  
    
     req.end();
     }

