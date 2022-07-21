import { Vector3 } from "../../maths/vector3.js";

/*
* this spring forceGen doesnt' need two bodies
  just an anchor point at which it's anchored
*/
class AnchoredSpringForceGenerator{

    mRestLen;
    mCoefficient;
    mAnchorPoint;
    mIsBungee ;// if set true it doesn't compresses below len but stretechtes normally (maybe add another variable to set this len value as for now we use restLen??)

    constructor(restLen, springCoefficient,anchorPos, isBungee = false){

        this.mRestLen = restLen;
        this.mCoefficient = springCoefficient;
        this.mAnchorPoint = new Vector3();
        this.mIsBungee = isBungee;
        this.mAnchorPoint.copy(anchorPos);
    }

    setOther(particle){
        this.mOtherParticle = particle;
    }


    updateForce(particle, duration){

        var posA = particle.getPosition();
        var force = new Vector3();
        force.copy(posA);

        //posA = Xa
        //posB = Xb
        //f = -k(|d| - Lo)d'
        //d = Xa- Xb
        //d' = d/|d|
        force.substract(this.mAnchorPoint);
        //
        var magnitude = force.length();
        //check if compressed
        if(this.mIsBungee && magnitude<=this.mRestLen) return;
        
        magnitude = magnitude - this.mRestLen;
        magnitude*= -this.mCoefficient;
        force.normalize();
        force.multiplyScalar(magnitude);
        particle.addForce(force);
    }
    
}

export{AnchoredSpringForceGenerator};