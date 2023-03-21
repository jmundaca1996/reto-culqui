import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Game } from '../../model/game-lcr';
import schema from './schema';
import cnx  from '../../db/conection';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const input: string[] = [
    `3 LR.CCR.L.RLLLCLR.LL..R...CLR.`,
    `5 RL....C.L`,
    `0`
  ];

  const game = new Game(input);
  game.start();
  const result = await cnx.query(`SELECT * FROM tbl_entradas_lcr;`);
  return formatJSONResponse({
    message: game.dataResults()
  });
};

export const main = middyfy(hello);
