import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.div`
    width: 16%;
    height: 9%;
    border-radius: 5%;
    background-color: lightblue;
    border-color: blue;
`
const Home = () => {
    return (
        <Container>
            <Button onClick={() => {}}>Play Game</Button>
        </Container>
    )
}

export default Home;