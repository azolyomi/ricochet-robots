import React, { useState, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 800px;
    height: 800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Tile = styled.div`
    background-color: ${props => props.selected ? "#ADD8E6" : (props.color ?? "gray")};
    opacity: ${props => props.selected ? 0.7 : 1};
    width: 46px;
    height: 48px;
    border-top: ${props => props.walls.up ? "1px solid red" : "1px solid black"};
    border-bottom: ${props => props.walls.down ? "1px solid red" : "1px solid black"};
    border-left: ${props => props.walls.left ? "1px solid red" : "1px solid black"};
    border-right: ${props => props.walls.right ? "1px solid red" : "1px solid black"};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Robot = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.color};
    border-radius: 10px;
`
const Target = styled.div`
    width: 25px;
    height: 25px;
    background-color: ${props => props.color};
    border-radius: 0px;
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
            <Tile color={tile.color} selected={tile.selected} walls={tile.walls} onClick={
                () => {
                    handleClick();
                }}>
                {tile.robot && <Robot color={tile.robot} />}
                {tile.target && <Target color={tile.target.color} />}
            </Tile>
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