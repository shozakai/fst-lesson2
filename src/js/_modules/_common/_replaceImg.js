export default class {

    /**
     * constructor
     * @type {Object} this.$replaceImg 対象のimg要素
     */
    constructor(){
        this.$replaceImg = $('.js-imgReplace');
    }


    /**
     * init
     */
    init(){
        this.setEvent();
    }


    /**
     * setEvent
     * - window幅が pc / sp サイズに切り替わったときに、imgのsrcを置換
     */
    setEvent(){
        APP.$obj.on('SWITCH_PC', () => {
            this.$replaceImg.each((i, el) => {
                $(el).attr('src', $(el).attr('src').replace('_sp', ''));
            });
        });

        APP.$obj.on('SWITCH_SP', () => {
            this.$replaceImg.each((i, el) => {
                $(el).attr('src', $(el).attr('src').replace(/(\.gif|\.jpg|\.png)/g, '_sp$1'));
            });
        });
    }
}