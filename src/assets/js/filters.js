import Vue from 'vue'
import moment from 'moment'

//时间格式化过滤器
Vue.filter('dateFormat',function(time,format='YYYY-MM-DD HH:mm:ss'){
    return moment(time).format(format)
})


//播放次数过滤器
Vue.filter('playCountFilter',function(number){
    if(number > 10000){
        return `${parseInt((number / 10000))}万`
    }
    if(number > 10000000){
        return `${(number / 100000000).toFixed(2)}亿`
    }
    return number
})


//评论次数过滤器
Vue.filter('commentCountFilter',function(number){
    if(number > 999 && number < 10000){
        return '999+'
    }
    if(number > 9999 && number < 100000){
        return '1w+'
    }
    if(number > 99999 && number < 1000000){
        return '10w+'
    }
    return number
})