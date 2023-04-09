export default class {

    /**
     * constructor
     */
    constructor(){
		this.$target = $('.js-inview');
        this.$targetBox = $('.js-inview-box');
        this.initial = {
            delay: 300,
            boxDelay: 0,
            addDelay: 150,
            speed: 700,
            x: 0,
            y: 8,
            scale: 1,
            ease: Power3.easeOut,
        };
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
        APP.$win.on('load', () => {
            this.show();
        });
	}

    /**
     * show
     */
    show(){
        const getValue = (param) => {
            switch (param.type) {
                case 'd':
                    return param.$el.attr('data-d') ? Number(param.$el.attr('data-d')) : param.initial;
                    break;

                case 'add-d':
                    return param.$el.attr('data-add-d') ? Number(param.$el.attr('data-add-d')) : param.initial;
                    break;

                case 's':
                    return param.$el.attr('data-s') ? Number(param.$el.attr('data-s')) / 1000 : param.initial / 1000;
                    break;

                case 'x':
                    return param.$el.attr('data-x') ? Number(param.$el.attr('data-x')) : param.initial;
                    break;

                case 'y':
                    return param.$el.attr('data-y') ? Number(param.$el.attr('data-y')) : param.initial;
                    break;

                case 'scale':
                    return param.$el.attr('data-scale') ? Number(param.$el.attr('data-scale')) : param.initial;
                    break;

                case 'ease':
                    return param.$el.attr('data-ease') ? param.$el.attr('data-ease') : param.initial;
                    break;
            }
        };

        const animation = (param) => {
            param.$target.css({ 'transform': 'translate(' + param.x + 'px, ' + param.y + 'px) scale(' + param.scale + ')' });
			param.$target.addClass('is-show');

            TweenMax.to(param.$target, param.s, {
                ease: param.ease,
                alpha: 1,
                x: 0,
                y: 0,
                scale: 1,
            });
        };

        this.$target.each((i, el) => {
            const $el   = $(el),
                  d     = getValue({ type: 'd', $el, initial: this.initial.delay }),
				  s     = getValue({ type: 's', $el, initial: this.initial.speed }),
				  x     = getValue({ type: 'x', $el, initial: this.initial.x }),
				  y     = getValue({ type: 'y', $el, initial: this.initial.y }),
				  scale = getValue({ type: 'scale', $el, initial: this.initial.scale }),
				  ease  = getValue({ type: 'ease', $el, initial: this.initial.ease });

            $el.on('inview', (e) => {
                const $target = $(e.currentTarget);

                if (!$target.hasClass('is-show')) {
                    setTimeout(() => {
                        animation({ $target, s, x, y, scale, ease });
                    }, d);
                }
            });
        });

        this.$targetBox.each((i, el) => {
            const $el       = $(el),
                  d         = getValue({ type: 'd', $el, initial: this.initial.boxDelay }),
                  add_d_all = getValue({ type: 'add-d', $el, initial: this.initial.addDelay }),
			   	  s_all     = getValue({ type: 's', $el, initial: this.initial.speed }),
				  x_all     = getValue({ type: 'x', $el, initial: this.initial.x }),
				  y_all     = getValue({ type: 'y', $el, initial: this.initial.y }),
                  scale_all = getValue({ type: 'scale', $el, initial: this.initial.scale }),
				  ease_all  = getValue({ type: 'ease', $el, initial: this.initial.ease });

            let add_d = add_d_all,
                s     = s_all,
                x     = x_all,
                y     = y_all,
                scale = scale_all,
                ease  = ease_all;

            $el.on('inview', (e) => {
                setTimeout(() => {
                    $(e.currentTarget).children().each((i, el) => {
                        const $target = $(el);

                        if (!$target.hasClass('is-show')) {
                            add_d += i === 0 && !$target.attr('data-add-d') ? 0 : getValue({ type: 'add-d', $el: $target, initial: add_d_all });

                            setTimeout(() => {
                                s     = getValue({ type: 's', $el: $target, initial: s_all * 1000 });
                				x     = getValue({ type: 'x', $el: $target, initial: x_all });
                				y     = getValue({ type: 'y', $el: $target, initial: y_all });
                				scale = getValue({ type: 'scale', $el: $target, initial: scale_all });
                				ease  = getValue({ type: 'ease', $el: $target, initial: ease_all });

                                animation({ $target, s, x, y, scale, ease });
                            }, add_d);
                        }
                    });
                }, d);
            });
        });
    }
}