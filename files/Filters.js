function byParams(params) {

    let query = { status: new RegExp('w', 'i') };
    let locationFilter =[];

    if (params) {
        if (params.status) {
            query.status = new RegExp(params.status, 'i');
        }

        if (params.pereference) {
            query.pereference = new RegExp(params.pereference, 'i');
        }

        if (params.location) {
            locationFilter = [{'locationName': new RegExp(params.location, 'i') }]
            
        }
    }
    const pipeline = [{ '$match': query }]
    if (locationFilter.length > 0) {
        pipeline.push({ '$match': { '$or': locationFilter } });
    }
    pipeline.push({
        '$project': {
            'phone': 0,
            'volenteerId': 0
        }
    });
    return pipeline;
}

function byId(id) {
    const pipeline = [{ '$match': { '_id': Number(id) } }]
    return pipeline;
}

export { byParams, byId }