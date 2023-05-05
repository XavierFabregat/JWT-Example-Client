import React from 'react'
import { useRegisterMutation } from '../../graphql/hooks';
import { useNavigate } from 'react-router';
import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';
import './styles.css';


export const Register: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [register] = useRegisterMutation();

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log('form submitted');
        console.log('email', email);
        console.log('password', password);
        const response = await register({
            variables: {
                email,
                password
            }
        })
        console.log('response', response);
        navigate('/');
    }

    const isEmailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordInvalid = !password;

    return (
        <form onSubmit={handleRegister} className='register-form'>
            <FormControl id="email" isRequired isInvalid={isEmailInvalid} className='input-group'>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='user@email.com' width={"30%"} />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl id="password" isRequired isInvalid={isPasswordInvalid} className='input-group'>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' width={"30%"} />
            </FormControl>
            <Button type='submit' colorScheme='messenger'>Register</Button>
        </form>
    );
}