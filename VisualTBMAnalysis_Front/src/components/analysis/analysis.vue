<template>
  <dv-border-box-9>
    <div>
      <!-- 输入参数 -->
      <div align="center" style="padding-top: 10px">
        <input1 :FK_SRingNo="this.currentNo" />
        <img src="@/assets/image/down.png" class="image" />
      </div>
      <!-- 环号筛选 -->
      <div class="block" style="position: absolute; top: 25%; left: 2%">
        <dv-border-box-1>
          <div class="table-wrapper">
            <div class="text">分析环号</div>
            <div class="noText">当前展示环号：{{ this.currentNo }}</div>
            <div align="center" class="noText">
              根据环号搜索
              <el-input
                placeholder="请输入环号"
                prefix-icon="el-icon-search"
                v-model="inputNo"
                style="width: 35%"
                @keyup.enter.native="toChange"
              >
              </el-input>
            </div>
            <el-container>
              <el-table
                :show-header="true"
                :data="
                  analyseNo.slice(
                    (currentPage - 1) * pagesize,
                    currentPage * pagesize
                  )
                "
                :cell-style="cellStyle"
                style="width: 100%"
                size="mini"
                max-height="420"
                :span-method="objectSpanMethod"
                highlight-current-row
                @current-change="handleCurrentChange"
              >
                <el-table-column prop="FK_SRingNo" label="分析环号" width="70">
                </el-table-column>
                <el-table-column
                  prop="AnalysisModel"
                  label="模型名称"
                  width="130"
                >
                </el-table-column>
                <el-table-column
                  prop="AnalysisTime"
                  label="数据更新时间"
                  width="150"
                >
                </el-table-column>
              </el-table>
            </el-container>
          </div>
          <el-pagination
            small
            layout="prev, pager, next"
            :pager-count="7"
            :total="total"
            @current-change="current_change"
            align="center"
            style="padding-bottom: 15px"
          >
          </el-pagination>
        </dv-border-box-1>
      </div>
      <!-- 模型图形 -->
      <div align="center">
        <dv-decoration-9 style="width: 370px; height: 220px"
          ><h1 class="text">
            基于RF-PSO算法的掘进参数优化模型
          </h1></dv-decoration-9
        >
        <!-- 模型简介 -->
        <el-card style="position: absolute; top: 12%; right: 3.3%">
          <div align="left" style="margin: 0px 0px">
            <div class="introText">
              &emsp;&emsp;在泥水盾构掘进过程中，掘进优化决策方法通常含有多个评价指标，如施工安全和高效掘进。在保证施工安全的前提下，掘进效率是施工中最关注的指标。在构建的泥水盾构岩机映射模型的基础上，结合珠三角水资源配置工程的特点，以“先安全，再高效”为掘进参数的优化目标，以贯入度p和刀盘转速n为优化变量，通过在不同地层条件下建立掘进参数优化控制范围作为多元约束条件保证掘进安全以及刀具磨损的合理化，最后采用粒子群优化算法以掘进速度v为目标函数给出盾构在安全且刀具磨损合理的范围内高效掘进的掘进参数建议结果。
            </div>
          </div>
        </el-card>
      </div>
      <div align="center" style="margin-top: 0px; padding-right: 0px">
        <img src="@/assets/image/line.png" class="line" />
        <img
          src="@/assets/image/right.png"
          class="right"
          style="position: absolute; right: 0; top: 47%; right: 41%"
        />
        <!-- 输出结果1 -->
        <output1
          :FK_SRingNo="this.currentNo"
          style="position: absolute; top: 41%; right: 3%"
        />
      </div>
      <div align="center">
        <img
          src="@/assets/image/down.png"
          class="image"
          style="margin-top: -20px"
        />
        <!-- 模型图形 -->
        <dv-decoration-9 align="center" style="width: 380px; height: 220px"
          ><h1 class="text">
            基于RF-PSO算法的泥水仓压力控制参数优化模型
          </h1></dv-decoration-9
        >
        <!-- 模型简介 -->
        <el-card style="position: absolute; top: 62.5%; right: 3.2%">
          <div align="left" style="margin: 0px 0px">
            <div class="introText">
              &emsp;&emsp;由所构建的泥水盾构掘进参数优化模型可知，当盾构PLC数据采集系统获得上一环的盾构掘进参数后，可计算得到上一环的FPI均值及方差、TPI均值及方差，将这四个参数作为实时的地质信息输入泥水盾构掘进参数优化模型，同时给定当前环的水土压力期望值，泥水盾构掘进参数优化模型就能给出当前环在掘进参数控制范围内最优的贯入度、刀盘转速以及掘进速度，从而代入岩机映射模型就能获得当前环的总推力和刀盘扭矩。
            </div>
            <div class="introText">
              &emsp;&emsp;为了保证将水土压力期望值作为泥水仓顶部压力的方式具有较好的合理性同时，使得泥水仓顶部压力与前方理论水土压力保持平衡，在泥水盾构掘进参数优化模型的基础上，通过优化泥水仓压力控制变量使得当前环泥水仓压力与前方水土压力保持平衡。
            </div>
          </div>
        </el-card>
      </div>
      <div align="center" style="padding-top: 0px">
        <img src="@/assets/image/down.png" class="image" />
        <!-- 输出结果2 -->
        <output2 :FK_SRingNo="this.currentNo" />
      </div>
      <div class="d-flex jc-center">
        <div class="title">
          <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#3fb1e3', '#96dee8']"
            style="margin-bottom: 5px"
          />
        </div>
      </div>
    </div>
  </dv-border-box-9>
