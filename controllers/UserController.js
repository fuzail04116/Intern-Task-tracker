const User = require("../models/User");
const bcrypt = require("bcryptjs");


const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const { password: _, ...userData } = newUser.toObject();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addUser,
};
