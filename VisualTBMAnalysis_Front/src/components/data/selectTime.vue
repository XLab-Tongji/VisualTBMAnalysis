<template>
<div>
<el-container  direction="vertical" >
  <el-container >
    <el-container  style="width:30%; height:100%" direction="vertical" >
      <div class="text">可选择数据时间范围</div>
      <el-container>
        <el-date-picker
          popper-class="mydatestyle"
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button icon="el-icon-search" circle @click="submitTime" style="margin-left:25px;margin-right:10px"></el-button>
        <download-excel
          class = "export-excel-wrapper"
          :data = "json_data"
          name = "导出数据.xls">
        <el-button @click="exportData" icon="el-icon-download" circle></el-button>
        </download-excel>
      </el-container>

      <dv-border-box-12 style="height:420px; width:100%;">
        <div class="text" style="margin-top:5px">贯入度变化情况</div>
        <div style="width:450px;height:360px" ref="degree_chart" class="chart"></div>
      </dv-border-box-12>
    </el-container>

    <el-container style="width:50%;height:100%">
      <dv-border-box-11 title="总推力变化情况" 
        style="font-family: 'zcool_title';font-size: 25px;height:480px"  
        :color="['#3f7c8b', '#96dee8']" >
        <div style="width:680px;height:450px" ref="push_force_chart"></div>
      </dv-border-box-11>    
    </el-container>
  </el-container>
</el-container>

<dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

<el-container style="height:100%; width:100%; ">    
  <dv-border-box-10 style="height:100%; width:31%;margin-left:8px;">
    <div class="text">扭矩变化情况</div>
    <div style="width:390px;height:350px" ref="torsion_chart" class="chart"></div>
  </dv-border-box-10>

  <dv-border-box-10 style="height:100%; width:31%;margin-right:20px;margin-left:20px;">
    <div class="text">推进速度变化情况</div>
    <div style="width:390px;height:350px" ref="v_push_chart" class="chart"></div>
  </dv-border-box-10>

  <dv-border-box-10 style="height:100%; width:31%;">
    <div class="text">刀盘转速变化情况</div>
    <div style="width:390px;height:350px" ref="v_rotate_chart" class="chart"></div>
  </dv-border-box-10>
</el-container>
  
<dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

</div>
</template>

