
export default function buildPipeline(smallPipe) {
    const pipeline = [
        {
            '$lookup': {
                'from': 'statuses',
                'localField': 'statusCode',
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
                'from': 'priorities',
                'localField': 'priorityCode',
                'foreignField': '_id',
                'as': 'priority_info'
            }
        }, {
            '$unwind': {
                'path': '$status_info'
            }
        }, {
            '$unwind': {
                'path': '$location_info'
            }
        }, {
            '$unwind': {
                'path': '$priority_info'
            }
        }, {
            '$addFields': {
                'priority': '$priority_info.preferenceName',
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