import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { Game } from '../../model/game-lcr';
import schema from './schema';
import{ v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const input: string[] = [
    `3 LR.CCR.L.RLLLCLR.LL..R...CLR.`,
    `5 RL....C.L`,
    `0`
  ];
  const game = new Game(input);
  game.start();
  const results = game.dataResults();
  const id : string = uuidv4();
  const responses : any = [];
  for(let i = 0; i < results.length; i++){
    const data = await insertDynamo(results[i],id);
    responses.push(data);
  }
  return formatJSONResponse({
    responses
  });
};

const insertDynamo = async (data : any, uuid : string) => {
  // data['id'] = uuid;
  const item = {
    id: uuid,
    ...data
  }
  console.log('logger', item);
  // const registro = JSON.parse(item)
  const params = {
    TableName: 'tbl_lcr',
    Item: item,
  };
  await dynamoDb.put(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
}

export const main = middyfy(hello);
