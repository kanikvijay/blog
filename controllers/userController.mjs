import User from "../models/userModel.mjs";
import bcrypt from "bcrypt";
import AsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const registerUser = AsyncHandler(async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;
  if (!username || !first_name || !last_name || !email || !password) {
    res.status(400);
    throw new Error("ALL FIELDS ARE MANDATORY");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already Registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password is", hashedPassword);
  const user = await User.create({
    username,
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(200).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ messsage: "register the user" });
});

const loginUser = AsyncHandler(async (req, res) => {
 
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  // compare password with hashed password
  console.log("i am in login")
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    console.log("i am in login")
    res.status(200).json({ message:"yessss"});
    // console.log(user);
    // return user;
  } else {
    res.status(401);
    throw new Error("email or password is Invalid");
  }
  res.json({ messsage: "login the user" });
});

const currentUser = AsyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
