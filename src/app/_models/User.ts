import { Photo } from "./Photo";

export class User {
    id: number;
    userName: string;
    name: string;
    surname: string;
    positions: Array<string>;
    email: string;
    age: number;
    dateOfBirth: Date;
    created: Date;
    lastActive: Date;
    Photo?: Photo;

    constructor(json:any) {
        this.id = json.id;
        this.userName = json.userName;
        this.name = json.name;
        this.surname = json.surname;
        this.email = json.email;
        this.age = json.age;
        this.created = json.created;
        this.lastActive = json.lastActive;
        this.dateOfBirth = new Date(json.dateOfBirth);
        this.Photo = json.Photo;
        this.initPosition(json.roles);
      }

    public hasRole(role: string): boolean {
        let result = false;
        this.positions.forEach(elem => {
            if(elem === role){
                result = true;
            }
        });

        return result;
    }

    initPosition(roles: any){
        this.positions = new Array();
        roles.forEach(elem => {
            this.positions.push(elem.role.name);
        });
        console.log('initPosition '+ this.positions);
    }
}
