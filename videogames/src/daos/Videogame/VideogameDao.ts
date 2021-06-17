import  Videogame, { VGame } from "@entities/Videogame";
import { ddb } from "@daos/DB/Dynamo";
import { DeleteItemCommand, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";


export interface VgameDao{
    getOne: (name: string) => Promise<VGame|null>;
    //getAll: () => Promise<VGame[]>;
    add: (vGame: VGame) => Promise<void>;
    update: (vGame: VGame) => Promise<void>;
    delete: (name:string) => Promise<void>;

}

class VideogameDao implements VgameDao{
    private TableName = 'VideoGameLIST';

    public async getOne(name: string): Promise<VGame|null>{
        
        const params = {
            TableName: this.TableName,
            Key: {
                NAME: {S: name}
            }

        };

        const data = await ddb.send(new GetItemCommand(params));
        let Vdata:VGame;
        
        if(data.Item !== undefined){
            let systems:string[] = String(data.Item.SYSTEM.SS).split(',');
             
        Vdata = new Videogame( String(data.Item.NAME.S),Number(data.Item.ID.N), systems,String(data.Item.GENRA.S));
        console.log("Success", Vdata);
        return Promise.resolve(Vdata);
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
                SYSTEM: {SS: vGame.SYSTEM},
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

    public async update(vGame: VGame): Promise<void>{
        //let vGameDb = await this.getOne(vGame.NAME)
       try{
        //    await this.delete(vGameDb.NAME);
        //    console.log("Success, entry deleted", vGameDb);
           await this.add(vGame);
           console.log("Success, entry updated", vGame);
       }catch(err){
           console.log(err);
       }
        
    }

    public async delete(name: string): Promise<void>{
        
        let vGameDb = await this.getOne(name);
        if(vGameDb){
            const params = {
                TableName: this.TableName,
                Key: {
                    NAME: {S: vGameDb.NAME},
                   
                }
            };

            try {
                const data = await ddb.send(new DeleteItemCommand(params));
                console.log("Success, table deleted", data);
               
              } catch (err) {
                if (err && err.code === "ResourceNotFoundException") {
                  console.log("Error: Table not found");
                } else if (err && err.code === "ResourceInUseException") {
                  console.log("Error: Table in use");
                }
              }
        }
    }


}
export default VideogameDao;