<template>
<div style="margin-top:62px" v-loading = 'loading'>
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-input style="width:174px;margin-right:25px" v-model="params.title" placeholder="消息标题"></el-input>
    <el-input style="width:174px;margin-right:25px" v-model="params.userName" placeholder="发布人"></el-input>
    <el-date-picker style="margin-right:25px" v-model="params.startTime" align="right" type="date" placeholder="开始时间" :picker-options="pickerOptions1">
    </el-date-picker>
    <el-date-picker
      v-model="params.endTime"
      align="right"
      type="date"
      placeholder="结束时间"
      :picker-options="pickerOptions2">
    </el-date-picker>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即搜索</el-button>
        <el-button type="info" @click="clear" plain>重置搜索</el-button>
        <el-button type="primary" @click="sendNoticeDialogVisible = true" plain>发布消息</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <!-- <div style="height: 40px;line-height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">充值套餐列表</div> -->
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
                    prop="title"
                    label="消息标题"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="optionName"
                    label="发布人">
                    </el-table-column>
                    <el-table-column
                    prop="publishTime"
                    label="发布时间">
                    </el-table-column>
                    <el-table-column
                    prop="deleted"
                    label="状态">
                      <template slot-scope="scope">
                        <span>
                          {{scope.row.deleted === false ? '广播中' : '已停止广播'}}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row, 'check')" type="text" size="small">查看</el-button>
                        <el-button @click="handleClick(scope.row, 'deleted')" type="text" size="small">删除</el-button>
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
  <!-- 发布弹框 -->
  <el-dialog
    title="发布消息"
    :visible.sync="sendNoticeDialogVisible"
    width="40%"
    @close="initNotice"
    >
    <div>
        <el-form :model="notice" ref="sendForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="消息标题:" prop="title" :rules="[{ required: true, message: '公告标题不能为空'}]">
                <el-input v-model="notice.title"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" prop="content" :rules="[{ required: true, message: '公告内容不能为空'}]">
                <el-input type="textarea" v-model="notice.content"></el-input>
            </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="sendNoticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendNotice">确 定</el-button>
    </span>
    </el-dialog>
  <!-- 查看弹框 -->
  <el-dialog
    title="发布消息"
    :visible.sync="noticeCheckDialogVisible"
    width="40%"
    @close="initNotice"
    >
    <div style="margin: 0px 30px 0px 30px;">
      <el-row style="margin-top:20px">
        <el-col :span="12"><div style="color:#333;font-weight: 700;font-size: 14px;">消息标题:</div></el-col>
        <el-col :span="12"><div style="color:#333;font-weight: 400;font-size: 14px;">{{notice.title}}</div></el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="12"><div style="color:#333;font-weight: 700;font-size: 14px;">消息内容:</div></el-col>
        <el-col :span="12"><div style="color:#333;font-weight: 400;font-size: 14px;">{{notice.content}}</div></el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="12"><div style="color:#333;font-weight: 700;font-size: 14px;">发布人:</div></el-col>
        <el-col :span="12"><div style="color:#333;font-weight: 400;font-size: 14px;">{{notice.optionName}}</div></el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="12"><div style="color:#333;font-weight: 700;font-size: 14px;">发布时间:</div></el-col>
        <el-col :span="12"><div style="color:#333;font-weight: 400;font-size: 14px;">{{notice.publishTime}}</div></el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="noticeCheckDialogVisible = false">关闭</el-button>
    </span>
    </el-dialog>
</div>
</template>
<script>
import systemApi from '@/api/system/systemApi'
import Notice from "@/entity/Notice"

export default {
  data() {
    return {
      input: '',
      loading: true,
      value1: '',
      total: 1,
      value2: '',
      ruleForm: {
        name: ''
      },
      notice: new Notice().createObject(),
      params: {
        page: 1,
        row: 10,
        title: null,
        userName: null,
        startTime: null,
        endTime: null
      },
      sendNoticeDialogVisible: false,
      noticeCheckDialogVisible: false,
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
        title: null,
        userName: null,
        startTime: null,
        endTime: null
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
    handleClick(row, op) {
      if (op === 'check') {
        this.noticeCheckDialogVisible = true
        this.notice = row
      } else {
        this.removeNotice(row.id)
      }
    },
    getData() {
      this.loading = true
      systemApi.messageList(this.params).then((data) => {
        this.loading = false
        if (data.success) {
          this.tableData = data.data.data
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
    sendNotice() {
      this.notice.type = 'notice'
      systemApi.sendMessage(this.notice).then((data) => {
        if (data.success) {
          this.$notify({
            duration: 1500,
            title: '操作成功',
            offset: 100,
            type: 'success',
            message: "系统公告发送成功"
          })
          this.sendNoticeDialogVisible = false
          this.getData()
        }
      })
    },
    removeNotice(id) {
      systemApi.removeMessage(id).then((data) => {
        if (data.success) {
          this.$notify({
            duration: 1500,
            title: '操作成功',
            offset: 100,
            type: 'success',
            message: "已停止广播该公告"
          })
          this.getData()
        }
      })
    },
    initNotice() {
      this.notice = new Notice().createObject()
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
.el-textarea{
    width: 78%
}
.el-col-12{
  width: 30%
}
</style>
