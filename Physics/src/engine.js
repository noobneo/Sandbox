import { App } from "./app.js";

let engine;
class Engine{

    mCamera;
    mScene;
    mRenderer;
    mCube;
    mApp;
    mFrameStartTime;
    mDeltaTime;
    mFrameEndTime;
    mIdealDeltaTime;

    constructor(app)
    {
        this.mApp = app;
        engine = this;
        window.addEventListener('resize',this.onWindowResize.bind(this), false);
        this.init();
      //  window.requestAnimationFrame(this.run);
    }

    init() {
        // Init scene
        this.mScene = new THREE.Scene();

        // Init camera (PerspectiveCamera)
        this.mCamera = new THREE.PerspectiveCamera(
            70,
            this.mApp.getWidth() / this.mApp.getHeight(),
            0.1,
            1000
        );
    
        // Init renderer
        this.mRenderer = new THREE.WebGLRenderer({ antialias: true });
        // Set size (whole window)
        this.mRenderer.setSize(this.mApp.getWidth(), this.mApp.getHeight());
        // Render to canvas element
        document.body.appendChild(this.mRenderer.domElement);
        
        //box
        const box = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
        const boxWireFrame = new THREE.WireframeGeometry( box );
        const debugDrawBox = new THREE.LineSegments( boxWireFrame );
        debugDrawBox.material.depthTest = false;
        debugDrawBox.material.opacity = 0.25;
        debugDrawBox.material.transparent = true;

        this.mScene.add( debugDrawBox );

        //plane
        const planeGeo = new THREE.PlaneGeometry( 10, 1 );
        const planeWireFrame = new THREE.WireframeGeometry( planeGeo );
        const debugDrawPlane = new THREE.LineSegments( planeWireFrame );
        debugDrawPlane.material.depthTest = false;
        debugDrawPlane.material.opacity = 0.25;
        debugDrawPlane.material.transparent = true;
        debugDrawPlane.position.x = 1;
        this.mScene.add( debugDrawPlane );

        // Position camera
        this.mCamera.position.z = 5;
        this.mTimeSinceLastFrame = 0;
        this.mCurrentTime = 0;
        this.mIdealDeltaTime = 1000.0 / 60.0;
        this.mDeltaTime = this.mIdealDeltaTime * 0.001;
    }
    
    // Draw the scene every time the screen is refreshed
    run() {      
       this.mFrameStartTime = performance.now();

       this.mApp.update(this.mDeltaTime);
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
    
    onWindowResize() {
        // Camera frustum aspect ratio
        this.mCamera.aspect = window.innerWidth / window.innerHeight;
        // After making changes to aspect
        this.mCamera.updateProjectionMatrix();
        // Reset size
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
    }
     
}

export {Engine};