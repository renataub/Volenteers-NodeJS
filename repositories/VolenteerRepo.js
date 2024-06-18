import VolenteerModel from '../models/VolenteerModel.js';
import connect from './db.js';

class VolenteerRepo {
    constructor(model) {
        this.model = model;
        connect();
    }
    async getAll() {
        let v = await this.model.find({}).exec();
        console.log(v);
        return v;
    }
    // async getById(id) {
    //     try {
    //         let a = byId(id );
    //         let volenteer = await this.model.aggregate(a).exec();
    //         if (!volenteer) {
    //             let error = new Error('volenteer is not found');
    //             error.statusCode = 404;
    //             throw error;
    //         }
    //         return volenteer;
    //     }
    //     catch (errors) {
    //         console.log(errors.message);
    //         throw new Error('Something wrong happened!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //     }
    // }

    async insert(data) {
        try {
            let volenteer = await this.model.create(data);
            return volenteer;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}
export default new VolenteerRepo(VolenteerModel);
