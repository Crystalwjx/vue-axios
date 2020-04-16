<template>
<div style="margin-top:62px" v-loading = 'loading'>
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px;" size="mini">
      <el-form-item>
          <el-select v-model="sizeForm.region" placeholder="支付状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px;" size="mini">
      <el-form-item>
          <el-select v-model="countryId" placeholder="签证国家">
          <el-option :label='item.name' v-for="item in countries" :key="item.id"  :value="item.id"/>
          </el-select>
      </el-form-item>
    </el-form>
    <el-input style="width:174px;margin-right:30px" v-model="task.companyName" placeholder="公司名称"></el-input>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即查询</el-button>
        <el-button type="info" @click="clear" plain>重置查询</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">支付处理列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="序号"
                    type="index"
                    width="60">
                    </el-table-column>
                    <el-table-column
                    prop="task.applyNum"
                    label="订单编号"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="task.companyName"
                    label="公司名称" width="140">
                    </el-table-column>
                    <el-table-column
                    prop="task.customerName"
                    label="申请人名称" width="90">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="国家名称" width="90">
                    </el-table-column>
                    <el-table-column
                    prop="processStatus"
                    label="支付状态" width="90">
                    </el-table-column>
                    <el-table-column
                    prop="task.optionName"
                    label="客户操作人" width="90">
                    </el-table-column>
                    <el-table-column
                    prop="task.payTime"
                    label="支付时间" width="150">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="处理人" width="90">
                    </el-table-column>
                     <el-table-column
                    prop="success"
                    label="处理状态" width="145">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :page-size="row"
            :total="total"
            @current-change="handleCurrentChange"
            @prev-click="handleCurrentChange"
            @next-click="handleCurrentChange">
            </el-pagination>
      </div>
  </div>
  <el-dialog
    title="手工充值录入"
    :visible.sync="dialogVisible"
    width="45%"
    >
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="企业名称：" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
                <el-select v-model="ruleForm.region" placeholder="选择企业名称" style="width:78%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="企业法人:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="企业邮箱:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="交易类型：" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
                <el-select v-model="ruleForm.region" placeholder="选择交易类型" style="width:78%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>
<script>
import paymenttaskApi from '@/api/operate/paymenttaskApi'
import productApi from '@/api/operate/productApi'
export default {
  data() {
    return {
      task: {
        companyName: null
      },
      loading: true,
      value1: '',
      total: 0,
      page: 1,
      row: 10,
      countryId: null,
      value2: '',
      countries: [],
      ruleForm: {
        name: '',
        region: ''
      },
      sizeForm: {
        region: ''
      },
      rules: {
        region: [
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
    // 清除搜索数据
    clear() {
      this.page = 1
      this.row = 10
      this.countryId = null
      this.task.companyName = null
      this.getData()
    },
    // 点击分页
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    // 立即搜索
    search() {
      this.page = 1
      this.getData()
    },
    getData() {
      this.loading = true
      paymenttaskApi.paymenttaskList(this.page, this.row).then((data) => {
        this.loading = false
        if (data.success) {
          this.tableData = data.data.data
          this.total = data.data.total
        } else {
          this.$notify({
            duration: 1500,
            title: '获取充值套餐列表失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    }
  },
  mounted() {
    productApi.country().then((data) => {
      if (data.success) {
        this.countries = data.data
      }
    })
    this.getData()
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
.el-input{
    width: 78%
}
</style>
