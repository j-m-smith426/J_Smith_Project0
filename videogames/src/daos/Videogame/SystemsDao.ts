import { ddb } from "@daos/DB/Dynamo";
import { DeleteItemCommand, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import  VideogameDao from "./VideogameDao";
import { VGame } from "@entities/Videogame";
export interface SysDao{
    getAll: (name:string) => Promise<string[]>;
    //add: (system: String) => Promise<void>;
    //update: (systems: String[]) => Promise<void>;
    //delete: (system: String) => Promise<void>;

}
const VGameDao = new VideogameDao();
class SystemDao implements SysDao{
    private TableName = 'VideoGameLIST';

    public async getAll(name:string): Promise<string[]>{
            console.log(name);
            let gSystems:VGame|null = await VGameDao.getOne(name);
            let sysD = ["",""];
            if(gSystems){
            return gSystems.gameSYSTEM;
            }
            return sysD;

    }



}
export default SystemDao;