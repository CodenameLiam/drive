import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colours from 'Theme/Colours';
import { BodyFont } from 'Theme/Fonts';
import * as Styles from './Button.styles';

interface ButtonProps extends TouchableOpacityProps {
	text: string;
	fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({ text, fullWidth, ...rest }) => {
	return (
		<Styles.Base fullWidth={fullWidth} {...rest}>
			<LinearGradient
				style={[StyleSheet.absoluteFill]}
				colors={[Colours.blue, Colours.green]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			/>
			<BodyFont colour={Colours.white}>{text}</BodyFont>
		</Styles.Base>
	);
};

export default Button;
