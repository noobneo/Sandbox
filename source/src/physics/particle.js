import { Vector3 } from "../maths/vector3.js";


class Particle{
    mPosition;
    mVelocity;
    mMass;
    mInverseMass;
    mDamping;
    mForceAccumulated;
    mResultingAcceleration;
    mName;
    constructor(){
        this.mPosition = new Vector3(0.0,0.0,0.0);
        this.mVelocity= new Vector3(0.0,0.0,0.0);
        this.mForceAccumulated = new Vector3(0.0,0,0.0);
        this.mResultingAcceleration = new Vector3(0.0,0.0,0.0);
        this.mMass = 1.0;
        this.mInverseMass = 1.0 / this.mMass; 
        this.mDamping = 0.95;
    }

    integerate(dt){

        if(dt<0 || this.mMass<=0){
            return;
        }

        //p = p+p`t;
        this.mPosition.addScaledVector(this.mVelocity, dt);

        //force from gravity
        this.mResultingAcceleration.clear();
        this.mResultingAcceleration.addScaledVector(this.mForceAccumulated, this.mInverseMass);
        
        //update velocity
        this.mVelocity.addScaledVector(this.mResultingAcceleration, dt);
       
        //apply damping
        this.mVelocity.multiplyScalar(Math.pow(this.mDamping,dt));
        this.clearAccumulatedForce();
    }


    updateInverseMass(){
        if(this.mMass<=0){
            console.log("Physics Particle with Zero Mass");
            return;
        }
        this.mInverseMass = 1.0 / this.mMass; 
    }

    addForce(force){
        this.mForceAccumulated.mX += force.mX;
        this.mForceAccumulated.mY += force.mY;
        this.mForceAccumulated.mZ += force.mZ;
    }

    clearAccumulatedForce(){ 
        this.mForceAccumulated.mX = 0;
        this.mForceAccumulated.mY = 0;
        this.mForceAccumulated.mZ = 0;
    }

    hasInfiniteMass(){
        return this.mMass <= 0;
    }

    /*getters*/
    getInverseMass(){
        return this.mInverseMass;
    }

    getMass(){
        return this.mMass;
    }

    getPosition(){
        return this.mPosition;
    }

    getVelocity(){ 
        return this.mVelocity;
    }

    /*setters*/
    setPosition(x,y,z){ 
        this.mPosition.mX = x;
        this.mPosition.mY = y;
        this.mPosition.mZ = z;
    }

    setVelocity(x,y,z){ 
        this.mVelocity.mX = x;
        this.mVelocity.mY = y;
        this.mVelocity.mZ = z;
    }

    setAcceleration(x,y,z){ 
        this.mAcceleration.mX = x;
        this.mAcceleration.mY = y;
        this.mAcceleration.mZ = z;
    }

    setMass(mass){
        this.mMass = mass;
        this.updateInverseMass();
    }
    
    setName(name){
         this.mName = name;
    }
}

export { Particle };