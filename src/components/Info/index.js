import React from 'react';
import { View, Text } from 'react-native';
import Styles from '../../styles/Info';

const PlayAgain = () => (
    <Text style={Styles.txt2}>
        Tap to play again
    </Text>
);

const WinLoseTie = (props) => (
    <Text style={Styles.txt1}>
        {props.msg}
    </Text>
);

class Won extends React.Component {
    render() {
        return(
            <View style={Styles.container1Won}>
                <View style={Styles.container2}>
                    <WinLoseTie msg="You Win" />
                    <PlayAgain />
                </View>
            </View>
        )
    }
}

class Lost extends React.Component {
    render() {
        return(
            <View style={Styles.container1Lost}>
                <View style={Styles.container2}>
                    <WinLoseTie msg="You Lost" />
                    <PlayAgain />
                </View>
            </View>
        )
    }
}


class Tie extends React.Component {
    render() {
        return(
            <View style={Styles.container1Tie}>
                <View style={Styles.container2}>
                    <WinLoseTie msg="It's tie" />
                    <PlayAgain />
                </View>
            </View>
        )
    }
}

export { Won, Lost, Tie};