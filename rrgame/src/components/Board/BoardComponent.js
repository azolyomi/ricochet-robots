import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import TileImage from '../../assets/tile.png';
import CenterImage from '../../assets/center.png';
import UpWall from '../../assets/up.png';
import DownWall from '../../assets/down.png';
import RightWall from '../../assets/right.png';
import LeftWall from '../../assets/left.png';


import blue_navigator from '../../assets/blue_navigator.png';
import red_navigator from '../../assets/red_navigator.png';
import green_navigator from '../../assets/green_navigator.png';
import yellow_navigator from '../../assets/yellow_navigator.png'

import blue_saturn from '../../assets/blue_saturn.png';
import red_saturn from '../../assets/red_saturn.png';
import green_saturn from '../../assets/green_saturn.png';
import yellow_saturn from '../../assets/yellow_saturn.png';

import blue_triangle_star from '../../assets/blue_triangle_star.png';
import red_triangle_star from '../../assets/red_triangle_star.png';
import green_triangle_star from '../../assets/green_triangle_star.png';
import yellow_triangle_star from '../../assets/yellow_triangle_star.png';

const TargetAsset = {
    navigator: {
        blue: blue_navigator,
        red: red_navigator,
        green: green_navigator,
        yellow: yellow_navigator
    },
    saturn: {
        blue: blue_saturn,
        red: red_saturn,
        green: green_saturn,
        yellow: yellow_saturn
    },
    triangle_star: {
        blue: blue_triangle_star,
        red: red_triangle_star,
        green: green_triangle_star,
        yellow: yellow_triangle_star
    }
}

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

const TileBackgroundImage = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
`
const TileSelection = styled.div`
    background-color: blue;
    opacity: 0.2;
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 0;
`
const TileBackground = ({src, selected}) => {
    return (
        <>
            <TileBackgroundImage src={src} />
            {selected && <TileSelection />}
        </>
    )
}

const CenterTile = styled.img`
    background-color: black;
    width: 50px;
    height: 50px;
    position: absolute;
`

const TileWall = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
`

const RobotIcon = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.color};
    border-radius: 10px;
    z-index: 11;
`
const RobotContainer = styled.div`
    width: 50px;
    height: 50px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const Robot = ({color, selected}) => {

    return (
        <RobotContainer selected={selected}>
            <RobotIcon color={color} />
        </RobotContainer>
    )


}
const TileTargetImg = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    z-index: 5;
`

const TileTarget = ({type, color}) => {
    return (
        <TileTargetImg src={TargetAsset[type][color]} />
    )
}

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
                rerender();
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

        if (tile.centerTile) 
            return (
            <TileContainer>
                <CenterTile src={CenterImage} />
            </TileContainer>
        )

        return (
            <TileContainer onClick={
                () => {
                    handleClick();
                }}>
                <TileBackground selected={tile.selected} src={TileImage} />
                {tile.walls.up && <TileWall src={UpWall} />}
                {tile.walls.down && <TileWall src={DownWall} />}
                {tile.walls.right && <TileWall src={RightWall} />}
                {tile.walls.left && <TileWall src={LeftWall} />}
                {tile.target && <TileTarget type={tile.target.type} color={tile.target.color} />}
                {tile.robot && <Robot color={tile.robot}/>}
                
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