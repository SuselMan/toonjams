import express from 'express';

import user from './api/user';

class Routes {
    constructor(app: any) {
        if(!app) throw new Error('Express app must be provided');
		// TODO: add this ignote to config
        // @ts-ignore
        app.use(express.static(global.fronendRoot));
        app.use('/api/user', user);

        app.get('/favicon.ico', (req: any, res: any) => {
            // @ts-ignore
            res.sendFile(global.appRoot); // load our public/index.html file
        });
        //
        app.get('*', function(req: any, res: any) {
            // @ts-ignore
            res.sendFile(global.fronendRoot + '/index.html');
        });
    }
}

export default Routes;