<template>
<div style="margin-top:62px">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px" size="mini">
      <el-form-item>
          <el-select v-model="sizeForm.region" placeholder="签证国家">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" plain>立即搜索</el-button>
        <el-button type="info" plain>重置搜索</el-button>
        <el-button type="primary" @click="dialogVisible = true" plain>新建策略</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">收费策略列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="序号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="签证国家"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="类型" width="150">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="金额" width="150">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="最后操作人" width="210">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="最后修改时间" width="265">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作" width="120">
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
            :total="100">
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
            <el-form-item label="国家：" :rules="[{ required: true, message: '请选择国家', trigger: 'blur' }]">
                <el-select v-model="ruleForm.region" placeholder="请选择国家" style="width:78%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="签证类型：" :rules="[{ required: true, message: '请选择签证类型', trigger: 'blur' }]">
                <el-select v-model="ruleForm.region" placeholder="请选择签证类型" style="width:78%">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收费金额:" prop="name" :rules="[{ required: true, message: '请输入收费金额', trigger: 'blur' }]">
                <el-input v-model="ruleForm.name"></el-input>
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
export default {
  data() {
    return {
      input: '',
      value1: '',
      value2: '',
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海7 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海 弄'
      }]
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
