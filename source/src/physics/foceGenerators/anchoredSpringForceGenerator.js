import { Vector3 } from "../../maths/vector3.js";

/*
* this spring forceGen doesnt' need two bodies
  just an anchor point at which it's anchored
*/
class AnchoredSpringForceGenerator{

    mRestLen;
    mCoefficient;
    mAnchorPoint;

    constructor(restLen, springCoefficient,anchorPos){

        this.mRestLen = restLen;
        this.mCoefficient = springCoefficient;
        this.mAnchorPoint = new Vector3();
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
        magnitude = magnitude - this.mRestLen;
        magnitude*= -this.mCoefficient;
        force.normalize();
        force.multiplyScalar(magnitude);
        particle.addForce(force);
    }
    
}

export{AnchoredSpringForceGenerator};