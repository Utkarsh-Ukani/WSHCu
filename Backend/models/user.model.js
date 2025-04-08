import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"; // for hashing passwords
import jwt from "jsonwebtoken"; // for generating JWT tokens

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentInfo: {
      type: Schema.Types.ObjectId,
      ref: "Payment"
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // if password is not modified, move to the next middleware
  }
  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash the password
  next(); // move to the next middleware
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // compare entered password with hashed password
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  }); // generate JWT token
}



const User = mongoose.model("User", userSchema); // create a model from the schema
export default User; // export the model
