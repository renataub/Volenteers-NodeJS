import connect from './db.js';
import Request from '../models/RequestModel.js';
import buildPipeline from '../files/Pipline.js';
import { byParams, byId } from '../files/Filters.js';

class RequestRepo {
    constructor(model) {
        this.model = model;
        connect();
    }
    async getAll() {
        let v = await this.model.find({}).exec();
        console.log(v);
        return v;
    }
    // async getAll(params) {
    //     const sPipe = byParams(params);
    //     const pipeline = buildPipeline(sPipe);
    //     let requests = await this.model.aggregate(pipeline).exec();
    //     return requests;
    // }

    async getById(id) {
        try {
            let a = byId(id );
            let request = await this.model.aggregate(a).exec();
            if (!request) {
                let error = new Error('request is not found');
                error.statusCode = 404;
                throw error;
            }
            return request;
        }
        catch (errors) {
            console.log(errors.message);
            throw new Error('Something wrong happened');
        }
    }
    // async getById(id) {
    //     try {
    //         const sPipe = byId(id);
    //         const pipline = buildPipeline(sPipe);
    //         let req = await this.model.aggregate(pipline).exec();
    //         if (!req) {
    //             let error = new Error('req is not found');
    //             error.statusCode = 404;
    //             throw error;
    //         }

    //         return req;
    //     }
    //     catch (errors) {
    //         console.log(errors.message);
    //         throw new Error('An error occurred while retrieving the request. Please try again later');
    //     }
    // }

    async update(id, data) {
        try {
            let req = await this.model.findByIdAndUpdate( { _id: 1 }, 
                { 
                    statusCode: 2, 
                    volenteerCode: id 
                } );
            return req;
        }
        catch (errors) {
            console.log(errors.message);
            throw new Error("An error occurred while trying to update the request's status. Please try again later.");
        }
    }

 }
export default new RequestRepo(Request);