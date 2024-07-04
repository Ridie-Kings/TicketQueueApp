
import { Layout, Card, Typography, Button, Space, Badge, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined, DesktopOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useHideMenu } from "../hooks/useHideMenu"
import { getUserStorage } from "../helpers/getUserStorage"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"
import './styles/desktop.css'

const { Title, Text } = Typography
const { Header, Content } = Layout

export const DesktopPage = () => {

    const navigate = useNavigate();
    useHideMenu(false)

    const [user] = useState(getUserStorage())
    const { socket } = useContext(SocketContext)
    const [ticket, setTicket] = useState(null)


    const exit = () => {
        localStorage.removeItem('agent');
        localStorage.removeItem('desktop');
        navigate('/join');
    }

    const nextTicket = () => {
        socket.emit('next-ticket-to-attend', user, (ticket) => {
            setTicket(ticket);
        })
    }

    useEffect(() => {
        if (!user.agent || !user.desktop) navigate('/join')
    }, [navigate, user.agent, user.desktop])

    return (
        <Layout className="modern-layout">
            <Header className="modern-header">
                <div className="header-content">
                    <Space size="large" className="user-info">
                        <Avatar size="large" icon={<UserOutlined />} />
                        <div className="user-details">
                            <Title level={4} style={{ margin: 0 }}>{user.agent}</Title>
                            <Text type="secondary">Desktop: {user.desktop}</Text>
                        </div>
                    </Space>
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={exit}
                        className="exit-button"
                    >
                        Salir
                    </Button>
                </div>
            </Header>

            <Content className="modern-content">
                <Card
                    className="main-card"
                    actions={[
                        <Button
                            type="primary"
                            icon={<RightCircleOutlined />}
                            onClick={nextTicket}
                            size="large"
                        >
                            Siguiente Ticket
                        </Button>
                    ]}
                >
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Badge.Ribbon text={`Desktop ${user.desktop}`} color="blue">
                            <Card className="user-info-card">
                                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                                    <DesktopOutlined className="desktop-icon" />
                                    <Title level={2}>{user.agent}</Title>
                                </Space>
                            </Card>
                        </Badge.Ribbon>

                        {ticket ? (
                            <div className="ticket-info">
                                <Text>Atendiendo ticket número:</Text>
                                <Title level={1} type="danger">{ticket.number}</Title>
                            </div>
                        ) : (
                            <div className="no-ticket-info">
                                <Text type="warning">
                                    No hay tickets pendientes
                                </Text>
                            </div>
                        )}
                    </Space>
                </Card>
            </Content>
        </Layout>
    );
}