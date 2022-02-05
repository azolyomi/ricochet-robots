import React from 'react'
import styled from 'styled-components'
import TileComponent from './TileComponent'

const Container = styled.div`
    width: 800px;
    height: 800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const BoardComponent = ({board}) => {
    console.log(board.tiles);
    return (
        <Container>
            {board.tiles.map((e, i) => (
                <TileComponent tile={e} key={i}/>
            ))}
        </Container>
    )
}

export default BoardComponent;