</template>

<script>
import input1 from "./input1";
import output1 from "./output1";
import output2 from "./output2";

export default {
  components: {
    input1,
    output1,
    output2,
  },
  data() {
    return {
      analyseNo: [],
      recordID1: "0",
      recordID2: "0",
      modelName1: "掘进参数优化模型",
      modelName2: "泥水仓压力优化模型",
      pagesize: 10, //一页展示的表格项数
      currentPage: 1,
      total: 1000, //表格总项数
      inputNo: "", //输入环号
      currentNo: "", //当前环号
      currentRow: null, //设置表格选中的行
    };
  },
  methods: {
    //设置选中行
    handleCurrentChange(val) {
      this.currentRow = val;
      this.currentNo=this.currentRow.FK_SRingNo;
    },
    //选中行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    //表格项字体颜色
    cellStyle(row, column, rowIndex, columnIndex) {
      return "color:#96dee8";
    },
    //改变当前环号
    toChange() {
      if (this.inputNo == "") {
      } else {
        this.currentNo = this.inputNo;
      }
    },
    //分页栏
    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },

    async getNo() {
      let queryID1 = {
        where: `(([AnalysisObject]='S1245') and ([AnalysisModel]='${this.modelName1}'))`,
      };
      const { data: res1 } = await this.$http.post(
        "/api/universal/Structure/TunnelingAnalysisRecord/where?prj=shushui&dataset=3871633455494201344&increase=false",
        queryID1
      );
      for (var i = res1.data.length - 1; i >= 0; i--) {
        var j = i + i + 1;
        this.analyseNo[j] = res1.data[i];
      }
      console.log("我在测试：");
      console.log(res1.data);
      let queryID2 = {
        where: `(([AnalysisObject]='S1245') and ([AnalysisModel]='${this.modelName2}'))`,
      };
      const { data: res2 } = await this.$http.post(
        "/api/universal/Structure/TunnelingAnalysisRecord/where?prj=shushui&dataset=3871633455494201344&increase=false",
        queryID2
      );
      for (var i = res2.data.length - 1; i >= 0; i--) {
        var j = i + i;
        this.analyseNo[j] = res2.data[i];
      }
      this.total = res1.data.length + res2.data.length;
      this.currentNo = res1.data[0]["FK_SRingNo"];
    },
  },
  mounted() {
    this.getNo();
  },
};
</script>

<style lang="less" scoped>
.dv-border-box-9 {
  width: 100%;
  height: 100%;
}
.text {
  color: #96dee8;
  font-size: 30px;
  padding-top: 0px;
  margin-bottom: 0px;
  font-family: "zcool_title";
  text-align: center;
}
.noText {
  color: #96dee8;
  font-size: 20px;
  padding-left: 0px;
  margin-bottom: 0px;
  font-family: "zcool_title";
  text-align: center;
}
.introText {
  color: #96dee8;
  //font-weight: bold;
  font-size: 16px;
  padding-top: 0px;
  margin-bottom: 0px;
  font-family: "zcool_title";
  text-align: left;
}
.image {
  width: 4.5%;
  display: block;
}
.line {
  width: 20%;
  display: inline;
}
.right {
  width: 5%;
  display: inline;
}
.el-card {
  width: 25%;
  border-color: #3fb1e3;
  background-color: #20404773;
  margin: 5px;
}

.table-wrapper /deep/ .el-table--fit {
  padding-top: 3px;
  padding-left: 20px;
  padding-right: 20px;
}

.table-wrapper /deep/ .el-table,
.el-table__expanded-cell {
  background-color: #ffffff00;
}

.table-wrapper /deep/ .el-table tr {
  background-color: #10192418 !important;
}

// .el-pagination {
//   background-color: #a37744 ;
// }
.el-pager,
.el-pager li {
  background-color: #a3774400;
}

.dv-border-box-1 {
  width: 95%;
}
</style>

<style>
.el-table th.el-table__cell {
  background-color: #a3774400 !important;
}
.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 0.5px solid #ebeef5;
}
.el-table .el-table__cell {
  color: #96dee8;
}
.el-pagination button:disabled {
  background-color: #a3774400 !important;
}
.el-pager,
.el-pager li {
  background-color: #a3774400 !important;
  color: #fff;
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
  background-color: #a3774400 !important;
}
.el-pagination .btn-next .el-icon,
.el-pagination .btn-prev .el-icon {
  color: #fff;
}

.el-input__inner {
  background-color: #a3774400 !important;
  border: none !important;
  color: #fff !important;
}
.el-table__body tr.current-row>td.el-table__cell {
    background-color: #066e7c !important;
}
</style>