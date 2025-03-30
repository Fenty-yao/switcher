import React from 'react';
import { Avatar } from 'antd-mobile';
import { Footer } from '../framework';
import { Card } from 'antd-mobile';

const messages = [
    {
        id: 1,
        avatar: 'http://localhost:8080/imgs/avatar/赵四.jpeg',
        name: '赵四',
        lastMessage: '能便宜点吗!',
        time: '10:30 AM',
    },
    {
        id: 2,
        avatar: 'http://localhost:8080/imgs/avatar/王五.jpeg',
        name: '王五',
        lastMessage: '下午4点约?',
        time: '9:15 AM',
    },
    {
        id: 3,
        avatar: 'http://localhost:8080/imgs/avatar/老六.jpeg',
        name: '老六',
        lastMessage: '太贵不要了.',
        time: '昨天',
    },
];

const MessageList: React.FC = () => {

    return (
        <div className='app'>
            <header>消息列表<label style={{position: 'absolute', right: '10px', fontSize: '15px', color: 'blue'}}>清空</label></header>
            <div className='body'>
                {messages.map((message) => (
                    <Card key={message.id} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={message.avatar} style={{ '--size': '80px', 'margin': '0 auto' }} />
                            <div style={{ flex: 1, marginLeft: '1rem' }}>
                                <div style={{ fontWeight: 'bold' }}>{message.name}</div>
                                <div style={{ color: '#888', fontSize: '14px' }}>{message.lastMessage}</div>
                            </div>
                            <div style={{ color: '#aaa', fontSize: '12px' }}>{message.time}</div>
                        </div>
                    </Card>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default MessageList;