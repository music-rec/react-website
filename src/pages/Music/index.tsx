import React, { useState, useEffect } from 'react';
import classNames from 'classnames'
import { PROJECT_NAME } from './../../config/constance'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MusicSheet, MusicRank, MusicSearch, MusicSheetDetail } from './../../loadable'

interface IMusicProps {}

const Music: React.FC = (props: IMusicProps) => {
  const classString = classNames({
    [`${PROJECT_NAME}-music`]: true,
    [`dw-page-router`]: true
  })

  return (
    <div className={classString}>
      {/* this is Music  */}
      <Switch>
        <Route path="/music/sheet" component={MusicSheet}/>
        <Route path="/music/sheetdetail" component={MusicSheetDetail}/>
        <Route path="/music/rank" component={MusicRank}/>
        <Route path="/music/search" component={MusicSearch}/>
        <Redirect to="/music/sheet" />
      </Switch>
    </div>
  )
}

export default Music