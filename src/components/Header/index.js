import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../../styles/Header'

export default class Header extends React.Component {

    render() {
        const { player } = this.props;
        return (
            <View>
                <Text style={Styles.txt1}>
                    Welcome
                    <Text style={Styles.txt2}>
                        {`  ${player.name}`}
                    </Text>
                </Text>
            </View>
        )
    }

}