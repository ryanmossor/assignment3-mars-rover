const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');
const Rover = require('../rover.js');

describe("Rover class", function() {
    //test 7
    it("constructor sets position and default values for mode and generatorWatts", function() {
        let rover = new Rover(50);
        assert.deepStrictEqual([rover.position, rover.mode, rover.generatorWatts], [50, 'NORMAL', 110]);
    });

    //test 8
    it("response returned by receiveMessage contains name of message", function() {
        let commands = [new Command ('FIRST COMMAND', 'FIRST VALUE'), new Command ('SECOND COMMAND', 'SECOND VALUE')];
        let message = new Message('TEST MESSAGE', commands);
        let rover = new Rover();
        let response = rover.receiveMessage(message);
        assert.strictEqual(response.message, 'TEST MESSAGE');
    });

    //test 9
    it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
        let commands = [new Command ('STATUS_CHECK'), new Command ('MODE_CHANGE', 'LOW_POWER')];
        let message = new Message('Check status then change mode', commands);
        let rover = new Rover();
        let response = rover.receiveMessage(message);
        assert.strictEqual(response.results.length, 2);
    });

    //test 10
    it("responds correctly to status check command", function() {
        let commands = [new Command ('STATUS_CHECK')];
        let message = new Message('Check status', commands);
        let rover = new Rover(87382098);
        let response = rover.receiveMessage(message);
        assert.deepStrictEqual(response.results, [{completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 87382098}}]);
    });

    //test 11
    it("responds correctly to mode change command", function() {
        let commands = [new Command ('MODE_CHANGE', 'LOW_POWER')];
        let message = new Message('Mode change', commands);
        let rover = new Rover();
        let response = rover.receiveMessage(message);
        assert.deepStrictEqual(response.results, [{completed: true}]);
        assert.strictEqual(rover.mode, commands[0].value);
    });

    //test 12
    it("responds with  false complete value when attempting to move in LOW_POWER mode", function() {
        let commands = [new Command ('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 500)];
        let message = new Message('Mode change then move', commands);
        let rover = new Rover(100);
        let response = rover.receiveMessage(message);
        assert.deepStrictEqual(response.results[1], {completed: false});
        assert.strictEqual(rover.position, 100);
    });

    //test 13
    it("responds with position for move command", function() {
        let commands = [new Command('MOVE', 500)];
        let message = new Message('Move', commands);
        let rover = new Rover(100);
        rover.receiveMessage(message);
        assert.strictEqual(rover.position, 500);
    });

    //test 14
    it("completed false and a message for an unknown command", function() {
        let commands = [new Command('TEST')];
        let message = new Message('Test', commands);
        let rover = new Rover();
        let response = rover.receiveMessage(message);
        assert.deepStrictEqual(response.results, [{completed: false, message: 'unknown command'}]);
    });
});