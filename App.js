
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Spells } from './src/pages/Spells';
import { SpellView } from './src/pages/Spells/spellView';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Spells" component={Spells} options = {{headerTitleAlign:'center' }}/>
        <Stack.Screen name="Spell View" component={SpellView} options = {{headerTitleAlign:'center' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

