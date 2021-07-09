import { Typography,Avatar } from 'antd';
import React from 'react';
import styled
from 'styled-components';
import { formatRelative } from 'date-fns/esm';

const WrapperStyled = styled.div`
    margin-bottom:10px;
    .author{
        margin-left: 5px;
        font-weight: bold;
    }
    .date{
        margin-left:10px;
        font-size:11px;
        color: #a7a7a7;
    }
    .content{
        margin-left:30px;
    }`;
    function formatDate(seconds) {
        let formattedDate = '';
      
        if (seconds) {
          formattedDate = formatRelative(new Date(seconds * 1000), new Date());
      
          formattedDate =
            formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
      
        return formattedDate;
      }

function Message({text, displayName, createAt, photoURL}) {
    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL} size="small"> a</Avatar>
                <Typography.Text className='author'>{displayName}</Typography.Text>
                <Typography.Text className='date'> {formatDate(createAt?.seconds)}</Typography.Text>
            </div>
            <div>
                <Typography.Text className='content'>{text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
}

export default Message;