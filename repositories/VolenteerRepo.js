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
    
    async getById(id) {
        try {
            let vol = await this.model.findById(id);
            return vol;
        }
        catch(errors){
            console.log(errors.message);
            throw new Error('An error occurred while retrieving the volunteer. Please try again later.');
        }
    }

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
