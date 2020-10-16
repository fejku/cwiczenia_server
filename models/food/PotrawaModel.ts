import mongoose, { Document, Schema } from "mongoose";
import IPotrawa from "../../interfaces/food/IPotrawa";

const PotrawaSchema = new Schema({
  nazwa: String,
  zdjecie: String,
  uwagi: String,
  link: String,
  tagi: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

const PotrawaModel = mongoose.model<IPotrawa & Document>("Potrawa", PotrawaSchema, "potrawy");

export default PotrawaModel;
