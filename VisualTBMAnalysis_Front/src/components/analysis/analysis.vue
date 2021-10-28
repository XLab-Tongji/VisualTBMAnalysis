<template>
  <dv-border-box-9>
    <div>
      <div align="center" style="padding-top: 10px">
        <input1 />
        <img src="@/assets/image/down.png" class="image" />
      </div>
      <div align="center">
        <dv-decoration-9 style="width: 400px; height: 250px"
          ><h1 class="text">
            基于RF-PSO算法的掘进参数优化模型
          </h1></dv-decoration-9
        >
      </div>
      <div align="center" style="padding-top: 0px; padding-right: 0px">
             <img src="@/assets/image/line.png" class="line" />
             <img src="@/assets/image/right.png" class="right" style="position:absolute;right:0;top:660px;right:490px;"/>
        <output1 style="position:absolute;top:595px;right:30px;"/>
      </div>
      <div align="center">
        <img src="@/assets/image/down.png" class="image" />
        <dv-decoration-9 align="center" style="width: 400px; height: 250px;"
          ><h1 class="text">
            基于RF-PSO算法的泥水仓压力控制参数优化模型
          </h1></dv-decoration-9
        >
      </div>
      <div align="center" style="padding-top: 10px">
        <img src="@/assets/image/down.png" class="image" />
        <output2 />
      </div>
      <div class="d-flex jc-center">
        <div class="title">
          <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#3fb1e3', '#96dee8']"
            style="margin:20px;"
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
};
</script>

<style lang="less" scoped>
.dv-border-box-9 {
  width: 100%;
  height: 100%;
}
.text {
  color: #96dee8;
  //font-weight: bold;
  font-size: 30px;
  padding-top: 0px;
  margin-bottom: 0px;
  font-family: "zcool_title";
  text-align: center;
}
.image {
  width: 5%;
  display: block;
}
.line{
  width:20%;
  display:inline;
}
.right{
  width:6%;
  display:inline;
}
</style>