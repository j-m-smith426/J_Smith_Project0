import  VideogameDao from "./VideogameDao";
import { VGame } from "@entities/Videogame";
export interface SysDao{
    getAllSys: (name:string) => Promise<string[]| null>;
    addSys: (additionalSystem: string[], name:string) => Promise<void>;
    updateSys: (updatedSystems: string[], name:string) => Promise<void>;
    deleteSys: (deletedSystem: string, name:string) => Promise<void>;

}
const VGameDao = new VideogameDao();
class SystemDao implements SysDao{
    private TableName = 'VideoGameLIST';

    public async getAllSys(name:string): Promise<string[]| null>{
            console.log(name);
            let gSystems:VGame|null = await VGameDao.getOne(name);
            console.log(gSystems);
            
            if(gSystems){
            return gSystems.gameSYSTEM;
            }else {
                return null;
            }
            

    }

    public async addSys(additionalSystem: string[], name:string): Promise<void>{
        let game = await VGameDao.getOne(name);
        if(game){
            let Sys:string[] = game.gameSYSTEM;
        
            additionalSystem.forEach((presntSys) => {
                if(!Sys.includes(presntSys)){
                    
                    Sys.push(presntSys);
                }
            });
            game.gameSYSTEM = Sys;
            await VGameDao.add(game);
            console.log('Systems added');
            
        }else {
            console.log("Game not found");
        }
    }

    public async updateSys(updatedSystems:string[], name:string): Promise<void> {
        let game = await VGameDao.getOne(name);
        if(game){
            game.gameSYSTEM = updatedSystems;
            await VGameDao.add(game);
            console.log("Systems Updated")
        }else{
            console.log("Game not found");
        }
    }

    public async deleteSys(deletedSystem:string, name:string): Promise<void>{
        let game = await VGameDao.getOne(name);
        if(game){
            let oldSystems = game.gameSYSTEM;
            let updatedSystems:string[] = [];
            if(oldSystems.includes(deletedSystem)){
                oldSystems.forEach((oldSys) => {
                    if(oldSys !== deletedSystem){
                        updatedSystems.push(oldSys);
                    }
                });
            }else {
                console.log(`${name} dose not have system ${deletedSystem}`);
            }
            game.gameSYSTEM = updatedSystems;
            await VGameDao.add(game);
            console.log("Systems Updated")
        }else{
            console.log("Game not found");
        }
    }


}
export default SystemDao;