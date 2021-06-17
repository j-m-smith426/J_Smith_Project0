import  Videogame, { VGame } from "@entities/Videogame";
import { ddb } from "@daos/DB/Dynamo";
import { GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";


export interface VgameDao{
    getOne: (id: number, name: string) => Promise<VGame|null>;
    //getAll: () => Promise<VGame[]>;
    add: (vGame: VGame) => Promise<void>;
    //update: (vGame: VGame) => Promise<void>;

}

class VideogameDao implements VgameDao{
    private TableName = 'VideoGameLIST';

    public async getOne(id:number, name: string): Promise<VGame|null>{
        
        const params = {
            TableName: this.TableName,
            Key: {
                ID: { N: `${id}`},
                NAME: {S: name}
            }

        };

        const data = await ddb.send(new GetItemCommand(params));
        let Vdata:VGame;
        if(data.Item !== undefined){
        Vdata = new Videogame( String(data.Item.NAME.S),Number(data.Item.ID.N), String(data.Item.SYSTEM.S),String(data.Item.GENRA.S));
        console.log("Success", Vdata);
        return Promise.resolve(null);
    }

       
        return Promise.resolve(null);
    }

    public async add(vGame: VGame): Promise<void>{
        console.log(vGame.NAME);
        const params = {
            TableName: this.TableName,
            Item: {
                ID: {N: `${vGame.ID}`},
                NAME: {S: vGame.NAME},
                SYSTEM: {S: vGame.SYSTEM},
                GENRA: {S: vGame.GENRA}
            }
        };

        try {
            const data = await ddb.send(new PutItemCommand(params));
            console.log(data);
            //return data;
          } catch (err) {
            console.error(err);
          }
    }



}
export default VideogameDao;