<template>

<div >
    
    <!-- top -->
<el-container  direction="vertical" >
  
    <el-container>

        <el-container  style="width:30%; height:100%" direction="vertical" >
                <dv-decoration-11 style="width:100%;height:150px;"><h1 class="text1">当前掘进环号：{{this.cur_loop}} <br> 当前掘进状态：{{this.cur_state}}
                    </h1></dv-decoration-11>   
                <dv-border-box-12 style="height:420px; width:100%;">
                    <div class="text" style="margin-top:5px">贯入度实时数据</div>
                    <div style="width:450px;height:360px" ref="degree_chart" class="chart"></div>
                </dv-border-box-12>
        </el-container>

        <el-container style="width:50%;height:100%">
                <dv-border-box-11 title="总推力实时数据" 
                style="font-family: 'zcool_title';font-size: 25px;"  
                :color="['#3f7c8b', '#96dee8']" >
                    <div style="width:680px;height:490px" ref="push_force_chart"></div>
                </dv-border-box-11>
                
        </el-container>
    </el-container>

</el-container>

    <dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

    <el-container style="height:100%; width:100%; ">    
    

    <dv-border-box-10 style="height:100%; width:31%;margin-left:8px;">
                <div class="text">扭矩实时数据</div>
         <div style="width:390px;height:350px" ref="torsion_chart" class="chart"></div>
    </dv-border-box-10>

    <dv-border-box-10 style="height:100%; width:31%;margin-right:20px;margin-left:20px;">
        <div class="text">推进速度实时数据</div>
         <div style="width:390px;height:350px" ref="v_push_chart" class="chart"></div>
    </dv-border-box-10>

    <dv-border-box-10 style="height:100%; width:31%;">
                <div class="text">刀盘转速实时数据</div>
         <div style="width:390px;height:350px" ref="v_rotate_chart" class="chart"></div>
    </dv-border-box-10>


  </el-container>

    
</div>

</template>

<script>
export default{
 data () { 
　　return {
        all_data:[],
        new_data:[],
        time_point:['test1','test2','test3','test4','test5','test6','test7'],
        push_force:[24680,24650,24620,24680,24700,24680,24720],
        cur_loop:0,
        cur_state:'',
        value: [new Date(2021, 9, 22, 23, 50), new Date(2021, 9, 22, 23, 59)],
        cur_time:'',
        start_time:'',
        end_time:'',
        time:['2021-09-22 23:55:00','2021-09-22 23:59:00'],

        v_push:[80,50,20,80,70,80,20],//推进速度
        v_rotate:[80,50,20,80,70,80,20],//刀盘转速
        torsion:[80,50,20,80,70,80,20],
        degree:[80,50,20,80,70,80,20],

        recordID_1:'0',
        recordID_2:'0',
        modelName_1:'掘进参数优化模型',
        modelName_2:'泥水仓压力优化模型',

        analyseInfo_1:[],
        analyseInfo_2:[],
         options: [{
          value: '掘进参数优化模型',
          label: '掘进参数优化模型'
        }, {
          value: '泥水仓压力优化模型',
          label: '泥水仓压力优化模型'
        }],

    };
},
methods: {
　　initCharts () {
        let myChart0 = this.$echarts.init(this.$refs.push_force_chart,'walden');
        let myChart1 = this.$echarts.init(this.$refs.degree_chart,'walden');
        let myChart2 = this.$echarts.init(this.$refs.torsion_chart,'walden');
        let myChart3 = this.$echarts.init(this.$refs.v_push_chart,'walden');
        let myChart4 = this.$echarts.init(this.$refs.v_rotate_chart,'walden');
    　　myChart0.setOption({
        //图表开始
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
                }
            },
            toolbox: {
                feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: this.time_point,
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                scale: true,
                
            },
            series: [
                {
                data: this.push_force,
                symbol: 'none',
                type: 'line',
                }
            ]
            //结束
        　　});
    　　myChart1.setOption({
        //图表开始
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
                }
            },
            toolbox: {
                feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: this.time_point,
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0, '100%']
            },
            series: [
                {
                data: this.degree,
                symbol: 'none',
                type: 'line',
                }
            ]
            //结束
        　　});
    　　myChart2.setOption({
        //图表开始
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
                }
            },
            toolbox: {
                feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: this.time_point,
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0, '100%']
            },
            series: [
                {
                data: this.torsion,
                symbol: 'none',
                type: 'line',
                }
            ]
            //结束
        　　});
