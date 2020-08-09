import Vue from 'vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
import fastClick from 'fastclick'
fastClick.attach(document.body)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
    preLoad: 1,
    error: require('../images/error.jpg'),
    loading:require('../images/loading.gif'),
    attempt: 3
}) //引入图片懒加载插件

import Checkbtn from "../../components/common/checkbtn/Checkbtn";
import Header from "../../components/common/header/Header";
import Tab from "../../components/common/tab/Tab";
import Tabitem from "../../components/common/tab/Tabitem";
import Dialog from "../../components/common/dialog/Dialog";
import Input from "../../components/common/input/Input";
import Tabctrl from "../../components/common/tabctrl/Tabctrl";
import Tabctrlitem from "../../components/common/tabctrl/Tabctrlitem";
import Playbtn from "../../components/common/playbtn/Playbtn";
import Tag from "../../components/common/tag/Tag";


Vue.component('Checkbtn',Checkbtn)
Vue.component('Playbtn',Playbtn)
Vue.component('Header',Header)
Vue.component('Tab',Tab)
Vue.component('Tabitem',Tabitem)
Vue.component('Dialog',Dialog)
Vue.component('Input',Input)
Vue.component('Tabctrl',Tabctrl)
Vue.component('Tabctrlitem',Tabctrlitem)
Vue.component('Tag',Tag)

import toast from "../../components/common/toast";
import confirm from "../../components/common/confirm";

Vue.use(toast)
Vue.use(confirm)

