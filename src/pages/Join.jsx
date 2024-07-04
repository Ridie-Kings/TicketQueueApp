import { Form, Input, InputNumber, Button, Typography, Card, Space } from 'antd';
import { UserOutlined, DesktopOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { useEffect, useState } from 'react';
import { getUserStorage } from '../helpers/getUserStorage';


const { Title, Text } = Typography;

export const Join = () => {

    const navigate = useNavigate();
    const [user] = useState(getUserStorage())


    useHideMenu(false);


    const onFinish = ({ agent, desktop }) => {
        localStorage.setItem('agent', agent);
        localStorage.setItem('desktop', desktop);

        navigate('/desktop');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (user.agent && user.desktop) navigate('/desktop')
    }, [navigate, user.agent, user.desktop])



    return (
        <Card
            style={{
                maxWidth: 400,
                margin: '0 auto',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '15px'
            }}
        >

            <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
                Ingresar
            </Title>
            <Text type='secondary' style={{ fontSize: 16 }}>Ingrese su nombre y número de escritorio</Text>

            <Form
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item
                    name="agent"
                    rules={[{ required: true, message: 'Por favor, ingrese su nombre' }]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Nombre del agente"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="desktop"
                    rules={[{ required: true, message: 'Ingrese el número del escritorio' }]}
                >
                    <InputNumber
                        prefix={<DesktopOutlined />}
                        placeholder="Número de escritorio"
                        min={1}
                        max={99}
                        style={{ width: '100%' }}
                        size="large"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<LoginOutlined />}
                        size="large"
                        block
                        style={{
                            height: '50px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}