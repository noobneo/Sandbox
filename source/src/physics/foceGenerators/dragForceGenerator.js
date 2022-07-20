import { ParticleForceGenerator } from "./particleForceGenerator.js"

class DragForceGenerator extends ParticleForceGenerator
{
    mK1;//velocity drag coefficient
    mK2;//velocity drag coefficient squared

    constructor(k1,k2){
        super();
        this.mK1 = k1;
        this.mK2 = k2;
    }

    //drag is based on velocity and acts in opp direction
    updateForce(particle, duration){

        var velocity = particle.getVelocity();
        var dragCoeff = velocity.length();

        //total dragCoeff
        dragCoeff = this.mK1 * dragCoeff ;//+ this.mK2*dragCoeff*dragCoeff;
        velocity.normalize();

        //finalForce to apply
        velocity.multiplyScalar(-dragCoeff);
        particle.addForce(velocity);
    }
}
export{DragForceGenerator};