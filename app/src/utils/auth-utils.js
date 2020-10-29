// determine if we run in "production" (e.g. not  locally)
const production = process.env.isProd; 
// when running locally, replace the Functions API endpoint to localhost 
const localAPI = 'http://localhost:7071/api';
const API = process.env.API || production ? '/api' : localAPI;



export async function getUserInfo() {
    
    // FIXME: test authentication locally. 
    // We may want to simulate login/logout (cookies?) and different roles
    if (!production) {
        return await getUserInfo_local_test()
    }

    try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
    } catch (error) {
        console.error('No profile could be found at /.auth/me -> not logged in');
        return undefined;
    }
}

async function getUserInfo_local_test() {
    return {
    "identityProvider": "github",
    "userId": "xxxxxxxxxx",
    "userDetails": "TestUser",
    "userRoles": [
      "anonymous",
      "authenticated"
    ]
  }
}

export default {
    getUserInfo, API
}

//export { getUserInfo, API };