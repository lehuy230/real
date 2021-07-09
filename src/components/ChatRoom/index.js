import React from 'react';
import { Row,Col } from 'antd';
import Sibar from './Sibar';
import ChatWindows from './ChatWindows';

function ChatRoom(props) {
    return (
        <div>
           <Row>
               <Col span={6}>
                   <Sibar/>
               </Col>
               <Col span={18}>
                   <ChatWindows/>
               </Col>
           </Row>
        </div>
    );
}

export default ChatRoom;