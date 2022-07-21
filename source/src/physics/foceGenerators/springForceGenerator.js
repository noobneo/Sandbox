import { Vector3 } from "../../maths/vector3.js";

class SpringForceGenerator{

    mRestLen;
    mCoefficient;
    mOtherParticle;
    mIsBungee ;// if set true it doesn't compresses below len but stretechtes normally (maybe add another variable to set this len value as for now we use restLen??)
    
    constructor(restLen, springCoefficient,isBungee=false){

        this.mRestLen = restLen;
        this.mCoefficient = springCoefficient;
        this.mOtherParticle = null
        this.mIsBungee = isBungee;
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

        //check if compressed
        if(this.mIsBungee && magnitude<=this.mRestLen) return;

        magnitude = magnitude - this.mRestLen;
        magnitude*= -this.mCoefficient;
        force.normalize();
        force.multiplyScalar(magnitude);
        particle.addForce(force);
    }
    
}

export{SpringForceGenerator};