<template>
    <div style="margin-top:62px">
        <div style="    width: 100%;padding: 10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;">
            <span>财务统计</span>
            <div class="data">
                <span @click="changeParams(0)">全部</span>
                <span @click="changeParams(-30)">近30天</span>
                <span @click="changeParams(-90)">近90天</span>
            </div>
        </div>
        <div style="    padding: 20px;">
            <p style="    margin-bottom: 1em;">数据统计：<span></span></p>
            <table border="1">
                <tr>
                    <td style="width:40%;height: 40px;">点券充值总额</td>
                    <td style="width:50%;height: 40px;">￥ {{result.SERVER}}</td>
                </tr>
                <tr>
                    <td style="width:40%;height: 40px;">预存款充值总额</td>
                    <td style="width:40%;height: 40px;">￥ {{result.VISA}}</td>
                </tr>
                <tr>
                    <td style="width:40%;height: 40px;">预存款支出总额</td>
                    <td style="width:40%;height: 40px;">￥ {{result.VISA_OUTLAY}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import financeApi from "@/api/finance/financeApi"
import utils from "@/utils/index"
export default {
  data() {
    return {
      activeName2: 'first',
      params: {
        startTime: null,
        endTime: null
      },
      result: {}
    }
  },
  methods: {
    statistics() {
      financeApi.statistics(this.params).then((data) => {
        if (data.success) {
          this.result = data.data
        }
      })
    },
    changeParams(flag) {
      this.params = {
        startTime: null,
        endTime: null
      }
      if (flag !== 0) {
        this.params.startTime = utils.dateAddDay(new Date(), 1)
        this.params.endTime = utils.dateAddDay(new Date(), flag)
      }
      this.statistics()
    }
  },
  mounted() {
    this.statistics()
  }
}
</script>
<style>
.data{
    float: right;
}
.data span{
    border: 1px solid #d9d9d9;
    padding: 0 15px;
    height: 32px;
    display: inline-block;
    line-height: 32px;
        margin-right: -6px;
            cursor: pointer;
}
table{
  border-collapse:collapse;
  margin-bottom: 0px;
  margin-top: 0px;
  text-align: center;
      width: 97%;
}
</style>
