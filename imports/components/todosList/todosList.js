import angular from "angular";
import angularMeteor from "angular-meteor";
import template from "./todosList.html";
import {Meteor} from "meteor/meteor";
import {Tasks} from "../../api/tasks.js";

class TodosListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe("tasks");

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
        Meteor.call("tasks.insert", newTask);

        this.newTask = "";
    }

    setChecked(task) {
        Meteor.call("tasks.setChecked", task._id, !task.checked);
    }

    removeTask(task) {
        Meteor.call("tasks.remove", task._id);
    }

    setPrivate(task) {
        Meteor.call("tasks.setPrivate", task._id, !task.private);
    }
}

export default angular.module("todosList", [
    angularMeteor
])
    .component("todosList", {
        templateUrl: "imports/components/todosList/todosList.html",
        controller: ["$scope", TodosListCtrl]
    });