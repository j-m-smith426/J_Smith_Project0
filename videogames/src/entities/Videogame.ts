export interface VGame{
    NAME: string;
    ID: number;
    SYSTEM: string[];
    GENRA: string;
}

class Videogame implements VGame{
    public NAME: string;
    public ID: number;
    public SYSTEM: string[];
    public GENRA: string;

    constructor(name:string, id:number, system:string[], genra:string){
        this.NAME = name;
        this.ID = id;
        this.SYSTEM = system;
        this.GENRA = genra;
    }
}

export default Videogame;