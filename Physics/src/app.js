import { Engine } from "./engine.js";
import { DebugDrawUtils } from "./debugDraw.js"
import { UIUtils } from "./uiUtils.js"

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
        this.mEngine.start();
        requestAnimationFrame(this.mEngine.run.bind(this.mEngine));
    }

    init()
    {
        //initiate
        var position = new THREE.Vector3( 0, 1, 0 );
        var rotation = new THREE.Vector3( 0, 7, 0,);    
        var cube = DebugDrawUtils.drawCube(1.6,position,rotation);
        var cubeFolder = UIUtils.addFolder("Cube");
        var rotationFolder = cubeFolder.addFolder("Rotation");
        UIUtils.addToFolder(rotationFolder,cube.rotation,"x",0, Math.PI*2);
        UIUtils.addToFolder(rotationFolder,cube.rotation,"y",0, Math.PI*2);
        UIUtils.addToFolder(rotationFolder,cube.rotation,"z",0, Math.PI*2);

        var positionFolder = cubeFolder.addFolder("Position");
        UIUtils.addToFolder(positionFolder,cube.position,"x",0, 10);
        UIUtils.addToFolder(positionFolder,cube.position,"y",0, 8);
        UIUtils.addToFolder(positionFolder,cube.position,"z",0, 10);
        
        //plane
        //position = new THREE.Vector3( 0, -1.5, 0 );
        //DebugDrawUtils.drawPlane(8,1,position);

        //bounds
        DebugDrawUtils.drawLine(new THREE.Vector3(-4.2,-2.5,0),new THREE.Vector3(4.2,-2.5,0));
        DebugDrawUtils.drawLine(new THREE.Vector3(-4.2,2.5,0),new THREE.Vector3(4.2,2.5,0));
        DebugDrawUtils.drawLine(new THREE.Vector3(-4.2,2.5,0),new THREE.Vector3(-4.2,-2.5,0));
        DebugDrawUtils.drawLine(new THREE.Vector3(4.2,2.5,0),new THREE.Vector3(4.2,-2.5,0));




    }
    deinit()
    {

    }

    update(dt)
    {
        //console.log("Delta Time: "+dt);
    }
}
export{App};