import React from 'react'
import { MeDocument, MeQuery, useLoginMutation } from '../../graphql/hooks';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';
import { Input, FormControl, FormLabel, FormHelperText, Button } from "@chakra-ui/react"
import './styles.css'


export const Login: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [login] = useLoginMutation();

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log('form submitted');
        console.log('email', email);
        console.log('password', password);
        const response = await login({
            variables: {
                email,
                password
            },
            update: (store, { data }) => {
                if (!data) {
                    return null;
                }
                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: 'Query',
                        me: data.login.user
                    }
                })
            }
        })
        console.log('response', response);
        if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
        }
        navigate('/');
    };

    const isEmailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordInvalid = !password;

    return (
        <form onSubmit={handleLogin} className='login-form'>
            <FormControl id="email" isRequired isInvalid={isEmailInvalid} className='input-group'>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='user@email.com' width={"30%"} />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={isPasswordInvalid} className='input-group'>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' width={"30%"} />
            </FormControl>
            <Button type='submit' colorScheme='messenger'>Login</Button>
        </form>
    );
}