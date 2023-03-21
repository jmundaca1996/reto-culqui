import * as pg from 'pg';

const cnx = new pg.Pool({
    user: 'postgres',
    password: 'postgres1996',
    host: 'clusterdb-instance-1.cn025jb3ruhw.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'postgres',
});

module.exports = cnx