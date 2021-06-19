export interface VGame{
    gameNAME: string;
    ID: number;
    gameSYSTEM: string[];
    GENRA: string;
    //[key:string]: any;
}

class Videogame implements VGame{
    public gameNAME: string;
    public ID: number;
    public gameSYSTEM: string[];
    public GENRA: string;

    constructor(name:string, id:number, system:string[], genra:string){
        this.gameNAME = name;
        this.ID = id;
        this.gameSYSTEM = system;
        this.GENRA = genra;
    }
}

export default Videogame;