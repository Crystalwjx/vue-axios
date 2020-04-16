<template>
<div style="margin-top:62px" v-loading = 'loading'>
  <div style="padding:10px 15px;background: #f0f8fc;border: 1px solid #cfedfc;border-radius: 3px;">
    <el-input style="width:174px;" v-model="params.name" placeholder="企业名称"></el-input>
    <div style="float:right;margin-right:10px">
        <el-button type="primary" @click="search" plain>立即搜索</el-button>
        <el-button type="info" @click="clear" plain>重置搜索</el-button>
        <el-button type="primary" plain @click="newEnterprise">添加企业</el-button>
    </div>
  </div>
  <div style="margin-top: 10px;padding: 10px;">
      <div>
          <div style="height: 40px;line-height: 40px;;border-top-left-radius: 6px;border-top-right-radius: 6px;padding-left: 23px;color: #fff;font-size: 16px;background: #4265a9;">企业列表</div>
          <div>
            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    label="序号"
                    width='80'>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="企业名称"
                    width='350'>
                    </el-table-column>
                    <el-table-column
                    prop="legalPerson.name"
                    label="法人姓名" width='130'>
                    </el-table-column>
                    <el-table-column
                    prop="loginName"
                    label="登录账号" width='200'>
                    </el-table-column>
                    <el-table-column
                    prop="cellPhone"
                    label="联系电话" width="190">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="disableCompany(scope.row)" type="text" size="small" v-if="scope.row.effect">禁用</el-button>
                        <el-button @click="enableCompany(scope.row)" type="text" size="small" v-if="!scope.row.effect">启用</el-button>
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
</div>
</template>
<script>
import enterpriseApi from '@/api/enterprise/enterpriseApi'
export default {
  data() {
    return {
      loading: true,
      total: 1,
      name: null,
      params: {
        page: 1,
        row: 10,
        name: null
      },
      tableData: []
    }
  },
  methods: {
    // 清除搜索数据
    clear() {
      this.params = {
        page: 1,
        row: 10,
        name: null
      }
      this.getData()
    },
    // 点击分页
    handleCurrentChange(val) {
      this.params.page = val
      this.getData()
    },
    // 立即搜索
    search() {
      this.params.page = 1
      this.getData()
    },
    getData() {
      this.loading = true
      enterpriseApi.enterpriseList(this.params).then((data) => {
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
    },
    handleClick(row) {
      this.$router.push({
        name: "newEnterprise",
        query: {
          'companyId': row.id
        }
      })
    },
    newEnterprise() {
      this.$router.push({
        name: "newEnterprise"
      })
    },
    disableCompany(row) {
      enterpriseApi.disableCompany(row.id).then((data) => {
        if (data.success) {
          this.getData()
        }
      })
    },
    enableCompany(row) {
      enterpriseApi.enableCompany(row.id).then((data) => {
        if (data.success) {
          this.getData()
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
</style>
