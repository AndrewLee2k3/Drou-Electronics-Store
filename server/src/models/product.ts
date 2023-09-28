import {
  modelOptions,
  prop,
  Ref,
  getModelForClass,
} from "@typegoose/typegoose";
import { User } from "./user";

export class Rating {
  public _id?: string;
  @prop()
  star?: number;

  @prop()
  comment?: string;

  @prop({ ref: User })
  postedby?: Ref<User>;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  save() {
    throw new Error("Method not implemented.");
  }
  public _id?: string;

  @prop({ required: true, trim: true })
  title!: string;

  @prop({ required: true, unique: true, lowercase: true })
  slug?: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  price!: number;

  @prop({ required: true })
  category!: string;

  @prop({ required: true })
  brand!: string;

  @prop({ required: true })
  quantity!: number;

  @prop({ default: 0 })
  sold?: number;

  @prop()
  images?: { public_id: string; url: string }[];

  @prop()
  color?: string[];

  @prop()
  tags?: string;

  @prop()
  ratings?: Rating[];

  @prop({ default: 0 })
  totalrating?: number;
}

export const ProductModel = getModelForClass(Product);
