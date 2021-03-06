import { GUI } from './../thirdparty/node_modules/dat.gui/build/dat.gui.module.js'
class UIUtils
{

    mGui;
    mGuiContainer;
    static initiate()
    {
        this.mGui = new GUI({
            autoPlace: false 
        }); 
        
        this.mGuiContainer = document.getElementById('my-gui-container');
        this.mGuiContainer.appendChild(this.mGui.domElement);
    };

    static addToFolder(folder,property,name,startLimit, endLimit,step = 0.1){
        return (folder.add(property,name,startLimit, endLimit,step).name(name));
    }

    static addFolder(name){ 
        const folder = this.mGui.addFolder(name);
        return folder;
    }

    static clear(){
        this.mGuiContainer.removeChild(this.mGui.domElement);
        this.mGui.destroy();
        this.mGui = null;
        this.mGuiContainer = null;
    }
}

export{ UIUtils};