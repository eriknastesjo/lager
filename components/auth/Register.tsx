import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './Authfields';

export default function Register({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    console.log("SETITLOGGED IN: ");
    console.log(setIsLoggedIn);

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
            // setIsLoggedIn(true);
            navigation.navigate("Login");
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera dig"
            navigation={navigation}
        />
    );
};