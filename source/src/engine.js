import { ObjectManager } from "./core/objectManager.js";
import { DebugDrawUtils } from "./render/debugDraw.js"
import { UIUtils } from "./uiUtils.js"
import { Stats } from "./core/stats.js";
import { PhysicsManager } from "./physics/physicsManager.js";

class Engine{

    mCamera;
    mScene;
    mRenderer;
    mObjectManager;
    mCube;
    mApp;
    mFrameStartTime;
    mDeltaTime;
    mFrameEndTime;
    mIdealDeltaTime;
    mWidthRatio;
    mHeightRatio;
    mAnimationFrameHandleId;
    mPhysicsInstance;
    constructor(app){
        this.mApp = app;
        window.addEventListener('resize',this.onWindowResize.bind(this), false);
        this.init();
      //  window.requestAnimationFrame(this.run);
    }

    init(){

        this.mWidthRatio = this.mApp.getWidth() /window.innerWidth;
        this.mHeightRatio = this.mApp.getHeight()/window.innerHeight;

        var width = this.mWidthRatio * window.innerWidth;
        var height = this.mHeightRatio * window.innerHeight;

        
        // Init scene
        this.mScene = new THREE.Scene();

        // Init camera (PerspectiveCamera)
        this.mCamera = new THREE.PerspectiveCamera(
            70,
            width / height,
            0.1,
            1000
        );
        this.mCamera.updateProjectionMatrix();
    
         // Init renderer
        this.mRenderer = new THREE.WebGLRenderer({ antialias: true , canvas: renderCanvas });
        this.mRenderer.setSize(width, height);

      
        DebugDrawUtils.initiate(this.mScene,this.mRenderer);
        UIUtils.initiate();
        
        this.mObjectManager = new ObjectManager(this.mScene);
        this.mPhysicsInstance = PhysicsManager.getInstance();

       // Position camera
        this.mCamera.position.z = 4;
        this.mTimeSinceLastFrame = 0;
        this.mCurrentTime = 0;
        this.mIdealDeltaTime = 1000.0 / 144.0;
        this.mDeltaTime = this.mIdealDeltaTime * 0.001;
    }
    

    start(){
       this.mApp.init();
    }
    
    // Draw the scene every time the screen is refreshed
    run(){         
       this.mFrameStartTime = performance.now();

       this.mPhysicsInstance.update(this.mDeltaTime); 
       this.mApp.update(this.mDeltaTime);
       this.mObjectManager.update(this.mDeltaTime);
       this.mRenderer.render(this.mScene, this.mCamera);

       this.mFrameEndTime = performance.now();
       var elapsedTime = this.mFrameEndTime  - this.mFrameStartTime;
       while(elapsedTime<this.mIdealDeltaTime)
       {
        this.mFrameEndTime = performance.now();
        elapsedTime = this.mFrameEndTime  - this.mFrameStartTime;
       }
       this.mDeltaTime = elapsedTime;
       this.mDeltaTime *= 0.001;

       Stats.setDeltaTime(this.mDeltaTime);
       this.mAnimationFrameHandleId = requestAnimationFrame(this.run.bind(this));
    }
    
    onWindowResize(){

        var width = this.mWidthRatio * window.innerWidth;
        var height = this.mHeightRatio * window.innerHeight;

        // Camera frustum aspect ratio
        this.mCamera.aspect = width / height;
        // After making changes to aspect
        this.mCamera.updateProjectionMatrix();
        // Reset size
        this.mRenderer.setSize(width ,height);
    }

    getObjectManager(){
        return this.mObjectManager;
    }
     
    clear(animationFrameHandleId){

        DebugDrawUtils.clear();
        UIUtils.clear();


        cancelAnimationFrame(this.mAnimationFrameHandleId);
        this.mCamera = null;
        this.mScene= null;
        this.mRenderer= null;
        this.mObjectManager= null;
        this.mCube= null;
        this.mApp= null;
        this.mFrameStartTime=0.0;
        this.mDeltaTime=0.0;
        this.mFrameEndTime=0.0;
        this.mIdealDeltaTime=0.0;
        this.mWidthRatio=0.0;
        this.mHeightRatio=0.0;
        this.mAnimationFrameHandleId = null;
    }
}

export {Engine};