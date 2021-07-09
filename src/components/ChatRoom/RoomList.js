import React from 'react';
import { Collapse,Typography,Button } from 'antd';
import styled from 'styled-components';
import {PlusSquareOutlined} from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&&{
        .ant-collapse-header, 
        p{
            color:white;
        }
        .ant-collapse-content-box{
            padding: 0 40px
        }
        .add-room{
            color:white;
            padding:0;
        }
    }
`;
const LinkStyle = styled(Typography.Link)`
    display: block;
    margin-bottom:5px;
    color:white;
`

function RoomList() {
   const {rooms,setIsAddRoomvisible,setSelectedRoomId} = React.useContext(AppContext);
   const handleAddRoom =()=>{
    setIsAddRoomvisible(true)
   }
    return (
       <Collapse ghost defaultActiveKey={['1']}>
        <PanelStyled header='Danh sách các phòng' key='1'>
            {rooms.map(room=><LinkStyle key={room.id} onClick={()=>{setSelectedRoomId(room.id)}}>{room.name}</LinkStyle>)}
            
            
            <Button type='text' icon={<PlusSquareOutlined/>} className='add-room' onClick={handleAddRoom}>Thêm Phòng</Button>
        </PanelStyled>
       </Collapse>
    );
}

export default RoomList;