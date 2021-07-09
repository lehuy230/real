import React, { useContext} from 'react';
import {Form, Modal, Input} from 'antd'
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProviders';

function AddRoomModals(props) {
    const {isAddRoomvisible, setIsAddRoomvisible} =useContext(AppContext);
    const {user:{uid}} =useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOke=()=>{
        addDocument('rooms',{...form.getFieldValue(),members:[uid]});
        form.resetFields();
        setIsAddRoomvisible(false)
    };
    const handleCanel = () =>{
        form.resetFields();
        setIsAddRoomvisible(false)
    };
    return (
        <div>
            <Modal 
                title="Tạo phòng"
                visible={isAddRoomvisible}
                onOk={handleOke}
                onCancel={handleCanel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên Phòng" name='name'>
                        <Input placeholde="nhập tên phòng"/>
                    </Form.Item>
                    <Form.Item label="Mô tả" name='description'>
                        <Input.TextArea placeholde="nhập mô tả"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModals;