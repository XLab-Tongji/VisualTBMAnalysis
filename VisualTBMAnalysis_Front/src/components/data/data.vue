<template>
    <dv-border-box-9 style="height:2260px">
        <!-- 实时数据界面 -->
        <real-time />

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

        <!-- 选择时间段数据界面 -->
        <select-time/>
    </dv-border-box-9>
</template>

<script>
import realTime from "./realTime.vue";
import selectTime from "./selectTime.vue";
export default {
  components: {
    realTime,
    selectTime,
  },
}
</script>


<style lang="less" scoped>
.dv-border-box-9{
    width:100%;
    height: 100%;
}
.title{
    color:#ffffff;
    font-size: 40px;
    font-family:'zcool_title'; 
    -webkit-text-stroke-color: rgb(255, 255, 255); 
}
</style>