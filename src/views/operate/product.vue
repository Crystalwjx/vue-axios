<template>
<div style="margin-top:62px" v-loading="loading">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px" size="mini">
      <el-form-item>
          <el-select v-model="params.countryId" placeholder="签证国家">
          <el-option :label='item.name' v-for="item in countries" :key="item.id"  :value="item.id"/>
          </el-select>
      </el-form-item>
    </el-form>
    <el-input style="width:174px;margin-right:30px"  v-model="params.productName" placeholder="产品名称"></el-input>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即查询</el-button>
        <el-button type="info" @click="clear" plain>重置查询</el-button>
        <el-button type="primary" @click="dialogVisible = true" plain>新建产品</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">产品列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="country.name"
                    label="签证国家"
                    width="183">
                    </el-table-column>
                    <el-table-column
                    prop="productName"
                    label="产品名称" width="270">
                    </el-table-column>
                    <el-table-column
                    prop="albusModel.lastUser.userName"
                    label="最后操作人" width="170">
                    </el-table-column>
                    <el-table-column
                    prop="albusModel.lastUpdated"
                    label="最后修改时间" width="264">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
          </div>
          <el-pagination
            background
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
import productApi from '@/api/operate/productApi'
export default {
  data() {
    return {
      input: '',
      value1: '',
      loading: true,
      value2: '',
      total: 0,
      countryId: null,
      countries: [],
      params: {
        page: 1,
        row: 10,
        productName: null,
        countryId: null
      },
      ruleForm: {
        name: '',
        region: ''
      },
      sizeForm: {
        countryId: ''
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
    // 重置
    clear() {
      this.params = {
        page: 1,
        row: 10,
        productName: null,
        countryId: null
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
      productApi.productList(this.params).then((data) => {
        this.loading = false
        if (data.success) {
          this.tableData = data.data.data
          this.total = data.data.total
        } else {
          this.$notify({
            duration: 1500,
            title: '获取国家列表失败',
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
