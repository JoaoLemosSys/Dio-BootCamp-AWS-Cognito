
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

var AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    
    let responseBody = ""
    let statusCode= 0
    
    let {id,price} = JSON.parse(event.body);
    
    const params = {
        TableName : 'dioItems',
        Item: {
            id: id ,
            price :price
        }
    }
    
    try 
    {
        await dynamodb.put(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify('Item inserido com sucesso');
        
    } catch (error)
    {
        statusCode=200;
        responseBody = JSON.stringify(error);
    }
    
    const response = 
    {
        statusCode: statusCode,
        body: responseBody
        
    }
    return response;
}