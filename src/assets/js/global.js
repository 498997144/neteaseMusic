import Vue from 'vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
import fastClick from 'fastclick'
fastClick.attach(document.body)

import Checkbtn from "../../components/common/checkbtn/Checkbtn";
import Header from "../../components/common/header/Header";
import Tab from "../../components/common/tab/Tab";
import Dialog from "../../components/common/dialog/Dialog";
import Input from "../../components/common/input/Input";

Vue.component('Checkbtn',Checkbtn)
Vue.component('Header',Header)
Vue.component('Tab',Tab)
Vue.component('Dialog',Dialog)
Vue.component('Input',Input)

import toast from "../../components/common/toast";
import confirm from "../../components/common/confirm";

Vue.use(toast)
Vue.use(confirm)

