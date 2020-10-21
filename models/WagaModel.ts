import mongoose, { Document } from "mongoose";
import Waga from "../interfaces/IWaga";

const WagaSchema = new mongoose.Schema({
  data: Date,
  waga: Number,
});

const WagaModel = mongoose.model<Waga & Document>("Waga", WagaSchema, "wagi");

export default WagaModel;
