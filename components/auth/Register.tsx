import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './Authfields';
import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    console.log("SETITLOGGED IN: ");
    console.log(setIsLoggedIn);

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            if (result.type === "success") {
                navigation.navigate("Login");
            }

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
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