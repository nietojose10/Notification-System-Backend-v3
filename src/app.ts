import { envs } from './config';
import { MongoDatabase } from './database';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async()=>{
    main();
})();

async function main(){

    //DB initialization
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });

    //Server initialization
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    //Start server
    server.start();

}