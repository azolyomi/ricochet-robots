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
    background-color: ${props => props.selected ? "green" : (props.color ?? "gray")};
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

const BoardComponent = ({board}) => {
    const [render, setRender] = useState(false);
    const fromTile = useRef(false);
    const toTile = useRef(false);
    // const tileSetter = useRef(() => {});

    const rerender = () => {
        setRender(!render);
    }

    const TileComponent = ({tile}) => {
        const handleClick = () => {
            if (fromTile.current) {
                // tile clicked is the direction we want to move in
                const dir = board.calcDir(fromTile.current, tile);
                if (dir) {
                    toTile.current = board.moveRobot(fromTile.current.pos.x, fromTile.current.pos.y, dir);
                    fromTile.current = toTile.current;
                    toTile.current = false;
                    rerender();
                }
            }
            else {
                fromTile.current = tile;
            }
        }

        return (
            <Tile color={tile.color} walls={tile.walls} onClick={
                () => {
                    handleClick();
                    rerender();
                }}>
                {tile.robot && <Robot color={tile.robot} />}
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