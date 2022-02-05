import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Tile = styled.div`
    background-color: ${props => props.color ?? "gray"};
    width: 50px;
    height: 50px;
    border: solid 1px black;
`

const TileComponent = ({tile}) => {
    const [render, setRender] = useState(false);

    const rerender = () => {
        setRender(!render);
    }
    return (
        <Tile color={tile.color} walls={tile.walls} onClick={
            () => {
                console.log('hello ');
                tile.setColor(tile.color == null ? "red" : "gray");
                rerender();
            }}/>
    )
}

export default TileComponent;