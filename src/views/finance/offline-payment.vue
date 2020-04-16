<template>
<div style="margin-top:62px">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-select v-model="queryParams.transactionType" placeholder="选择类型">
      <el-option :label="item.value" :value="item.name" :key="item.name" v-for="item in searchTransactionType"></el-option>
    </el-select>
    <el-input style="width:174px;margin-right:30px" v-model="queryParams.companyName" placeholder="付款单位名称"></el-input>
    <el-date-picker style="margin-right:30px" value-format="yyyy-MM-dd" v-model="queryParams.startTime" align="right" type="date" placeholder="开始时间" :picker-options="pickerOptions1">
    </el-date-picker>
    <el-date-picker
      v-model="queryParams.endTime"
      align="right"
      type="date"
      placeholder="结束时间"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions2">
    </el-date-picker>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" plain @click="search">立即搜索</el-button>
        <el-button type="info" plain @click="clear">重置搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true" plain>手工充值录入</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
    <div>
      <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">手工充值录入列表</div>
      <div>
        <template>
          <el-table :data="turnoverList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="num" label="交易单号" width="150"></el-table-column>
            <el-table-column prop="transactionTypeName" label="交易类型" width="150"></el-table-column>
            <el-table-column prop="amount" label="充值金额" width="150"></el-table-column>
            <el-table-column prop="companyView.name" label="付款单位" width="150"></el-table-column>
            <el-table-column prop="optionName" label="操作人" width="100"></el-table-column>
            <el-table-column prop="transactionTime" label="操作时间" width="200"></el-table-column>
            <el-table-column prop="" label="操作" >
              <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-pagination
              layout="prev, pager, next"
              :current-page="queryParams.page"
              :page-size="queryParams.row"
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
    @close="initData"
    >
    <div>
      <el-form :model="turnover" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="企业名称：" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
          <el-select v-model="turnover.companyView.id" filterable placeholder="选择企业名称" style="width:78%" @change="queryCompany">
            <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in companyList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业法人:" v-if="showFlag">
          <el-input v-model="companyInfo.legalPerson.name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" v-if="showFlag">
          <el-input v-model="adminUser.name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱:" v-if="showFlag">
          <el-input v-model="adminUser.loginName" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="交易类型：" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
          <el-select v-model="turnover.transactionType" placeholder="选择交易类型" style="width:78%" @change="payTypeShow">
            <el-option :label="item.value" :value="item.name" :key="item.name" v-for="item in transactionType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线下汇款方式：" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]" v-if="payTypeShowFlag">
          <el-select v-model="turnover.payType" placeholder="选择线下汇款方式" style="width:78%">
            <el-option :label="item.value" :value="item.name" :key="item.name" v-for="item in payType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易金额:" prop="name">
          <el-input v-model="turnover.amount"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="manualRecharge">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 信息确认 -->
  <el-dialog
          title="交易详情"
          :visible.sync="selPopupValidate"
          width="40%"
          @close="selPopupValidate = false">
    <div>
      <div class="clearfix">
        <div class="fl" style="width:100%">
          <div style="margin: 10px 20px 20px 60px;text-align:left;font-size:16px" class="clearfix">
            <div>
              <div style="font-size:14px">交易名称: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.name}}</span></div>
            </div>
            <div class="clearfix" style="margin-top:15px">
              <div class="fl">
                <div style="font-size:14px">交易单号: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.num}}</span></div>
              </div>
              <div class="fl">
                <div style="font-size:14px;margin-top:15px">创建类型: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.opType}}</span></div>
              </div>
            </div>
            <div class="clearfix" style="margin-top:15px">
              <div class="fl">
                <div style="font-size:14px">操作人: <span style="margin-left: 32px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.optionName}}</span></div>
              </div>
              <div class="fl">
                <div style="font-size:14px;margin-top:15px">操作时间: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.transactionTime}}</span></div>
              </div>
            </div>
            <div class="clearfix" style="margin-top:15px">
              <div class="fl">
                <div style="font-size:14px">交易类型: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{
                  showTurnover.transactionType === 'recharge'?'预存款充值':
                  showTurnover.transactionType === 'couponsRecharge'?'点券充值':
                  showTurnover.transactionType ===  'gift'?'点券赠送':'-'}}</span></div>
              </div>
              <div class="fl">
                <div style="font-size:14px;margin-top:15px">充值金额: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.amount}}</span></div>
              </div>
            </div>
            <div class="clearfix" style="margin-top:15px">
              <div class="fl">
                <div style="font-size:14px">支付方式: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.paymentType}}</span></div>
              </div>
              <div class="fl">
                <div style="font-size:14px;margin-top:15px">企业名称: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.companyView.name}}</span></div>
              </div>
            </div>
            <div class="clearfix" style="margin-top:15px">
              <div class="fl">
                <div style="font-size:14px">点劵余额: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.accountType === 'SERVER' ? showTurnover.balance : '-'}}</span></div>
              </div>
              <div class="fl">
                <div style="font-size:14px;margin-top:15px">预存款余额: <span style="margin-left:20px;font-weight: 700;font-size:14px;color:#333">{{showTurnover.accountType === 'VISA' ? showTurnover.balance : '-'}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</div>
</template>
<script>
import financeApi from "@/api/finance/financeApi"
import systemApi from "@/api/system/systemApi"
import beanUtils from "@/utils/beanUtils"
import Company from "@/entity/Company"
import User from "@/entity/User"
import enterpriseApi from "@/api/enterprise/enterpriseApi"

export default {
  data() {
    return {
      showFlag: false,
      companyInfo: new Company().createObject(),
      adminUser: new User().createObject(),
      input: '',
      value1: '',
      value2: '',
      ruleForm: {
        name: '',
        region: ''
      },
      queryParams: {
        page: 1,
        row: 10,
        transactionType: null,
        companyName: '',
        startTime: '',
        endTime: ''
      },
      total: 0,
      rules: {
        region: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      selPopupValidate: false,
      payTypeShowFlag: false,
      pickerOptions1: {
      },
      pickerOptions2: {
      },
      turnoverList: [],
      companyList: [],
      payType: [],
      transactionType: [],
      searchTransactionType: [],
      turnover: {
        companyView: {
          id: '',
          name: ''
        },
        amount: 0,
        transactionType: null,
        payType: null
      },
      showTurnover: {
        name: '',
        num: '',
        opType: '',
        optionName: '',
        transactionTime: '',
        transactionType: '',
        amount: '',
        paymentType: '',
        companyView: {
          name: ''
        },
        accountType: '',
        balance: ''
      }
    }
  },
  mounted () {
    this.loadSysData()
    this.getData()
  },
  methods: {
    handleCurrentChange(val) {
      this.queryParams.page = val
      this.getData()
    },
    handleClick(row) {
      console.log(row)
      this.showTurnover = row
      this.selPopupValidate = true
    },
    getData() {
      financeApi.turnoverList(this.queryParams).then((data) => {
        if (data.success) {
          this.turnoverList = data.data.data
          this.total = data.data.total
        } else {
          this.$notify({
            duration: 1500,
            title: '获取列表失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    },
    payTypeShow() {
      if (this.turnover.transactionType !== 'gift') {
        this.payTypeShowFlag = true
      } else {
        this.payTypeShowFlag = false
      }
    },
    manualRecharge() {
      const company = beanUtils.matchElemById(this.turnover.companyView.id, this.companyList)
      this.turnover.companyView.name = company.name
      financeApi.manualRecharge(this.turnover).then((data) => {
        if (data.success) {
          this.dialogVisible = false
          this.getData()
        } else {
          this.$notify({
            duration: 1500,
            title: '充值失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    },
    // 清除搜索数据
    clear() {
      this.queryParams = {
        page: 1,
        row: 10,
        transactionType: null,
        companyName: '',
        startTime: '',
        endTime: ''
      }
      this.getData()
    },
    // 立即搜索
    search() {
      this.queryParams.page = 1
      this.getData()
    },
    queryCompany() {
      this.showFlag = true
      enterpriseApi.singleCompany(this.turnover.companyView.id).then((data) => {
        if (data.success) {
          beanUtils.copy(data.data, this.companyInfo)
        }
      })
      enterpriseApi.queryCompanyAdmin(this.turnover.companyView.id).then((data) => {
        if (data.success) {
          beanUtils.copy(data.data, this.adminUser)
        }
      })
    },
    loadSysData() {
      systemApi.queryEnums("com.albus.saas.model.finance.PayType").then((data) => {
        this.payType = data.data
      })
      systemApi.queryEnums("com.albus.saas.model.finance.TransactionType").then((data) => {
        this.searchTransactionType = data.data
        data.data.forEach((item) => {
          if (item.name === 'recharge' || item.name === 'couponsRecharge' || item.name === 'gift') {
            this.transactionType.push(item)
          }
        })
      })
      systemApi.companyList().then((data) => {
        this.companyList = data.data
      })
    },
    initData() {
      this.showFlag = false
      this.payTypeShowFlag = false
      this.companyInfo = new Company().createObject()
      this.adminUser = new User().createObject()
      this.turnover = {
        companyView: {
          id: '',
          name: ''
        },
        amount: 0,
        transactionType: null,
        payType: null
      }
    }
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
