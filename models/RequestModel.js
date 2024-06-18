import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    _id: Number,
    locationCode: Number,
    description: String,
    phone: String,
    statusCode: Number,
    numOfPeopleStuck: Number,
    priorityCode: Number,
    volenteerCode: String
}, { versionKey: false });
/*, 'helpRequest'*/
const RequestModel = mongoose.model('helpRequests', RequestSchema, 'helpRequest');

export default RequestModel;