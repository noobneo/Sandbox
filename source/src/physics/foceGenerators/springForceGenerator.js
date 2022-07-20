import { Vector3 } from "../../maths/vector3.js";

class SpringForceGenerator{

    mRestLen;
    mCoefficient;
    mOtherParticle;
    
    constructor(restLen, springCoefficient){

        this.mRestLen = restLen;
        this.mCoefficient = springCoefficient;
        this.mOtherParticle = null
    }

    setOther(particle){
        this.mOtherParticle = particle;
    }


    updateForce(particle, duration){
        if(this.mOtherParticle == null)
            return;

        var posA = particle.getPosition();
        var posB = this.mOtherParticle.getPosition();

        var force = new Vector3();
        force.copy(posA);

        //posA = Xa
        //posB = Xb
        //f = -k(|d| - Lo)d'
        //d = Xa- Xb
        //d' = d/|d|
        force.substract(posB);
        //
        var magnitude = force.length();
        magnitude = Math.abs(magnitude - this.mRestLen);
        magnitude*= -this.mCoefficient;
        force.normalize();
        force.multiplyScalar(magnitude);
        particle.addForce(force);
    }
    
}

export{SpringForceGenerator};