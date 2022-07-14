class Stats{
    #mFps;
    #mDt;

    constructor(){
        this.mFps = 60.0;
        this.mDt = 0.01666667;
    }

    static getFps(){
        return this.mFps;
    }

    static getDeltaTime(){
        return this.mDt;
    }

    static setDeltaTime(dt){
        this.mDt = dt;
        this.mFps = 1.0 / dt;
    }
}
export {Stats};