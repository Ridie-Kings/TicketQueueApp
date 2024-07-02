import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { useEffect, useState } from 'react';
import { getUserStorage } from '../helpers/getUserStorage';


const { Title, Text } = Typography;

export const Join = () => {

    const navigate = useNavigate();
    const [user] = useState(getUserStorage())

    console.log(user);

    useHideMenu(false);


    const onFinish = ({ agente, escritorio }) => {
        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);

        navigate('/desktop');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (user.agente && user.escritorio) navigate('/desktop')
    }, [navigate, user.agente, user.escritorio])



    return (
        <>
            <Title level={2}>Ingresar</Title>
            <Text>Ingrese su nombre y número de escritorio</Text>
            <Divider />
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 14,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre del agente"
                    name="agente"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, ingrese su nombre',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese el número del escritorio',
                        },
                    ]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 14,
                    }}
                >
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 10,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape='round'
                    >
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}