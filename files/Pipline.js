export default function buildPipeline(id) {
    const pipeline = [
        {
            '$lookup': {
                'from': "status",
                'localField': "statusCode",
                'foreignField': "_id",
                'as': "statusInfo"
            }
        }, {
            '$lookup': {
                'from': 'location',
                'localField': 'locationCode',
                'foreignField': '_id',
                'as': 'locationInfo'
            }
        }, {
            '$lookup': {
                'from': 'priority',
                'localField': 'priorityCode',
                'foreignField': '_id',
                'as': 'priorityInfo'
            }
        }, {
            '$unwind': {
                'path': '$statusInfo',
            }
        }, {
            '$unwind': {
                'path': '$locationInfo',
            }
        }, {
            '$unwind': {
                'path': '$priorityInfo'
            }
        }, {
            '$addFields': {
                'priority': '$priorityInfo.name',
                'status': '$statusInfo.type'
            }
        }, {
            '$project': {
                '_id': 0,
                'statusInfo': 0,
                'statusCode': 0,
                'locationCode': 0,
                'priorityCode': 0,
                'priorityInfo': 0,
                'locationInfo._id':0
            }
        }
    ]
    if (id != null) {
        for (let i of id) {
            pipeline.splice(pipeline.length - 1, 0, i);
        }
    }
    return pipeline;
}