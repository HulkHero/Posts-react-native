import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NavBar = () => {
    return (
        <View style={styles.myState}>
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    myState: {
        marginTop: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignContent: 'center',
        // textAlign: 'center',
        color: 'blue',
        backgroundColor: 'green',
        // fontWeight: 'bold',


    }
})

export default NavBar