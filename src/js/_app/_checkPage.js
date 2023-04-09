export default class {

    /**
     * check
     * - 引数のページのclassをbodyが持っていたらtrueを返す
     * @param {String} pageName ページ名
     * @return {boolean}
     */
    check(pageName){
        if (!pageName) return;

        const PAGE_CLASS = 'page-' + pageName;

        if (APP.$body.hasClass(PAGE_CLASS)) {
            return true;
        } else {
            return false;
        }
    }
}