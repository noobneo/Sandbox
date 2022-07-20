import { BaseObject } from "./base.js";
import { UIUtils } from "../uiUtils.js"

//Physics include
import { PhysicsManager } from "../physics/physicsManager.js";
import { DragForceGenerator } from "./../physics/foceGenerators/dragForceGenerator.js";
import { GravityForceGenerator } from "./../physics/foceGenerators/gravityForceGenerator.js";
import { SpringForceGenerator } from "./../physics/foceGenerators/springForceGenerator.js";

class CubeObject extends BaseObject{

    mMesh;
    mParticle;
    mCallBacks;
    mFunctionGenerators;
    constructor(size,position,rotation){

        super();
        const box = new THREE.BoxGeometry( size,size,size );
        const edges = new THREE.EdgesGeometry( box );
        this.mMesh = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2  } ) );
        this.mMesh.rotation.set(rotation.x,rotation.y,rotation.z);
        this.mMesh.position.set(position.x,position.y,position.z);     
        this.mCallBacks = []; 
        this.mFunctionGenerators = new Object();
    }

    addComponent(type,data){
        type = type.toLowerCase();
        switch(type){
            //physics component
            case "physics":
                {
                    this.mParticle = PhysicsManager.getInstance().createParticle();
                    this.deserializePhysics(data);
                    this.mParticle.setName(this.mName);
                }
                break;
        }
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

        //ForceGenerators
        //read all forceGenerators for now

        for(var key in this.mFunctionGenerators)
        {
            var data = this.mFunctionGenerators[key];
            //read all forceGenerators for now
            if( key =="dragForceGenerator")
            {
                var dragForceGenerator = cubeFolder.addFolder("DragForceGenerator");
                var forceGen = this.mFunctionGenerators["dragForceGenerator"];
               // mK1;//velocity drag coefficient
                //mK2;//velocity drag coefficient squared
    
                UIUtils.addToFolder(dragForceGenerator,forceGen,"mK1",.1,1.0);
                UIUtils.addToFolder(dragForceGenerator,forceGen,"mK2",.1,1.0);
            }

            //read all forceGenerators for now
            if(key == "gravityForceGenerator")
            {
                var gravityForceGenerator = cubeFolder.addFolder("GravityForceGenerator");
                var forceGen = this.mFunctionGenerators["gravityForceGenerator"];
                var gravity = gravityForceGenerator.addFolder("Gravity");
             // mForce;gravity
                UIUtils.addToFolder(gravity,forceGen.mForce,"mX",-10,10);
                UIUtils.addToFolder(gravity,forceGen.mForce,"mY",-10,10);
                UIUtils.addToFolder(gravity,forceGen.mForce,"mZ",-10,10);
            }

            if(key == "springForceGenerator")
            {
                var list  = this.mFunctionGenerators["springForceGenerator"];
                for(var i = 0 ; i < list.length ; ++i){
                    
                    var springForceGenerator = cubeFolder.addFolder("SpringForceGenerator"+(i+1));
                    var forceGen = list[i];
                    var controller1 = UIUtils.addToFolder(springForceGenerator,forceGen,"mRestLen",.1,10);
                    var controller2 = UIUtils.addToFolder(springForceGenerator,forceGen,"mCoefficient",.1,100);
                    controller1.onFinishChange(this.onChangeSpringForceGen.bind(forceGen));
                    controller2.onFinishChange(this.onChangeSpringForceGen.bind(forceGen));
                }
            }
        }
        cubeFolder.close();
    }


    deserializePhysics(data) {

        this.mParticle.setMass(data["mass"]);
        this.mParticle.setPosition(data["position"][0],data["position"][1],data["position"][2]);
        var forceGenerators = data["forceGenerators"];


        for(var key in forceGenerators)
        {
            var data = forceGenerators[key];
            //read all forceGenerators for now
            if( key =="dragForceGenerator")
            {
                var forceGen = new DragForceGenerator(["mK1"],forceGenerators["dragForceGenerator"]["mK2"]);
                PhysicsManager.getInstance().addForceGenerator(forceGen,this.mParticle);
                this.mFunctionGenerators["dragForceGenerator"] = forceGen;
            }

            //read all forceGenerators for now
            if(key == "gravityForceGenerator")
            {
                var forceGen = new GravityForceGenerator(data["gravity"])
                PhysicsManager.getInstance().addForceGenerator(forceGen,this.mParticle);
                this.mFunctionGenerators["gravityForceGenerator"] = forceGen;
            }

            if(key == "springForceGenerator")
            {
                var forceGen = new SpringForceGenerator(data["restLen"],data["springCoeff"]);
                PhysicsManager.getInstance().addForceGenerator(forceGen,this.mParticle);
                //if we have springForceGenerator our engine needs user to specify other
                //so we register to listen for other
                this.mCallBacks.push(forceGen.setOther.bind(forceGen));
                if(this.mFunctionGenerators["springForceGenerator"]==null)
                {
                    this.mFunctionGenerators["springForceGenerator"] = [];
                }
                this.mFunctionGenerators["springForceGenerator"].push(forceGen);
            }
        }

    }

    onChangeMass(){
        this.mParticle.updateInverseMass();
    }

    onChangeSpringForceGen(){
        console.log(this.mOtherParticle);
    }

    getMesh(){
        return this.mMesh;
    }

    setPosition(x,y,z){
        this.mParticle.setPosition(x,y,z);
    }

    update(dt){
        var pos = this.mParticle.getPosition();

        this.mMesh.position.set(pos.mX , pos.mY ,  pos.mZ);
    }

    setOtherForPhysics(other){
         //set bodyB for eg in spring
        if(other.mParticle!=null){
            for(var i = 0 ; i < this.mCallBacks.length ; ++i){
                this.mCallBacks[i](other.mParticle);
            }           
        }
        else{
            console.log("setting "+other.mParticle+ "for "+this.mParticle );
        }
    }
}

export{CubeObject};