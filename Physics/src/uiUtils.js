import { GUI } from './../../node_modules/dat.gui/build/dat.gui.module.js'
class UIUtils
{

    mGui;
    static initiate()
    {
        this.mGui = new GUI({
            autoPlace: false 
        }); 
        
        var guiContainer = document.getElementById('my-gui-container');
        guiContainer.appendChild(this.mGui.domElement);
    };

    static addToFolder(folder,property,name,startLimit, endLimit,step = 0.1){
        return (folder.add(property,name,startLimit, endLimit,step).name(name));
    }

    static addFolder(name){ 
        const folder = this.mGui.addFolder(name);
        return folder;
    }
}

export{ UIUtils};