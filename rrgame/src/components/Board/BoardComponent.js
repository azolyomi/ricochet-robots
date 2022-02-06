import React, { useState, useRef, useEffect } from 'react'
import { POSSIBLE_ROBOTS } from '../../constants';
import styled from 'styled-components'

import TileImage from '../../assets/tile.png';

import CenterTL from '../../assets/center_top_left.png';
import CenterTR from '../../assets/center_top_right.png';
import CenterBL from '../../assets/center_bottom_left.png';
import CenterBR from '../../assets/center_bottom_right.png';

import RedRobot from '../../assets/red_robot.png';
import BlueRobot from '../../assets/blue_robot.png';
import GreenRobot from '../../assets/green_robot.png';
import YellowRobot from '../../assets/yellow_robot.png';

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

const RobotAsset = {
    yellow: YellowRobot,
    blue: BlueRobot,
    green: GreenRobot,
    red: RedRobot
}

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

const FlexBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

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
    background-color: ${props => props.color ?? "blue"};
    opacity: 0.25;
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 0;
`
const TileBackground = ({src, selected, color}) => {
    return (
        <>
            <TileBackgroundImage src={src} />
            {selected && <TileSelection color={color}/>}
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

const RobotIcon = styled.img`
    width: 50px;
    height: 50px;
    z-index: 11;
`

const Robot = ({color}) => {

    return (
        <RobotIcon src={RobotAsset[color]} />
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

const GameControlsContainer = styled.div`
    height: 80%;
    width: 20%;
    margin: 20px;
    padding: 20px;
    padding-top: 0px;
    border: solid 1px white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const NextTargetContainer = styled.div`
    height: auto;
    padding-top: 20px;
    padding-bottom: 10px;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const ControlsContainer = styled.div`
    height: 70%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const Control = styled.div`
    height: 30px;
    margin-top: 20px;
    width: 90%;
    color: white;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

const ClickableControl = styled(Control)`
    color: white;
    cursor: pointer;
    background-color: #0d0d0d;
    border: solid 1px #2e2e2e;
    border-radius: 5px;

    &:hover {
        background-color: #1e1e1e;
    }
`

const CompletedTargetsContainer = styled.div`
    width: auto;
    height: 10%;
    align-self: center;
`

const TargetImage = styled.img`
    height: 80px;
    width: 80px%;
`
const CompletedTargetImage = styled.img`
    height: 60px;
    width: 60px;
`

const TargetHeader = styled.h2`
    color: white;
    font-size: 32px;
`

const GameControls = ({board, rerender, unsetSelected}) => {
    return (
        <GameControlsContainer>
            <NextTargetContainer>
                <TargetHeader>Your Target: </TargetHeader>
                <TargetImage src={TargetAsset[board.currentTarget.type][board.currentTarget.color]} />
            </NextTargetContainer>
            <ControlsContainer>
                <Control>
                    <div>Score: {board.score}</div>
                    <div>Moves: {board.moveCount}</div>
                </Control>
                <ClickableControl onClick={() => {board.resetRobotPositions(); unsetSelected(); rerender();}}>Reset Positions</ClickableControl>
                <ClickableControl onClick={() => {board.pickTarget(); rerender();}}>New Target</ClickableControl>
            </ControlsContainer>
            <CompletedTargetsContainer>
                {board.completedTargets.map(t => <CompletedTargetImage src={TargetAsset[t.type][t.color]} />)}
            </CompletedTargetsContainer>
        </GameControlsContainer>
    )
}

const MVMT_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", " "];
const MVMT_KEY_DIR = {
    ArrowUp: "up",
    w: 'up',
    ArrowDown: 'down',
    s: 'down',
    ArrowLeft: 'left',
    a: 'left',
    ArrowRight: 'right',
    d: 'right'
}

const BoardComponent = ({board}) => {
    const [render, setRender] = useState(false);
    const currentTile = useRef(false);
    const unsetSelected = useRef(() => {});

    const rerender = () => {
        setRender(!render);
    }

    useEffect(() => {
        document.body.addEventListener('keypress', handleKeyPress)
        return () => {
            document.body.removeEventListener('keypress', handleKeyPress);
        }
    })
    const handleKeyPress = (e) => {
        console.log(e.key);
        if (!MVMT_KEYS.includes(e.key) || !currentTile.current || !board.currentRobot) return;
        if (e.key === " ") { // this is a robot change
            unsetSelected.current();

            let currRobotIndex = POSSIBLE_ROBOTS.indexOf(board.currentRobot);

            let nextIndex = (currRobotIndex + 1) % POSSIBLE_ROBOTS.length;
            let nextRobot = POSSIBLE_ROBOTS[nextIndex]
            let nextRobotPos = board.currentRobotPositions[nextRobot];

            board.setCurrentRobot(nextRobot)
            currentTile.current = board.tiles[nextRobotPos.x][nextRobotPos.y];

            console.log("current robot: ", board.currentRobot);
            console.log("current robot position: ", board.currentRobotPositions[board.currentRobot]);

            unsetSelected.current = () => {currentTile.current.setSelected(false)};
            currentTile.current.setSelected(true);
            rerender();
            return;
        }

        let dir = MVMT_KEY_DIR[e.key];
        unsetSelected.current();
        currentTile.current = board.moveRobot(currentTile.current.pos.x, currentTile.current.pos.y, dir);
        if (board.checkIfHasFoundTarget(currentTile.current.pos.x, currentTile.current.pos.y)) {
            unsetSelected.current();
            board.hasFoundTarget();
            rerender()
        }
        else {
            unsetSelected.current = () => {currentTile.current.setSelected(false)};
            currentTile.current.setSelected(true);
            rerender();
        }

    }

    const TileComponent = ({tile}) => {
        const handleClick = () => {
            if (tile.robot) { // clicked on a robot
                unsetSelected.current();
                tile.setSelected(true);
                board.setCurrentRobot(tile.robot);
                // board.currentRobotPositions[tile.robot] = tile.pos;
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
                    // board.setCurrentRobot(currentTile.current.robot);
                    // board.currentRobotPositions[tile.robot] = tile.pos;
                    if (board.checkIfHasFoundTarget(currentTile.current.pos.x, currentTile.current.pos.y)) {
                        board.hasFoundTarget();
                        unsetSelected.current();
                        rerender()
                    }
                    else {
                        unsetSelected.current = () => {currentTile.current.setSelected(false)};
                        currentTile.current.setSelected(true);
                        rerender();
                    }
                }
            }
            // else {
            //     currentTile.current = tile;
            // }
        }

        if (tile.centerTile) 
            return (
            <TileContainer>
                {(tile.pos.x === 7 && tile.pos.y === 7) && <CenterTile src={CenterTL} />}
                {(tile.pos.x === 7 && tile.pos.y === 8) && <CenterTile src={CenterTR} />}
                {(tile.pos.x === 8 && tile.pos.y === 7) && <CenterTile src={CenterBL} />}
                {(tile.pos.x === 8 && tile.pos.y === 8) && <CenterTile src={CenterBR} />}
            </TileContainer>
        )

        return (
            <TileContainer onClick={
                () => {
                    handleClick();
                }}>
                <TileBackground selected={tile.selected} color={tile.robot} src={TileImage} />
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
        <FlexBox>
            <Container>
                {board.tiles.map((row, i) => 
                    row.map((tile, index) => (
                        <TileComponent tile={tile} key={index} />
                    ))
                )}
            </Container>
            <GameControls board={board} rerender={rerender} unsetSelected={unsetSelected.current}/>
        </FlexBox>
    )
}

export default BoardComponent;