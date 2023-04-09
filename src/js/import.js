// APP
import Env from './_app/_env';
import Size from './_app/_size';
import Switcher from './_app/_switcher';
import CheckPage from './_app/_checkPage';

// CONTROLLERS
import Common from './_controllers/_common';
import Pages from './_controllers/_pages';

/**
 *  APP
 */
window.APP = {};
APP.$win = $(window);
APP.$doc = $(document);
APP.$body = $('body');
APP.$obj = $({});
APP.breakPoint = 768;
APP.env = new Env();
APP.size = new Size();
APP.switcher = new Switcher();
APP.checkPage = new CheckPage();

/**
 *  CONTROLLERS
 */
const COMMON = new Common();
COMMON.init();

const PAGES = new Pages();
PAGES.init();