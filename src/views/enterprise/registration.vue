<template>
<div style="margin-top:62px">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
<!--    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px" size="mini">-->
<!--      <el-form-item>-->
<!--          <el-select v-model="sizeForm.region" placeholder="选择类型">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-input style="width:174px;margin-right:30px" v-model="params.companyName" placeholder="企业名称"></el-input>
    <el-date-picker style="margin-right:30px" v-model="params.startDate" value-format="yyyy-MM-dd" align="right" type="date" placeholder="开始时间" :picker-options="pickerOptions1">
    </el-date-picker>
    <el-date-picker
      v-model="params.endDate"
      align="right"
      type="date"
      placeholder="结束时间"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions2">
    </el-date-picker>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即搜索</el-button>
        <el-button type="info" @click="clear" plain>重置搜索</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <!-- <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">手工充值录入列表</div> -->
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
                    prop="location"
                    label="所在城市"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="companyName"
                    label="企业名称" width="250">
                    </el-table-column>
                    <el-table-column
                    prop="contactName"
                    label="联系人" width="150">
                    </el-table-column>
                    <el-table-column
                    prop="phone"
                    label="手机号" width="150">
                    </el-table-column>
                    <el-table-column
                    prop="requestDate"
                    label="提交时间" width="175">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="申请状态" width="100">
                      <template slot-scope="scope">
                        <span :style="scope.row.state === 'wait' ? 'color:#323232' : scope.row.state === 'access' ? 'color:#59bc96' : 'color:#ff0000'"
                        >{{scope.row.state === 'wait' ? '待确认' : scope.row.state === 'access' ? '审核通过' : '审核未通过'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    label="操作" >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
    title="详细信息"
    :visible.sync="dialogVisible"
    width="45%"
    @close="resetInfo"
    >
    <div>
        <p style="font-size:16px">所在城市：<span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{registration.location}}</span></p>
        <p style="font-size:16px">企业名称：<span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{registration.companyName}}</span></p>
        <p style="font-size:16px">联系人：<span style="margin-left: 36px;font-weight: 700;font-size:14px;color:#333">{{registration.contactName}}</span></p>
        <p style="font-size:16px">手机号码：<span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{registration.phone}}</span></p>
        <p style="font-size:16px">提交时间：<span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{registration.requestDate}}</span></p>
        <div style="margin-top:20px">
          <el-button type="danger" plain @click="registCheck(false)" v-show="registration.state === 'wait'">审批拒绝</el-button>
          <el-button type="warning" plain @click="registCheck(true)" v-show="registration.state === 'wait'">审批通过</el-button>
          <el-button type="primary" plain @click="remarkDialogVisible = true">新增备注</el-button>
        </div>
        <div style="margin-top:20px" v-if="registration.remarks.length !== 0">
          <p>备注记录</p>
          <el-table
          :data="registration.remarks"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="content"
            label="备注内容"
            width="250">
          </el-table-column>
          <el-table-column
            prop="albusModel.createdUser.userName"
            label="操作人"
            width="150">
          </el-table-column>
          <el-table-column
            prop="albusModel.dateCreated"
            label="创建时间"
            >
          </el-table-column>
        </el-table>
        </div>
        <div style="margin-top:20px" v-if="registration.remarks.length === 0">
          <p style=" text-align: center;margin-top: 20px;">无备注记录，如需添加请点击“新增备注”</p>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
  <el-dialog
          title="添加备注"
          :visible.sync="remarkDialogVisible"
          width="30%">
    <div style="margin:20px">
      <p style="margin-bottom:5px;">输入备注</p>
      <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注内容"
              v-model="remark"
      >
      </el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="remarkDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="registRemark">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import registrationApi from "@/api/enterprise/registrationApi"
import beanUtils from "@/utils/beanUtils"

export default {
  data() {
    return {
      input: '',
      value1: '',
      value2: '',
      total: 1,
      params: {
        page: 1,
        row: 10,
        companyName: null,
        startDate: null,
        endDate: null
      },
      ruleForm: {
        name: '',
        region: ''
      },
      sizeForm: {
        region: ''
      },
      location: '',
      companyName: '',
      contactName: '',
      requestDate: '',
      remark: '',
      phone: '',
      registration: {
        location: "",
        companyName: "",
        contactName: "",
        phone: "",
        requestDate: "",
        remarks: []
      },
      rules: {
        region: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      remarkDialogVisible: false,
      pickerOptions1: {
      },
      pickerOptions2: {
      },
      tableData: [],
      table: []
    }
  },
  methods: {
    // 重置
    clear() {
      this.params = {
        page: 1,
        row: 10,
        companyName: null,
        startDate: null,
        endDate: null
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
    handleClick(row) {
      beanUtils.copy(row, this.registration)
      this.dialogVisible = true
    },
    getData() {
      this.loading = true
      registrationApi.registrationList(this.params).then((data) => {
        this.loading = false
        if (data.success) {
          this.tableData = data.data.data
          this.total = data.data.total
        } else {
          this.$notify({
            duration: 1500,
            title: '获取数据列表失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    },
    singleRegist() {
      registrationApi.registrationSingle(this.registration.id).then((data) => {
        if (data.success) {
          this.registration.remarks = data.data.remarks
          // beanUtils.copy(data.data, this.registration)
        }
      })
    },
    registCheck(result) {
      registrationApi.registrationCheck(this.registration.id, result).then((data) => {
        if (data.success) {
          this.dialogVisible = false
          this.getData()
        }
      })
    },
    registRemark() {
      registrationApi.registrationRemark(this.registration.id, this.remark).then((data) => {
        if (data.success) {
          this.remarkDialogVisible = false
          this.singleRegist()
        }
      })
    },
    resetInfo() {
      this.remark = ''
      this.registration = {
        location: "",
        companyName: "",
        contactName: "",
        phone: "",
        requestDate: "",
        remarks: []
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang='scss' scoped>
.el-button{
    padding: 8px 8px;
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
