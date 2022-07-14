import { Engine } from "../engine.js";

class App
{
    mName; 
    mEngine;
    mWidth;
    mHeight;
    mObjectManager;
    mSamples;
    
    constructor(name,width,height)
    {
        this.mName = name;
        this.mWidth = width;
        this.mHeight  = height;
        this.mEngine = new Engine(this);
        this.mObjectManager = this.mEngine.getObjectManager();
    }

    destructor()
    {

    }
    getWidth()
    {
        return this.mWidth;
    }

    getHeight(){
        return this.mHeight;
    }


    run(){
        this.mEngine.start();
        this.mAnimationFrameHandleId = requestAnimationFrame(this.mEngine.run.bind(this.mEngine));
    }

    init(){
    }

    update(dt){
        this.mSamples.updateFrameStats();
    }

    register(ref){
        this.mSamples = ref;
    }

    clear(){
        this.mEngine.clear();
        this.mEngine = null;
        this.mName = null; 
        this.mWidth = 0;
        this.mHeight = 0;
        this.mObjectManager = null;
        this.mSamples = null;
    }
}
export{App};