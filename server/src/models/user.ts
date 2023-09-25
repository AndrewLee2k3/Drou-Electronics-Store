import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: string;

  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public tel!: string;
}

export const UserModel = getModelForClass(User);
