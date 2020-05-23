/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, Animated, View} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import Styles from './src/styles/App'
class RApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            animations: {
                time: 2000,
                image: new Animated.Value(0)
            }
        }
    }

    componentDidMount = () => {
        const { animations } = this.state;
        Animated.timing(animations.image, {
            toValue: 1,
            duration: animations.time,
            useNativeDriver: true
        }).start(() => this.setState({
            isLoading: false
        }));
    }

    render() {
        const { animations } = this.state;
        if (this.state.isLoading) {
            return (
                <View style={Styles.container}>
                    <Animated.Image
                        style={[Styles.img, {opacity: animations.image}]}
                        source={require("./src/assets/images/game_start.png")}
                        resizeMode="stretch"
                    >
                    </Animated.Image>
                </View>
            )
        } else {
            return <App />
        }
    }

}

AppRegistry.registerComponent(appName, () => RApp);
