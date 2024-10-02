import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { UserFields, UserModel } from "../type";
import { randomUUID } from "crypto";

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified("username")) {
          return true;
        }
        const user = await User.findOne({ username: value });
        return !user;
      },
      message: "Этот пользователь уже зарегистрирован!",
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  displayName: String,
  googleId: String,
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = mongoose.model<UserFields, UserModel>("User", UserSchema);
export default User;
