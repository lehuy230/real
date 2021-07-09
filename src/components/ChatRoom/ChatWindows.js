import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {UserAddOutlined} from '@ant-design/icons';
import {Button,Avatar,Tooltip,Input,Form, Alert} from 'antd';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProviders';
import useFirestore from '../../hook/useFireStore';

const HeaderStyled = styled.div`
    display:flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-item: center;
    border-bottom: 1px solid rgb(230, 230, 230);
    
    .header{
        &__infor{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        &__title{
            margin: 0;
            font-weight: bold;
        }
        &__description{
            font-size: 12px;
        }
    }`;
const ButtonGroupStyled = styled.div`
        padding-top:13px;
        display:flex;
        align-item: center;
    `;
const ContentStyled = styled.div`
    height:93%;
    display:flex;
    flex-direction: column;
    padding:11px;
    justify-content:flex-end;
`;
const FormStyled = styled(Form)`
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rbg(230, 230, 230);
    border-radius:2px;

    .ant-form-item{
        flex:1;
        margin-bottom:0;
    }
`;
const MessageListStyled = styled.div`
    max-heigt:100vh;
    overflow-y: auto;

`;
const WrapperStyled = styled.div`
    height:100vh`;

function ChatWindows(props) {
    const {sellectedRoom,members,setIsInviteMembervisible} = useContext(AppContext);
    const {user:{uid, photoURL,displayName}} = useContext(AuthContext);
    // const sellectedRoom =  React.useMemo(
    //     ()=>rooms.find((room)=>room.id === selectedRoomId)
    // ,[rooms,selectedRoomId]);
    // console.log(rooms,selectedRoomId,sellectedRoom)
    const [inputValue,setInputValue] = useState('');
    const messageListRef = useRef(null);
    const [form] = Form.useForm();
    const handleInputChange = (e) =>{
        setInputValue(e.target.value);
    }
    const handleOnSubmit = () =>{
        addDocument('messages',{
            text:inputValue,
            uid,
            photoURL,
            roomId:sellectedRoom.id,
            displayName
        })
        form.resetFields(["message"]);
    }
    const condition = React.useMemo(()=>({
        fieldName: 'roomId',
        operator: '==',
        compareValue:sellectedRoom.id
    }),[sellectedRoom.id]);
    const messages = useFirestore('messages',condition);
    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight + 50;
        }
      }, [messages]);

    return (
        <WrapperStyled>
            {
                sellectedRoom.id?(
                <>
                <HeaderStyled>
                <div className="header__infor">
                    <p className="header__title">{sellectedRoom.name}</p>
                    <span className="header__description">{sellectedRoom.description}</span>
                </div>
                <ButtonGroupStyled>
                    <Button icon={<UserAddOutlined/>} type="text" onClick={()=>setIsInviteMembervisible(true)}>Mời</Button>
                    <Avatar.Group size='small' maxCount={2}>
                        {members.map((member)=>(
                             <Tooltip title={member.name} key={member.uid}>
                             <Avatar src={member.photoURL}>
                                 {member.photoURL?'':member.displayName?.charAt(0)?.toUpperCase()}
                             </Avatar>
                         </Tooltip>
                        ))}
                    </Avatar.Group>
                </ButtonGroupStyled>
               
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled ref={messageListRef}>
                {messages.map((mes) => (
                    <Message
                    key={mes.id}
                    text={mes.text}
                    photoURL={mes.photoURL}
                    displayName={mes.displayName}
                    createAt={mes.createAt}
                    />
                ))}
                </MessageListStyled>
                <FormStyled form = {form}>
                    <Form.Item name="message">
                        <Input onChange={handleInputChange} onPressEnter={handleOnSubmit} bordered={false} autoComplete='off' placeholder="mời nhập nội dung"/>
                    </Form.Item>
                    <Button type="primary" onClick={handleOnSubmit}>Gởi</Button>
                </FormStyled>
            </ContentStyled>
                </>
                ):<Alert message="hãy chọn phòng trươc"/>
            }
            
        </WrapperStyled>
    );
}

export default ChatWindows;