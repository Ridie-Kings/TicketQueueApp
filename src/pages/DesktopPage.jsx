import { Col, Row, Typography, Button, Divider } from "antd"
import { CloseCircleOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { useHideMenu } from "../hooks/useHideMenu"
import { getUserStorage } from "../helpers/getUserStorage"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"

const { Title, Text } = Typography

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
        <>
            <Row>
                <Col span={20}>
                    <Title level={1}>{user.agent}</Title>
                    <Text>Tiene asignado el desktop: </Text>
                    <Text type="success">{user.desktop}</Text>
                </Col>

                <Col span={4} align="right">
                    <Button
                        shape="round"
                        type="primary"
                        danger
                        onClick={exit}
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>

            <Divider />


            {
                ticket ? (
                    <Row>
                        <Col>
                            <Text>Está atendiendo el ticket número: </Text>
                            <Text
                                style={{ fontSize: 30 }}
                                type="danger"
                            >
                                {ticket.number}
                            </Text>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col>
                            <Text
                                style={{ fontSize: 30 }}
                                type="danger"
                            >
                                No hay tickets pendientes
                            </Text>
                        </Col>
                    </Row>
                )
            }



            <Row>
                <Col offset={18} span={6} align="right">
                    <Button
                        onClick={nextTicket}
                        shape="round"
                        type="primary"
                    >
                        <ArrowRightOutlined />
                        Siguiente Ticket
                    </Button>
                </Col>
            </Row>
        </>
    )
}