import "./global.css";
import { View } from 'react-native';
import AppNavigation from './navigation/appNavigation';

export default function App() {
  return (
    <View style={{flex:1}}>
    <AppNavigation />
    </View>
  );
}