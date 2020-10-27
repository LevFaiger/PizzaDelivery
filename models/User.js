const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
class User {
    constructor(name,email,password,address) {
      this.uuid = uuidv4();
      this.name = name || null;
      this.email = email  || null;
      this.password = password || null;
      this.address = address || null;
    }
    getJwtToken (){
      return jwt.sign({ id: this.uuid }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    }
    async encrypt(){
      const salt = await bcrypt.genSalt(1);
      this.password = await bcrypt.hash(this.password, salt);
    }
    async matchPassword  (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
  }
  module.exports = User