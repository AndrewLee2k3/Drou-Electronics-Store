import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Coupon {
  public _id?: string;

  @prop({ required: true, uppercase: true, unique: true })
  name!: string;

  @prop({ required: true })
  expriry!: Date;

  @prop({ required: true })
  discount!: number;
}

export const CouponModel = getModelForClass(Coupon);
