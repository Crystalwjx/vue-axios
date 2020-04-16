<template>
  <div style="width:100%;margin-top:66px">
    <div class="bran" style="    padding: 10px;border-bottom: 1px solid #e8e8e8;">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/enterpriseList' }">企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑企业</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button style="  float:right;  margin-top: -24px;" type="info" @click="returns" plain>返回</el-button>
    </div>
    <div style="padding: 10px;">
      <div style="margin-top:20px;    border: 1px solid #e8e8e8;border-radius: 6px;">
        <div v-if="editorFlag">
          <p style="    height: 40px;line-height: 40px;padding-left: 35px;background: #e1e1e1;margin-bottom: 20px;">账号信息</p>
          <el-form :model="addParams" :label-position="labelPosition" ref="userInfoForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="12">
                <div style="    margin-left: 51px;">
                  <el-form-item label="账户负责人" prop="user.name" :rules="[{ required: true, message: '账户负责人不能为空'}]">
                    <a name="user.name"></a>
                    <el-input v-model="addParams.user.name" ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="    margin-left: 51px;">
                  <el-form-item label="登录账号" prop="user.loginName" :rules="[{ required: true, message: '登录账号不能为空'}]">
                    <a name="user.loginName"></a>
                    <el-input v-model="addParams.user.loginName"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div style="    margin-left: 51px;">
                  <el-form-item label="密码" prop="user.password" :rules="[{ required: true, message: '密码不能为空'}]">
                    <a name="user.password"></a>
                    <el-input type="password" v-model="addParams.user.password"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="    margin-left: 51px;">
                  <el-form-item prop="user.confirmPassword" label="确认密码" :rules="confirmPasswordRules">
                    <a name="user.confirmPassword"></a>
                    <el-input type="password" v-model="addParams.user.confirmPassword"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <p style="    height: 40px;line-height: 40px;padding-left: 35px;background: #e1e1e1;margin-bottom: 20px;">企业信息</p>
          <el-form :model="addParams" :label-position="labelPosition" ref="companyInfoForm" label-width="100px" class="demo-ruleForm">
            <div style="    overflow: hidden;">
              <el-col :span="12">
                <el-form-item label="企业名称" prop="company.name" :rules="[{ required: true, message: '企业名称不能为空'}]">
                  <a name="company.name"></a>
                  <el-input v-model="addParams.company.name"></el-input>
                </el-form-item>
              </el-col>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div style="    margin-left: 51px;">
                  <el-form-item label="法人名称" prop="company.legalPerson.name">
                    <a name="company.legalPerson.name"></a>
                    <el-input v-model="addParams.company.legalPerson.name"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="    margin-left: 50px;">
                  <el-form-item label="身份证号" prop="company.legalPerson.idCardNumber">
                    <a name="company.legalPerson.idCardNumber"></a>
                    <el-input v-model="addParams.company.legalPerson.idCardNumber"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <div style="margin-left: 50px;">
              <p>法人身份证：</p>
              <div class="uploadDiv" style="margin-top:10px;display: inline-block">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        accept="image/png, image/jpeg, image/jpg"
                        :auto-upload="true"
                        :http-request="idcardFrontUpload"
                        :limit="1"
                        :show-file-list="false">
                  <img v-if="addParams.company.legalPerson.idCardFront.path" :src="addParams.company.legalPerson.idCardFront.path" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="uploadDiv" style="margin-top:10px;margin-left: 50px;display: inline-block">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        accept="image/png, image/jpeg, image/jpg"
                        :auto-upload="true"
                        :http-request="idcardBackUpload"
                        :limit="1"
                        :show-file-list="false">
                  <img v-if="addParams.company.legalPerson.idCardBack.path" :src="addParams.company.legalPerson.idCardBack.path" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div style="margin-left: 50px;margin-top:20px; margin-bottom: 20px;">
              <p>法人手持身份证：</p>
              <div class="uploadDiv" style="margin-top:10px">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        accept="image/png, image/jpeg, image/jpg"
                        :auto-upload="true"
                        :http-request="idcardHandleUpload"
                        :limit="1"
                        :show-file-list="false">
                  <img v-if="addParams.company.legalPerson.handheldIdCard.path" :src="addParams.company.legalPerson.handheldIdCard.path" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div style=" overflow: hidden;">
              <el-col :span="12">
                <el-form-item label="营业证号" prop="company.businessLicenseNum">
                  <a name="company.businessLicenseNum"></a>
                  <el-input v-model="addParams.company.businessLicenseNum"></el-input>
                </el-form-item>
              </el-col>
            </div>
            <el-row :gutter="20"  style="margin-left: 50px;">
              <el-col :span="5">
                <div>
                  <el-form-item label="有效期" prop="company.issueDate">
                    <a name="company.issueDate"></a>
                    <el-date-picker v-model="addParams.company.issueDate" value-format="yyyy-MM-dd" type="date" placeholder="开始日期" style="width: 100%;" :disabled="addParams.company.longTerm"></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item prop="company.validDate">
                    <a name="company.validDate"></a>
                    <el-date-picker v-model="addParams.company.validDate" value-format="yyyy-MM-dd" type="date" placeholder="结束日期" style="width: 100%;" :disabled="addParams.company.longTerm"></el-date-picker>
                  </el-form-item>
                </div>
                <el-checkbox style="position: absolute;top: 11px;left: 650px;" v-model="addParams.company.longTerm">长期</el-checkbox>
              </el-col>
            </el-row>
            <div style="margin-left: 50px;margin-top:20px; margin-bottom: 20px;">
              <p>营业执照：</p>
              <div class="uploadDiv" style="margin-top:10px">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        accept="image/png, image/jpeg, image/jpg"
                        :auto-upload="true"
                        :http-request="businessLicenseUpload"
                        :limit="1"
                        :show-file-list="false">
                  <img v-if="addParams.company.businessLicense.path" :src="addParams.company.businessLicense.path" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <el-row :gutter="20" style="    margin-left: 50px;">
              <el-col :span="12">
                <div>
                  <el-form-item prop="company.cellPhone" label="联系手机">
                    <a name="company.cellPhone"></a>
                    <el-input v-model="addParams.company.cellPhone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-form-item prop="company.tellPhone" label="公司座机">
                    <a name="company.telPhone"></a>
                    <el-input v-model="addParams.company.telPhone"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="    margin-left: 50px;">
              <el-col :span="5">
                <div>
                  <el-form-item prop="company.addressInfo.province.id" label="公司地址">
                    <a name="company.addressInfo.province.id"></a>
                    <el-select placeholder="省" v-model="addParams.company.addressInfo.province.id" @change="queryCityList">
                      <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in provinceList"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item prop="company.addressInfo.city.id">
                    <a name="company.addressInfo.city.id"></a>
                    <el-select placeholder="市" v-model="addParams.company.addressInfo.city.id" @change="queryDistrictList">
                      <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in cityList"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item prop="company.addressInfo.district.id">
                    <a name="company.addressInfo.district.id"></a>
                    <el-select placeholder="区" v-model="addParams.company.addressInfo.district.id" @change="paddingAddress">
                      <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in districtList"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div>
                  <el-form-item prop="company.addressInfo.address">
                    <a name="company.addressInfo.address"></a>
                    <el-input placeholder="详细地址" v-model="addParams.company.addressInfo.address"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
      <div style="    text-align: center;line-height:74px;margin-right:16px;">
        <el-button type="primary" @click="saveCompany">保存</el-button>
      </div>
  </div>
