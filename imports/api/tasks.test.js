import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";
import {assert} from "meteor/practicalmeteor:chai";

import {Tasks} from "./tasks.js";

if(Meteor.isServer) {
    describe("Tasks", () => {
        describe("methods", () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: "test task",
                    createdAt: new Date(),
                    owner: userId,
                    username: "tmeasday",
                    // I assume this string is important and not just a random username, but if it is random, let me know and I'll change it.

                    // I mean, if you're reading this, I assume you wouldn't mind.

                    // I guess more importantly, if anyone is reading this to learn from it, please let me know so I properly document my files.

                    // Don't look at me like that, I know what the files do, I don't need the comments.
                });

                // It occurs to me that you might be wondering why I didn't put the comments from the tutorial in. I didn't do that because I am typing this whole thing by hand instead of copying and pasting. I know, I know. I just think it helps me understand better than if I copied and pasted. I've got too short of an attention span to read the whole tutorial article, but if I type the code by hand, at least I'll read that.
            });

            it("can delete owned task", () => {
                const deleteTask = Meteor.isServer.method_handlers["tasks.remove"];

                const invocation = {
                    userId
                };

                deleteTask.apply(invocation, [taskId]);

                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}