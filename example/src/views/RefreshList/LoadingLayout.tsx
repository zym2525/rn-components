import { ScrollView } from 'react-native'
import React from 'react'
import { ListEmptyHint, ErrorHint, NoData, SmartRefreshLayout } from '@zero-d/rn-components'
import { Divider } from 'react-native-paper'

const LoadingLayout = () => {
    return (
        <ScrollView
            refreshControl={<SmartRefreshLayout enablePureScrollMode />}
        >
            <ListEmptyHint />
            <Divider />
            <ErrorHint />
            <Divider />
            <NoData />
        </ScrollView>
    )
}

export default LoadingLayout
