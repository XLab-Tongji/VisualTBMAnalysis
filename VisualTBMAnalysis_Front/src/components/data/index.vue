<template>
<el-container style="height:100%;">
<div class="bg">
<div style="margin:10px;">

<dv-border-box-9 title="数据可视化分析" >
    
    <top />

    <div class="d-flex jc-center" >
        <div class="title">
            <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#3fb1e3', '#96dee8']"
            style="margin=20px"
            />
        </div>
    </div>

  <middle />

  <dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

    <bottom />

    <div class="d-flex jc-center" >
        <div class="title">
            <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#3fb1e3', '#96dee8']"
            style="margin=20px"
            />
        </div>
    </div>

    <bottom2 />

</dv-border-box-9>

</div></div>
</el-container>
</template>

<script>
import top from './top';
import middle from './middle';
import bottom from './bottom';
import bottom2 from './bottom2';

export default{
 components:{
        top,
        middle,
        bottom,
        bottom2,
    },

 data () { 
　　return {
        query:{
            where:"([t]>='2021-09-17 23:56:00' and [t]<='2021-09-17 23:59:00')"
        },        
        all_data:[],
        };
　},
// 　methods: {
//     async getData () {
//         const { data: res } =await this.$http.post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', 
//         this.query)
//         console.log(res.data)
//         this.all_data=res.data

//         var i;
//         if(res.data == null){
//             console.log("获取数据失败！")
//         }else{
//             this.push_force=[]
//             this.time_point=[]
//             for(i=0;i<this.all_data.length;i++){
//                 this.push_force.push(this.all_data[i][100005]-'0')
//                 this.time_point.push(this.all_data[i]['t'])
//             }
//             console.log("获取数据如下：")
//             console.log(this.push_force)
//             console.log(this.time_point)
//         }
//     },
// 　  },
　  mounted () {
    //middle.getData(); 
　 },

}
</script>


<style lang="less" scoped>
.dv-border-box-9{
    width:100%;
    height: 100%;
}

</style>
