import { SpringForceGenerator } from "../physics/foceGenerators/springForceGenerator.js";
import { DebugDrawUtils } from "./debugDraw.js";


class DebugDrawEntry
{
    mForceGen;
    mParticle;
    mLine;

    constructor(forceGen,particle){
        this.mForceGen = forceGen;
        this.mParticle = particle;
        this.mLine = null;
    }
};

class PhysicsDebugDraw {

   
    static mSprings = [];

    static addDebugDrawSpring(functionGen,particle){

        if(functionGen instanceof SpringForceGenerator)
        {
            PhysicsDebugDraw.mSprings.push(new DebugDrawEntry(functionGen,particle));
        }

    }

    static drawSprings(startPosition,endPosition){

        for(var i = 0 ; i < PhysicsDebugDraw.mSprings.length ; ++i){

            var pos1 = PhysicsDebugDraw.mSprings[i].mForceGen.mOtherParticle.getPosition();
            var pos2 = PhysicsDebugDraw.mSprings[i].mParticle.getPosition();
            if(PhysicsDebugDraw.mSprings[i].mLine!=null){

                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.array[0] = pos1.mX;
                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.array[1] = pos1.mY;
                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.array[2] = pos1.mZ;

                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.array[3] = pos2.mX;
                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.array[4] = pos2.mY;
                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.array[5] = pos2.mZ;
                PhysicsDebugDraw.mSprings[i].mLine.geometry.attributes.position.needsUpdate = true; 

            }else{
                PhysicsDebugDraw.mSprings[i].mLine =  DebugDrawUtils.drawLine(new THREE.Vector3(pos1.mX,pos1.mY,pos1.mZ) , new THREE.Vector3(pos2.mX,pos2.mY,pos2.mZ));
            }
            
        }

    }
}


export{PhysicsDebugDraw};