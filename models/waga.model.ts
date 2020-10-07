import mongoose, { Document } from 'mongoose';
import Waga from "../interfaces/waga.interface";

const WagaSchema = new mongoose.Schema({
  data: Date,
  wagaRano: Number,
  wagaWieczorem: Number,
});

const WagaModel = mongoose.model<Waga & Document>('Waga', WagaSchema);
 
export default WagaModel;