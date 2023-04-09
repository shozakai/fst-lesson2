import HomeVisual from '../_modules/_home/_visual';

export default class {
    constructor(){}
    init(){
        if (APP.checkPage.check('home')) {
            this.visual = new HomeVisual();
            this.visual.init();
        }
    }
}