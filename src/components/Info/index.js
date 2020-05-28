import React from 'react';
import { Alert, View, BackHandler, Animated, Text, TouchableOpacity } from 'react-native';

class Won extends React.Component {
    render() {
        return(
            <View style={{
                alignItems: "center",
                backgroundColor: "#1BA39C",
            }}>
                <View style={{
                    paddingVertical: 20,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 40,
                        color: "white"
                    }}>
                    You Win
                    </Text>
                    <Text style={{
                        color: "white",
                        marginTop: 5,
                        fontSize: 25
                    }}>
                        Tap to play again
                    </Text>
                </View>
            </View>
        )
    }
}

class Lost extends React.Component {
    render() {
        return(
            <View style={{
                alignItems: "center",
                backgroundColor: "#E7505A",
            }}>
                <View style={{
                    paddingVertical: 20,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 40,
                        color: "white"
                    }}>
                    You Lost
                    </Text>
                    <Text style={{
                        color: "white",
                        marginTop: 5,
                        fontSize: 25
                    }}>
                        Tap to play again
                    </Text>
                </View>
            </View>
        )
    }
}


class Tie extends React.Component {
    render() {
        return(
            <View style={{
                alignItems: "center",
                backgroundColor: "#E87E04",
            }}>
                <View style={{
                    paddingVertical: 20,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 40,
                        color: "white"
                    }}>
                    It's tie
                    </Text>
                    <Text style={{
                        color: "white",
                        marginTop: 5,
                        fontSize: 25
                    }}>
                        Tap to play again
                    </Text>
                </View>
            </View>
        )
    }
}

export { Won, Lost, Tie};