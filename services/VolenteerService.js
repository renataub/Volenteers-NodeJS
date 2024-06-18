import repo from "../repositories/VolenteerRepo.js";
import BaseService from "./BaseService.js";

class VolenteerService extends BaseService {
    constructor(repo) {
        super(repo);
    } 
    async insert(data){
        try{
            let volenteer = await this.repo.insert(data);
            return volenteer;
        }
        catch(errors){
            console.log(errors);
            throw new Error("unable to add volenteer.")
        }
    }
}
export default new VolenteerService(repo);