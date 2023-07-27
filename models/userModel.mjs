import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide the username"],
      unique: [true, "username already taken,kindly choose another one"],
    },
    first_name: {
      type: String,
      required: [true, "please provide First Name"],
    },
    last_name: {
      type: String,
      required: [true, "please provide Last Name"],
    },
    email: {
      type: String,
      required: [true, "please provide the Email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Password validation regex pattern
          const regex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/;
          return regex.test(value);
        },
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and have a minimum length of 10 characters.",
      },
    },
  },
  {
    timestamps: true,
  }
);
const mymodel = mongoose.model("User", userSchema);
export default mymodel;
