import { View, Image, Text,Dimensions,TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('screen');

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
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
              height: 48,              
              borderRadius: 50,
              backgroundColor: showSearch? theme.bgWhite(0.2): 'transparent',
              width: '100%',
            }}
          >
            {
              showSearch?(
                <TextInput
              placeholder="Search City"
              placeholderTextColor="lightgray"
              style={{
                flex: 1,
                paddingHorizontal: 16,
                color: 'white',
                fontSize: 16,
              }} />
              )
              :null
            }
            <TouchableOpacity 
            onPress={toggleSearch(!showSearch)}
            style={{backgroundColor: theme.bgWhite(0.3)}}
            className='rounded-full p-3 m-1'
            >
           <MagnifyingGlassIcon size='25' color='white' />
            </TouchableOpacity>
            
          </View>

        </View>

      </SafeAreaView>
    </View>
  )
}