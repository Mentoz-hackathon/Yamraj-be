const userModel = require("../models/users");
const bcrypt = require('bcrypt');
const responseWrapper = require('../helpers/responseWrapper');


module.exports = {
  signupUser: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete details" });
    }
    try {
      let respo;
      const user = await userModel.findOne({ email });
      if (user) {
        respo = responseWrapper(null, "Already a user try signin in", 302);
        res.status(302).json(respo);
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({ email, password:hashedPassword, firstName, lastName });
      const savedUser = await newUser.save();

      console.log('User created successfully');
      respo = responseWrapper(savedUser, "success", 201);
      res.status(201).json(respo);
    } catch (err) {
      // console.error('Error creating user:', err);
      const respo = responseWrapper(null, err.message, 500);
      res.status(500).json(respo);
    }
  },
  
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Incomplete details" });
    }
    try {
      let respo;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(204).json({ message: "User not found" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        respo = responseWrapper(savedUser, "Invalid credentials", 400);
        res.status(400).json(respo);
      }
      console.log('User logged in successfully');
      respo = responseWrapper(user, "success", 200);
      res.status(200).json(respo);
    } catch (err) {
      // console.error('Error logging in user:', err);
      const respo = responseWrapper(null, err.message, 500);
      res.status(500).json(respo);
    }
  },
};
