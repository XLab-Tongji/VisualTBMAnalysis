<template>

<dv-border-box-9  >
    
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

　  mounted () {
 
　  },

}
</script>


<style lang="less" scoped>
.dv-border-box-9{
    width:100%;
    height: 100%;
}

</style>
