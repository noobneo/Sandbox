import { DebugDrawUtils } from "../render/debugDraw.js"
import { App } from "../core/app.js";

class FireWorksDemo extends App
{
    constructor(name,width,height)
    {
        super(name,width,height);
    }

    init(){
        //initiate
        var position = new THREE.Vector3( 0, 1, 0 );
        var rotation = new THREE.Vector3( 0, 7, 0,);    

        
       DebugDrawUtils.drawCube(1.6,position,rotation);
        
        //plane
        position = new THREE.Vector3( 0, -1.5, 0 );
        DebugDrawUtils.drawPlane(8,1,position);

        //bounds
        DebugDrawUtils.drawLine(new THREE.Vector3(-4.2,-2.5,0),new THREE.Vector3(4.2,-2.5,0));
        DebugDrawUtils.drawLine(new THREE.Vector3(-4.2,2.5,0),new THREE.Vector3(4.2,2.5,0));
        DebugDrawUtils.drawLine(new THREE.Vector3(-4.2,2.5,0),new THREE.Vector3(-4.2,-2.5,0));
        DebugDrawUtils.drawLine(new THREE.Vector3(4.2,2.5,0),new THREE.Vector3(4.2,-2.5,0));

    }
}
export{FireWorksDemo};