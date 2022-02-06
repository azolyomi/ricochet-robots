import React, { useState } from 'react'
import Game from '../Game/GameComponent'
import styled from 'styled-components'
//7fbfff
const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
`
const Column = styled.div`
    width: 50%;
    height: 50%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    font-size: 100px;
    padding: 20px;
    padding-bottom: 0px;
    margin-bottom: 0px;
    text-align: center;
    border-radius: 20px;
    background: -webkit-linear-gradient(#941017, #ff3f3f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const Subtitle = styled.h5`
    font-size: 30px;
    text-align: center;
    border-radius: 20px;
    background: -webkit-linear-gradient(#941017, #ff3f3f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const Space = styled.div`
    height: 20%;
`
const Button = styled.div`
    width: 300px;
    height: 100px;
    padding: 15px;
    border-radius: 15px;
    border: 4px solid #f00;
    background-color: #f66;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.2s;

    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        transition: transform 0.2s;
        
    }
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
                <Subtitle>Andras Zolyomi & Reuben Beeler</Subtitle>
                <Space />
                <Button onClick={() => {
                    setPlaying(true);
                }}>Play Game</Button>
            </Column>
        </Container>
    )
}

export default Home;