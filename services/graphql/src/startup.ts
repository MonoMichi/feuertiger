(async () => {
    // eslint-disable-next-line global-require
    const firebase = require('firebase-admin');
    // eslint-disable-next-line global-require
    const { firebaseAdminConfig, graphqlUri } = require('@feuertiger/config');
    try {
        await firebase.initializeApp(firebaseAdminConfig);
        // eslint-disable-next-line global-require
        require('./server')
            .gqlServer()
            .listen({ port: 4000 }, () =>
                // eslint-disable-next-line no-console
                console.log(`🚀 Server ready at ${graphqlUri}`)
            );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error: ', error);
    }
})();
