<template>
<div>
  <div style="height:40px" />

  <el-container>
      <dv-decoration-3 style="width:40%;height:30px;" />
      <dv-decoration-7 class="headline" style="width:30%;height:30px;">  历史数据  </dv-decoration-7>
      <dv-decoration-3 style="width:40%;height:30px;" />
  </el-container>

  <el-container style="position:relative;left:420px;">
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="initCharts" style="font-size:22px" >全部数据</el-button></dv-decoration-11>
    <dv-decoration-11 style="width:220px;height:50px;">
            <el-button type="text" class="info_text" @click="showMarch" style="font-size:22px" >掘进数据</el-button></dv-decoration-11>
  </el-container>

  <el-container style="height:100%; width:96%; ">
    <el-container style="height:100%;width:28%; margin-left:8px;" direction="vertical" >
      <div class="text">请选择数据时间范围</div>
      <el-container>
        <el-date-picker
          popper-class="mydatestyle"
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button icon="el-icon-search" circle @click="submitTime"
            style="margin-left:20px;margin-right:10px;height:40px"></el-button>
        <download-excel
          class = "export-excel-wrapper"
          :data = "json_data"
          name = "导出数据.xls">
        <el-button @click="downloadData" icon="el-icon-download" circle></el-button>
        </download-excel>
      </el-container>

      <!-- 这里需要一段说明文字 -->
      <dv-border-box-4 :color="['#3fb1e3', '#96dee8']" style="padding:30px;width:350px;height:280px;padding-left:40px">
      <div class="info_text" >
        说明：
        <br>可以通过上方时间选择框选择想要获取的数据区间。
        <br>点击搜索按钮进行数据筛选展示，点击下载按钮下载excel文件。
        <br>最上方可选择性展示掘进状态的数据或者全部数据。
        <br>图表上方可选择性展示原始数据和滤波数据。滤波步长为8。</div>
      </dv-border-box-4>
    </el-container>

      <dv-border-box-10 style="height:100%; width:33%;margin-right:20px;margin-left:20px;">
        <div class="text" style="margin-top:5px">总推力实时数据</div>
        <div style="width:360px;height:350px;position:relative;left:30px"  ref="push_force_chart"></div>
      </dv-border-box-10>

      <dv-border-box-10 style="height:100%; width:30%;">
        <div class="text" style="margin-top:5px">贯入度实时数据</div>
          <div style="width:350px;height:350px;position:relative;left:16px" ref="degree_chart" ></div>
      </dv-border-box-10>

  </el-container>

  <div style="height:10px" />

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

</div>
</template>

