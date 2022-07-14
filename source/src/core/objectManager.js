
class ObjectManager{

    mObjects;
    mTotalObjects;
    mSceneRef;
    static mCount = 0; 

    constructor(sceneRef){
        this.mObjects = [];
        this.mSceneRef = sceneRef;
    }

    update(dt){

        var len = this.mObjects.length;
        for (let i = 0; i < len; i++) {
            this.mObjects[i].updatePhysics(dt);
        }
        for (let i = 0; i < len; i++) {
            this.mObjects[i].updateDraws(dt);
        }
    }

    getCount(){
        return this.mObjects.length;
    }

    addObject(object){
        ObjectManager.mCount++;
        this.mObjects.push(object);
        this.mSceneRef.add( object.getMesh() );
    }
}

export { ObjectManager };