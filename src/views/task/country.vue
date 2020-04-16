<template>
  <div style="margin-top:62px"
       v-loading="loading">
    <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;">
      <el-input style="width:174px;"
                v-model="params.name"
                placeholder="国家名称"></el-input>
      <div style="float:right;margin-right:10px">
        <el-button @click="search"
                   type="primary"
                   plain>立即搜索</el-button>
        <el-button type="info"
                   @click="clear"
                   plain>重置搜索</el-button>
      </div>
    </div>
    <div style="margin-top: 10px;padding: 10px;">
      <div>
        <div style="height: 40px;line-height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">国家列表</div>
        <div>
          <template>
            <el-table :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column type="index"
                               label="序号"
                               width="200">
              </el-table-column>
              <el-table-column prop="name"
                               label="国家名称">
              </el-table-column>
              <el-table-column prop="code"
                               label="国家编码">
              </el-table-column>
              <el-table-column label="国家状态">
                <template slot-scope="scope">
                  <span>{{scope.row.passage === true ? '已上线' : '已下线'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.id,scope.row.passage)"
                             type="text"
                             size="small">{{scope.row.passage === true?'下线':'上线'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <el-pagination background
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
  </div>
</template>
<script>
import countryApi from '@/api/country/countryApi'
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      total: 0,
      params: {
        page: 1,
        row: 10
      }
    }
  },
  methods: {
    handleClick (id, passage) {
      console.log(passage)
      countryApi.state(id, !passage).then((data) => {
        if (data.success) {
          this.getData()
        }
      })
    },
    // 点击分页
    handleCurrentChange (val) {
      this.params.page = val
      this.getData()
    },
    // 立即搜索
    search () {
      this.params.page = 1
      this.getData()
    },
    // 清除搜索数据
    clear () {
      this.params = {
        page: 1,
        row: 10,
        name: null
      }
      this.getData()
    },
    getData () {
      this.loading = true
      countryApi.countryList(this.params).then((data) => {
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
  mounted () {
    this.getData()
  }
}
</script>
<style lang='scss' scoped>
.el-button {
  padding: 5px 7px;
}
.el-table th > .cell {
  color: #000 !important;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
