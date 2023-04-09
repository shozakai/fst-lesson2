export default class{
    constructor(){
        this.ua = navigator.userAgent.toLowerCase();
        this.version = navigator.appVersion.toLowerCase();

        //BROWSER
        this.isMSIE = (this.ua.indexOf('msie') > -1) && (this.ua.indexOf('opera') == -1); // IE11以外を判定
        this.isIE6 = this.isMSIE && (this.version.indexOf('msie 6.') > -1);
        this.isIE7 = this.isMSIE && (this.version.indexOf('msie 7.') > -1);
        this.isIE8 = this.isMSIE && (this.version.indexOf('msie 8.') > -1);
        this.isIE9 = this.isMSIE && (this.version.indexOf('msie 9.') > -1);
        this.isIE10 = this.isMSIE && (this.version.indexOf('msie 10.') > -1);
        this.isIE11 = (this.ua.indexOf('trident/7') > -1);
        this.isIE = this.isMSIE || this.isIE11;
        this.isEdge = (this.ua.indexOf('edge') > -1);
        this.isChrome = (this.ua.indexOf('chrome') > -1) && (this.ua.indexOf('edge') == -1);
        this.isFirefox = (this.ua.indexOf('firefox') > -1);
        this.isSafari = (this.ua.indexOf('safari') > -1) && (this.ua.indexOf('chrome') == -1);
        this.isOpera = (this.ua.indexOf('opera') > -1);

        //DEVICE
        this.isiPhone = (this.ua.indexOf('iphone') > -1);
        this.isiPad = (this.ua.indexOf('ipad') > -1);
        this.isAndroid = (this.ua.indexOf('android') > -1) && (this.ua.indexOf('mobile') > -1);
        this.isAndroidTablet = (this.ua.indexOf('android') > -1) && (this.ua.indexOf('mobile') == -1);
        this.isMobile = this.isiPhone || this.isAndroid;
        this.isTablet = this.isiPad || this.isAndroidTablet;
        this.isDesktop = !this.isMobile && !this.isTablet;
    }


    /**
     * init
     * - 各デバイス用のclassをbodyにふる
     */
    init(){
        if (this.isTablet) APP.$body.addClass('is-tablet');
        if (this.isMobile) APP.$body.addClass('is-mobile');
        if (this.isDesktop) APP.$body.addClass('is-desktop');
    }
}