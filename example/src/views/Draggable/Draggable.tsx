import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import React from 'react'
import { DragLayout } from '@zero-d/rn-components'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, SlideInLeft, FadeOutLeft, SequencedTransition, Layout, LightSpeedInLeft, LightSpeedOutRight, BounceOut } from 'react-native-reanimated'
import { Card } from 'react-native-paper'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { WaterfallGrid } from './WaterfallGridExample'

const Draggable = () => {

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const [list, setList] = React.useState([1, 2, 3, 4, 5, 6, 7, 9, 10, 11])

  const onCardPress = (index: number) => {
    setList(list.filter((_, i) => i != index))
  }

  return (
    <View style={{ flex: 1 }}>
      <DragLayout style={styles.ball} />
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="wobble"
        onPress={() => {
          rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(10, { duration: 100 }), 6, true),
            withTiming(0, { duration: 50 })
          );
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        data={list}
        numColumns={3}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Animated.View
            style={styles.card}
            entering={SlideInLeft.delay((index % 3) * 500)}
            exiting={BounceOut}
            layout={Layout.springify()}
          // layout={SequencedTransition.duration(1000)}
          >
            <TouchableNativeFeedback onPress={() => onCardPress(index)}>
              <Card>
                <Card.Title title="Card Title" subtitle={item} />
              </Card>
            </TouchableNativeFeedback>
          </Animated.View>
        )}

      />
    </View>
  )
}

export default Draggable

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: 'blue',
  },
  card: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000'
  }
})