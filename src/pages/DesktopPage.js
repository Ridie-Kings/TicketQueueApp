import { Col, Row, Typography, Button, Divider } from "antd"
import { CloseCircleOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { useHideMenu } from "../hooks/useHideMenu"
import { getUserStorage } from "../helpers/getUserStorage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

export const DesktopPage = () => {

    const navigate = useNavigate();
    useHideMenu(false)

    const [user] = useState(getUserStorage())


    const exit = () => {
        localStorage.removeItem('agente');
        localStorage.removeItem('escritorio');
        navigate('/join');
    }

    const nextTicket = () => {
        console.log('nextTicket');
    }

    useEffect(() => {
        if (!user.agente || !user.escritorio) navigate('/join')
    }, [navigate, user.agente, user.escritorio])

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={1}>{user.agente}</Title>
                    <Text>Tiene asignado el escritorio: </Text>
                    <Text type="success">{user.escritorio}</Text>
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

            <Row>
                <Col>
                    <Text>Está atendiendo el ticket número: </Text>
                    <Text
                        style={{ fontSize: 30 }}
                        type="danger"
                    >
                        55
                    </Text>
                </Col>
            </Row>

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