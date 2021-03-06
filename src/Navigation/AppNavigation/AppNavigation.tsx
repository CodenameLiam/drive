import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParams } from './AppNavigation.params';
import TabNavigation from 'Navigation/TabNavigation/TabNavigation';
import SubmitScreen from 'Screens/Submit/SubmitScreen';
import { useUser } from 'Context/AppContext';
import OnboardingScreen from 'Screens/OnboardingScreen/OnboardingScreen';
import Header from 'Components/Header/Header';
import TimelineScreen from 'Screens/Timeline/TimelineScreen';
import NotificationContextProvider from 'Context/NotificationContext';
import NoticesScreen from 'Screens/Notices/NoticesScreen';
import SettingsNavigation from 'Navigation/SettingsNavigation/SettingsNavigation';
import { AuthState } from 'Reducers/AuthReducer';
import VerifyScreen from 'Screens/Verify/VerifyScreen';

const getInitialRoute = (user: AuthState): keyof AppParams => {
	if (!user?.user?.emailVerified) {
		return 'Verify';
	} else if (!user.data) {
		return 'Onboarding';
	}
	return 'Tabs';
};

const AppStack = createNativeStackNavigator<AppParams>();

const AppNavigation: FC = () => {
	const [user] = useUser();
	const initialRoute = getInitialRoute(user);

	return (
		<NotificationContextProvider>
			<AppStack.Navigator
				screenOptions={{
					presentation: 'modal',
				}}
				initialRouteName={initialRoute}
			>
				<AppStack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} />
				<AppStack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
				<AppStack.Screen
					name="Tabs"
					component={TabNavigation}
					options={{
						headerShown: false,
					}}
				/>
				<AppStack.Screen
					name="Submit"
					component={SubmitScreen}
					options={{
						header: () => <Header title="Rego" back />,
					}}
				/>
				<AppStack.Screen
					name="Notices"
					component={NoticesScreen}
					options={{
						header: () => <Header title="Notices" back />,
					}}
				/>
				<AppStack.Screen
					name="Timeline"
					component={TimelineScreen}
					options={{
						header: () => <Header title="Timeline" back />,
					}}
				/>
				<AppStack.Screen
					name="SettingsNav"
					component={SettingsNavigation}
					options={{
						headerShown: false,
					}}
				/>
			</AppStack.Navigator>
		</NotificationContextProvider>
	);
};

export default AppNavigation;
