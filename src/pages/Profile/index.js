import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

export default function Profile() {
	return <Background />;
}

const TabIcon = ({ tintColor }) => (
	<Icon name="event" size={20} color={tintColor} />
);

TabIcon.propTypes = {
	tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
	tabBarLabel: 'Meu Perfil',
	tarBarIcon: TabIcon,
};
