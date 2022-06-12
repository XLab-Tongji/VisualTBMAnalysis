<template>
  <div>
     <div style="height:20px" />
      <el-container>
        <dv-decoration-3 style="width:40%;height:30px;" />
        <dv-decoration-7 class="headline" style="width:30%;height:30px;">  实时数据  </dv-decoration-7>
         <dv-decoration-3 style="width:40%;height:30px;" />
      </el-container>

      <el-container style="width:96%">
          <el-container  direction="vertical" style="width:330px;" >
            <dv-decoration-12  style="width:330px;height:330px;margin-left:18px;">
              <h1 class="text1">当前掘进环号<br> {{this.cur_loop}} <br><br>  当前掘进状态<br> {{this.cur_state}}
            </h1></dv-decoration-12>

            <div class="text" style="margin-top:15px">本页面五张折线图展示获取的最新一个小时内数据</div>
          </el-container>

          <dv-border-box-12 style="height:400px; width:33%;margin-right:20px;margin-left:20px;">
            <div class="text" style="margin-top:5px">总推力实时数据</div>
            <div style="width:390px;height:380px;position:relative;left:16px"  ref="push_force_chart"></div>
          </dv-border-box-12>

            <dv-border-box-12 style="height:400px; width:33%;">
              <div class="text" style="margin-top:5px">贯入度实时数据</div>
                <div style="width:390px;height:380px;" ref="degree_chart" ></div>
            </dv-border-box-12>
      </el-container>

      <div style="height:5px" />
      <dv-decoration-10 style="width:96%;height:5px;margin:5px;position:relative;left:10px" />

    <el-container style="height:100%; width:100%; ">
      <dv-border-box-12 style="height:100%; width:31%;margin-left:8px;">
        <div class="text">扭矩实时数据</div>
        <div style="width:390px;height:350px" ref="torsion_chart" class="chart"></div>
      </dv-border-box-12>

      <dv-border-box-12 style="height:100%; width:31%;margin-right:20px;margin-left:20px;">
        <div class="text">推进速度实时数据</div>
        <div style="width:390px;height:350px" ref="v_push_chart" class="chart"></div>
      </dv-border-box-12>

      <dv-border-box-12 style="height:100%; width:31%;">
        <div class="text">刀盘转速实时数据</div>
        <div style="width:390px;height:350px" ref="v_rotate_chart" class="chart"></div>
      </dv-border-box-12>
    </el-container>
  </div>
</template>