　　　  myChart3.setOption({
    //图表开始
         tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
                }
            },
          toolbox: {
            feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: this.time_point,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            scale: true,
            // min:0,
            // max:100,
           
            boundaryGap: [0, '100%']
        },
        series: [
            {
            data: this.v_push,
            //smooth: true,
            symbol: 'none',
            //areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
　　　  myChart4.setOption({
    //图表开始
         tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
                }
            },
          toolbox: {
            feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: this.time_point,
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            scale: true,
            // min:0,
            // max:100,
           
            boundaryGap: [0, '100%']
        },
        series: [
            {
            data: this.v_rotate,
            //smooth: true,
            symbol: 'none',
            //areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
    
    },
    getCurrentTime() {
        //获取当前时间
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1 < 10 ? "0"+ new Date().getMonth() + 1 : new Date().getMonth() + 1 ; 
        var day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate(); 
        var hour = new Date().getHours()< 10 ? "0" + new Date().getHours() : new Date().getHours(); 
        var minute = new Date().getMinutes()< 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(); 
        var second = new Date().getSeconds()< 10 ? "0" + new Date().getSeconds() : new Date().getSeconds(); 

        this.cur_time =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second

        //20min前的时间点,待完善
        if(minute>19){
            minute = minute-20
        }else{
            minute = 40 + (minute - "0") 
            hour = hour - 1
        }
        if(minute<10) minute="0"+minute
        this.start_time =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second

        //20min后的时间点,待完善
        if(minute<20){
            minute = minute+40
        }else{
            minute = (minute - "0") -20
            hour = hour + 1
        }
        if(minute<10) minute="0"+minute
        this.end_time =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second

    },
    async getRecentData () {
      
        this.getCurrentTime()
        let query={
            where:`([t]>='${this.start_time}' and [t]<='${this.cur_time}')`
        };
        const { data: res } =await this.$http.
        post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', 
        query)

        // while(this.all_data.length < 100) {
        //     //推前20min
        //     console.log("数据太少啦~需要再往前看看！");


        //     //再发起请求
        //     console.log("getRecentData执行！");
           

        // }

        if(res.data.length == 0|| res.data == null){
            console.log("实时信息获取数据为空或失败！开始渲染假数据")
            this.initCharts(); 
            return
        }

        //插入渲染数据
        console.log("实时信息获取数据的请求时间结果为:")
        console.log(this.start_time)
        console.log(this.cur_time)
        console.log("实时获取后端返回结果是:")
        console.log(res.data)
        this.all_data=res.data
       
        
        console.log("要渲染的数据为")
        console.log(this.all_data)

        this.time_point=[]
        this.push_force=[] //总推力
        this.torsion=[] //扭矩
        this.degree=[] //贯入度
        this.v_push=[] //推进速度
        this.v_rotate=[] //刀盘转速
        
        var i;
        for(i=0;i<this.all_data.length;i++){
            this.push_force.push(this.all_data[i][100005]-'0')
            this.time_point.push(this.all_data[i]['t'])
            this.torsion.push(this.all_data[i][100004]-'0')
            this.degree.push(this.all_data[i][100395]-'0')
            this.v_push.push(this.all_data[i][100002]-'0')
            this.v_rotate.push(this.all_data[i][100003]-'0')
        }
        //获取当前环号
        this.cur_loop=this.all_data[i-1][100001]-"0"
        //获取当前掘进状态
        if(this.all_data[i-1][100007]>0){
            this.cur_state='拼装'
        }else{
            this.cur_state='掘进'
        }
      
        this.initCharts(); 
    },
    async getLatestData () {
        console.log("getLatestData执行！")
        this.getCurrentTime()
        console.log("获取最新的一条数据的请求时间为:")       
        console.log(this.cur_time)
        console.log(this.end_time)

        let query={
            where:`([t]>='${this.cur_time}' and [t]<='${this.end_time}')`
        };
            const { data: res } =await this.$http.
            post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952&increase=false&pagesize=1&pageindex=1', 
            query)
            console.log("最新的一个数据返回结果是:")
            console.log(res.data)
       
        if(res.data.length == 0|| res.data == null){
            //console.log("没有最新数据！")
            return
        }

        if(res.data!=this.all_data[this.all_data.length-1]){
            //this.push_force.shift()
            this.push_force.push(res.data[0][100005]-'0')
            //this.time_point.shift()
            this.time_point.push(res.data[0]['t'])
            //this.torsion.shift()
            this.torsion.push(res.data[0][100004]-'0')
            //this.degree.shift()
            this.degree.push(res.data[0][100395]-'0')
            //this.v_push.shift()
            this.v_push.push(res.data[0][100002]-'0')
            //this.v_rotate.shift()
            this.v_rotate.push(res.data[0][100003]-'0')
            //获取当前环号
            this.cur_loop=res.data[0][100001]-"0"
            //获取当前掘进状态
            if(res.data[0][100007]>0){
                this.cur_state='拼装'
            }else{
                this.cur_state='掘进' //100006>0 或者 Wm>0
            }
        }
        this.initCharts(); 
    },
},
    created () {
        // this.timer = setInterval(() => {
        //     this.getRecentData()
        // }, 30000), // 10s刷新一次

        this.timer = setInterval(() => {
            this.getLatestData()
        }, 10000);
    },
    mounted () {
        this.getRecentData();         
　 },
}
</script>