<script>
export default{
  data () { 
    return {
      all_data:[],
      json_data:[],
      time_point:['test1','test2','test3','test4','test5','test6','test7'],
      push_force:[24680,24650,24620,24680,24700,24680,24720],
      value: [new Date(2021, 9, 22, 23, 40), new Date(2021, 9, 22, 23, 59)],
      time:['2021-09-22 23:30:00','2021-09-22 23:59:00'],

      v_push:[80,50,20,80,70,80,20],
      v_rotate:[80,50,20,80,70,80,20],
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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
            }
        },
        legend: {
            data: ['原始数据', '滤波数据']
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
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 40
            },
            {
                start: 0,
                end: 40
            }
        ],
        series: [
          { 
            name:'原始数据',
            data: this.push_force,
            symbol: 'none',
            type: 'line',
          },
          { 
            name:'滤波数据',
            data: this.dataFilter(this.push_force),
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
          legend: {
            data: ['原始数据', '滤波数据']
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
              boundaryGap: [0, '100%']
          },
          dataZoom: [
              {
                  type: 'inside',
                  start: 0,
                  end: 40
              },
              {
                  start: 0,
                  end: 40
              }
          ],
          series: [
            { 
              name:'原始数据',
              data: this.degree,
              symbol: 'none',
              type: 'line',
            },
            {
              name:'滤波数据',
              data: this.dataFilter(this.degree),
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
          legend: {
              data: ['原始数据', '滤波数据']
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
          dataZoom: [
              {
                  type: 'inside',
                  start: 0,
                  end: 40
              },
              {
                  start: 0,
                  end: 40
              }
          ],
          series: [
            { 
              name:'原始数据',
              data: this.torsion,
              symbol: 'none',
              type: 'line',
            },
            { 
              name:'滤波数据',
              data: this.dataFilter(this.torsion),
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
          legend: {
              data: ['原始数据', '滤波数据']
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
        dataZoom: [
          {
              type: 'inside',
              start: 0,
              end: 40
          },
          {
              start: 0,
              end: 40
          }
      ],
      series: [
        { 
          name:'原始数据',
          data: this.v_push,
          symbol: 'none',
          type: 'line',
        },
        { 
          name:'滤波数据',
          data: this.dataFilter(this.v_push),
          symbol: 'none',
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
            legend: {
              data: ['原始数据', '滤波数据']
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
          dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 40
            },
            {
                start: 0,
                end: 40
            }
        ],
        series: [
          { 
            name:'原始数据',
            data: this.v_rotate,
            symbol: 'none',
            type: 'line',
          },
          { 
            name:'滤波数据',
            data: this.dataFilter(this.v_rotate),
            symbol: 'none',
            type: 'line',
          }
        ]
        //结束
    　　});
    },
    async getData () {
        console.log("根据时间段获取数据的请求的时间段为:")
        console.log(this.time[0])
        console.log(this.time[1])
        let query={
            where:`([t]>='${this.time[0]}' and [t]<='${this.time[1]}')`
        };
            const { data: res } =await this.$http.
            post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', 
            query)
        console.log("根据时间段获取后端返回结果是:")
        console.log(res.data)
        this.all_data=res.data

        var i;
        if(res.data.length == 0 || res.data == null){
            console.log("时间筛选获取数据为空或失败！")
            this.errorInfo()
        }else{
            this.time_point=[]
            this.push_force=[] //总推力
            this.torsion=[] //扭矩
            this.degree=[] //贯入度
            this.v_push=[] //推进速度
            this.v_rotate=[] //刀盘转速
            
            for(i=0;i<this.all_data.length;i++){
                this.push_force.push(this.all_data[i][100005]-'0')
                this.time_point.push(this.all_data[i]['t'])
                this.torsion.push(this.all_data[i][100004]-'0')
                this.degree.push(this.all_data[i][100395]-'0')
                this.v_push.push(this.all_data[i][100002]-'0')
                this.v_rotate.push(this.all_data[i][100003]-'0')
            }
        }
        
        this.initCharts();
          
    },
    submitTime(){
        var i=0;
        for(i=0;i<2;i++){
            var year = this.value[i].getFullYear();
            var month = this.value[i].getMonth() + 1 < 10 ? "0"+ this.value[i].getMonth() + 1 : this.value[i].getMonth() + 1 ; 
            var day = this.value[i].getDate() < 10 ? "0" + this.value[i].getDate() : this.value[i].getDate(); 
            var hour = this.value[i].getHours()< 10 ? "0" + this.value[i].getHours() : this.value[i].getHours(); 
            var minute = this.value[i].getMinutes()< 10 ? "0" + this.value[i].getMinutes() : this.value[i].getMinutes(); 
            var second = this.value[i].getSeconds()< 10 ? "0" + this.value[i].getSeconds() : this.value[i].getSeconds(); 

            this.time[i] =  year + "-" + month + "-" + day + " " + hour+":"+minute+":"+second
            console.log(this.time[i]); 
        }
        this.getData();
    },
    exportData(){
        for(var i=0;i<this.all_data.length;i++){
            this.json_data.push({
                "时间":this.all_data[i]['t'],
                "推力":this.all_data[i][100005]-'0',
                "扭矩":this.all_data[i][100004]-'0',
                "贯入度":this.all_data[i][100395]-'0',
                "推进速度":this.all_data[i][100002]-'0',
                "刀盘转速":this.all_data[i][100003]-'0',
            })
        }
    },
    errorInfo() {
        this.$alert('对不起！您所选时间段因为接口不稳定等原因没有可以展示的数据。', '错误提示', {
          confirmButtonText: '确定',
        });
    },
    dataFilter(arr){
      var step = 8
      var temp
      var ans= new Array()
      for(var i=0;i<arr.length-5;i++){
        temp = 0
        for(var j=0;j<step;j++){
          temp=temp+arr[i+j]
        }
        temp = temp/step
        ans.push(temp)
      }
      // console.log('均值滤波的结果是：')
      // console.log(ans)
      return ans
    }
  },
  created () {
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
.title{
  color:#ffffff;
  font-size: 40px;
  font-family:'zcool_title'; 
  -webkit-text-stroke-color: rgb(255, 255, 255); 
}
.el-container{
  margin:10px;
}
.el-carousel{
  position: relative;
  top:20px;
  left:35px;
}
.text{
  color: #96dee8;
  font-family: 'zcool_title';
  font-size: 25px;
  text-align: center;
}
.text1{
  color: #96dee8;
  font-size: 30px;
  margin-bottom: 30px;
  font-family: 'zcool_title';
  text-align: center;
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
.dv-border-box-12{
  position: relative;
  top:13px;
  padding-top: 15px;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
.parm{
  width:500px;
  color: #96dee8;
  font-size: 30px;
  font-family: 'zcool_title';
  position: relative;
  margin-top:20px;
  margin-bottom: 20px;
}
</style>
