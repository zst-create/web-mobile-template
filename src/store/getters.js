/*
 * @Author: wgj
 * @Date: 2021-03-22 19:53:07
 * @LastEditTime: 2021-03-22 19:58:20
 * @LastEditors: wgj
 * @Description: 
 */

const getters = {

  getStrategyValue: state => state.strategyManagement.strategyValue,
  // 绑定管理筛选数据
  getBindFilter: state => state.bind.bindFilter || JSON.parse(localStorage.getItem('bindFilter')),
  getDetailRouter: state => state.bind.detailRouter || JSON.parse(localStorage.getItem('detailRouter')),

  // 应用中心
  getFileData: state => state.appCenter.fileData,

}
export default getters
