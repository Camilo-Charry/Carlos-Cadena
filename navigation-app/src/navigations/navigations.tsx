import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from '../screen/homeScreen';
import DetailsScreen from '../screen/detailsScreen';
import SettingScreen from '../screen/setting';
import StacksScreen from '../screen/stacksScreen';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
    const insets = useSafeAreaInsets();
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;
                    
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Details':
                            iconName = focused ? 'document-text' : 'document-text-outline';
                            break;
                        case 'Stacks':
                            iconName = focused ? 'layers' : 'layers-outline';
                            break;
                        case 'Settings':
                            iconName = focused ? 'settings' : 'settings-outline';
                            break;
                        default:
                            iconName = 'help-outline';
                    }
                    
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5EA',
                    paddingTop: 8,
                    paddingBottom: Math.max(insets.bottom, 10), // Usa el safe area o mínimo 10px
                    height: 60 + Math.max(insets.bottom, 10), // Altura base + safe area
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 2,
                    marginBottom: 2,
                },
                tabBarIconStyle: {
                    marginTop: 2,
                },
                headerShown: false,
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Inicio',
                }}
            />
            <Tab.Screen 
                name="Details" 
                component={DetailsScreen}
                options={{
                    tabBarLabel: 'Detalles',
                }}
            />
            <Tab.Screen 
                name="Stacks" 
                component={StacksScreen}
                options={{
                    tabBarLabel: 'Pilas',
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={SettingScreen}
                options={{
                    tabBarLabel: 'Ajustes',
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}