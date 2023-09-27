import {
  modelOptions,
  prop,
  getModelForClass,
  pre,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
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
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, unique: true })
  public tel!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: "user" })
  public role?: string;

  @prop({ default: false })
  public isBlocked?: boolean;

  @prop({ default: [] })
  public cart?: [];

  @prop()
  public refreshToken?: string;

  @prop()
  public passwordResetToken?: string;
  @prop()
  public passwordChangeAt?: Date;
  @prop()
  public passwordResetExpires?: Date;

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
