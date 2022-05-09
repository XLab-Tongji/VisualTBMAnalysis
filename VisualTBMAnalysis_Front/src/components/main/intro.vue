<template>
<dv-border-box-9  style="height:1350px">
  <el-container  direction="vertical" >
      <!-- 标题 -->
  <div align="center" style="margin-top:40px;margin-bottom:-10px">  <img src="@/assets/image/title1.png"  style="width:500px;" /></div>
  <div align="center" style="margin-bottom:-80px">  <img src="@/assets/image/title2.png"  style="width:350px;" /></div>
  <dv-decoration-5 class="headline" :dur=3  :color="['#3fb1e3', '#96dee8']" style="width:1000px;height:150px;margin:0 auto" />

<div align="center">
    <el-container style="width:90%" >
         <!-- 走马灯 -->
    
          <el-carousel indicator-position="outside" height="480px" style="width:70%;">
              <el-carousel-item>
              <img src='@/assets/image/img1.jpeg' style="height: 100%; width:100%;">
              </el-carousel-item>
              <el-carousel-item>
              <img src='@/assets/image/img2.jpeg' style="height: 100%; width:100%">
              </el-carousel-item>  
              <el-carousel-item>
              <img src='@/assets/image/img3.jpeg' style="height: 100%; width:100%">
              </el-carousel-item>  
              <el-carousel-item>
              <img src='@/assets/image/img4.jpeg' style="height: 100%; width:100%">
              </el-carousel-item>  
          </el-carousel>  

          <div class="block" style="width:30%;">
            <el-timeline>
              <el-timeline-item timestamp="2018/6/28"  placement="top">
                <el-card>
                  <div class="info_text">珠江三角洲水资源配置工程试验段项目首台盾构机在广东深圳顺利始发。</div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2019/2/3" placement="top">
                <el-card>
                  <div class="info_text">工程初步设计获水利部批复，输水线路总长度113.2公里。</div>
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2020/3/18" placement="top">
                <el-card>
                  <div class="info_text">首台盾构机“粤海1号”在佛山顺德鲤鱼洲交通隧洞正式始发，标志项目正式进入盾构施工阶段。</div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
  
    </el-container>
</div>
      <el-container>
        <!-- 文字介绍 -->
         <div align="center">
        <el-card>
        <div align="left" style="margin:0px 50px;">
        <div class="text">
            珠江三角洲水资源配置工程是国务院部署的172项节水供水重大水利工程之一，工程输水线路总长113.1千米，计划总投资约354亿元，是迄今为止广东省历史上投资额最大、输水线路最长、受水区域最广的水资源调配工程。（援引国家发改委、生态环境部、水利部、中国水利报、南方日报等官方渠道）
        </div> 
        <div class="text">
            实施珠江三角洲水资源配置工程，旨在解决深圳、东莞、广州南沙等地发展缺水问题的同时，有效改变以往受水区单一供水格局，提高城市的供水安全性和应急保障能力，对保障城市供水安全和经济社会发展具有重要作用，同时也将对粤港澳大湾区发展提供战略支撑。 
        </div> 
         <div class="text">
             珠三角工程输水线路穿越珠三角核心城市群，为了实现“少征地、少拆迁、少扰民”的目标，打造新时代生态智慧水利工程，该工程采用深埋盾构的方式，在纵深40米至60米的地下建造。其整体工程有望于2018年底全面开启，建设工期约60个月。2018年6月28日上午，珠江三角洲水资源配置工程试验段项目首台盾构机在广东深圳顺利始发。
         </div> 
         <div class="text">
             2019年2月3日，工程初步设计获水利部批复，输水线路总长度113.2公里。 
         </div> 
         <div class="text" style="margin-bottom:20px;">
             2020年3月18日，珠江三角洲水资源配置工程首台盾构机“粤海1号”在佛山顺德鲤鱼洲交通隧洞正式始发，标志着这项国家重大水利工程、粤港澳大湾区标志性项目正式进入盾构施工阶段。  
         </div> 

        </div> </el-card></div>
    </el-container>



</el-container>

   
</dv-border-box-9>
</template>

<script>
export default{
    
 }
</script>


<style lang="less" scoped>
.dv-border-box-9{
    width:100%;
    height: 100%;
}
.text{
    color: #96dee8;
    //color: #bbecf3;
    //font-weight: bold;
    font-family: 'zcool_title';
    font-size: 25px;
    text-indent: 2em; 
    margin:5px;
}
.info_text{
    color: #d1faff;
    //color: #bbecf3;
    //font-weight: bold;
    font-family: 'zcool_title';
    font-size: 19px;
    //text-indent: 2em; 
    //margin:5px;
}
.el-carousel{
    position: relative;
    top:20px;
    left:5px;
}
.card_1{
    margin: 10px;
    margin-right: 30px;
}
/deep/ .el-timeline-item__timestamp {
    color: #2df1ff !important;
    line-height: 2;
    font-size: 15px;
}
.el-card{
    width: 90%;
    border-color: #3fb1e3;
    background-color: #20404773;
    margin:10px;
}

</style>
