export default class {

    /**
     * constructor
     */
    constructor(){
        this.setEvent();
    }


    /**
     * setEvent
     * - window幅が pc / sp サイズに切り替わったときに、カスタムイベントを実行
     */
    setEvent(){
        APP.$win.on('load resize', () => {
            if (APP.size.isPC() && this.flag !== 'pc') {
                this.flag = 'pc';
                APP.$obj.trigger('SWITCH_PC');
            } else if (APP.size.isSP() && this.flag !== 'sp') {
                this.flag = 'sp';
                APP.$obj.trigger('SWITCH_SP');
            }
        });
    }
}