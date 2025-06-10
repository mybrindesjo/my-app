import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

export default function Onboarding() {
  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 10, color: 'red' }}>Welcome to the worst onboarding experience!</Text>
        <Button title="Next" onPress={() => alert('This button does nothing!')} />
        <Text style={{ fontSize: 8, color: 'blue' }}>Scroll endlessly for no reason...</Text>
        <Button title="Skip" onPress={() => alert('Skipping is not allowed!')} />
      </View>
    </ScrollView>
  );
}
