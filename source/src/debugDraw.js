
 class DebugDrawUtils {

    static initiate (sceneRef,rendererRef) {
        this.mSceneRef = sceneRef;
        this.mRendererRef = rendererRef;
    };
    
    static drawCube(size,position,rotation){
        //box
        const box = new THREE.BoxGeometry( size,size,size );
        const edges = new THREE.EdgesGeometry( box );
        const cubeWireFrame = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2  } ) );
        cubeWireFrame.rotation.set(rotation.x,rotation.y,rotation.z);
        cubeWireFrame.position.set(position.x,position.y,position.z);
        this.mSceneRef.add( cubeWireFrame );
        return cubeWireFrame;
    };
    
    static drawPlane(width,height,position){
        const planeGeo = new THREE.PlaneGeometry( width, height );
        const edges = new THREE.EdgesGeometry( planeGeo );
        const planeWireFrame = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } ) );
        planeWireFrame.position.set(position.x,position.y,position.z);
        this.mSceneRef.add( planeWireFrame );
        return planeWireFrame;
    }

    static drawLine(startPosition,endPosition){
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff
        });
        
        const points = [];
        points.push( new THREE.Vector3( startPosition.x, startPosition.y, startPosition.z ) );
        points.push( new THREE.Vector3(endPosition.x, endPosition.y, endPosition.z ) );
        
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const line = new THREE.Line( geometry, material );
        this.mSceneRef.add( line );
        return line;
    }

    static clear() {
        this.mSceneRef = null;
        this.mRendererRef = null;
    }
}


export{DebugDrawUtils};