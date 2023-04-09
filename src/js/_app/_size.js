export default class {

    /**
     * getWinW
     * @return {Number} window幅
     */
    getWinW(){
        return APP.$win.innerWidth();
    }


    /**
     * getWinH
     * @return {Number} window高さ
     */
    getWinH(){
        return APP.$win.innerHeight();
    }


    /**
     * getScrollTop
     * @return {Number} スクロール値
     */
    getScrollTop(){
        return APP.$win.scrollTop();
    }


    /**
     * getScrollMax
     * @return {Number} 最大スクロール値
     */
    getScrollMax(){
        return APP.$body.outerHeight() - this.getWinH();
    }


    /**
     * isSP
     * @return {boolean} window幅がspサイズでtrue
     */
    isSP(){
        if (this.getWinW() <= APP.breakPoint) {
            return true;
        } else {
            return false;
        };
    }


    /**
     * isPC
     * @return {boolean} window幅がpcサイズでtrue
     */
    isPC(){
        if (this.getWinW() > APP.breakPoint) {
            return true;
        } else {
            return false;
        };
    }
}