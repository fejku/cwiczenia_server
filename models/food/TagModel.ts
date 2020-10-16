import mongoose, { Document, Schema } from "mongoose";
import ITag from "../../interfaces/food/ITag";

const TagSchema = new Schema({
  nazwa: String,
});

const TagModel = mongoose.model<ITag & Document>("Tag", TagSchema, "tagi");

export default TagModel;
