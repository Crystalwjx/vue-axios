<template>
<div style="margin-top:62px" v-loading="loading">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;">
    <el-input style="width:174px;margin-right:130px" v-model="name" placeholder="套餐名称"></el-input>
    <el-date-picker style="margin-right:130px" v-model="value1" align="right" type="date" placeholder="开始时间" :picker-options="pickerOptions1">
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
        <el-button type="primary" @click="dialogVisible = true" plain>新建充值套餐</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;line-height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">充值套餐列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    label="序号"
                    type="index"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="套餐名称"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="quantity"
                    label="点劵金额">
                    </el-table-column>
                    <el-table-column
                    prop="giftQuantity"
                    label="赠送点劵">
                    </el-table-column>
                    <el-table-column
                    label="状态">
                      <template slot-scope="scope">
                          <span>{{scope.row.status?'下线':'上线'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="albusModel.createdUser.userName"
                    label="创建人">
                    </el-table-column>
                    <el-table-column
                    prop="albusModel.dateCreated"
                    label="创建时间">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.id,scope.row.passage)" type="text" size="small">{{scope.row.status?'上线':'下线'}}</el-button>
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
    title="新建充值套餐"
    :visible.sync="dialogVisible"
    width="45%"
    >
    <div>
        <el-form :model="recharge" :rules="rules" ref="recharge" label-width="100px" class="demo-ruleForm">
            <el-form-item label="套餐名称:" prop="name">
                <el-input v-model="recharge.name"></el-input>
            </el-form-item>
            <el-form-item label="点劵（点）:" prop="quantity">
                <el-input v-model="recharge.quantity"></el-input>
            </el-form-item>
            <el-form-item label="赠送点劵:" prop="giftQuantity">
                <el-input v-model="recharge.giftQuantity"></el-input>
            </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rechargeadd">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>
<script>
import rechargeApi from '@/api/operate/rechargeApi'
export default {
  data() {
    return {
      name: '',
      value1: '',
      total: 0,
      page: 1,
      row: 10,
      loading: true,
      value2: '',
      recharge: {
        name: '',
        quantity: '',
        giftQuantity: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写套餐名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请填写点券（点）', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        giftQuantity: [
          { required: true, message: '请填写赠送点券（点）', trigger: 'blur' },
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
    rechargeadd() {
      rechargeApi.newpackage(this.recharge).then((data) => {
        if (data.success) {
          this.dialogVisible = false
          this.getData()
        }
      })
    },
    handleClick(id) {
      rechargeApi.stateList(id).then((data) => {
        if (data.success) {
          this.getData()
        }
      })
    },
    // 清除搜索数据
    clear() {
      this.page = 1
      this.row = 10
      this.name = ''
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
      rechargeApi.rechargeList(this.page, this.row, this.name).then((data) => {
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
