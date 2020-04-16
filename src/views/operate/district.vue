<template>
<div style="margin-top:62px">
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;height: 85px;">
    <el-form ref="form" :model="sizeForm" style="display: inline-block;width: 170px;margin-right: 20px" size="mini">
      <el-form-item>
          <el-select v-model="params.countryId" placeholder="签证国家">
          <el-option :label='item.name' v-for="item in countries" :key="item.id"  :value="item.id"/>
          </el-select>
      </el-form-item>
    </el-form>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" plain>立即查询</el-button>
        <el-button type="info" plain>重置查询</el-button>
        <el-button type="primary" @click="dialogVisible = true" plain>添加国家</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;line-height: 40px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">领区列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="国家"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="districts"
                    label="领区" width="370">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作" width="375">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">设置领区</el-button>
                        <el-button @click="delet(id)" type="text" size="small">删除</el-button>
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
        <el-form ref="form" :model="coun" style="display: inline-block;width: 170px;margin-right: 20px" size="mini">
          <el-form-item>
              <el-select v-model="coun.countryId" placeholder="签证国家">
              <el-option :label='item.name' v-for="item in countries" :key="item.id"  :value="item.id"/>
              </el-select>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCountry">确 定</el-button>
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
      value2: '',
      total: 0,
      ruleForm: {
        name: '',
        region: ''
      },
      coun: {
        countryId: null
      },
      params: {
        page: 1,
        row: 10,
        countryId: null
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
      tableData: [],
      countries: []
    }
  },
  methods: {
    // 重置
    clear() {
      this.params = {
        page: 1,
        row: 10,
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
    delet(id) {
      productApi.delet(this.id).then((data) => {
        if (data.success) {
          this.getData()
        }
      })
    },
    addCountry() {
      productApi.addcountry(this.coun).then((data) => {
        if (data.success) {
          this.dialogVisible = false
          this.getData()
        }
      })
    },
    getData() {
      this.loading = true
      productApi.districtList(this.params).then((data) => {
        this.loading = false
        if (data.success) {
          this.tableData = data.data.data
          this.total = data.data.total
        } else {
          this.$notify({
            duration: 1500,
            title: '获取领区列表失败',
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
