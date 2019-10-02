import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Name, Avatar } from './styles';

import api from '~/services/api';

export default function SelectProvider({ navigation }) {
	const [providers, setProviders] = useState([]);

	useEffect(() => {
		async function loadProviders() {
			const response = await api.get('providers');

			setProviders(response.data);
		}

		loadProviders();
	}, []);

	return (
		<Background>
			<Container>
				<ProvidersList
					data={providers}
					keyExtractor={provider => String(provider.id)}
					renderItem={({ item: provider }) => (
						<Provider
							onPress={() =>
								navigation.navigate('SelectDateTime', {
									provider,
								})
							}
						>
							<Avatar
								source={{
									uri: provider.avatar_url
										? provider.avatar_url
										: `https://api.adorable.io/avatar/50/${provider.name}.png`,
								}}
							/>

							<Name>{provider.name}</Name>
						</Provider>
					)}
				/>
			</Container>
		</Background>
	);
}

SelectProvider.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};

SelectProvider.navigationOptions = ({ navigation }) => ({
	title: 'Selecione o Prestador',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Dashboard');
			}}
		>
			<Icon name="chevron-left" size={20} color="#FFF" />
		</TouchableOpacity>
	),
});
