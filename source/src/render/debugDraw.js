
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
        cubeWireFrame.rotation.set(rotation.mX,rotation.mY,rotation.mZ);
        cubeWireFrame.position.set(position.mX,position.mY,position.mZ);
        this.mSceneRef.add( cubeWireFrame );
        return cubeWireFrame;
    };
    
    static drawPlane(width,height,position){
        const planeGeo = new THREE.PlaneGeometry( width, height );
        const edges = new THREE.EdgesGeometry( planeGeo );
        const planeWireFrame = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } ) );
        planeWireFrame.position.set(position.mX,position.mY,position.mZ);
        this.mSceneRef.add( planeWireFrame );
        return planeWireFrame;
    }



    static drawCircle(position,radius=.05,segments=8){

        const geometry = new THREE.CircleGeometry( radius, segments );
        const edges = new THREE.EdgesGeometry( geometry );
        const circleWireFrame = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2  } ) );
        circleWireFrame.position.set(position.mX,position.mY,position.mZ);
        this.mSceneRef.add( circleWireFrame );
        return circleWireFrame;
    }

    static drawLine(startPosition,endPosition){
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff
        });
        
        const points = [];
        points.push( new THREE.Vector3( startPosition.mX, startPosition.mY, startPosition.mZ ) );
        points.push( new THREE.Vector3(endPosition.mX, endPosition.mY, endPosition.mZ ) );
        
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