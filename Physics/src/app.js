import { Engine } from "./engine.js";
class App
{
    mName; 
    mEngine;
    mWidth;
    mHeight;
    constructor(name,width,height)
    {
        this.mName = name;
        this.mWidth = width;
        this.mHeight  = height;
        this.mEngine = new Engine(this);
    }

    getWidth()
    {
        return this.mWidth;
    }

    getHeight()
    {
        return this.mHeight;
    }


    run()
    {
        requestAnimationFrame(this.mEngine.run.bind(this.mEngine));
    }

    init()
    {

    }
    deinit()
    {

    }

    update(dt)
    {
        console.log("Delta Time: "+dt);
    }
}
export{App};