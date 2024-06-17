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
        const sPipe = byParams(params);
        const pipeline = buildPipeline(sPipe);
        let requests = await this.model.aggregate(pipeline).exec();
        return requests;
    }

    async getById(id) {
        try {
            const sPipe = byId(id);
            const pipline = buildPipeline(sPipe);
            let req = await this.model.aggregate(pipline).exec();
            if (!req) {
                let error = new Error('req is not found');
                error.statusCode = 404;
                throw error;
            }

            return req;
        }
        catch (errors) {
            console.log(errors.message);
            throw new Error('An error occurred while retrieving the request. Please try again later');
        }
    }

    async update(id, data) {
        try {
            let req = await this.model.findByIdAndUpdate(id, data, { new: true });
            return req;
        }
        catch (errors) {
            console.log(errors.message);
            throw new Error("An error occurred while trying to update the request's status. Please try again later.");
        }
    }

}
export default new RequestRepo(Request);