import { FC, useState } from 'react';
import { AzureLogin } from '../../modules/authentication/azure-login';
import { LoadingSpinner } from '../../components/loading-spinner/loading-spinner';
import vitalityLogo from '../../assets/images/vitality-logo-large.svg'

import css from './login.module.css'

export const Login: FC = (): JSX.Element => {
    let azureLogin = new AzureLogin(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        isLoading ?
        <div className={css.container}>
            <LoadingSpinner />
        </div> :
        <div className={css.container}>
            <img src={vitalityLogo} className={css.image} />

            <div className={css.loginContainer}>
                <p className={css.loginText}>
                    Log in met jouw Inholland account om verder te gaan
                </p>
                <button onClick={ () => {
                    setIsLoading(true)
                    azureLogin.login().then(() => setIsLoading(false)).catch((error) => console.log(error))
                } } className={css.loginButton}>
                    Inloggen
                </button>
            </div>
        </div>
    )
}