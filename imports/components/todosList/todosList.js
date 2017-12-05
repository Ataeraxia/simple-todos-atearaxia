import angular from "angular";
import angularMeteor from "angular-meteor";
import template from "./todosList.html";
import {Tasks} from "../../api/tasks.js";

class TodosListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({
            tasks() {
                return Tasks.find({}, {
                    sort: {
                        // I did the opposite of -1 because I actually wanted to sort my tasks for the oldest at the top. I left the sorting in entirely so that I could see how to do it later.
                        createdAt: 1
                    }
                });
            }
        })

        /* "But why the oldest tasks at the top?" 
            Good question. Oldest tasks stay at the top because they're probably the tasks that need to be done the most.
        */
    }

    addTask(newTask) {
        Tasks.insert({
            text: newTask,
            createdAt: new Date
        });

        this.newTask = "";
    }
}

export default angular.module("todosList", [
    angularMeteor
])
    .component("todosList", {
        templateUrl: "imports/components/todosList/todosList.html",
        controller: ["$scope", TodosListCtrl]
    });