const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');

describe("Message class", function() {
    //test 4
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        assert.throws(
            function() {
                new Message();
            },
            {
                message: 'Name required.'
            }
        );
    });

    //test 5
    it("constructor sets name", function() {
        let nameCheck = new Message('name');
        assert.strictEqual(nameCheck.name, 'name');
    });

    //test 6
    it("contains a commands array passed into the constructor as 2nd argument", function() {
        // Inside this test, you will have to create a commands array, fill it with some Command objects, and pass it into the Message constructor.
        let commandArray = [new Command ('MOVE', 50), new Command ('MODE_CHANGE', 'NORMAL')];
        let commandsCheck = new Message('name', commandArray);
        assert.strictEqual(commandsCheck.commands, commandArray);
    });
});