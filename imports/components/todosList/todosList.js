import angular from "angular";
import angularMeteor from "angular-meteor";
import template from "./todosList.html";
import {Meteor} from "meteor/meteor";
import {Tasks} from "../../api/tasks.js";

class TodosListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.hideCompleted = true;

        this.helpers({
            tasks() {
                const selector = {};

                if(this.getReactively("hideCompleted")) {
                    selector.checked = {
                        $ne: true
                    };
                }

                return Tasks.find(selector, {
                    sort: {
                        // I did the opposite of -1 because I actually wanted to sort my tasks for the oldest at the top. I left the sorting in entirely so that I could see how to do it later.
                        createdAt: 1
                        // If you're reading this: How would I sort the tasks so that the checked ones would be at the bottom? I tried checked: -1 and checked: 1.
                    }
                });
            },
            incompleteCount() {
                return Tasks.find({
                    checked: {
                        $ne: true
                    }
                }).count();
            },
            currentUser() {
                return Meteor.user();
            }
        })

        /* "But why the oldest tasks at the top?" 
            Good question. Oldest tasks stay at the top because they're probably the tasks that need to be done the most.
        */
    }

    addTask(newTask) {
        Tasks.insert({
            text: newTask,
            createdAt: new Date,
            owner: Meteor.userId(),
            username: Meteor.user().username
        });

        this.newTask = "";
    }

    setChecked(task) {
        Tasks.update(task._id, {
            $set: {
                checked: !task.checked
            },
        });
    }

    removeTask(task) {
        Tasks.remove(task._id);
    }
}

export default angular.module("todosList", [
    angularMeteor
])
    .component("todosList", {
        templateUrl: "imports/components/todosList/todosList.html",
        controller: ["$scope", TodosListCtrl]
    });