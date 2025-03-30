import { TabBar } from 'antd-mobile';
import React from 'react'
import {
  ShopbagOutline,
  MessageOutline,
  UserOutline
} from 'antd-mobile-icons'

const tabs = [
  {
    key: '/home',
    title: '市场',
    icon: <ShopbagOutline />,
  },
  {
    key: '/todo',
    title: '消息',
    icon: <MessageOutline />,
  },
  {
    key: '/message',
    title: '我的',
    icon: <UserOutline />,
  }
]

const Footer = () => {
  return (
    <TabBar>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}

export default Footer;