<script>
export default{
  data () {
    return {
      all_data: [],
      new_data: [],
      cur_loop: 1967,
      cur_state: '掘进',
      value: [new Date(2021, 9, 22, 23, 50), new Date(2021, 9, 22, 23, 59)],
      cur_time: '',
      start_time: '',
      end_time: '',
      time: ['2021-09-22 23:55:00', '2021-09-22 23:59:00'],

      time_point: [
        "2021/11/11 12:02:00",
        "2021/11/11 12:02:05",
        "2021/11/11 12:02:10",
        "2021/11/11 12:02:15",
        "2021/11/11 12:02:20",
        "2021/11/11 12:02:25",
        "2021/11/11 12:02:30",
        "2021/11/11 12:02:35",
        "2021/11/11 12:02:40",
        "2021/11/11 12:02:45",
        "2021/11/11 12:02:50",
        "2021/11/11 12:02:55",
        "2021/11/11 12:03:05",
        "2021/11/11 12:03:10",
        "2021/11/11 12:03:15",
        "2021/11/11 12:03:20",
        "2021/11/11 12:03:25",
        "2021/11/11 12:03:30",
        "2021/11/11 12:03:35",
        "2021/11/11 12:03:40",
        "2021/11/11 12:03:45",
        "2021/11/11 12:03:50",
        "2021/11/11 12:03:55",
        "2021/11/11 12:04:00",
        "2021/11/11 12:04:05",
        "2021/11/11 12:04:10",
        "2021/11/11 12:04:15",
        "2021/11/11 12:04:20",
        "2021/11/11 12:04:25",
        "2021/11/11 12:04:30",
        "2021/11/11 12:04:35",
        "2021/11/11 12:04:40",
        "2021/11/11 12:04:45",
        "2021/11/11 12:04:50",
        "2021/11/11 12:04:55",
        "2021/11/11 12:05:00"
      ],
      push_force: [
        27183.57,
        27077.38,
        27045.53,
        27013.67,
        26949.96,
        26843.77,
        26811.92,
        26620.78,
        26557.07,
        26036.76,
        25495.21,
        27003.05,
        24178.51,
        21799.95,
        19697.47,
        18370.14,
        18051.59,
        18402,
        19230.25,
        19867.37,
        20589.43,
        21343.35,
        20833.65,
        20769.94,
        22670.67,
        23201.6,
        23573.25,
        27502.13,
        29222.33,
        30730.17,
        31802.65,
        33395.44,
        34542.25,
        34075.03,
        34913.89,
        34648.43
      ],
      v_push: [
        0.43,
        0.43,
        0.4,
        0.4,
        0.43,
        0.37,
        0.4,
        0.45,
        0.37,
        0.39,
        0.4,
        0.4,
        0.43,
        0.43,
        0.34,
        0.35,
        0.37,
        0.39,
        0.38,
        0.37,
        0.37,
        0.4,
        0.44,
        0.44,
        0.51,
        0.54,
        0.5,
        0.58,
        0.9,
        1.28,
        1.46,
        1.77,
        2.33,
        2.19,
        2.54,
        2.57
      ],
      v_rotate: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2.01,
        12.36,
        18.66,
        21.16,
        20.98,
        20.28,
        19.16,
        18.11,
        17.29,
        16.87,
        0,
        0,
        0,
        0,
        0,
        0,
        9.93,
        10.39,
        12.13,
        14.12,
        13.05,
        11.92,
        11.67,
        11.51,
        11.14
      ],
      torsion: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        4.15,
        25.47,
        38.46,
        43.6,
        43.22,
        41.79,
        39.47,
        37.33,
        35.61,
        34.75,
        0,
        0,
        0,
        0,
        0,
        0,
        20.45,
        21.38,
        24.96,
        29.11,
        26.87,
        24.51,
        24.06,
        23.72,
        22.98
      ],
      degree: [
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06,
        2.06
      ],

    };
  },
  methods: {
    initCharts () {
      let myChart0 = this.$echarts.init(this.$refs.push_force_chart, 'walden');
      let myChart1 = this.$echarts.init(this.$refs.degree_chart, 'walden');
      let myChart2 = this.$echarts.init(this.$refs.torsion_chart, 'walden');
      let myChart3 = this.$echarts.init(this.$refs.v_push_chart, 'walden');
      let myChart4 = this.$echarts.init(this.$refs.v_rotate_chart, 'walden');
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
        dataZoom: [
          {
            type: 'inside',
            start: 60,
            end: 100
          },
          {
            start: 0,
            end: 40
          }
        ],
        series: [
          {
            data: this.push_force,
            symbol: 'none',
            type: 'line',
          },
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
        dataZoom: [
          {
            type: 'inside',
            start: 60,
            end: 100
          },
          {
            start: 0,
            end: 40
          }
        ],
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
        dataZoom: [
          {
            type: 'inside',
            start: 60,
            end: 100
          },
          {
            start: 0,
            end: 40
          }
        ],
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
        dataZoom: [
          {
            type: 'inside',
            start: 60,
            end: 100
          },
          {
            start: 0,
            end: 40
          }
        ],
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
        dataZoom: [
          {
            type: 'inside',
            start: 60,
            end: 100
          },
          {
            start: 0,
            end: 40
          }
        ],
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
    async getRecentData () {
    //获取当前时间
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      var day = new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
      var hour = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
      var minute = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
      var second = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();

      this.cur_time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
      console.log(this.cur_time)

      //一个小时前的时间点
      hour = new Date().getHours() < 10 ? "0" + (new Date().getHours() - 1) : (new Date().getHours() - 1);
      this.start_time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
      console.log(this.start_time)

      //开始发起请求
      let query = {
        where: `([t]>='${this.start_time}' and [t]<='${this.cur_time}')`
        //这个接口没有数据的话也会提示“括弧附近有语法错误”
      };
      const { data: res } = await this.$http
        .post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952', query)

      if(res.data == null || res.data.length == 0 || res.data[0].SYS_DataFile == null) {
        console.log("实时信息获取数据为空或失败！开始渲染假数据")
        this.initCharts();
        return
      }

      //插入渲染数据
      console.log("实时获取后端返回结果是:")
      console.log(res.data)
      this.all_data = res.data

      console.log("要渲染的数据为")
      console.log(this.all_data)

      this.time_point = []
      this.push_force = [] //总推力
      this.torsion = [] //扭矩
      this.degree = [] //贯入度
      this.v_push = [] //推进速度
      this.v_rotate = [] //刀盘转速

      var i;
      for(i = 0; i < this.all_data.length; i++) {
        this.push_force.push(this.all_data[i][100005] - '0')
        this.time_point.push(this.all_data[i]['t'])
        this.torsion.push(this.all_data[i][100004] - '0')
        this.degree.push(this.all_data[i][100395] - '0')
        this.v_push.push(this.all_data[i][100002] - '0')
        this.v_rotate.push(this.all_data[i][100003] - '0')
      }
      //获取当前环号
      this.cur_loop = this.all_data[i - 1][100001] - "0"
      //获取当前掘进状态
      if(this.all_data[i - 1][100007] > 0) {
        this.cur_state = '拼装'
      }else{
        this.cur_state = '掘进'
      }
      this.initCharts();
    }
  },
  created () {

  },
  mounted () {
    this.getRecentData();
  },
}
</script>

<style lang="less" scoped>
.dv-loading{
  z-index: 999;
}
.dv-border-box-9{
  width:100%;
  height: 100%;
}
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
.headline{
  color: #dbfbff;
  font-family: 'zcool_title';
  font-size: 55px;
  margin-bottom: 10px;
  text-align: center;
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
  margin-bottom: 10px;
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
.text1{
  color: #96dee8;
  font-size: 30px;
  margin-bottom: 30px;
  font-family: 'zcool_title';
  text-align: center;
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
.dv-border-box-12{
  position: relative;
  top:13px;
  padding-top: 15px;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
</style>
