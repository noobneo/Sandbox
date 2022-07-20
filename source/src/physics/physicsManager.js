import { Particle } from "./particle.js"
import { ParticleForceGeneratorRegistry } from "./particleForceGeneratorRegistry.js";

class PhysicsManager{

    mObjects;
    mTotalObjects;
    mParticleForgeGeneratorRegistry;
    static mInstance = null;

    constructor(){
        this.mObjects = [];
        this.mParticleForgeGeneratorRegistry
        this.mTotalObjects = 0;


        this.mParticleForgeGeneratorRegistry = new ParticleForceGeneratorRegistry();
    }

    static getInstance(){
        if(!PhysicsManager.mInstance){
            PhysicsManager.mInstance = new PhysicsManager();
        }
        return PhysicsManager.mInstance;
    }

    update(dt){

        var len = this.mObjects.length;
        //call forge generators
        this.mParticleForgeGeneratorRegistry.updateForceGenerators(dt);

        //integerate 
        for (let i = 0; i < len; i++) {
            this.mObjects[i].integerate(dt);
        }

        this.mParticleForgeGeneratorRegistry.debugDraw();

    }

    getCount(){
        return this.mObjects.length;
    }

    createParticle(){
        this.mTotalObjects++;
        this.mObjects.push(new Particle());
        return this.mObjects[this.mTotalObjects-1];
    }

    addForceGenerator(forceGen , particle){
        this.mParticleForgeGeneratorRegistry.registerForceGenerator(particle,forceGen);
    }
}

export { PhysicsManager };