import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    _id: String,
    locationCode : Number, 
    description : String,
    phone:String,
    statusCode : Number,
    numOfPeopleStuck : Number,
    priorityCode : Number,
    volenteerCode : Number
},{versionKey:false});
/*, 'helpRequest'*/
const RequestModel = mongoose.model('helpRequests', RequestSchema);

export default RequestModel;