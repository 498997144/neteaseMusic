import Toastcomponent from "./Toast";

const toast = {};
toast.install = Vue => {
    const Toastcom = Vue.extend(Toastcomponent);
    const instance = new Toastcom();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.toast = (message='',callback,delay=3500) => {
        instance.message = message;
        instance.isShow = true;
        setTimeout(()=>{
            instance.message = '';
            instance.isShow = false;
            callback && callback();
        },delay);
    }
}

export default toast;
