import React from 'react';
import { Alert, View, BackHandler, Animated, Text, TouchableOpacity } from 'react-native';
import Header from '../Header';
import Board from '../Board';
import Styles from '../../styles/App';
import AI from '../../helpers/AI';
import { Lost, Won, Tie } from '../Info';

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
                winnerInfo = <Lost />;
            } else if (winner === "player") {
                winnerInfo = <Won />;
            } else {
                winnerInfo = <Tie />;
            }
        }
        return (
            <>
                <View style={Styles.container}>
                    <Animated.View
                        style={{
                            ...Styles.header,
                            opacity: this.state.animationHeader
                        }}
                    >
                        <Header
                            player={{
                                name: playerName
                            }}
                        />
                    </Animated.View>
                    <View>
                        <TouchableOpacity
                            onPress={this.gameRestart}
                        >
                            {winnerInfo}
                        </TouchableOpacity>
                    </View>
                    <Animated.View
                        style={{...Styles.containerBoard, opacity: this.animationBody}}
                    >
                        <Board
                            board={board}
                            handlePlay={this.handlePlay}
                        />
                    </Animated.View>
                </View>
            </>
        )
    }

}