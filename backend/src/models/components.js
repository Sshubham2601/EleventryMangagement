import mongoose, { Schema } from "mongoose";

const componentSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
  },
  dateReceived: {
    type: Date,
  },
  numberReceived: {
    type: Number,
  },
  dateDispatch: {
    type: Date,
  },
  numberDispatched: {
    type: Number,
  },
  balanceItems: {
    type: Number,
  },
  qrIdentifier: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type:String,
    default:"Pending"
  }
});

export const Component = mongoose.model("Component", componentSchema);
