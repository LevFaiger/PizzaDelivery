const {GetMenu} = require('../data/MenuDB')
// @desc Get menu for the user 
// @route Get /api/v1/menu
// @access public
exports.getMenu=(req,res,next)=>{
    try {
        const menu = GetMenu();
        res.status(200).json({success:true,menu:menu})
    } catch (error) {
        next(error);
    }
}
