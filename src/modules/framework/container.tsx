import React from 'react'
import type { FC } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import {
  Route,
  useLocation,
  MemoryRouter as Router,
  Routes,
} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

const Bottom: FC = () => {
  // const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    // history.push(value)
  }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/todo',
      title: '待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

export default () => {
  return (
    <Router initialEntries={['/home']}>
      <div className="app">
        <div className="top">
          <NavBar>配合路由使用</NavBar>
        </div>
        <div className="body">
          <Routes>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/todo'>
              <Todo />
            </Route>
            <Route path='/message'>
              <Message />
            </Route>
            <Route path='/me'>
              <PersonalCenter />
            </Route>
          </Routes>
        </div>
        <div className="bottom">
          <Bottom />
        </div>
      </div>
    </Router>
  )
}

function Home() {
  return <div>首页</div>
}

function Todo() {
  return <div>待办</div>
}

function Message() {
  return <div>消息</div>
}

function PersonalCenter() {
  return <div>我的</div>
}