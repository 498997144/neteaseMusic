// import Backtop from "../components/common/backtop/Backtop";
export const backTop = {
    data(){
        return{
            backTop:false,      //返回顶部控制
        }
    },
    components:{
        // Backtop,
    },
    methods:{
        backClick(){
            window.scroll(0,0);
        },
        windowScroll(){
            if(window.pageYOffset >= 3000) {
                this.backTop = true;
            }
            else {
                this.backTop = false;
            }
        },
    },
    mounted(){
        //  显示返回顶部按钮以及吸顶效果
        window.addEventListener("scroll",this.windowScroll);
    },
    destroyed(){
        window.removeEventListener("scroll", this.windowScroll);
    },
}


import New from "../../components/content/play/children/New";
import Newsheet from "../../components/content/play/children/Newsheet";
import Collsongsheet from "../../components/content/play/children/Collsongsheet";
export const collsongSheet = {
    
    components:{New,Newsheet,Collsongsheet},
    
    data(){
        return{
            collShow:false,  //收藏到歌单显示
            newsheetShow:false, //新建歌显示
            collSongheet:[],//用户歌单
            checkShow:false,//选择框显示控制
            checkList:[],  //选中的歌单
            checkFlag:true, //选择控制
            collOption:{
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                //     // hide: true,
                // },
                direction:'vertical',
                slidesPerView:'auto',
                freeMode:true,
                mousewheel: true,
                setWrapperSize: true,
                // roundLengths: true,
            }, //滑动配置
        }
    },
    methods:{
        //获取用户歌单
        async showColl(){
            const response = await this.axios.get(`/user/playlist?uid=${this.userId}`)
            if(response.code === 200){
                this.collSongheet = response.playlist
                this.collShow = true
            }else {
                this.toast(response.msg)
            }
        },
        //发送收藏歌单请求
        async coll(sheetId){
            if(this.collsongsid.length){
                const response = await this.axios.get(`/playlist/tracks?op=add&pid=${sheetId}&tracks=${this.collsongsid.join()}`)
                    .catch(()=>{
                        this.toast('暂不支持多选!')
                    })
                if(response.code === 200){
                    this.toast('收藏成功')
                    this.showColl()
                }else{
                    this.toast(response.msg)
                }
                console.log(response)
            }else{
                this.toast('请选择歌曲')
            }
        },
        toogleCheck(){
            if(this.checkFlag){
                this.checkShow = true
                this.$refs.checkBtn.textContent = '完成'
                this.checkFlag = false
            }else {
                this.checkShow = false
                this.$refs.checkBtn.textContent = '多选'
                this.checkFlag = true
                this.checkList = []
                this.$refs.collSheet.forEach(item => item.$children[0].reset())
                if(this.checkList.length){
                    this.coll(this.checkList.join()).catch((error)=>{
                        console.log(error)
                    })
                }
            }
        },
    
    },
    computed:{
        //用户id
        userId(){
            return this.$store.state.userInfo.profile.userId
        },
    },
}