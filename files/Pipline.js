export default function buildPipeline() {
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
                'statusCode': 0,
                'locationCode':0,
                'priorityCode': 0 
            }
        }
    ]
    // for (let i of smallPipe) {
    //     pipeline.splice(pipeline.length - 1, 0, i);
    // }

    return pipeline;
}