"use strict";
var restify = require("restify");
var Util_1 = require("../rest/Util");
var BackendController_1 = require("../controller/BackendController");
var Server = (function () {
    function Server(port) {
        Util_1.default.info("Server::<init>( " + port + " )");
        this.port = port;
    }
    Server.prototype.start = function () {
        var that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Util_1.default.info('Server::start() - start');
                that.rest = restify.createServer({
                    name: 'AgeCalculator'
                });
                that.rest.get('/.*/', restify.serveStatic({
                    directory: __dirname + "/views",
                    default: "index.html"
                }));
                that.rest.post('/calculate', Server.postCalculate);
                that.rest.listen(that.port, function () {
                    Util_1.default.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });
                that.rest.on('error', function (err) {
                    Util_1.default.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            }
            catch (err) {
                Util_1.default.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    };
    Server.postCalculate = function (req, res, next) {
        try {
            Server.backendController.calculateAge(req.body).then(function (response) {
                res.json(response.code, response.body);
                return next();
            }).catch(function (response) {
                res.send(Number(response.code), JSON.stringify(response.body));
                return next();
            });
        }
        catch (err) {
            res.json(400, { error: err.message });
            return next();
        }
    };
    return Server;
}());
Server.backendController = new BackendController_1.default();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
//# sourceMappingURL=Server.js.map