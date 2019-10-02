import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

export default (isSigned = false) =>
	createAppContainer(
		createSwitchNavigator(
			{
				Sign: createSwitchNavigator({
					SignIn,
					SignUp,
				}),
				App: createBottomTabNavigator(
					{
						Dashboard: {
							screen: Dashboard,
							navigationOptions: {
								tabBarLabel: 'Agendamentos',
								tabBarIcon: ({ tintColor }) => (
									<Icon
										name="event"
										size={20}
										color={tintColor}
									/>
								),
							},
						},
						New: {
							screen: createStackNavigator(
								{
									SelectProvider,
									SelectDateTime,
									Confirm,
								},
								{
									defaultNavigationOptions: {
										headerTransparent: true,
										headerTintColor: '#FFF',
										headerLeftContainerStyle: {
											marginLeft: 20,
										},
									},
								},
							),
							navigationOptions: {
								tabBarVisible: false,
								tabBarLabel: 'Agendar',
								tabBarIcon: ({ tintColor }) => (
									<Icon
										name="add-circle-outline"
										size={20}
										color={tintColor}
									/>
								),
							},
						},
						Profile: {
							screen: Profile,
							navigationOptions: {
								tabBarLabel: 'Meu Perfil',
								tabBarIcon: ({ tintColor }) => (
									<Icon
										name="person"
										size={20}
										color={tintColor}
									/>
								),
							},
						},
					},
					{
						tabBarOptions: {
							keyboardHidesTabBar: true,
							activeTintColor: '#FFFFFF',
							showIcon: true,
							showLabel: true,
							style: {
								backgroundColor: '#8d41a8',
								borderTopColor: '#8d41a8',
							},
							inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
						},
					},
				),
			},
			{
				initialRouteName: isSigned ? 'App' : 'Sign',
			},
		),
	);
