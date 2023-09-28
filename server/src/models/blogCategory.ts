import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class BlogCategory {
  public _id?: string;

  @prop({ required: true, trim: true, unique: true, index: true })
  title!: string;
}

export const BlogCategoryModel = getModelForClass(BlogCategory);
