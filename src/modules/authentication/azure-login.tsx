import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../config';
import React, { Component, useState } from 'react';
//import { VitalityAPI } from '../../api/vitality-api';

interface State {
    error: any,
    isAuthenticated: boolean,
    user: any
}

export class AzureLogin extends Component<{}, State> {
    private publicClientApplication: PublicClientApplication
    //private vitalityAPI = new VitalityAPI()

    constructor(props: any) {
        super(props)
        this.state = {
            error: null,
            isAuthenticated: false,
            user: {}
        }
        this.login = this.login.bind(this)
        this.publicClientApplication = new PublicClientApplication({
            auth: {
                clientId: config.appId,
                redirectUri: config.redirectUri,
                authority: config.authority
            }
        })
    }

    async login() {
        try {
            let email: string | undefined
            let azureId: string | undefined

            await this.publicClientApplication.acquireTokenPopup({
                scopes: config.scopes,
                prompt: "select_account"
            }).then(function(accessTokenResponse) {
                email = accessTokenResponse.account?.username
                azureId = accessTokenResponse.account?.localAccountId
            })

            if (email !== null && azureId !== null) {
                //await this.vitalityAPI.login(email!, azureId!)
                window.location.reload()
            }

            this.setState({ isAuthenticated: true })
        } catch (error) {
            this.setState({
                isAuthenticated: false,
                user: {},
                error: error
            })
        }
    }

    logout() {
        this.publicClientApplication.logout()
    }

    // render() {
    //     if (this.state.isAuthenticated) {
    //         return (
    //             <div>
    //                 <button onClick={ () => this.logout() }>Logout</button>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div>
    //                 <button onClick={ () => this.login() }>Login</button>
    //             </div>
    //         )
    //     }
    // }
}