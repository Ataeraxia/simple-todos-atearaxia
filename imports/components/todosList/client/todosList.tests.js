import "angular-mocks";
import {Meteor} from "meteor/meteor";
import {assert} from "meteor/practicalmeteor:chai";
import {sinon} from "meteor/practicalmeteor:sinon";

import todosList from "../todosList";

describe("todosList", function(){
    var element;

    beforeEach(function(){
        var $compile;
        var $rootScape;

        window.module(todosList.name);

        inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        element = $compile("<todos-list></todos-list>")($rootScope.$new(true));
        $rootScope.$digest();

        // I don't even slightly understand any of this file.
    });

    describe("component", function(){
        it("should be showing incomplete tasks count", function(){
            assert.include(element[0].querySelector("hi").innerHTML, "0");
        });
    });

    describe("controller", function(){
        describe("addTask", function(){
            var controller;
            var newTask = "Spell fabulous wrong in the Meteor Todos tutorial";

            beforeEach(() => {
                sinon.stub(Meteor, "call");
                controller = element.controller("todosList");
                controller.newTask = "Spell fabulous wrong in the Meteor Todos tutorial";
                controller.addTask(newTask);
            });

            afterEach(() => {
                Meteor.call.restore();
            });

            it("should call tasks.insert method", function(){
                sinon.assert.calledOnce(Meteor.call);
                sinon.assert.calledWith(Meteor.call, "tasks.insert", newTask);
            });

            it("should reset newTask", function(){
                assert.equal(controller.newTask, "");
            })
        });
    });
})