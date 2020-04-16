<template>
<div>
  <page title="系统日志" :titleInCenter="true" :breadcrumb="breadcrumbList">
    <template slot="body">
      <div class="table-container">
        <div class="table-flex" style="justify-content: space-between;">
          <div class="table-flex" style="width:70%">
            <span>操作人：</span>
            <el-input
              placeholder="请输入操作人名"
              v-model="residentName"
              style="width:150px"
              size="mini">
            </el-input>
            <span style="margin-left:10px">操作时间：</span>
              <el-date-picker
                v-model="startTime"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:150px"
                placeholder="选择日期">
              </el-date-picker>&nbsp;&nbsp;
              至&nbsp;&nbsp;&nbsp;
              <el-date-picker
                v-model="endTime"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:150px"
                placeholder="选择日期">
              </el-date-picker>
          </div>
          <div class="table-flex" style="width:30%;justify-content: flex-end;">
            <span style="cursor:pointer" @click="emptyRecord">【清空搜索】</span>
            <el-button type="warning" size="mini" @click="searchRecord">确认搜索</el-button>
          </div>
         </div>
          <el-table
            :data="tableData"
            :stripe="true"
            v-loading="loading"
            size="small"
            border>
            <el-table-column
              prop="courtyard"
              width="80"
              align="center"
              type="index"
              label="序号">
              <template slot-scope="scope">
                <span>{{scope.$index + (currentPage - 1) * pageSize + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="operator"
              width="160"
              label="操作人">
            </el-table-column>
            <el-table-column
              prop="createdTime"
              width="160"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="content"
              label="操作内容">
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="currentChange"></el-pagination>
          </div>
      </div>
    </template>
  </page>
</div>
</template>
<script>
import page from '@/components/content-page'

export default {
  data() {
    return {
      // 上面的面包屑导航数组
      breadcrumbList: [
        { path: '/', name: '首页' },
        { path: '', name: '系统日志' }
      ],
      residentName: '',
      startTime: '',
      endTime: '',
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: true
    }
  },
  components: {
    page: page
  }
}
</script>
<style lang='scss' scoped>
.index {
  height: 100vh;
  width: 100%;
}
.function-container {
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  .search-btn {
    margin-left: 40px;
    padding: 8px 30px;
    color: #fff;
    font-size: 14px;
    border-radius: 3px;
    background-color: #29a8ed;
  }
}
.search-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 20px 0 0;
}
.table-container{
  padding: 10px 10px 0 20px;
}
.table-title{
  font-size: 16px;
  padding:10px 10px 10px 0;
}
.table-flex{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
.choose{
  margin-left: 20px;
}

.pagination-container{
  text-align: right;
  padding: 10px 0;
}
</style>
