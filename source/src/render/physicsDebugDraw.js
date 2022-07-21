import { Vector3 } from "../maths/vector3.js";
import { AnchoredSpringForceGenerator } from "../physics/foceGenerators/anchoredSpringForceGenerator.js";
import { SpringForceGenerator } from "../physics/foceGenerators/springForceGenerator.js";
import { DebugDrawUtils } from "./debugDraw.js";



class DebugDrawEntry{
    mForceGen;
    mParticle;
    mLine;
}

class SpringForceGenDebugDrawEntry extends DebugDrawEntry
{
    constructor(forceGen,particle){
        super();
        this.mForceGen = forceGen;
        this.mParticle = particle;
        this.mLine = null;
    }

    draw(){
        var pos1 = this.mForceGen.mOtherParticle.getPosition();
        var pos2 = this.mParticle.getPosition();
        if(this.mLine!=null){

            this.mLine.geometry.attributes.position.array[0] = pos1.mX;
            this.mLine.geometry.attributes.position.array[1] = pos1.mY;
            this.mLine.geometry.attributes.position.array[2] = pos1.mZ;

            this.mLine.geometry.attributes.position.array[3] = pos2.mX;
            this.mLine.geometry.attributes.position.array[4] = pos2.mY;
            this.mLine.geometry.attributes.position.array[5] = pos2.mZ;
            this.mLine.geometry.attributes.position.needsUpdate = true; 

        }else{

           
            this.mLine =  DebugDrawUtils.drawLine(new Vector3(pos1.mX,pos1.mY,pos1.mZ) , new Vector3(pos2.mX,pos2.mY,pos2.mZ));
        }
    }
};


class AnchoredSpringDebugDrawEntry extends DebugDrawEntry{

    mAnchorPoint;
    mAnchorMesh;
    constructor(forceGen,particle){
        super();
        this.mForceGen = forceGen;
        this.mAnchorPoint = forceGen.mAnchorPoint;
        this.mParticle = particle;
        this.mLine = null;
    }

    draw(){

        var pos1 = this.mAnchorPoint;
        var pos2 = this.mParticle.getPosition();
        if(this.mLine!=null){

            this.mLine.geometry.attributes.position.array[0] = pos1.mX;
            this.mLine.geometry.attributes.position.array[1] = pos1.mY;
            this.mLine.geometry.attributes.position.array[2] = pos1.mZ;

            this.mLine.geometry.attributes.position.array[3] = pos2.mX;
            this.mLine.geometry.attributes.position.array[4] = pos2.mY;
            this.mLine.geometry.attributes.position.array[5] = pos2.mZ;
            this.mLine.geometry.attributes.position.needsUpdate = true; 

            this.mAnchorMesh.position.set(pos1.mX,pos1.mY,pos1.mZ);
        }else{
            this.mAnchorMesh = DebugDrawUtils.drawCircle(pos1);
            this.mLine =  DebugDrawUtils.drawLine(new Vector3(pos1.mX,pos1.mY,pos1.mZ) , new Vector3(pos2.mX,pos2.mY,pos2.mZ));
        }
    }
};

class PhysicsDebugDraw {

   
    static mSprings = [];

    static addDebugDrawSpring(forceGen,particle){

        if(forceGen instanceof SpringForceGenerator){

            PhysicsDebugDraw.mSprings.push(new SpringForceGenDebugDrawEntry(forceGen,particle));
        }
        else if(forceGen instanceof AnchoredSpringForceGenerator){

            PhysicsDebugDraw.mSprings.push(new AnchoredSpringDebugDrawEntry(forceGen,particle));
        }

    }

    static drawSprings(startPosition,endPosition){

        for(var i = 0 ; i < PhysicsDebugDraw.mSprings.length ; ++i){
            PhysicsDebugDraw.mSprings[i].draw();
        }

    }
}


export{PhysicsDebugDraw};