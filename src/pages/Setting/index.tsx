import React, { useState } from 'react'
import fetch from './../../utils/fetch'
import { IStore } from './../../store/types'
import { observer, useObservable, useObserver, useLocalStore, useStaticRendering, useComputed } from "mobx-react-lite"
import { useStore } from './../../utils/use'
import classNames from 'classnames'
import './setting.less'
import Constance from './../../config/constance'
import Switch from './../../components/Switch'
import { changePageMode } from './../../utils/utils'
import { randomPrimaryColor } from './../../utils/utils'

interface ISettingProps {}

const Setting = observer((props: ISettingProps) => {
  const classString = classNames({
    [`${Constance.PROJECT_NAME}-setting`]: true,
    [`dw-page-router`]: true
  })

  let [isDark, setDark] = useState(useStore().colorStore.mode === 'dark')
  
  const changePageModeFn = (isDarkMode: boolean) => {
    setDark(isDark = isDarkMode)
    console.log('isDark----', isDark)
    changePageMode()
  }

  const [testProps, setTestProps] = useState(false)
  const changeTest = (checked: boolean) => {
    setTestProps(checked)
    changePageMode()
  }
  return (
    <div className={classString}>
      <h2 className={`${Constance.PROJECT_NAME}-setting-title`}>Setting</h2>
      <h4 className={`${Constance.PROJECT_NAME}-setting-wrap-title`}>
        基本设置
      </h4>
      <ul className={`${Constance.PROJECT_NAME}-setting-wrap-content`}>
        <li className={`${Constance.PROJECT_NAME}-setting-wrap-content-list`}>
          <span>护眼模式 {String(useStore().colorStore.mode === 'dark')}</span>
          <Switch checked={useStore().colorStore.mode === 'dark'} onChange={changePageModeFn}/>
        </li>
      </ul>
      <h4 className={`${Constance.PROJECT_NAME}-setting-wrap-title`}>
        音乐设置
      </h4>
      <ul className={`${Constance.PROJECT_NAME}-setting-wrap-content`}>
        <li className={`${Constance.PROJECT_NAME}-setting-wrap-content-list`}>
          <span>歌词显示</span>
          {/* <Switch checked={false}
                  // onChange={changePageMode}
                  unCheckedName="关"
                  checkedName="开"/> */}
          {/* <Switch checked={testProps} onChange={changeTest}/> */}
          <Switch checked={useStore().colorStore.mode === 'dark'} onChange={changePageModeFn}/>
        </li>
      </ul>
    </div>
  )
})

export default Setting