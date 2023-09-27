import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Blog {
  public _id?: string;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  category!: string;

  @prop({ default: 0 })
  numViews?: number;

  @prop({
    default:
      "https://media.istockphoto.com/id/922745190/photo/blogging-blog-concepts-ideas-with-worktable.jpg?s=612x612&w=0&k=20&c=xR2vOmtg-N6Lo6_I269SoM5PXEVRxlgvKxXUBMeMC_A=",
  })
  images?: string;

  @prop({
    default: "Admin",
  })
  author?: string;

  @prop({ default: false })
  isLiked?: boolean;

  @prop({ default: false })
  isDisliked?: boolean;

  @prop({ ref: User })
  public likes?: Ref<User>[];

  @prop({ ref: User })
  public dislikes?: Ref<User>[];
}

export const BlogModel = getModelForClass(Blog);
