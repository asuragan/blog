import createAuth0Client from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from '$lib/stores';
import config from '$lib/config/auth_config';

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    loginWithPopup,
    logout
};

export default auth;
