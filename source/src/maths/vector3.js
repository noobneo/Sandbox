class Vector3
{

    mX;
    mY;
    mZ;
    constructor(x=0.0,y=0.0,z=0.0){
        this.mX = x;
        this.mY = y;
        this.mZ = z;
    }

    length(){
        var len = this.lengthSquared();
        if(len>0)
        {
          return  Math.sqrt(this.lengthSquared());
        }
        return 0;
    }

    lengthSquared(){
        return (this.mX*this.mX + this.mY*this.mY + this.mZ*this.mZ);
    }

    normalize(){

        var len =this.length();
        if(len>0){
            
            this.mX /=len;
            this.mY /=len;
            this.mZ /=len;

        }
        else{
            console.assert("Invalid Len");
        }
    }

    /**
     * add vec to this vector
     * @param {Vector3} value 
     */
    add(value){
        this.mX += value.mX;
        this.mY += value.mY;
        this.mZ += value.mZ;

        return this;
    }

    

    /**
     * substracts vec from this vector
     * @param {Vector3} value 
     */
    substract(value){
        this.mX -= value.mX;
        this.mY -= value.mY;
        this.mZ -= value.mZ;

        return this;
    }

    /**
     * multiply this scalar to vec from this vector
     * @param {float} value 
     */
    multiplyScalar(value){
        this.mX *= value;
        this.mY *= value;
        this.mZ *= value;

        return this;
    }

    /**
     * add given vector to this scaled by value
     * @param {Vector3} value 
     * @param {float} value 
     */
    addScaledVector(vector, value){
        
        this.mX += vector.mX*value;
        this.mY += vector.mY*value;
        this.mZ += vector.mZ*value;

        return this;
    }

    /**
     * gives dot Product of this and value
     * @param {Vector3} value 
     */
    dotProduct(value){
        return (this.mX*value.mX + this.mY*value.mY + this.mZ*value.mZ);
    }

    /**
     * copies value to this
     * @param {Vector3} value 
     */
    copy(value){
        this.mX = value.mX;
        this.mY = value.mY;
        this.mZ = value.mZ;
    }

    clear(){
        this.mX = 0;
        this.mY = 0;
        this.mZ = 0;
    }
}

export{Vector3};