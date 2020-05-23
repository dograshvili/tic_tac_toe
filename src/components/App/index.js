import React from 'react';
import { StyleSheet, Text, Alert, View, BackHandler, Animated } from 'react-native';
import { ButtonGroup } from 'react-native-elements'
import Header from '../Header';
import Board from '../Board';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                over: false,
                winner: "none",
                player: {
                    name: "Guest",
                    sysName: "player",
                    symbol: "X"
                },
                com: {
                    name: "AI",
                    sysName: "ai",
                    symbol: "O"
                },
                board: [
                    ["","",""],
                    ["","",""],
                    ["","",""]
                ]
            },
            animations: {
                time: 500,
                header: new Animated.Value(0),
                board: new Animated.Value(0),
            }
        }
    }

    componentDidMount = () => {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.promtExitApp);
        this.startAnimations();
        console.log( this.state.game.board );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    updateState = state => this.setState(state)

    startAnimations = () => {
        const { animations } = this.state;
        Animated.sequence([
            Animated.timing(animations.header, {
                toValue: 1,
                duration: animations.time,
                useNativeDriver: true
            }),
            Animated.timing(animations.board, {
                toValue: 1,
                timing: animations.time,
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
        Alert.alert("", `You played on ${i},${j}`);
    }

    render() {
        const { animations } = this.state;
        return (
            <View style={Styles.container}>
                <Animated.View
                    style={[Styles.header, {opacity: animations.header}]}
                >
                    <Header
                        player={this.state.game.player}
                    />
                </Animated.View>
                <Animated.View
                    style={[Styles.containerBoard, {opacity: animations.board}]}
                >
                    <Board
                        board={this.state.game.board}
                        handlePlay={this.handlePlay}
                    />
                </Animated.View>
            </View>
        )
    }

}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#3D6DCC",
        padding: 10,
        borderRadius: 5
    },
    containerBoard: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
})