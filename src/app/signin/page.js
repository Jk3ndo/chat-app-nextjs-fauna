'use client';

import { useFormState } from 'react-dom';
import { doSignin } from '../actions';

const initialState =  {
    message: '',
}

export default function SigninPage() {
    const [state, formAction] = useFormState(doSignin, initialState);

    return (
        <div>
            <h1>Page de Login</h1>
            <form action={formAction}>
                <input type="text" placeholder="Email" name='email' />
                <input type="password" placeholder="Password" name='password' />
                <button type="submit">Se Connecter</button>
            </form>
            {state.message && <p>{state.message}</p>}
        </div>
    )
}