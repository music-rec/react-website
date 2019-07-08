import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { PROJECT_NAME } from '../../config/constance'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SheetList from './../SheetList'
import './sheet-group.less'

const SheetGroup = () => {
  const classString = classNames({
    [`${PROJECT_NAME}-sheet-group`]: true,
  })

  const [start, setStart] = useState(false)
  const [data, setData] = useState([1, 2])

  useEffect(() => {
    const t = setTimeout(() => {
      setData(
        data.concat([1, 2, 3, 4])
      )
    }, 3000)

    return function remove () {
      clearTimeout(t)
    }
  }, [])
  
  return (
    <div className={classString}>
      <TransitionGroup>
        {
          data.map((item: any, index: number) => (
            <CSSTransition  in={start}
                          key={index}
                          timeout={300 + index * 100}
                          classNames="side-left-fade"
                          appear={true}
                          unmountOnExit={false}>
              <SheetList/>
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    </div>
  )
}

export default SheetGroup
