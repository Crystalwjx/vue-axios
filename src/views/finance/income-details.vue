<template>
<div style="margin-top:62px" v-loading="loading">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-select v-model="params.transactionType" placeholder="选择交易类型">
      <el-option :label="item.value" :value="item.name" :key="item.name" v-for="item in transactionType"></el-option>
    </el-select>
    <el-input style="width:174px;margin-right:30px" v-model="params.companyId" placeholder="付款单位名称"></el-input>
    <el-date-picker style="margin-right:30px" v-model="value1" align="right" type="date" placeholder="开始时间" :picker-options="pickerOptions1">
    </el-date-picker>
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="结束时间"
      :picker-options="pickerOptions2">
    </el-date-picker>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即搜索</el-button>
        <el-button type="info" @click="clear" plain>重置搜索</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">收入明细列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="交易单号"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="交易名称" width="130">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="类型" width="80">
                    </el-table-column>
                    <el-table-column
                    prop="amount"
                    label="金额" width="80">
                    </el-table-column>
                    <el-table-column
                    prop="companyView.name"
                    label="单位名称" width="258">
                    </el-table-column>
                    <el-table-column
                    prop="optionName"
                    label="操作人" width="120">
                    </el-table-column>
                    <el-table-column
                    prop="transactionTime"
                    label="操作时间" width="150">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
          </div>
          <el-pagination
              layout="prev, pager, next"
              :current-page="params.page"
              :page-size="params.row"
              :total="total"
              @current-change="handleCurrentChange"
              @prev-click="handleCurrentChange"
              @next-click="handleCurrentChange">
        </el-pagination>
      </div>
  </div>
  <el-dialog
    title="交易详情"
    :visible.sync="dialogVisible"
    width="45%"
    >
    <div>
      <p>交易名称：<span></span></p>
      <p>交易单号：<span></span></p>
      <p>创建类型：<span></span></p>
      <p>操作人：<span></span></p>
      <p>操作时间：<span></span></p>
      <p>交易类型：<span></span></p>
      <p>充值金额：<span></span></p>
      <p>支付方式：<span></span></p>
      <p>企业名称：<span></span></p>
      <p>点券余额：<span></span></p>
      <p>预存款余额：<span></span></p>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>
<script>
import incomeApi from "@/api/finance/incomeApi"
import systemApi from "@/api/system/systemApi"
export default {
  data() {
    return {
      input: '',
      value1: '',
      value2: '',
      total: 1,
      loading: true,
      params: {
        page: 1,
        row: 10,
        transactionType: null,
        companyId: null
      },
      turnover: {
        transactionType: null
      },
      transactionType: [],
      ruleForm: {
        name: ''
      },
      sizeForm: {
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      pickerOptions1: {
      },
      pickerOptions2: {
      },
      tableData: []
    }
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true
    },
    // 重置
    clear() {
      this.params = {
        page: 1,
        row: 10,
        companyId: null
      }
      this.getData()
    },
    // 查询
    search() {
      this.params.page = 1
      this.getData()
    },
    // 点击分页
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
    },
    getData() {
      this.loading = true
      incomeApi.incomeList(this.params).then((data) => {
        this.loading = false
        if (data.success) {
          this.tableData = data.data.data
          this.total = data.data.total
        } else {
          this.$notify({
            duration: 1500,
            title: '获取收入列表失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    },
    loadSysData() {
      systemApi.queryEnums("com.albus.saas.model.finance.TransactionType").then((data) => {
        this.transactionType = data.data
      })
    }
  },
  mounted() {
    this.getData()
    this.loadSysData()
  }
}
</script>
<style lang='scss' scoped>
.el-button{
    padding: 5px 7px;
}
.el-table th > .cell{
    color: #000 !important
}
.el-pagination{
    text-align: right;
    margin-top:10px
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 170px;
}
.el-input__icon{
    line-height: 32px !important
}
// .el-input{
//     width: 78%
// }
</style>
