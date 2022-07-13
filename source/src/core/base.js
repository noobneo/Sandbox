import { ObjectManager} from "./objectManager.js"
class BaseObject{

    mName;
    constructor(){
       this.mName = "GameObject"+ObjectManager.mCount;     
    }

    getName(){
        return this.mName;
    }

    setName(name){
        this.mName = name;     
    }
}

export{BaseObject}