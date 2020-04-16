import home from '@/views/home'
import header from '@/components/header'
import footer from '@/components/footer'
// -------------------------------
// import login from '@/views/login'
import enterpriseList from '@/views/enterprise/enterprise-list'
import newEnterprise from '@/views/enterprise/new-enterprise'
import homeList from '@/views/content/home-list'
import country from '@/views/task/country'
import recharge from '@/views/operate/recharge'
import chargingStrategy from '@/views/operate/charging-strategy'
import product from '@/views/operate/product'
import district from '@/views/operate/district'
import paymentTask from '@/views/operate/payment-task'
import systemMessage from '@/views/operate/system-message'
import incomeDetails from '@/views/finance/income-details'
import offlinePayment from '@/views/finance/offline-payment'
import statistics from '@/views/finance/statistics'
import registration from '@/views/enterprise/registration'
import taskManage from '@/views/manage/task-manage'
import modular from '@/views/task/modular'
import userManage from '@/views/task/user-manage'
// -------------------------------
// -------------------------------
import communityManagement from '@/views/community/community-management'
// 小区
import floor from '@/views/building/floor'
import unit from '@/views/building/unit'
import roomFlow from '@/views/building/roomFlow'
import sellRoomFlow from '@/views/building/sellRoomFlow'
// 业主
import ownerFlow from '@/views/owner/ownerFlow'
import ownerMemberFlow from '@/views/owner/ownerMemberFlow'
import ownerRoomFlow from '@/views/owner/ownerRoomFlow'
import ownerParkingSpaceFlow from '@/views/owner/ownerParkingSpaceFlow'
// 车位
import parkingSpaceFlow from '@/views/parking/parkingSpaceFlow'
import hireParkingSpaceFlow from '@/views/parking/hireParkingSpaceFlow'
import sellOwnerCarFlow from '@/views/parking/sellOwnerCarFlow'
// 缴费
import propertyFeeConfigFlow from '@/views/pay/propertyFeeConfigFlow'
import parkingSpaceFeeConfigFlow from '@/views/pay/parkingSpaceFeeConfigFlow'
import propertyFeeFlow from '@/views/pay/propertyFeeFlow'
import parkingSpaceFeeFlow from '@/views/pay/parkingSpaceFeeFlow'
// 员工管理
import staff from '@/views/staff'
// 员工权限
import staffPrivilege from '@/views/staffRights/staffPrivilege'
import privilege from '@/views/staffRights/privilege'
// demo
import demoFlow from '@/views/demo/demoFlow'
// 报表
import reports from '@/views/report/reports'
export default [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: login,
  //   meta: {}
  // },
  {
    path: '/main',
    components: {
      default: home,
      header: header,
      footer: footer
    },
    meta: {},
    children: [
      // 操作记录
      {
        path: '/home',
        name: 'homeList',
        meta: {
          // requiresAuth: true
        },
        component: homeList
      },
      {
        path: '/communityManagement',
        name: 'communityManagement',
        meta: {
          // requiresAuth: true
        },
        component: communityManagement
      },
      {
        path: '/floor',
        name: 'floor',
        meta: {
          // requiresAuth: true
        },
        component: floor
      },
      {
        path: '/unit',
        name: 'unit',
        meta: {
          // requiresAuth: true
        },
        component: unit
      },
      {
        path: '/roomFlow',
        name: 'roomFlow',
        meta: {
          // requiresAuth: true
        },
        component: roomFlow
      },
      {
        path: '/sellRoomFlow',
        name: 'sellRoomFlow',
        meta: {
          // requiresAuth: true
        },
        component: sellRoomFlow
      },
      {
        path: '/ownerFlow',
        name: 'ownerFlow',
        meta: {
          // requiresAuth: true
        },
        component: ownerFlow
      },
      {
        path: '/ownerMemberFlow',
        name: 'ownerMemberFlow',
        meta: {
          // requiresAuth: true
        },
        component: ownerMemberFlow
      },
      {
        path: '/ownerParkingSpaceFlow',
        name: 'ownerParkingSpaceFlow',
        meta: {
          // requiresAuth: true
        },
        component: ownerParkingSpaceFlow
      },
      {
        path: '/ownerRoomFlow',
        name: 'ownerRoomFlow',
        meta: {
          // requiresAuth: true
        },
        component: ownerRoomFlow
      },
      {
        path: '/parkingSpaceFlow',
        name: 'parkingSpaceFlow',
        meta: {
          // requiresAuth: true
        },
        component: parkingSpaceFlow
      },
      {
        path: '/hireParkingSpaceFlow',
        name: 'hireParkingSpaceFlow',
        meta: {
          // requiresAuth: true
        },
        component: hireParkingSpaceFlow
      },
      {
        path: '/sellOwnerCarFlow',
        name: 'sellOwnerCarFlow',
        meta: {
          // requiresAuth: true
        },
        component: sellOwnerCarFlow
      },
      {
        path: '/propertyFeeConfigFlow',
        name: 'propertyFeeConfigFlow',
        meta: {
          // requiresAuth: true
        },
        component: propertyFeeConfigFlow
      },
      {
        path: '/parkingSpaceFeeConfigFlow',
        name: 'parkingSpaceFeeConfigFlow',
        meta: {
          // requiresAuth: true
        },
        component: parkingSpaceFeeConfigFlow
      },
      {
        path: '/propertyFeeFlow',
        name: 'propertyFeeFlow',
        meta: {
          // requiresAuth: true
        },
        component: propertyFeeFlow
      },
      {
        path: '/parkingSpaceFeeFlow',
        name: 'parkingSpaceFeeFlow',
        meta: {
          // requiresAuth: true
        },
        component: parkingSpaceFeeFlow
      },
      {
        path: '/staff',
        name: 'staff',
        meta: {
          // requiresAuth: true
        },
        component: staff
      },
      {
        path: '/staffPrivilege',
        name: 'staffPrivilege',
        meta: {
          // requiresAuth: true
        },
        component: staffPrivilege
      },
      {
        path: '/demoFlow',
        name: 'demoFlow',
        meta: {
          // requiresAuth: true
        },
        component: demoFlow
      },
      {
        path: '/privilege',
        name: 'privilege',
        meta: {
          // requiresAuth: true
        },
        component: privilege
      },
      {
        path: '/reports',
        name: 'reports',
        meta: {
          // requiresAuth: true
        },
        component: reports
      },
      {
        path: '/incomeDetails',
        name: 'incomeDetails',
        meta: {
          // requiresAuth: true
        },
        component: incomeDetails
      },
      {
        path: '/chargingStrategy',
        name: 'chargingStrategy',
        meta: {
          // requiresAuth: true
        },
        component: chargingStrategy
      },
      {
        path: '/product',
        name: 'product',
        meta: {
          // requiresAuth: true
        },
        component: product
      },
      {
        path: '/statistics',
        name: 'statistics',
        meta: {
          // requiresAuth: true
        },
        component: statistics
      },
      {
        path: '/district',
        name: 'district',
        meta: {
          // requiresAuth: true
        },
        component: district
      },
      {
        path: '/paymentTask',
        name: 'paymentTask',
        meta: {
          // requiresAuth: true
        },
        component: paymentTask
      },
      {
        path: '/systemMessage',
        name: 'systemMessage',
        meta: {
          // requiresAuth: true
        },
        component: systemMessage
      },
      {
        path: '/registration',
        name: 'registration',
        meta: {
          // requiresAuth: true
        },
        component: registration
      },
      {
        path: '/enterpriseList',
        name: 'enterpriseList',
        meta: {
          // requiresAuth: true
        },
        component: enterpriseList
      },
      {
        path: '/newEnterprise',
        name: 'newEnterprise',
        meta: {
          // requiresAuth: true
        },
        component: newEnterprise
      },
      {
        path: '/taskManage',
        name: 'taskManage',
        meta: {
          // requiresAuth: true
        },
        component: taskManage
      },
      {
        path: '/offlinePayment',
        name: 'offlinePayment',
        meta: {
          // requiresAuth: true
        },
        component: offlinePayment
      },
      {
        path: '/bin',
        name: 'enterpriseList',
        meta: {
          // requiresAuth: true
        },
        component: enterpriseList
      },
      {
        path: '/recharge',
        name: 'recharge',
        meta: {
          // requiresAuth: true
        },
        component: recharge
      },
      {
        path: '/country',
        name: 'country',
        meta: {
          // requiresAuth: true
        },
        component: country
      },
      {
        path: '/modular',
        name: 'modular',
        meta: {
          // requiresAuth: true
        },
        component: modular
      },
      {
        path: '/userManage',
        name: 'userManage',
        meta: {
          // requiresAuth: true
        },
        component: userManage
      }
    ]
  }
]
