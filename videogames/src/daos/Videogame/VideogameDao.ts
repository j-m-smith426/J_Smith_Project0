import  Videogame, { VGame } from "@entities/Videogame";
import { ddb, ddbDoc } from "@daos/DB/Dynamo";
import { DeleteCommand, PutCommand, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";


export interface VgameDao{
    getOne: (name: string) => Promise<VGame|null>;
    getAll: () => Promise<VGame[]>;
    add: (vGame: VGame) => Promise<void>;
    update: (vGame: VGame) => Promise<void>;
    delete: (name:string) => Promise<void>;
    setID: () => Promise<number>;
    getID: (name:string) => Promise<number>;

}

class VideogameDao implements VgameDao{
    private TableName = 'VideoGameLIST'; //class variable to point to specified table
    /** Get a single games data
     * 
     * @params name
     * 
     * return VGame object or null
     */
    public async getOne(name: string): Promise<VGame|null>{
        //Set search peramaters
        
        const params = {
            TableName: this.TableName,
            IndexName: 'gameNAME-index',
            ExpressionAttributeValues: {
                ':gameNAME': name
            },
            KeyConditionExpression: "gameNAME = :gameNAME",
            
        };
        //Search for Game
        const data = await ddbDoc.send(new QueryCommand(params));
        let Vdata:VGame;
        //Check if data was retrieved
        if(data.Items !== undefined){
             //parse data into Videogame object
            for(let i of data.Items){    
                Vdata = new Videogame( i.gameNAME,i.ID, i.gameSYSTEM,i.GENRA, i.MultiPlayer);
                console.log("Success, Game retrieved", Vdata);
                return Promise.resolve(Vdata);
            }
        }
        //If data was not retrieved send null
        return Promise.resolve(null);
    }
    /** Add game to DB
     * 
     * @param VGame
     * 
     * return void
     */
    public async add(vGame: VGame): Promise<void>{
         //take in game object
        // //Check if it is already in the DB.
        // let vGameDB = await this.getOne(vGame.gameNAME);
        // if(vGameDB){
        //     vGame = vGameDB;
        // }
         //Parse game object into paramaters
        let MultiVale:boolean = vGame.Multiplayer.valueOf()
        const params = {
            TableName: this.TableName,
            Item: 
            {
                ID: vGame.ID,
                gameNAME: vGame.gameNAME,
                gameSYSTEM: vGame.gameSYSTEM,
                GENRA:  vGame.GENRA,
                MultiPlayer: MultiVale
            }
        };
        console.log(params.Item);
        //send parameters to DB
        try {
            const data = await ddbDoc.send(new PutCommand(params));
            console.log(data);
            //return data;
          } catch (err) {
            console.error(err);
          }
    }
    /** Update game in DB
     * 
     * @param vGame 
     */
    public async update(vGame: VGame): Promise<void>{
        //Check if game is in databased
        const params = {
            TableName: this.TableName,

            ExpressionAttributeValues: {
                ":gameName": vGame.gameNAME,
            },

            FilterExpression: "gameNAME = :gameName",
        };

        try {
            const data = await ddbDoc.send(new ScanCommand(params));
                if(data.Items){
                console.log("Success. Game Found: ", data.Items);
                //id = data.Items.length
             //parse data into Videogame object
             let vGameDb:Videogame;
             for(let i of data.Items){   
                vGameDb = new Videogame(i.gameNAME, i.ID, i.gameSYSTEM, i.GENRA, i.Multiplayer);
                //console.log(vGame);
                // assign new values to parameters
                if(vGameDb){
                    Object.entries(vGame).forEach(([key, item]) => {
                            vGameDb[`${key}`] = item;            
                    })
                // Overwrite game with new information
                await this.add(vGameDb);
                console.log("Success - item added or updated", vGameDb);
        }}}
            }catch(err){
                console.log(err);
            }
        
        }
       
    /** Delete a game from DB
     * 
     * @param name 
     */
    public async delete(name: string): Promise<void>{
        // Check if game is in DB
        let vGameDb = await this.getOne(name);
        console.log(vGameDb);
        if(vGameDb){
            // Assign values to params
            const params = {
                TableName: this.TableName,
                Key: {
                    ID: vGameDb.ID,
                    //gameNAME: vGameDb.gameNAME
                   
                }
            };
            //Send data to delete game
            try {
                const data = await ddbDoc.send(new DeleteCommand(params));
                console.log("Success, game deleted", data);
               
              } catch (err) {
                if (err && err.code === "ResourceNotFoundException") {
                  console.log("Error: Table not found");
                } else if (err && err.code === "ResourceInUseException") {
                  console.log("Error: Table in use");
                }
              }
        }else {
            throw new Error("Game not found");
        }
    }
    /**
     * 
     * @returns 
     */
    public async getAll(): Promise<VGame[]>{
        let games:VGame[] = []; //VGame array to hold games
        //Params to search for any game with id >= 0
        const params = {
            TableName: this.TableName,

            ExpressionAttributeValues: {
                ":id": 0,
            },

            FilterExpression: "ID >= :id",
        };
        //Submit scan request
        try {
            const data = await ddbDoc.send(new ScanCommand(params));
                if(data.Items){
                console.log("Success. Item details: ", data.Items);
                //id = data.Items.length
             //parse data into Videogame object and add to games
             for(let i of data.Items){
                let Vdata:VGame = new Videogame( i.gameNAME,i.ID, i.gameSYSTEM,i.GENRA, i.Multiplayer);
                games.push(Vdata);
             }
                }
          } catch (err) {
            console.log("Error", err);
          }
        return games;

    }
    /**
     * 
     * @returns 
     */
    public async setID(): Promise<number>{
        let id = 0; 
        //Get all games
        let allGames:VGame[] = await this.getAll();
        //assign id to next number
        id = allGames.length;
        return id;
    }
    /**
     * 
     * @param name 
     * @returns 
     */
    public async getID(name:string): Promise<number>{
        // params to searge by name
        const params = {
            TableName: this.TableName,

            ExpressionAttributeValues: {
                ":gameNAME": name,
            },

            FilterExpression: "gameNAME = :gameName",
        };
        // try to find game
        try {
            const data = await ddbDoc.send(new ScanCommand(params));
                if(data.Items){
                console.log("Success. Item details: ", data.Items);
                //id = data.Items.length
             //parse data into Videogame object
             for(let i of data.Items){
                let id = i.ID;
                if(id){
                    //return id for first item
                    return id;
                }
             }
                }
          } catch (err) {
            console.log("Error", err);
          }
          //if game not found make new id
          return this.setID();
        
    }


}
export default VideogameDao;