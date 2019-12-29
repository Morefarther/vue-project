import Vue from 'vue'
import Router from 'vue-router'

import Monitor from '../views/monitor/Monitor'
import MSourceMRFile from '../views/monitor/datashow/MSourceMRFile'
import MSourceMRLostFtp from '../views/monitor/datashow/MSourceMRLostFtp'
import MSourcePMFile from '../views/monitor/datashow/MSourcePMFile'
import MSourcePMLostFtp from '../views/monitor/datashow/MSourcePMLostFtp'

import History from '../views/history/History'
import HistoryTimeDimen from '../views/history/datashow/HistoryTimeDimen'
import HistoryFTPDimen from '../views/history/datashow/HistoryFTPDimen'
import HistoryCityDimen from '../views/history/datashow/HistoryCityDimen'
import HistoryYarnLog from '../views/history/datashow/HistoryYarnLog'
import HSLMrlocationFilelength from '../views/history/datashow/HSLMrlocationFilelength'
import HSLMrlocationComplete from '../views/history/datashow/HSLMrlocationComplete'
import HSLMrlocationPrecision from '../views/history/datashow/HSLMrlocationPrecision'
import HistoryZabbixTimeDimen from '../views/history/datashow/HistoryZabbixTimeDimen'

import Security from '../views/security/Security'

Vue.use(Router)

export default new Router({
  routes: [
    // monitor路由
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor,
      children: [{
        path: '',
        name: 'monitordefault',
        component: MSourceMRFile
      }, {
        path: 'sourcemrfile',
        name: 'sourcemrfile',
        component: MSourceMRFile
      }, {
        path: 'sourcemrlostftp',
        name: 'sourcemrlostftp',
        component: MSourceMRLostFtp
      }, {
        path: 'sourcepmfile',
        name: 'sourcepmfile',
        component: MSourcePMFile
      }, {
        path: 'sourcepmlostftp',
        name: 'sourcepmlostftp',
        component: MSourcePMLostFtp
      }]
    },
    // hisotry页面路由
    {
      path: '/history',
      name: 'history',
      component: History,
      children: [
        {
          path: '',
          name: 'historydefault',
          component: HistoryTimeDimen
        }, {
          path: 'timedimen',
          name: 'historytimedimen',
          component: HistoryTimeDimen
        }, {
          path: 'ftpdimen',
          name: 'historyftpdimen',
          component: HistoryFTPDimen
        }, {
          path: 'citydimen',
          name: 'historycitydimen',
          component: HistoryCityDimen
        }, {
          path: 'yarnlog',
          name: 'historyyarnlog',
          component: HistoryYarnLog
        }, {
          path: 'sparklogmrlocationfilelength',
          name: 'sparklogmrlocationfilelength',
          component: HSLMrlocationFilelength
        }, {
          path: 'sparklogmrlocationcomplete',
          name: 'sparklogmrlocationcomplete',
          component: HSLMrlocationComplete
        }, {
          path: 'sparklogmrlocationprecision',
          name: 'sparklogmrlocationprecision',
          component: HSLMrlocationPrecision
        }, {
          path: 'zabbixtimedimen',
          name: 'zabbixtimedimen',
          component: HistoryZabbixTimeDimen
        }
      ]
    },
    // security 页面路由
    {
      path: '/security',
      name: 'security',
      component: Security
    },
    // 默认页面
    {
      path: '/',
      name: 'default',
      redirect: '/history'
    }
  ]
})
