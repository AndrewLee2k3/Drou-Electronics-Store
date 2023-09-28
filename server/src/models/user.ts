import {
  modelOptions,
  prop,
  getModelForClass,
  pre,
  Ref,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Product } from "./product";
@pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt: string = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: string;

  @prop({ required: true })
  firstname!: string;

  @prop({ required: true })
  lastname!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true, unique: true })
  tel!: string;

  @prop({ required: true })
  password!: string;

  @prop({ default: "user" })
  role?: string;

  @prop({ default: false })
  isBlocked?: boolean;

  @prop({ default: [] })
  cart?: [];

  @prop()
  refreshToken?: string;

  @prop({ ref: Product })
  wishlist?: Ref<Product>[];

  @prop()
  passwordResetToken?: string;
  @prop()
  passwordChangeAt?: Date;
  @prop()
  passwordResetExpires?: Date;

  public async isPasswordMatched(enteredPassword: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(enteredPassword, this.password);
    return isMatch;
  }

  public async createPasswordResetToken(): Promise<string> {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000); // 10 minutes
    return resetToken;
  }
}

export const UserModel = getModelForClass(User);
