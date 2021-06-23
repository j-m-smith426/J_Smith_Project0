import  VideogameDao from "./VideogameDao";
import { VGame } from "@entities/Videogame";
import { deleteSystems, updateSystems } from "src/routes/Systems";
export interface SysDao{
    getAllSys: (name:string) => Promise<string[]| null>;
    addSys: (additionalSystem: string[], name:string) => Promise<void>;
    updateSys: (updatedSystems: string[], name:string) => Promise<void>;
    deleteSys: (deletedSystem: string[], name:string) => Promise<void>;

}
const VGameDao = new VideogameDao();
class SystemDao implements SysDao{
    private TableName = 'VideoGameLIST';

    /** Return all Systems of Game
     * 
     * @param name 
     * @returns 
     */
    public async getAllSys(name:string): Promise<string[]| null>{
            console.log(name);
            //retrieve game
            let gSystems:VGame|null = await VGameDao.getOne(name);
            //if successful return systems
            if(gSystems){
            return gSystems.gameSYSTEM;
            }else {
                return null;
            }
            

    }

    /** Add a system to specified game
     * 
     * @param additionalSystem 
     * @param name 
     */
    public async addSys(additionalSystem: string[], name:string): Promise<void>{
        let game = await VGameDao.getOne(name);
        // retrieve game
        if(game){
            // create an array to work with from loaded game system
            let Sys:string[] = game.gameSYSTEM;
            //go thorough new array of systems and add any not already included
            additionalSystem.forEach((presntSys) => {
                if(!Sys.includes(presntSys)){
                    
                    Sys.push(presntSys);
                }
            });
            //reassign game systems with new array
            game.gameSYSTEM = Sys;
            //add back to database
            await VGameDao.add(game);
            console.log('Systems added');
            
        }else {
            throw new Error("Game not found");
        }
    }
    /** Compleately replaces game systems with new array of systems
     * 
     * @param updatedSystems 
     * @param name 
     */
    public async updateSys(updatedSystems:string[], name:string): Promise<void> {
        let game = await VGameDao.getOne(name);
        if(game){
            game.gameSYSTEM = updatedSystems;
            await VGameDao.add(game);
            console.log("Systems Updated")
        }else{
            throw new Error("Game not found");
        }
    }
    /** Remove a system from the list
     * 
     * @param deletedSystem 
     * @param name 
     */
    public async deleteSys(deletedSystem:string[], name:string): Promise<void>{
        let game = await VGameDao.getOne(name);
        if(game){
            //assign game system to an array
            let oldSystems = game.gameSYSTEM;
            // create new  array to hold updated list
            let updatedSystems:string[] = [];
                oldSystems.forEach((oldSys) => {
                    if(!deletedSystem.includes(oldSys)){
                        updatedSystems.push(oldSys);
                    }
                });
                console.log(updatedSystems);
            game.gameSYSTEM = updatedSystems;
            await VGameDao.add(game);
            console.log("Systems Updated")
        }else{
            throw new Error("Game not found");
        }
    }


}
export default SystemDao;