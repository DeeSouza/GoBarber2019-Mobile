import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, HourList, Hour, Title } from './styles';

import api from '~/services/api';

export default function SelectDateTime({ navigation }) {
	const [date, setDate] = useState(new Date());
	const [hours, setHours] = useState([]);
	const provider = navigation.getParam('provider');

	useEffect(() => {
		async function loadAvailable() {
			const response = await api.get(
				`providers/${provider.id}/availables`,
				{
					params: {
						date: date.getTime(),
					},
				},
			);

			setHours(response.data);
		}

		loadAvailable();
	}, [date, provider.id]);

	function handleSelectHour(time) {
		navigation.navigate('Confirm', {
			provider,
			time,
		});
	}

	return (
		<Background>
			<Container>
				<DateInput date={date} onChange={setDate} />

				<HourList
					data={hours}
					keyExtractor={item => item.time}
					renderItem={({ item }) => (
						<Hour
							onPress={() => handleSelectHour(item.value)}
							enabled={item.available}
						>
							<Title>{item.time}</Title>
						</Hour>
					)}
				/>
			</Container>
		</Background>
	);
}

SelectDateTime.propTypes = {
	navigation: PropTypes.shape({
		getParam: PropTypes.func.isRequired,
		navigate: PropTypes.func,
	}).isRequired,
};

SelectDateTime.navigationOptions = ({ navigation }) => ({
	title: 'Selecione o Horário',
	headerLeft: () => (
		<TouchableOpacity
			onPress={() => {
				navigation.goBack();
			}}
		>
			<Icon name="chevron-left" size={20} color="#FFF" />
		</TouchableOpacity>
	),
});
