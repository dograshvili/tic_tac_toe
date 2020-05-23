import React from 'react';
import { ButtonGroup } from 'react-native-elements'
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
                        board[0][0],
                        board[0][0]
                    ]}
                    containerStyle={Styles.buttonGroup}
                    textStyle={Styles.buttonGroupText}
                />
                <ButtonGroup
                    onPress={i => handlePlay(1, i)}
                    buttons={[board[0][0],
                        board[0][0],
                        board[0][0]
                    ]}
                    containerStyle={Styles.buttonGroup}
                    textStyle={Styles.buttonGroupText}
                />
                <ButtonGroup
                    onPress={i => handlePlay(2, i)}
                    buttons={[board[0][0],
                        board[0][0],
                        board[0][0]
                    ]}
                    containerStyle={Styles.buttonGroup}
                    textStyle={Styles.buttonGroupText}
                />
            </>
        )
    }

}