</template>
<script>
import Company from "@/entity/Company"
import User from "@/entity/User"
import systemApi from "@/api/system/systemApi"
import enterpriseApi from "@/api/enterprise/enterpriseApi"
import beanUtils from "@/utils/beanUtils"
import fileApi from "@/api/system/fileApi"

export default {
  data() {
    var confirmPassword = (rule, value, callback) => {
      if (value !== this.addParams.user.password) {
        callback(new Error("两次输入密码不一致"))
      } else {
        callback()
      }
    }
    return {
      checked: false,
      companyId: "",
      labelPosition: 'left',
      editorFlag: true,
      addParams: {
        user: new User().createObject(),
        company: new Company().createObject()
      },
      provinceList: [],
      cityList: [],
      districtList: [],
      confirmPasswordRules: [
        {required: true, message: '确认密码不能为空'},
        { validator: confirmPassword, trigger: 'change' }
      ]
    }
  },
  methods: {
    returns() {
      this.$router.push({
        name: 'enterpriseList'
      })
    },
    loadSysDate() {
      systemApi.queryProvince("CHN").then((data) => {
        if (data.success) {
          this.provinceList = data.data
        }
      })
    },
    initAddParams() {
      this.addParams.user = new User().createObject()
      this.addParams.company = new Company().createObject()
    },
    queryCityList() {
      if (this.addParams.company.addressInfo.province.id !== '') {
        systemApi.queryCity(this.addParams.company.addressInfo.province.id).then((data) => {
          if (data.success) {
            this.cityList = data.data
          }
        })
      }
    },
    queryDistrictList() {
      if (this.addParams.company.addressInfo.city.id !== '') {
        systemApi.queryDistrict(this.addParams.company.addressInfo.city.id).then((data) => {
          if (data.success) {
            this.districtList = data.data
          }
        })
      }
    },
    paddingAddress() {
      this.addParams.company.addressInfo.province = beanUtils.matchElemById(this.addParams.company.addressInfo.province.id, this.provinceList)
      this.addParams.company.addressInfo.city = beanUtils.matchElemById(this.addParams.company.addressInfo.city.id, this.cityList)
      this.addParams.company.addressInfo.district = beanUtils.matchElemById(this.addParams.company.addressInfo.district.id, this.districtList)
      var address = this.addParams.company.addressInfo.province.name
      if (address.indexOf(this.addParams.company.addressInfo.city.name) === -1) {
        address = address + this.addParams.company.addressInfo.city.name
      }
      this.addParams.company.addressInfo.address = address + this.addParams.company.addressInfo.district.name
    },
    saveCompany() {
      if (!this.editorFlag) {
        this.editCompany()
      } else {
        this.addCompany()
      }
    },
    addCompany() {
      enterpriseApi.addCompany(this.addParams).then((data) => {
        if (data.success) {
          this.$router.push({
            name: "enterpriseList"
          })
        } else {
          this.$notify({
            duration: 1500,
            title: '操作失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    },
    editCompany() {
      const entityUpdate = {
        id: this.companyId,
        type: "Company",
        path: null,
        source: this.addParams.company
      }
      enterpriseApi.editCompany(entityUpdate).then((data) => {
        if (data.success) {
          this.$router.push({
            name: "enterpriseList"
          })
        } else {
          this.$notify({
            duration: 1500,
            title: '操作失败',
            offset: 100,
            type: 'error',
            message: data.errorMsg
          })
        }
      })
    },
    queryCompany() {
      enterpriseApi.singleCompany(this.companyId).then((data) => {
        if (data.success) {
          beanUtils.copy(data.data, this.addParams.company)
          // this.addParams.company = data.data
        }
      })
    },
    idcardFrontUpload(params) {
      this.picUpload(params.file, 'front')
    },
    idcardBackUpload(params) {
      this.picUpload(params.file, 'back')
    },
    idcardHandleUpload(params) {
      this.picUpload(params.file, 'handle')
    },
    businessLicenseUpload(params) {
      this.picUpload(params.file, 'license')
    },
    picUpload(file, fileType) {
      const form = new FormData()
      form.append('file', file)
      if (fileType === 'license') {
        form.append('dirName', '')
      } else {
        form.append('dirName', 'idcard')
      }
      fileApi.fileUpload(form).then((data) => {
        if (data.success) {
          if (fileType === 'front') {
            this.addParams.company.legalPerson.idCardFront = data.data
          } else if (fileType === 'back') {
            this.addParams.company.legalPerson.idCardBack = data.data
          } else if (fileType === 'handle') {
            this.addParams.company.legalPerson.handheldIdCard = data.data
          } else if (fileType === 'license') {
            this.addParams.company.businessLicense = data.data
          }
        }
      })
    }
  },
  mounted() {
    this.companyId = this.$route.query.companyId
    if (beanUtils.isNotBlank(this.companyId)) {
      this.editorFlag = false
      this.queryCompany()
    }
    this.initAddParams()
    this.loadSysDate()
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .footer{
    z-index: 2;
    height:74px;
    border-top: 1px solid #ebeef5;
    background: #FFF;
    position: absolute;
    bottom: 3px;
    left: 350px;
    right: 0;
  }
  .bran .el-button{
    padding: 6px 12px;
  }
  .el-col-12{
    width: 44%;
    padding-left: 49px;
  }
  .uploadDiv{
    height: 178px;
    width: 178px;
    border: 0.5px dotted #8c939d;
  }
</style>
