import connect from './db.js';
import Request from '../models/RequestModel.js';
import buildPipeline from '../files/Pipline.js';
 import { byParams, byId } from '../files/Filters.js';

class RequestRepo {
    constructor(model) {
        this.model = model;
        connect();
    }

    async getAll(params) {
        let id = byParams(params);
        const pipeline = buildPipeline(id);
        const aggregationResult = await this.model.aggregate(pipeline).exec();
        return aggregationResult;
    }

    // async getById(id) {
    //     try {
    //         let a = byId(id );
    //         let request = await this.model.aggregate(a).exec();
    //         if (!request) {
    //             let error = new Error('request is not found');
    //             error.statusCode = 404;
    //             throw error;
    //         }
    //         return request;
    //     }
    //     catch (errors) {
    //         console.log(errors.message);
    //         throw new Error('Something wrong happened');
    //     }
    // }

    async getById(id) {
        try {
            const smallPipe = byId(id);
            const pipeline = buildPipeline(smallPipe);
            let request = await this.model.aggregate(pipeline).exec();
            return request;
        }
        catch(errors){
            console.log(errors.message);
            throw new Error('An error occurred while retrieving the request. Please try again later');
        }
    }

    async update(id, data) {
        try {
            let req = await this.model.findByIdAndUpdate( { _id: id }, 
                { 
                    statusCode: 2, 
                    volenteerCode: data.id 
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