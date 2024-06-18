import mongoose from "mongoose";

const Schema = mongoose.Schema;
const VolenteerSchema = new Schema({
    _id: Number,
    id:String,
    firstName: String,
    lastName: String,
    phone: String,
    profession: Array
}, {versionKey: false});

const VolenteerModel = mongoose.model("volenteers", VolenteerSchema, 'volenteers');

export default VolenteerModel;