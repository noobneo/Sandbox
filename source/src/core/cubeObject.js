import { BaseObject } from "./base.js";
import { Particle } from "../physics/particle.js";
import { UIUtils } from "../uiUtils.js"

class CubeObject extends BaseObject{

    mMesh;
    mParticle;
    constructor(size,position,rotation){

        super();
        const box = new THREE.BoxGeometry( size,size,size );
        const edges = new THREE.EdgesGeometry( box );
        this.mMesh = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2  } ) );
        this.mMesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mMesh.position.set(position.x,position.y,position.z);
        this.mParticle = new Particle();
        this.mParticle.setPosition(position.x,position.y,position.z);
    }


    reflectToUI() {
        var cubeFolder = UIUtils.addFolder(this.mName);
        var velocity = cubeFolder.addFolder("Velocity");
        var controller = UIUtils.addToFolder(cubeFolder,this.mParticle,"mMass",0.0,100.0);
        controller.onFinishChange(this.onChangeMass.bind(this));
        UIUtils.addToFolder(velocity,this.mParticle.mVelocity,"mX",-10, 10);
        UIUtils.addToFolder(velocity,this.mParticle.mVelocity,"mY",-10, 10);
        UIUtils.addToFolder(velocity,this.mParticle.mVelocity,"mZ",-10, 10);

        var position = cubeFolder.addFolder("Position");
        UIUtils.addToFolder(position,this.mMesh.position,"x",-10, 10);
        UIUtils.addToFolder(position,this.mMesh.position,"y",-10, 10);
        UIUtils.addToFolder(position,this.mMesh.position,"z",-10, 10);
        cubeFolder.close();
    }

    onChangeMass(){
        this.mParticle.updateInverseMass();
    }

    getMesh(){
        return this.mMesh;
    }

    setPosition(x,y,z){
        this.mMesh.position.set(x,y,z);
    }

    setRotation(x,y,z){
        this.mMesh.position.set(x,y,z);
    }

    updatePhysics(dt){
        this.mParticle.integerate(dt);
    }

    updateDraws(dt){
        var pos = this.mParticle.getPosition();
        this.mMesh.position.set(pos.mX , pos.mY ,  pos.mZ);
    }
}

export{CubeObject};