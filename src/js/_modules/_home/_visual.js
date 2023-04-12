import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin); 

export default class {

    /**
     * constructor
     */
    constructor(){
        this.$content = $('#js-content');

        this.$diagnosis = $('#js-diagnosis');
        this.$num = $('#js-num');
        this.$question = $('#js-question');

        this.$ill = $('#js-ill');

        this.$btn = $('.js-btn');
        this.$back = $('.js-btn--back');
        this.$reset = $('#js-reset');

        this.$result = $('#js-result')
        this.$param = $('#js-param')
        this.$type = $('#js-type')
        this.$desc = $('#js-desc')
        

        this.currentQuestion = 1;
        this.score = 0;
        this.root = './'
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
        this.open();

        this.$btn.on('click', (e) => {
            this.diagnosis($(e.currentTarget));
            return false;
        })

        this.$reset.on('click', () => {
            gsap.to(APP.$body, {
                alpha: 0,
                duration: .5,
                ease: 'power4.Out',
                onComplete: ()=> location.reload()
            })
        })
    }


    /**
     * open
     */
    open(){
        gsap.to(this.$content, {
            alpha: 1,
            duration: .8,
            ease: 'power4.Out',
        })
    }


    /**
     * diagnosis
     */
    diagnosis(target){
        const $target = target;
        const name = $target.attr('name');
        
        if ( name === 'YES' ) {
            switch ( this.currentQuestion ){
                case 1:
                    this.score += 5;
                    this.currentQuestion = 2;
                    this.renderQuestion('Q2', '自分のことを嫌っている人にも幸せでいてほしいと思う。');
                    this.$back.show();
                    break;

                case 2:
                    if ( this.$question.html() === '自分のことを嫌っている人にも幸せでいてほしいと思う。' ) {
                        this.score += 5;
                        this.currentQuestion = 3;
                        this.renderQuestion('Q3', '争い事は嫌い');
                    } else if ( this.$question.html() === '嫌なことがあるとイライラしてしまう' ) {
                        this.currentQuestion = 3;
                        this.renderQuestion('Q3', '性格的に厳しい方だ');
                    }
                    break;

                case 3:
                    if ( this.$question.html() === '性格的に厳しい方だ' ) {
                        this.showResult();
                    } else {
                        this.score += 5;
                        this.showResult();
                    }
                    this.showResult();
                    break;

                default:
            }
        } else if ( name === 'NO' ) {
            switch ( this.currentQuestion ){
                case 1:
                    this.currentQuestion = 2;
                    this.renderQuestion('Q2', '嫌なことがあるとイライラしてしまう');
                    this.$back.show();
                    break;

                case 2:
                    if ( this.$question.html() === '自分のことを嫌っている人にも幸せでいてほしいと思う。' ) {
                        this.currentQuestion = 3;
                        this.renderQuestion('Q3', '人前では笑顔でいるときが多い');
                    } else if ( this.$question.html() === '嫌なことがあるとイライラしてしまう' ) {
                        this.score += 5;
                        this.currentQuestion = 3;
                        this.renderQuestion('Q3', '動物が好きだ。');
                    }
                    break;
                    
                case 3:
                    if ( this.$question.html() === '性格的に厳しい方だ' ) {
                        this.score += 5;
                        this.showResult();
                    } else {
                        this.showResult();
                    }
                    break;

                default:
            }
        } else {
            if ( this.currentQuestion === 2 ) {
                this.currentQuestion = 1;
                this.renderQuestion('Q1', 'トイレの行列であなたの後ろに並んだ親子連れの子どもがグズっている様子。<br>自分も限界だけど順番がきたときに親子に譲りますか？');
                this.$back.hide();

            } else if ( this.currentQuestion === 3 ) {
                if ( this.$question.html() === '争い事は嫌い' || this.$question.html() === '人前では笑顔でいるときが多い' ) {
                    this.currentQuestion = 2;
                    this.renderQuestion('Q2', '自分のことを嫌っている人にも幸せでいてほしいと思う。');

                } else if ( this.$question.html() === '性格的に厳しい方だ？' || this.$question.html() === '動物が好きだ。' ) {
                    this.currentQuestion = 2;
                    this.renderQuestion('Q2', '嫌なことがあるとイライラしてしまう');

                }
            }
        }
    }


    /**
     * renderQuestion
     */
    renderQuestion(num, question) {
        const tl = gsap.timeline();
        const promise = new Promise((resolve, reject)=> { 
            tl.to(this.$diagnosis, {
                alpha: 0,
                duration: .8,
                ease: 'power4.Out',
                onComplete: ()=> {
                    this.$num.html(num);
                    this.$question.html(question);
                    resolve();
                },
            })
        })
        .then(()=> {
            tl.to(this.$diagnosis, {
                alpha: 1,
                duration: .8,
                ease: 'power4.Out',
            })
        })
    }


    /**
     * showResult
     */
    showResult(){
        switch ( this.score ){
            case 15:
                this.$param.html('ほとけ度80％');
                this.$type.html('「後光が差してきそうな、まさにほとけタイプ」');
                this.$desc.html('温厚でやわらかな物腰のあなたは、誰が見てもやさしそうで“ほとけ度”高めなタイプ。見かけだけではなく性格も穏やかで、人や動物を慈しむ心を持っていそう。<br>誰かが困っていたら自然と手を差し伸べて、しかも見返りを求めないのがあなたの流儀。生まれながらに心根が美しいのか、過去にいろいろあった末にたどりついたやさしさなのかは謎だけど、そのうちに後光が差してきそう。');
                this.$ill.attr('src', `${this.root}assets/images/home/image1.png`);
                break;

            case 10:
                this.$param.html('ほとけ度60％');
                this.$type.html('「相手次第でほとけになるタイプ」');
                this.$desc.html('おっとりとして気が長いあなたは、人前で怒ったりイライラすることはあまりなさそう。いつもニコニコしていて、職場や仲間うちでは「ほとけの〇〇」と呼ばれるタイプ。ただ、あなたの中には正義の血が流れていて、ズルい人や性悪な人を許せないところがあるみたい。「仏の顔も三度まで」というけど、あなたの場合曲がったことをする相手には最初から厳しく臨みそう。普段は穏やかだけど、相手次第でほとけにも鬼にもなれるあなたのほとけ度は60％ほどといえそう。');
                this.$ill.attr('src', `${this.root}assets/images/home/image4.png`);
                break;
                
            case 5:
                this.$param.html('ほとけ度40％');
                this.$type.html('「幸せなときだけほとけになるタイプ」');
                this.$desc.html('あなたはどちらかというとシニカルで、世の中をはかなむ傾向があるみたい。昔と比べて楽しと思うことが減ったのでは？ 不機嫌なことも多く、ときどき周囲に「話しかけないで」オーラを出すこともありそう。ただ、良いことがあったり、満たされた気持ちのときは態度が柔らかくなり、人にも親切になる傾向が。そんなあなたは、幸せなときだけほとけになれる人。なるべく楽しい時間を増やすことで、穏やかで慈悲深い人になれるかも。');
                this.$ill.attr('src', `${this.root}assets/images/home/image3.png`);
                break;

            default:
        }

        const tl = gsap.timeline();
        tl.to(this.$diagnosis, {
            alpha: 0,
            display: 'none',
            duration: .8,
            ease: 'power4.Out',
        })
        .to(this.$result, {
            display: 'block',
            alpha: 1,
            duration: .8,
            ease: 'power4.Out',
        })
    }
}