import Server from './Server';
import Log from './Util';

export class App {
    public initServer(port: number) {
        Log.info('App::initServer( ' + port + ' ) - start');

        let s = new Server(port);
        s.start().then(function (val: boolean) {
            Log.info("App::initServer() - started: " + val);
        }).catch(function (err: Error) {
            Log.error("App::initServer() - ERROR: " + err.message);
        });
    }
}

Log.info('App - starting');
let app = new App();
app.initServer(4300);
