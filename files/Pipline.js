
export default function buildPipeline(smallPipe) {
    const pipeline = [
        {
            '$lookup': {
                'from': 'statuses',
                'localField': 'status',
                'foreignField': '_id',
                'as': 'status_info'
            }
        }, {
            '$lookup': {
                'from': 'locations',
                'localField': 'locationCode',
                'foreignField': '_id',
                'as': 'location_info'
            }
        }, {
            '$lookup': {
                'from': 'preferences',
                'localField': 'preferenceCode',
                'foreignField': '_id',
                'as': 'preference_info'
            }
        }, {
            '$unwind': {
                'path': '$status_info'
            }
        }, {
            '$unwind': {
                'path': '$preference_info'
            }
        }, {
            '$unwind': {
                'path': '$location_info'
            }
        }, {
            '$addFields': {
                'preference': '$preference_info.preferenceName',
                'status': '$status_info.state'
            }
        }, {
            '$project': {
                'locationCode': 0,
                'location_info': 0,
                'status_info': 0,
                'preference_info': 0,
                'preferenceCode': 0
            }
        }
    ]
    for (let i of smallPipe) {
        pipeline.splice(pipeline.length - 1, 0, i);
    }

    return pipeline;
}