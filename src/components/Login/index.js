import React from 'react';
import {Row,Col,Button,Typography} from 'antd';
import firebase,{auth} from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const {Title} = Typography;

// const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();


export default function Login() {
    
    const handleGgLogin = async() =>{
        const {additionalUserInfo, user} = await auth.signInWithPopup(ggProvider);
        if(additionalUserInfo?.isNewUser){
            addDocument('users',{
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid:user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }
   
    return (
        <div>
            <Row justify='center' style={{height:800}}>
                <Col span={8}>
                    <Title style={{textAlign:'center'}} level={3}>funchat</Title>
                    <Button style={{width:'100%',marginBottom:5}} >
                        Đăng nhập bằng faceBook
                    </Button>
                    <Button style={{width:'100%'}} onClick={handleGgLogin}>
                        Đăng nhập bằng Google
                    </Button>
                </Col>
            </Row>
        </div>
    );
}