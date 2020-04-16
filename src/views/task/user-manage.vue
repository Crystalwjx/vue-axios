<template>
<div style="margin-top:62px" v-loading = 'loading'>
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-input style="width:174px;margin-right:30px" v-model="name" placeholder="姓名"></el-input>
    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px" size="mini">
      <el-form-item>
          <el-select v-model="sizeForm.region" placeholder="状态">
          <el-option label="启用" value="shanghai"></el-option>
          <el-option label="禁用" value="beijing"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即搜索</el-button>
        <el-button type="info" @click="clear" plain>重置搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true" plain>新建用户</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">用户列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="员工姓名"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="loginName"
                    label="登录账号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="用户状态">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
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
    title="新建用户"
    :visible.sync="dialogVisible"
    width="55%"
    >
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="display: flex;flex-wrap: wrap;padding: 20px;">
            <el-form-item label="姓名:" prop="name" :rules="[{ required: true, message: '请输入模块名称', trigger: 'blur' }]">
                <el-input v-model="ruleForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="登录账号:" prop="name" :rules="[{ required: true, message: '请输入模块名称', trigger: 'blur' }]">
                <el-input v-model="ruleForm.name" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="name" :rules="[{ required: true, message: '请输入模块名称', trigger: 'blur' }]">
                <el-input v-model="ruleForm.name" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="name" :rules="[{ required: true, message: '请输入模块名称', trigger: 'blur' }]">
                <el-input v-model="ruleForm.name" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="超级管理员" name="type"></el-checkbox>
                    <el-checkbox label="操作员" name="type"></el-checkbox>
                </el-checkbox-group>
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
import usermanageApi from '@/api/country/usermanageApi'
export default {
  data() {
    return {
      total: 1,
      loading: true,
      input: '',
      value1: '',
      value2: '',
      page: 1,
      row: 10,
      name: null,
      ruleForm: {
        name: '',
        region: '',
        type: []
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
      this.name = null
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
      usermanageApi.usermanageList(this.page, this.row, this.name).then((data) => {
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
    width: 100%
}
</style>
