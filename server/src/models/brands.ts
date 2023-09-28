import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Brand {
  public _id?: string;

  @prop({ required: true, trim: true, unique: true, index: true })
  title!: string;
}

export const BrandModel = getModelForClass(Brand);
