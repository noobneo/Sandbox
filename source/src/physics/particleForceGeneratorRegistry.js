import { SpringForceGenerator } from "./foceGenerators/springForceGenerator.js";
import { PhysicsDebugDraw } from "./../render/physicsDebugDraw.js"
import { DebugDrawUtils } from "../render/debugDraw.js";

class Registry{
    mParticle;
    mForceGenerator;

    mDebugDrawSprings;
    constructor(particle , forceGen){
            this.mParticle = particle;
            this.mForceGenerator = forceGen;
    }
};

class ParticleForceGeneratorRegistry{
    mParticleRegistry;

    constructor(){
            this.mParticleRegistry = [];
    }

    registerForceGenerator(particle,forceGenerator){
        this.mParticleRegistry.push(new Registry(particle,forceGenerator));


        PhysicsDebugDraw.addDebugDrawSpring(forceGenerator,particle);
    }

    clear(){
        this.mParticleRegistry = [];
    }

    removeForceGenerator(particle,forceGenerator){
            //remove fg
    }

    updateForceGenerators(duration){
        for (let i = 0; i < this.mParticleRegistry.length; i++){
            this.mParticleRegistry[i].mForceGenerator.updateForce(this.mParticleRegistry[i].mParticle , duration);
        }
    }

    debugDraw(){
        PhysicsDebugDraw.drawSprings();
    }
}

export {ParticleForceGeneratorRegistry};