import React from 'react';
import { Alert, View, BackHandler, Animated, Text } from 'react-native';
import Header from '../Header';
import Board from '../Board';
import Styles from '../../styles/App';
import AI from '../../helpers/AI';

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
        }
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
            setTimeout(this.aiMakemove, 100);
        }
    }

    updateState = state => this.setState(state)

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
                    <Text style={[Styles.textInfo, {color: 'crimson'}]}>
                       You Lost
                    </Text>
                );
            } else if (winner === "player") {
                winnerInfo = (
                    <Text style={[Styles.textInfo, {color: 'limegreen'}]}>
                       You Won
                    </Text>
                );
            } else {
                winnerInfo = (
                    <Text style={[Styles.textInfo, {color: 'palegoldenrod'}]}>
                       It's a Tie
                    </Text>
                );
            }
        }
        return (
            <View style={Styles.container}>
                <Animated.View
                    style={[Styles.header, {opacity: this.state.animationHeader}]}
                >
                    <Header
                        player={{
                            name: playerName
                        }}
                    />
                </Animated.View>
                <Animated.View
                    style={[Styles.containerBoard, {opacity: this.animationBody}]}
                >
                    {winnerInfo}
                    <Board
                        board={board}
                        handlePlay={this.handlePlay}
                    />
                </Animated.View>
            </View>
        )
    }

}