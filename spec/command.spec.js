const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {
    //test 1
    it("throws error if a command type is NOT passed into constructor as the first parameter", function() {
        assert.throws(
            function() {
                new Command();
            },
            {
                message: 'Command type required.'
            }
        );
    });

    //test 2
    it("constructor sets command type", function() {
        let commandCheck = new Command('command');
        assert.strictEqual(commandCheck.commandType, 'command');
    });

    //test 3
    it("constructor sets a value passed in as the 2nd argument", function() {
        let valueCheck = new Command('command', 130);
        assert.strictEqual(valueCheck.value, 130);
    });
});