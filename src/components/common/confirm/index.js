import Confirmcomponent from "./Confirm";

const confirm = {};
confirm.install = Vue => {
    const Confirmcom = Vue.extend(Confirmcomponent);
    const instance = new Confirmcom();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    Vue.prototype.confirm = (message='',callback) => {
        instance.message = message;
        instance.isShow = true;
        instance.ok = () =>{
            callback && callback();
            instance.isShow = false;
        }
    }
}

export default confirm;