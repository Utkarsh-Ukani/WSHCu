import User from "../models/user.model.js";

const options = {
  httpOnly: true, // prevent client-side JS from accessing the cookie
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

export const login = async (req, res) => {
  const { email, password } = req.body; // destructure the request body

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await user.matchPassword(password); // compare password with hashed password

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken(); // generate JWT token

    const loggedInUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).cookie("accessToken", token, options).json({
      message: "Login successful",
      user: loggedInUser,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body; // destructure the request body

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name, email and password" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({ name, email, password }).select("-password");

    //  Create empty cart for new user
    await Cart.create({ userId: newUser._id });

    const token = newUser.generateToken(); // generate JWT token

    return res
      .cookie("accessToken", token, options) // set cookie with JWT token
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  return res
    .clearCookie("accessToken", options) // clear the cookie
    .status(200)
    .json({ message: "Logout successful" });
};

export const getUser = async (req, res) => {
  const user = req.user; // get user from request object

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password field from response

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params; // get id from request parameters

  if (!id) {
    return res.status(400).json({ message: "Please provide user id" });
  }

  try {
    const user = await User.findById(id).select("-password"); // exclude password field from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params; // get id from request parameters
  const { name, email, password } = req.body; // destructure the request body

  if (!id) {
    return res.status(400).json({ message: "Please provide user id" });
  }

  try {
    const user = await User.findById(id); // find user by id

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save(); // save updated user

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params; // get id from request parameters

  if (!id) {
    return res.status(400).json({ message: "Please provide user id" });
  }

  try {
    const user = await User.findByIdAndDelete(id); // find and delete user by id

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const getUserByEmail = async (req, res) => {
  const { email } = req.params; // get email from request parameters

  if (!email) {
    return res.status(400).json({ message: "Please provide user email" });
  }

  try {
    const user = await User.findOne({ email }).select("-password"); // exclude password field from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}