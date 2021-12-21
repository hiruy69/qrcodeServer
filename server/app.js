import express from 'express';
import bodyParser from 'body-parser';
import dao from './repositories/dao';
import { authenticated, authMiddleware } from './controllers/auth.controller';
import authRoutes from './routes/auth';
import itemsRoutes from './routes/items';
const session = require('express-session');
const cookieParser = require('cookie-parser');
import * as sqlite3 from 'sqlite3'
import sqliteStoreFactory from 'express-session-sqlite'
import db from './repositories/users'

const port = 3000;
export const app = express();

app.listen(port, () => console.log(`Node-JWT-SQLite-Starer is listening on port ${port}!`));
app.use(bodyParser.json());
app.use(authMiddleware);
app.use(cookieParser());

app.use(session({ secret: "super secret string" }));
const SqliteStore = sqliteStoreFactory(session)
app.use(session({
    store: new SqliteStore({
        driver: sqlite3.Database,
        path: ':memory:',
        ttl: 604800000, // 1 week in miliseconds
    }),
}));

app.post('/user', async (req, res) =>{
    const result = await db.createUser(req.body)
    res.status(200).json({id : result[0]})
})

//  Script to setup sqlite DB in memory //
dao.setupDbForDev();
////////////////////////////////////

app.use('/api/auth', authRoutes);
app.use('/api/items', authenticated, itemsRoutes);