import React from 'react';
import styled from 'styled-components';
import BoardComponent from '../Board/BoardComponent';
import GameObject from '../../classes/GameObject';
import BoardObject from '../../classes/BoardObject';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Game = () => {
    const GameBoard = new GameObject();

    return (
        <Container>
            <BoardComponent board={GameBoard.board}/>
        </Container>
    )
}

export default Game;