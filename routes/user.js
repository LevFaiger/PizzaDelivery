const express = require('express');
const router = express.Router();
const {createUser,
    updateUser,
    deleteUser
  } = require('../controllers/users');
  
router
  .route('/')
  .post(createUser);

router
  .route('/:id')
  .put(updateUser)
  .delete(deleteUser);
module.exports = router;