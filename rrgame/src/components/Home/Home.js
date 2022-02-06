import React, { useState } from 'react'
import Game from '../Game/GameComponent'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #7fbfff;
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
`
const Column = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: start;
`
// font-family: "Ageta Chubby Demo" instead of dumb linear gradient
const Title = styled.h1`
    font-family: serif;
    font-size: 100px;
    background: -webkit-linear-gradient(#f00, #ff0, #0f0, #00f);
`
const Space = styled.div`
    height: 20%;
`
const Button = styled.div`
    width: 16%;
    height: 9%;
    border-radius: 15px;
    border: 4px solid #f00;
    background-color: #f66;
    font-size: 40px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
`


const Home = () => {
    const [playing, setPlaying] = useState(false);
    const [type, setType] = useState("default");
    if (playing) return <Container>
        <Game />
    </Container>
    return (
        <Container>
            <Column>
                <Title>Ricochet Robots</Title>
                <Space></Space>
                <Button onClick={() => {
                    setPlaying(true);
                }}>Play Game</Button>
            </Column>
        </Container>
    )
}

export default Home;