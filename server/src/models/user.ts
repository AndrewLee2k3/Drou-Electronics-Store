import {
  modelOptions,
  prop,
  getModelForClass,
  pre,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

@pre<User>("save", async function () {
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

  @prop({})
  public refreshToken?: string;
  
  public async isPasswordMatched(enteredPassword: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(enteredPassword, this.password);
    return isMatch;
  }
}

export const UserModel = getModelForClass(User);