<script>
export default{
  data () {
    return {
      all_data: [],
      json_data: [],
      value: ['', ''],
      time: ['2021-11-11 11:50:00', '2021-11-11 12:10:00'],

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
      state: [
        '掘进',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '掘进',
        '掘进',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '掘进',
        '掘进',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '掘进',
        '掘进',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '掘进',
        '掘进',
        '拼装',
        '拼装',
        '拼装',
        '拼装',
        '掘进',
        '掘进',
        '掘进',
        '掘进',
        '掘进',
        '掘进',
      ],

      //存放掘进数据的数组
      m_time_point: [],
      m_push_force: [],
      m_v_push: [],
      m_v_rotate: [],
      m_torsion: [],
      m_degree: [],
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
            name: '原始数据',
            data: this.push_force,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
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
            name: '原始数据',
            data: this.degree,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
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
            name: '原始数据',
            data: this.torsion,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
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
            name: '原始数据',
            data: this.v_push,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
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
            name: '原始数据',
            data: this.v_rotate,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
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
      let query = {
        where: `([t]>='${this.time[0]}' and [t]<='${this.time[1]}')`
      };
      const { data: res } = await this.$http
        .post('/api/universal/Monitoring/MonDataEqu_shushui/where?prj=shushui&dataset=3835049491879165952',
          query)
      console.log("根据时间段获取后端返回结果是:")
      console.log(res.data)
      this.all_data = res.data

      var i;
      if(res.data == null || res.data.length == 0 || res.data[0].SYS_DataFile == null) {
        console.log("时间筛选获取数据为空或失败！")
        this.$alert('由于服务器不稳定，获取数据失败！', '错误提示', {
          confirmButtonText: '确定',
        });
      }else{
        this.time_point = []
        this.push_force = [] //总推力
        this.torsion = [] //扭矩
        this.degree = [] //贯入度
        this.v_push = [] //推进速度
        this.v_rotate = [] //刀盘转速
        this.state = [] //掘进状态

        for(i = 0; i < this.all_data.length; i++) {
          this.push_force.push(this.all_data[i][100005] - '0')
          this.time_point.push(this.all_data[i]['t'])
          this.torsion.push(this.all_data[i][100004] - '0')
          this.degree.push(this.all_data[i][100395] - '0')
          this.v_push.push(this.all_data[i][100002] - '0')
          this.v_rotate.push(this.all_data[i][100003] - '0')

          if(this.all_data[i][100007] > 0) {
            this.state.push('拼装')
          }else{
            this.state.push('掘进') //100006>0 或者 Wm>0
          }
        }
      }
      console.log('this.time_point')
      console.log(this.time_point)
      console.log(this.push_force)
      console.log(this.torsion)
      console.log(this.degree)
      console.log(this.v_push)
      console.log(this.v_rotate)

      this.initCharts();
    },
    submitTime() {
      var i = 0;
      for(i = 0; i < 2; i++) {
        var year = this.value[i].getFullYear();
        var month = this.value[i].getMonth() + 1 < 10 ? "0" + this.value[i].getMonth() + 1 : this.value[i].getMonth() + 1;
        var day = this.value[i].getDate() < 10 ? "0" + this.value[i].getDate() : this.value[i].getDate();
        var hour = this.value[i].getHours() < 10 ? "0" + this.value[i].getHours() : this.value[i].getHours();
        var minute = this.value[i].getMinutes() < 10 ? "0" + this.value[i].getMinutes() : this.value[i].getMinutes();
        var second = this.value[i].getSeconds() < 10 ? "0" + this.value[i].getSeconds() : this.value[i].getSeconds();

        this.time[i] = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        console.log(this.time[i]);
      }
      this.getData();
    },
    downloadData() {
      for(var i = 0; i < this.all_data.length; i++) {
        this.json_data.push({
          "时间": this.all_data[i]['t'],
          "推力": this.all_data[i][100005] - '0',
          "扭矩": this.all_data[i][100004] - '0',
          "贯入度": this.all_data[i][100395] - '0',
          "推进速度": this.all_data[i][100002] - '0',
          "刀盘转速": this.all_data[i][100003] - '0',
          "掘进状态": this.state[i],
        })
      }
    },
    dataFilter(arr) {
      var step = 5
      var temp
      var ans = []

      for(var i = 0; i < arr.length - step; i++) {
        temp = 0
        for(var j = 0; j < step; j++) {
          temp = temp + arr[i + j]
        }
        temp = temp / step
        ans.push(temp)
      }
      temp = ans[0]
      ans.unshift(temp)
      ans.unshift(temp)
      ans.unshift(temp)
      // console.log('均值滤波的结果是：')
      // console.log(ans)
      return ans
    },
    showMarch() {
      this.m_time_point = []
      this.m_push_force = []
      this.m_v_push = []
      this.m_v_rotate = []
      this.m_torsion = []
      this.m_degree = []

      //1. 首先将all_data的数据过滤，掘进状态的数据放到各个参数掘进的数组里
      //2. 如果数据为空就弹窗提示所选时间段无掘进数据。否则重新启动每个chart的setoption
      var i

      if(this.all_data.SYS_DataFile == null) {
        for(i = 0; i < this.torsion.length; i++) {
          if(this.state[i] == '掘进') {
            this.m_push_force.push(this.push_force[i])
            this.m_time_point.push(this.time_point[i])
            this.m_torsion.push(this.torsion[i])
            this.m_degree.push(this.degree[i])
            this.m_v_push.push(this.v_push[i])
            this.m_v_rotate.push(this.v_rotate[i])
          }
        }
      } else{
        for(i = 0; i < this.all_data.length; i++) {
          if(!(this.all_data[i][100007] > 0)) {
            this.m_push_force.push(this.all_data[i][100005] - '0')
            this.m_time_point.push(this.all_data[i]['t'])
            this.m_torsion.push(this.all_data[i][100004] - '0')
            this.m_degree.push(this.all_data[i][100395] - '0')
            this.m_v_push.push(this.all_data[i][100002] - '0')
            this.m_v_rotate.push(this.all_data[i][100003] - '0')
          }
        }

        //如果没有掘进数据则做错误提示
        if(this.m_time_point.length == 0) {
          this.$alert('对不起！您所选时间段没有在掘进状态下的数据。', '错误提示', {
            confirmButtonText: '确定',
          });
          return
        }
      }

      let myChart0 = this.$echarts.init(this.$refs.push_force_chart, 'walden');
      let myChart1 = this.$echarts.init(this.$refs.degree_chart, 'walden');
      let myChart2 = this.$echarts.init(this.$refs.torsion_chart, 'walden');
      let myChart3 = this.$echarts.init(this.$refs.v_push_chart, 'walden');
      let myChart4 = this.$echarts.init(this.$refs.v_rotate_chart, 'walden');
      myChart0.setOption({
        xAxis: {
          type: 'category',
          data: this.m_time_point,
          boundaryGap: false
        },
        series: [
          {
            name: '原始数据',
            data: this.m_push_force,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
            data: this.dataFilter(this.m_push_force),
            symbol: 'none',
            type: 'line',
          }
        ]
      });
      myChart1.setOption({
        xAxis: {
          type: 'category',
          data: this.m_time_point,
          boundaryGap: false
        },
        series: [
          {
            name: '原始数据',
            data: this.m_degree,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
            data: this.dataFilter(this.m_degree),
            symbol: 'none',
            type: 'line',
          }
        ]
      });
      myChart2.setOption({
        xAxis: {
          type: 'category',
          data: this.m_time_point,
          boundaryGap: false
        },
        series: [
          {
            name: '原始数据',
            data: this.m_torsion,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
            data: this.dataFilter(this.m_torsion),
            symbol: 'none',
            type: 'line',
          }
        ]
      });
      myChart3.setOption({
        xAxis: {
          type: 'category',
          data: this.m_time_point,
          boundaryGap: false
        },
        series: [
          {
            name: '原始数据',
            data: this.m_v_push,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
            data: this.dataFilter(this.m_v_push),
            symbol: 'none',
            type: 'line',
          }
        ]
      });
      myChart4.setOption({
        xAxis: {
          type: 'category',
          data: this.m_time_point,
          boundaryGap: false
        },
        series: [
          {
            name: '原始数据',
            data: this.m_v_rotate,
            symbol: 'none',
            type: 'line',
          },
          {
            name: '滤波数据',
            data: this.dataFilter(this.m_v_rotate),
            symbol: 'none',
            type: 'line',
          }
        ]
      });
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
.info_text{
  color: #96dee8;
  font-family: 'zcool_title';
  font-size: 25px;
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
.headline{
  color: #dbfbff;
  font-family: 'zcool_title';
  font-size: 55px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
