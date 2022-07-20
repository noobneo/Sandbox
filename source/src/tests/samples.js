import { GUI } from '../../thirdparty/node_modules/dat.gui/build/dat.gui.module.js'
import { Stats } from '../core/stats.js';
import { BulletsDemo } from './bulletsDemo.js';
import { FireWorksDemo } from './fireworksDemo.js';
import { SpringDemo } from './springDemo.js';

var testList =  {
    tests : 'BulletsDemo',
    dt : 0.01667,
    fps : 60.0,
};

class Samples
{
    mGui;
    mApp;
    mFpsController;
    mDtController;

    constructor(){
        this.mGui = new GUI({
            autoPlace: false 
        }); 
        
        var guiContainer = document.getElementById('test-gui-container');
        guiContainer.appendChild(this.mGui.domElement);
        this.mGui.add(testList, 'tests', [ 'SpringsDemo'] ).onChange(function(value){
            this.switchTestBed(value);
        }.bind(this));

        this.mDtController =  this.mGui.add(testList,"dt",0.01667);
        this.mFpsController = this.mGui.add(testList,"fps",60.0);

        this.switchTestBed('SpringsDemo');
    }


    switchTestBed(value){

        if(this.mApp){
            this.mApp.clear()
            this.mApp = null;
        }
        switch(value){
        case 'SpringsDemo':
            this.mApp = new SpringDemo("SpringsDemo",1280,800);
            break;
         case 'BulletsDemo':
            this.mApp = new BulletsDemo("BulletsDemo",1280,800);
            break;
        case 'FireWorksDemo':
            
            this.mApp = new FireWorksDemo("FireWorksDemo",1280,800);
            break;
        }
        this.mApp.run();
        this.mApp.register(this);
        
    }

    updateFrameStats(){
        testList.fps = Stats.getFps();
        testList.dt = Stats.getDeltaTime();

        this.mDtController.updateDisplay();
        this.mFpsController.updateDisplay();
    }
}
export { Samples};