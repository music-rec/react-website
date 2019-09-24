import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import fetch from '../../../utils/fetch'
import { IStore } from '../../../store/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames'
import './lists.less'
import { getBlogLists, getBolgTags } from './../action'
import LoadingTips from '../../../components/LoadingTips';
import useLoadingTips from './../../../use/useLoadingTips'
import { PROJECT_NAME,
         BLOG_LIST_DEFAULT_LIMIT,
         BLOG_TAGS_ALL_INFO } from '../../../config/constance'
import BlogList, { IBlogListCategorieOrTag } from '../../../components/BlogList'
import SiderWarp from '../../../components/SiderWarp'
import useScroll from './../../../use/useScroll'
import * as UrlUtils from 'd-utils/lib/urlUtils'

interface IBlogProps {
  history: any;
}

const Blog: React.FC<IBlogProps> = (props) => {
  const classString = classNames({
    [`${PROJECT_NAME}-blog-lists-info`]: true,
  })
  const loadingTipsFn = useLoadingTips(false, '加载中...')
  const [data, setData] = useState([])
  const [offset, setOffset] = useState<number>(0)
  const [tagLists, setTagLists] = useState([])
  const total = useRef<number | any>(0)
  const start = false

  const { tag: tagName } = UrlUtils.parseUrl(decodeURIComponent(location.href))
  const [tag, setTag] = useState(tagName)

  const loadMoreInfo = () => {
    if (loadingTipsFn.loading) return
    setOffset((offset) => offset = offset + BLOG_LIST_DEFAULT_LIMIT)
  }

  const filterListsByTagName = (item: IBlogListCategorieOrTag) => {
    props.history.replace(`${props.history.location.pathname}?tag=${item.name}`)
    setOffset((offset) => offset = 0)
  }

  useScroll(document.getElementById('dw-react-web-container'), loadMoreInfo)

  useEffect(() => {
    alert(offset)
    const fetchData = async () => {
      if (total.current && offset > total.current) return
      loadingTipsFn.showLoading()
      const res = await getBlogLists(offset, tag)
      loadingTipsFn.hideLoading()
      total.current = +res.data.total
      setData((data) => data = data.concat(res.data.lists))
    }
    fetchData()
  }, [offset])

  useLayoutEffect (() => {
    const fetchTagsList = async () => {
      const res: any = await getBolgTags()
      setTagLists((tagLists) => tagLists = res.data )
    }

    fetchTagsList()
  }, [tag])

  return (
    <div className={classString}>
      <TransitionGroup className="list-contariner">
        {
          data.map((item: any, index: number) => (
            <CSSTransition in={start}
                           key={index}
                           timeout={300 + (index % BLOG_LIST_DEFAULT_LIMIT)  * 200}
                           classNames="side-left-fade"
                           appear={true}
                           unmountOnExit={false}>
              <BlogList list={item}></BlogList>
            </CSSTransition>
          ))
        }
        <LoadingTips show={loadingTipsFn.loading} text={loadingTipsFn.text}/>
      </TransitionGroup>
      <SiderWarp show={false} switchTop="20px" type="auto">
        <h4 className="sider-title">分类列表</h4>
        <div className="sider-lists">
          <span key={-1} className={ (!tagName || tagName === '全部') ? 'active' : '' }
                onClick={ filterListsByTagName.bind(null, BLOG_TAGS_ALL_INFO) }>全部</span>
          {
            tagLists.length && tagLists.map((item: IBlogListCategorieOrTag, index) => (
              <span key={index}
                    className={tagName === item.name ? 'active' : ''}
                    onClick={ filterListsByTagName.bind(null, item) }>{ item.name }</span>
            ))
          }
          {/* <span className="active">111</span> */}
        </div>
      </SiderWarp>
    </div>
  )
}

export default Blog
