import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import TileImage from '../../assets/tile.png';

const Container = styled.div`
    width: 800px;
    height: 800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const TileContainer = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const TileBackground = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    ${props => props.selected ? "border: solid 1px blue inset;" : ""}
`

const Robot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.color};
    border-radius: 10px;
    z-index: 10;
`
const Target = styled.div`
    width: 25px;
    height: 25px;
    background-color: ${props => props.color};
    border-radius: 0px;
    z-index: 5;
`

const BoardComponent = ({board}) => {
    const [render, setRender] = useState(false);
    const currentTile = useRef(false);
    const unsetSelected = useRef(() => {});

    const rerender = () => {
        setRender(!render);
    }

    const TileComponent = ({tile}) => {
        const handleClick = () => {
            if (tile.robot) { // clicked on a robot
                unsetSelected.current();
                tile.setSelected(true);
                unsetSelected.current = () => {tile.setSelected(!tile.selected)}
                currentTile.current = tile;
                return;
            }

            if (currentTile?.current?.selected) {
                unsetSelected.current();
                const dir = board.calcDir(currentTile.current, tile);
                if (dir) {
                    currentTile.current = board.moveRobot(currentTile.current.pos.x, currentTile.current.pos.y, dir);
                    unsetSelected.current = () => {currentTile.current.setSelected(false)};
                    currentTile.current.setSelected(true);
                    rerender();
                }
            }
            else {
                currentTile.current = tile;
            }
        }

        return (
            <TileContainer color={tile.color} walls={tile.walls} onClick={
                () => {
                    handleClick();
                }}>
                <TileBackground src={TileImage} selected={tile.selected}/>
                {tile.robot && <Robot color={tile.robot} />}
                {tile.target && <Target color={tile.target.color} />}
                
            </TileContainer>
        )
    }
    return (
        <Container>
            {board.tiles.map((row, i) => 
                row.map((tile, index) => (
                    <TileComponent tile={tile} key={index} />
                ))
            )}
        </Container>
    )
}

export default BoardComponent;