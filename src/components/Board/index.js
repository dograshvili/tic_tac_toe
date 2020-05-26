import React from 'react';
import { ButtonGroup, TouchableOpacity } from 'react-native-elements'
import Styles from '../../styles/Board'

export default class Board extends React.Component {

    render() {
        const { board, handlePlay } = this.props;
        return (
            <>
                <ButtonGroup
                    onPress={i => handlePlay(0, i)}
                    buttons={[
                        board[0][0],
                        board[0][1],
                        board[0][2]
                    ]}
                    containerStyle={Styles.buttonGroup}
                    textStyle={Styles.buttonGroupText}
                />
                <ButtonGroup
                    onPress={i => handlePlay(1, i)}
                    buttons={[
                        board[1][0],
                        board[1][1],
                        board[1][2]
                    ]}
                    containerStyle={Styles.buttonGroup}
                    textStyle={Styles.buttonGroupText}
                />
                <ButtonGroup
                    onPress={i => handlePlay(2, i)}
                    buttons={[
                        board[2][0],
                        board[2][1],
                        board[2][2]
                    ]}
                    containerStyle={Styles.buttonGroup}
                    textStyle={Styles.buttonGroupText}
                />
            </>
        )
    }

}