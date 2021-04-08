import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { SmartRefreshLayout, Text } from '@zero-d/rn-components'

interface Props {

}

const PureScrollMode = (props: Props) => {
    return (

        <ScrollView
            refreshControl={<SmartRefreshLayout enablePureScrollMode />}
        >
            <Text style={{ fontSize: 40, textAlign: 'center', marginTop: 200 }}>纯滚动模式</Text>
        </ScrollView>
    )
}

export default PureScrollMode

const styles = StyleSheet.create({})
