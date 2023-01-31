import { View } from 'react-native'
import React from 'react'
import { Text, Button, useTheme } from 'react-native-paper'

const Network = (props) => {
    const theme = useTheme();


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text variant='titleSmall' >No Internet Connection</Text>
            <Button mode='outlined' style={{ borderColor: theme.colors.primary, color: theme.colors.primary, margin: 10 }} onPress={() => props.ToggleNetwork()} >Refresh</Button>

        </View>
    )
}

export default Network