<style lang="less" scoped>

.dv-border-box-9{
    width:100%;
    height: 100%;
}
.dv-border-box-11{
    padding-top: 90px;
    padding-left: 30px;
    height:525px;
}
.title_img{
    position: relative;
    // left:300px;
    top: 30px;
    //margin-top: 30px;
}
.headline{
    position: relative;
    transform: translate(0%,10%);
}
.title{
    color:#ffffff;
    font-size: 40px;
    font-family:'zcool_title'; 
    -webkit-text-stroke-color: rgb(255, 255, 255); 
    //-webkit-text-stroke-width: 0.5px; 
}
.el-container{
    margin:10px;
}
.el-carousel{
    position: relative;
    top:20px;
    left:35px;
}
.card_1{
    margin: 10px;
    margin-right: 30px;
    //background-color:rgba(252, 252, 252, 0.5)

}
.card_2{
    margin: 10px;
    background-color:rgba(252, 252, 252, 0.5)
}
.card_3{
    margin: 10px;
    background-color:rgba(252, 252, 252, 0.5)

}
.text{
    color: #96dee8;
    color: #bbecf3;
    //font-weight: bold;
    font-family: 'zcool_title';
    font-size: 25px;
}
.table-wrapper /deep/ .el-table--fit{
        padding: 20px;
}
 .table-wrapper /deep/  .el-table, .el-table__expanded-cell {
    background-color: #ffffff00;
}

 .table-wrapper /deep/ .el-table tr {
    background-color: #10192418!important;
}
 .table-wrapper /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: #0d1a2c18;;
}

.el-table{
    margin:30px;
}
.dv-border-box-4{
    margin-top: 10px;
    margin-left: 20px;
    padding: 30px;
}
.dv-border-box-10{
    position: relative;
    top:13px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 10px;
}
.chart{
    position: relative;
    left: 10px;
}
.card_1{
    margin: 15px;
    background-color:rgba(252, 252, 252, 0.5);
    margin-right:30px;
    position: relative;
    right:5px;
}
.title{
    color:#ffffff;
    font-size: 40px;
    font-family:'zcool_title'; 
    -webkit-text-stroke-color: rgb(255, 255, 255); 
    //-webkit-text-stroke-width: 0.5px; 
}
.text1{
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    margin-bottom: 30px;
    font-family: 'zcool_title';
    text-align: center;
}
.parm{
    width:500px;
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    font-family: 'zcool_title';
    position: relative;
    margin-top:20px;
    margin-bottom: 20px;
}


.dv-border-box-13{
    margin:10px;
    margin-left: 30px;
    padding: 20px;
}
.dv-border-box-12{
    position: relative;
    top:13px;
    padding-top: 15px;
    padding-bottom: 20px;
    margin-bottom: 10px;
}
.chart{
    position: relative;
    left: 10px;
}
.card_1{
    margin: 15px;
    background-color:rgba(252, 252, 252, 0.5);
    margin-right:30px;
    position: relative;
    right:5px;
}
.title{
    color:#ffffff;
    font-size: 40px;
    font-family:'zcool_title'; 
    -webkit-text-stroke-color: rgb(255, 255, 255); 
    //-webkit-text-stroke-width: 0.5px; 
}
.text{
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
    font-family: 'zcool_title';
    text-align: center;
}
.parm{
    width:500px;
    color: #96dee8;
    //font-weight: bold;
    font-size: 30px;
    font-family: 'zcool_title';
    position: relative;
    margin-top:20px;
    margin-bottom: 20px;
}
</style>
