import { Gender } from "../gender-enum";
import { Picture } from "../picture-dto";
import { GeneralResponse } from "./general-response";

export class User extends GeneralResponse {
    data?: UserData;
    constructor(){   
        super();
        this.data = new UserData();     
    }
}

export class UserData {
    fullName?: string;
    picture?: Picture;
    gender?: Gender;
    email?: string;
    constructor(){
        this.picture = new Picture();
    }
}

