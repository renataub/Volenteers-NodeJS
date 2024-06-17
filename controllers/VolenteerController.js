import BaseController from "./BaseController.js";
import service from "../services/VolenteerService.js"

class VolenteerController extends BaseController {
    constructor(service) {
        super(service);        
    }

    async insert(req, res, next) {
        try {
            const response = await this.service.insert(req.body);
            return res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }
}
export default new VolenteerController(service);

