import React from 'react';
import { StyleSheet, Text, Alert, View, BackHandler, Animated } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import Header from '../Header';
import Board from '../Board';
import Styles from '../../styles/App';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        // TODO: Change the state object (make it more complex)
        this.state = {
            over: false,
            winner: "none",
            playerName: "Guest",
            playerSymbol: "X",
            aiName: "AI",
            aiSymbol: "O",
            currentPlayer: "player",
            board: [
                ["","",""],
                ["","",""],
                ["","",""]
            ],
            animationTime: 500,
            animationHeader: new Animated.Value(0),
            animationBody: new Animated.Value(0)
        }
    }

    componentDidMount = () => {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.promtExitApp);
        this.startAnimations();
    }

    componentWillUnmount() {
        this.backHandler.remove();
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

    handlePlay = (i, j) => {
        // const { game } = this.state;
        // const { board, currentPlayer, nextToPlay } = game;
        // if (!board[i][j]) {
        //     let nextPlayer = nextToPlay[currentPlayer];
        //     let symbol = game[currentPlayer]['symbol'];
        //     board[i][j] = symbol;
        //     this.updateState({
        //         game: {
        //             currentPlayer: nextPlayer,
        //             board: board
        //         }
        //     })
        // }
    }

    render() {
        return (
            <View style={Styles.container}>
                <Animated.View
                    style={[Styles.header, {opacity: this.state.animationHeader}]}
                >
                    <Header
                        player={{
                            name: this.state.playerName
                        }}
                    />
                </Animated.View>
                <Animated.View
                    style={[Styles.containerBoard, {opacity: this.animationBody}]}
                >
                    <Board
                        board={this.state.board}
                        handlePlay={this.handlePlay}
                    />
                </Animated.View>
            </View>
        )
    }

}