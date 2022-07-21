import { DebugDrawUtils } from "../render/debugDraw.js"
import { CubeObject } from "../core/cubeObject.js"
import { App } from "../core/app.js";
import { Vector3 } from "../maths/vector3.js";

class BulletsDemo extends App
{
    constructor(name,width,height)
    {
        super(name,width,height);
    }

    init(){
        //initiate
        var x = -17;
        var position = new THREE.Vector3( 0, 1, 0 );
        var rotation = new THREE.Vector3( 0, 7, 0,);    

      
        var cube1 = new CubeObject(.1,position,rotation);
        var data = {
            "mass" : 0,
            "position": [
              0,
              1,
              0
            ],
            "forceGenerators": {
              "gravityForceGenerator": {
                "gravity": 10
              },

              "springForceGenerator": {
                "restLen": .5,
                "springCoeff" : 2
              }
            }
          };


        cube1.addComponent("physics",data);
        this.mObjectManager.addObject(cube1);
        cube1.reflectToUI();



        var data1 = {
            "mass" : 1,
            "position": [
              0,
              0,
              0
            ],
            "forceGenerators": {
              "gravityForceGenerator": {
                "gravity": 1
              },

              "springForceGenerator": {
                "restLen": .5,
                "springCoeff" : 2
              }
            }
          };
     

        var position1 = new THREE.Vector3( 0, 0, 0 );
        var cube2 = new CubeObject(.1,position1,rotation);
        cube2.addComponent("physics",data1);
        this.mObjectManager.addObject(cube2);
        cube2.reflectToUI();

        //setother ForSpring
        cube1.setOtherForPhysics(cube2);
        cube2.setOtherForPhysics(cube1);

       /* var cube = DebugDrawUtils.drawCube(1.6,position,rotation);
        var cubeFolder = UIUtils.addFolder("Cube");
        var rotationFolder = cubeFolder.addFolder("Rotation");
        UIUtils.addToFolder(rotationFolder,cube.rotation,"x",0, Math.PI*2);
        UIUtils.addToFolder(rotationFolder,cube.rotation,"y",0, Math.PI*2);
        UIUtils.addToFolder(rotationFolder,cube.rotation,"z",0, Math.PI*2);

        var positionFolder = cubeFolder.addFolder("Position");
        UIUtils.addToFolder(positionFolder,cube.position,"x",0, 10);
        UIUtils.addToFolder(positionFolder,cube.position,"y",0, 8);
        UIUtils.addToFolder(positionFolder,cube.position,"z",0, 10);*/
        
        //plane
        //position = new THREE.Vector3( 0, -1.5, 0 );
        //DebugDrawUtils.drawPlane(8,1,position);

        //bounds
        DebugDrawUtils.drawLine(new Vector3(-4.2,-2.5,0),new Vector3(4.2,-2.5,0));
        DebugDrawUtils.drawLine(new Vector3(-4.2,2.5,0),new Vector3(4.2,2.5,0));
        DebugDrawUtils.drawLine(new Vector3(-4.2,2.5,0),new Vector3(-4.2,-2.5,0));
        DebugDrawUtils.drawLine(new Vector3(4.2,2.5,0),new Vector3(4.2,-2.5,0));

    }
}
export{BulletsDemo};