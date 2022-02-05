import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
`
const Text = styled.p`
    color: white;
`
const Home = () => {
    return (
        <Container>
            <Text>Cheese</Text>
        </Container>
    )
}

export default Home;