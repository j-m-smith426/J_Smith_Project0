export interface VGame{
    gameNAME: string;
    ID: number;
    gameSYSTEM: string[];
    GENRA: string;
    Multiplayer: boolean;
    [key:string]: any;
}

class Videogame implements VGame{
    public gameNAME: string;
    public ID: number;
    public gameSYSTEM: string[];
    public GENRA: string;
    public Multiplayer: boolean;
    [key:string]: any;

    constructor(name:string, id:number, system:string[], genra:string, multi:boolean){
        this.gameNAME = name;
        this.ID = id;
        this.gameSYSTEM = system;
        this.GENRA = genra;
        this.Multiplayer = multi;
    }
}

export default Videogame;