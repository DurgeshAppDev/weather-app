import { View, Image, Text,Dimensions,TextInput } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

const { width, height } = Dimensions.get('screen');

export default function HomeScreen() {
  return (
    <View className="flex-1 relative">
        <StatusBar style="light"/>
        
        <Image 
          blurRadius={70} 
          source={require('../assets/images/bg.png')}
          style={{
            position: 'absolute',
            width: width,
            height: height,
          }}
          resizeMode="cover" 
        />
        
         <SafeAreaView style={{ flex: 1 }}>
        
        {/* Wrapper */}
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 16,
            width: '100%',
          }}
        >

          {/* Search Box */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 48,                // ✅ IMPORTANT (fixes invisibility)
              borderRadius: 50,
              backgroundColor: 'rgba(255,255,255,0.2)', // ✅ visible glass effect
              width: '100%',
            }}
          >
            <TextInput
              placeholder="Search City"
              placeholderTextColor="lightgray"
              style={{
                flex: 1,
                paddingHorizontal: 16,
                color: 'white',
                fontSize: 16,
              }}
            />
          </View>

        </View>

      </SafeAreaView>
    </View>
  )
}