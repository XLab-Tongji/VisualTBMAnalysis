<template>
<el-container  direction="vertical" >
  
<el-container>

    <el-container  style="width:60%; height:100%" direction="vertical" >
            <dv-decoration-11 style="width:100%;height:150px;"><h1 class="text">当前掘进环号：{{this.cur_loop}} <br> 当前掘进状态：{{this.cur_state}}
                </h1></dv-decoration-11>   

        <el-date-picker
        v-model="value"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
        </el-date-picker>

        <el-button @click="submitTime" style="width:100px">筛选</el-button>

    </el-container>

    <el-container style="width:40%;height:100%">
        <dv-border-box-11 title="总推力变化情况" 
        style="font-family: 'zcool_title';font-size: 25px;"  
        :color="['#3f7c8b', '#96dee8']" >
            <div style="width:500px;height:500px" ref="chart"></div>
        </dv-border-box-11>
        
    </el-container>
</el-container>
</el-container>
</template>

<script>
export default {
 data () { 
　　return {
        all_data:[],
        time_point:['test1','test2','test3','test4','test5','test6','test7'],
        push_force:[24680,24650,24620,24680,24700,24680,24720],
        text:'hhhhh',
        cur_loop:0,
        cur_state:'',
        value: [new Date(2021, 9, 22, 23, 50), new Date(2021, 9, 22, 23, 59)],
        time:['2021-09-17 23:56:00','2021-09-17 23:59:00'],
        time0:'',
        time1:'',
    };
　},
　methods: {
　　initCharts () {
　　let myChart = this.$echarts.init(this.$refs.chart,'walden');
　　//console.log(this.$refs.chart)
　　// 绘制图表
　　myChart.setOption({
    //图表开始
         tooltip: {
            trigger: 'axis',
            position: function (pt) {
            return [pt[0], '10%'];
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
            // min:24000,
            // max:40000,
           
            boundaryGap: [0, '100%']
        },
          dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 20
            },
            {
                start: 0,
                end: 20
            }
        ],
        series: [
            {
            data: this.push_force,
            //smooth: true,
            symbol: 'none',
            //areaStyle: {},
            type: 'line',
            }
        ]
        //结束
    　　});
　　},
    async getData () {
        let query={
            where:`([t]>='${this.time[0]}' and [t]<='${this.time[1]}')`
        };
        const { data: res } =await this.$http.
        post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', 
        query)
        console.log(res.data)
        this.all_data=res.data

        var i;
        if(res.data == null){
            console.log("获取数据失败！")
        }else{
            this.push_force=[]
            this.time_point=[]
            
            for(i=0;i<this.all_data.length;i++){
                this.push_force.push(this.all_data[i][100005]-'0')
                this.time_point.push(this.all_data[i]['t'])
            }
            console.log("getData执行")
            
            // console.log(this.time_point)
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
    submitTime(){
        var i=0;
        for(i=0;i<2;i++){
            var year = this.value[i].getFullYear(); //获取完整的年份(4位,1970-????)
        var month = this.value[i].getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var day = this.value[i].getDate(); //获取当前日(1-31)
        var hour = this.value[i].getHours(); 
        var minute = this.value[i].getMinutes(); 
        var second = this.value[i].getSeconds(); 
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        
        this.time[i] =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second
        console.log(this.time[i]); 
        }
        this.getData();
    }

　 },
    created () {
        this.timer = setInterval(() => {
            this.getData()
        }, 60000) // 1min  
    },
　  mounted () {
        this.getData(); 
        
　 },

}
</script>

<style lang="less" scoped>
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
</style>