import restify = require('restify');
import Log from "../rest/Util";
import {BackendResponse, Birthday, Age} from "../controller/BackendController";
import BackendController from "../controller/BackendController";

export default class Server {
    private port: number;
    private rest: restify.Server;
    private static backendController = new BackendController();

    constructor(port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.port = port;
    }

    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                that.rest = restify.createServer({
                    name: 'AgeCalculator'
                });

                that.rest.get('/.*/', restify.serveStatic({
                    directory: __dirname + "/views",
                    default: "index.html"
                }));

                that.rest.post('/calculate', Server.postCalculate);                
                
                that.rest.listen(that.port, function () {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });

                that.rest.on('error', function (err: string) {
                    Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }

    public static postCalculate(req: restify.Request, res: restify.Response, next: restify.Next) {
        try {
            Server.backendController.calculateAge(req.body).then(function (response: any) {
                res.json(response.code, response.body);
                return next();
            }).catch(function (response: any) {
                res.send(Number(response.code), JSON.stringify(response.body));
                return next();
            })
        } catch (err) {
            res.json(400, {error: err.message});
            return next();
        }
    }
}
