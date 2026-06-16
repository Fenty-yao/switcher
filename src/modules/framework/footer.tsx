import { TabBar } from 'antd-mobile';
import React from 'react'
import {
  ShopbagOutline,
  MessageOutline,
  UserOutline
} from 'antd-mobile-icons'
import { Link } from 'react-router-dom';

const tabs = [
  {
    key: '/home',
    title: '市场',
    icon: <Link to="/product-list"><ShopbagOutline /></Link>,
  },
  {
    key: '/todo',
    title: '消息',
    icon: <Link to="/messages"><MessageOutline /></Link>,
  },
  {
    key: '/message',
    title: '我的',
    icon: <Link to="/me"><UserOutline /></Link>,
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