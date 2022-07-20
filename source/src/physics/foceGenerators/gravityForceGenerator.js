import { Vector3 } from "../../maths/vector3.js";
import { ParticleForceGenerator } from "./particleForceGenerator.js";

class GravityForceGenerator extends ParticleForceGenerator{

    mForce;
    constructor(gravity){
        super();
        this.mForce = new Vector3(0, -gravity,0);
    }

    updateForce(particle, duration){
        if(particle.hasInfiniteMass())
            return;

        var force = new Vector3(this.mForce.mX , this.mForce.mY,this.mForce.mZ);
        force.addScaledVector(force , particle.getMass())
        particle.addForce(force);
    }
}
export{GravityForceGenerator};