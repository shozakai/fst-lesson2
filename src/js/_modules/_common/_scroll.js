export default class {

    /**
     * constructor
     * @type {Object} this.$trigger トリガー要素
     * @type {Number} this.speed TweenMaxのspeed
     * @type {String} this.ease TweenMaxのeasing
     */
    constructor(param = {}) {
        this.$trigger = param.$trigger || $('.js-scroll');
        this.speed = param.speed || .8;
        this.ease = param.ease || Power3.easeInOut;
    }


    /**
     * init
     */
    init(){
        this.setEvent();
    }


    /**
     * setEvent
     */
    setEvent(){
        this.$trigger.on('click', (e) => {
            this.move($(e.currentTarget));
            return false;
        });
    }


    /**
     * move
     * - $triggerのhrefを見てscroll
     */
    move($el){
        const HREF = $el.attr('href'),
              TARGET = $(HREF === '#' || HREF === '' ? 'html' : HREF),
              OFFSET = TARGET.offset().top;

        TweenMax.to('body, html', this.speed, {
            ease: this.ease,
            scrollTop: OFFSET
        });
    }
}