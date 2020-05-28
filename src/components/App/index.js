import React from 'react';
import { Alert, View, BackHandler, Animated, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../Header';
import Board from '../Board';
import Styles from '../../styles/App';
import AI from '../../helpers/AI';
import INIT_STATE from '../../helpers/General';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        // TODO: Change the state object (make it more complex)
        this.state = {
            isGameOver: false,
            winner: "none",
            playerName: "Guest",
            playerSymbol: "O",
            aiName: "AI",
            aiSymbol: "X",
            currentPlayer: "player",
            board: [["","",""],["","",""],["","",""]],
            animationTime: 500,
            animationHeader: new Animated.Value(0),
            animationBody: new Animated.Value(0)
        };
    }

    componentDidMount = () => {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.promtExitApp);
        this.startAnimations();
    }

    componentWillUnmount = () => {
        this.backHandler.remove();
    }

    componentDidUpdate = () => {
        const { isGameOver, currentPlayer } = this.state;
        if (!isGameOver && currentPlayer === "ai" && this.blMovesLeft()) {
            setTimeout(this.aiMakemove, 1);
        }
    }

    updateState = state => this.setState(state)

    gameRestart = () => {
        this.updateState({
            isGameOver: false,
            winner: "none",
            playerName: "Guest",
            playerSymbol: "O",
            aiName: "AI",
            aiSymbol: "X",
            currentPlayer: "player",
            board: [["","",""],["","",""],["","",""]],
            animationTime: 500
        });
    }

    startAnimations = () => {
        Animated.sequence([
            Animated.timing(this.state.animationHeader, {
                toValue: 1,
                duration: this.state.animationTime,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animationBody, {
                toValue: 1,
                timing: this.state.animationTime,
                useNativeDriver: true
            })
        ]).start();
    }

    promtExitApp = () => {
        Alert.alert("", "Έξοδος από την εφαρμογή?",  [{
            text: "ΟΧΙ",
            onPress: () => null,
            style: "cancel"
        },{
            text: "ΝΑΙ",
            onPress: () => BackHandler.exitApp()
        }]);
        return true;
    };

    blMovesLeft = () => {
        return (AI.Convert2DT1D(this.state.board).filter(s => s != "O" && s != "X")).length ? true : false;
    }

    blValidPad = (i, j) => {
        return !this.state.board[i][j] ? true: false;
    }

    aiMakemove = () => {
        const { board, playerSymbol, aiSymbol } = this.state;
        let move = AI.BestMove(board, aiSymbol, playerSymbol, aiSymbol);
        this.handlePlay(move.i, move.j);
    }

    handlePlay = (i, j) => {
        const { isGameOver, board, currentPlayer, playerSymbol, aiSymbol } = this.state;
        if (!isGameOver && !board[i][j] && this.blMovesLeft()) {
            let nextPlayer = currentPlayer === "player" ? "ai" : "player";
            board[i][j] = currentPlayer === "player" ? playerSymbol : aiSymbol;
            this.updateState({
                currentPlayer: nextPlayer,
                board: board
            });
            if (!this.blMovesLeft()) {
                this.updateState({
                    isGameOver: true
                });
            }
            if (AI.Winner(AI.Convert2DT1D(board), playerSymbol)) {
                this.updateState({
                    isGameOver: true,
                    winner: "player"
                });
            } else if (AI.Winner(AI.Convert2DT1D(board), aiSymbol)) {
                this.updateState({
                    isGameOver: true,
                    winner: "ai"
                });
            }
        }
    }


    render() {
        const { playerName, board, isGameOver, winner } = this.state;
        let winnerInfo = <></>;
        if (isGameOver) {
            if (winner === "ai") {
                winnerInfo = (
                    <View style={{
                        marginTop: 20,
                        alignItems: "center"
                    }}>
                        <Text style={[Styles.textInfo, {color: 'crimson'}]}>
                        You Lost
                        </Text>
                        <Text style={{
                            marginTop: 5,
                            fontSize: 25
                        }}>
                            Tap to Restart
                        </Text>
                    </View>
                );
            } else if (winner === "player") {
                winnerInfo = (
                    <View style={{
                        marginTop: 20,
                        alignItems: "center"
                    }}>
                        <Text style={[Styles.textInfo, {color: 'limegreen'}]}>
                            You Won
                        </Text>
                        <Text style={{
                            marginTop: 5,
                            fontSize: 25
                        }}>
                            Tap to Restart
                        </Text>
                    </View>
                );
            } else {
                winnerInfo = (
                    <View style={{
                        marginTop: 20,
                        alignItems: "center"
                    }}>
                        <Text style={[Styles.textInfo, {color: 'palegoldenrod'}]}>
                            It's a Tie
                        </Text>
                        <Text style={{
                            marginTop: 5,
                            fontSize: 25
                        }}>
                            Tap to Restart
                        </Text>
                    </View>
                );
            }
        }
        return (
            <>
                <View style={Styles.container}>
                    <Animated.View
                        style={[{
                            minHeigh: "20%",
                            maxHeigh: "20%",
                        }, Styles.header, {opacity: this.state.animationHeader}]}
                    >
                        <Header
                            player={{
                                name: playerName
                            }}
                        />
                    </Animated.View>
                    <View style={{
                        minHeigh: "20%",
                        maxHeigh: "20%",
                        justifyContent: "center"
                    }}>
                        <TouchableOpacity
                            onPress={this.gameRestart}
                        >
                            {winnerInfo}
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={[{
                            minHeigh: "60%",
                            maxHeigh: "60%",
                        }, Styles.containerBoard, {opacity: this.animationBody}]}
                    >
                        <Board
                            board={board}
                            handlePlay={this.handlePlay}
                        />
                    </Animated.View>
                </View>


                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isGameOver}
                    >
                    <View style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center"
                    }}>
                        <View style={{
                            margin: 20,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                            width: 0,
                            height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5
                        }}>
                            <Button
                                title="Rematch"
                                type="outline"
                                style={{
                                    width: "80%"
                                }}
                            />
                        </View>
                    </View>
                </Modal> */}
            </>
        )
    }

}