import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { NavigationStackScreenComponent } from 'react-navigation-stack'

const RefreshLayoutIndex: NavigationStackScreenComponent = ({ navigation }) => {

    return (
        <View>
            <Text style={styles.listItem} onPress={() => navigation.navigate('RefreshList')}>RefreshList</Text>
            <Text style={styles.listItem} onPress={() => navigation.navigate('TwoLevelDemo')}>TwoLevelDemo</Text>
            <Text style={styles.listItem} onPress={() => navigation.navigate('PureScrollMode')}>纯滚动模式</Text>
        </View>
    )
}

export default RefreshLayoutIndex

const styles = StyleSheet.create({
    listItem: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        fontSize: 28,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})
