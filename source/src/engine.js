import { ObjectManager } from "./core/objectManager.js";
import { DebugDrawUtils } from "./debugDraw.js"
import { UIUtils } from "./uiUtils.js"

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
        this.mRenderer = new THREE.WebGLRenderer({ antialias: true });
        // Set size (whole window)
        this.mRenderer.setSize(width, height);
        // Render to canvas element
        document.body.appendChild(this.mRenderer.domElement);
        
        DebugDrawUtils.initiate(this.mScene,this.mRenderer);
        UIUtils.initiate();
        
        this.mObjectManager = new ObjectManager(this.mScene);

       // Position camera
        this.mCamera.position.z = 4;
        this.mTimeSinceLastFrame = 0;
        this.mCurrentTime = 0;
        this.mIdealDeltaTime = 1000.0 / 60.0;
        this.mDeltaTime = this.mIdealDeltaTime * 0.001;
    }
    

    start(){
       this.mApp.init();
    }
    
    // Draw the scene every time the screen is refreshed
    run(){         
       this.mFrameStartTime = performance.now();

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
       requestAnimationFrame(this.run.bind(this));
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
     
}

export {Engine};