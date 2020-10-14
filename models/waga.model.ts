import mongoose, { Document } from "mongoose";
import Waga from "../interfaces/waga.interface";

const WagaSchema = new mongoose.Schema({
  data: Date,
  wagaRano: Number,
  wagaWieczor: Number,
});

const WagaModel = mongoose.model<Waga & Document>("Waga", WagaSchema, "wagi");

export default WagaModel;
