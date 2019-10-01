import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';
import {
	Container,
	Form,
	Title,
	FormInput,
	SubmitButton,
	Logout,
	Separator,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);

	const emailRef = useRef();
	const oldPasswordRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const [name, setName] = useState(profile.name);
	const [email, setEmail] = useState(profile.email);
	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		setOldPassword('');
		setPassword('');
		setConfirmPassword('');
	}, [profile]);

	function handleSubmit() {
		const data = {
			name,
			email,
			oldPassword,
			password,
			confirmPassword,
		};

		dispatch(updateProfileRequest(data));
	}

	function handleLogout() {
		dispatch(signOut());
	}

	return (
		<Background>
			<Container>
				<Title>Meu Perfil</Title>
				<Form>
					<FormInput
						icon="person-outline"
						autoCorrect={false}
						placeholder="Nome completo"
						returnKeyType="next"
						onSubmitEditing={() => emailRef.current.focus()}
						value={name}
						onChangeText={setName}
					/>

					<FormInput
						icon="mail-outline"
						keyboardType="email-address"
						autoCorrect={false}
						autoCapitalize="none"
						placeholder="Digite seu e-mail"
						ref={emailRef}
						returnKeyType="next"
						onSubmitEditing={() => oldPasswordRef.current.focus()}
						value={email}
						onChangeText={setEmail}
					/>

					<Separator />

					<FormInput
						icon="lock-outline"
						secureTextEntry
						placeholder="Digite sua senha atual"
						ref={oldPasswordRef}
						value={oldPassword}
						onChangeText={setOldPassword}
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current.focus()}
					/>

					<FormInput
						icon="lock-outline"
						secureTextEntry
						placeholder="Digite uma nova senha"
						ref={passwordRef}
						value={password}
						onChangeText={setPassword}
						returnKeyType="next"
						onSubmitEditing={() =>
							confirmPasswordRef.current.focus()
						}
					/>

					<FormInput
						icon="lock-outline"
						secureTextEntry
						placeholder="Confirme sua senha"
						ref={confirmPasswordRef}
						returnKeyType="send"
						onSubmitEditing={handleSubmit}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>

					<SubmitButton onPress={handleSubmit}>
						Atualizar Perfil
					</SubmitButton>

					<Logout onPress={handleLogout}>Sair do GoBarber</Logout>
				</Form>
			</Container>
		</Background>
	);
}
