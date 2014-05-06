//Create pixi objects and renderer here.

$(function() {
  'use strict';

    // In future this function should be used to move the viewport when user scrolls
    // and also when the ball is at the center of the canvas.
    //
    function moveViewport(data, world, backgrounds) {
      var xDiff = window.x - data.global.x;
      backgrounds.far.tilePosition.x -= xDiff/60;
      backgrounds.mid.tilePosition.x -= xDiff/20;
      backgrounds.close.tilePosition.x -= xDiff/10;
      for (var i = 0; i < world._bodies.length; i++) {
        world._bodies[i].state.old.pos._[0] -= xDiff;
        world._bodies[i].state.pos._[0] -= xDiff;
      }
      window.x = data.global.x;
    }

    // Here are the listeners for mouse and touch events of the ball
    //
    window.mouseDown = function mouseDown(stage, data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      // store a reference to the data
      // The reason for this is because of multitouch
      // we want to track the movement of this particular touch
      stage.data = data;
      window.x = data.global.x;
      stage.dragging = true;
    };

    // set the events for when the mouse is released or a touch is released
    //
    window.mouseUp = function mouseUp(stage, data, world) {
      stage.dragging = false;
      for (var i = 0; i < world._bodies.length -1; i++) {
        world._bodies[i].fixed = false;
      }
      stage.data = null;
    };

    // set the callbacks for when the mouse or a touch moves
    //
    window.mouseMove = function mouseMove(stage, data, world, backgrounds) {
      if(stage.dragging && !stage.draggingItem && ((backgrounds.far.tilePosition.x < 0 && data.originalEvent.webkitMovementX > 0) || (backgrounds.far.tilePosition.x > -12 && data.originalEvent.webkitMovementX < 0))) {
        moveViewport(data, world, backgrounds);
      }
    };

    //Here are the listeners for mouse and touch events of the ball
    //
    window.mouseDownTarget = function mouseDownTarget(target, data, world) {
      // stop the default event...
      data.originalEvent.preventDefault();
      target.parentBody.fixed = true;
      // store a reference to the data
      // The reason for this is because of multitouch
      // we want to track the movement of this particular touch
      target.parentBody.data = data;
      target.parent.draggingItem = true;
      target.dragging = true;
      console.log("now in mouse down!");
    };


    // set the events for when the mouse is released or a touch is released
    //
    window.mouseUpTarget = function mouseUpTarget(target, data, world) {
      target.parent.draggingItem = false;
      target.dragging = false;
      target.parentBody.fixed = false;
      //Calculate the current velocity of the object.
      target.parentBody.state.vel._[0] = (target.parentBody.state.pos._[0] - target.parentBody.state.old.pos._[0]) / (world._dt*10);
      target.parentBody.state.vel._[1] = (target.parentBody.state.pos._[1] - target.parentBody.state.old.pos._[1]) / (world._dt*10);
      // set the interaction data to null
      target.data = null;
    };


    // set the callbacks for when the mouse or a touch moves
    //
    window.mouseMoveTarget = function mouseMoveTarget(target, data, world) {
      if(target.dragging) {
        var newPosition = target.parentBody.data.getLocalPosition(target.parent);
        target.position.x = newPosition.x;
        target.position.y = newPosition.y;
        target.parentBody.state.old.pos._[0] = target.parentBody.state.pos._[0];
        target.parentBody.state.old.pos._[1] = target.parentBody.state.pos._[1];
        target.parentBody.state.pos._[0] = newPosition.x;
        target.parentBody.state.pos._[1] = newPosition.y;
      }
    };


    // Callback functions for on screen buttons
    //
    window.buttonUp = function buttonUp(button, object, type) {
      if (type === "tennis") {
        button.setTexture(PIXI.Texture.fromImage('resources/img/tennisButtonUp.png'));
        object.view.setTexture(PIXI.Texture.fromImage('resources/img/tball.png'));
        object.view.scale.x = 0.13;
        object.view.scale.y = 0.13;  
        object.mass = 0.1;
        object.restitution = 3.0;    
        object.geometry.radius = 13;
        object.x = 45;
        object.y = 350;
        object.cof = 0.6;
        object.recalc();  
      }
      if (type === "cannon") {
          button.setTexture(PIXI.Texture.fromImage('resources/img/cannonballButtonUp.png'));
          object.view.setTexture(PIXI.Texture.fromImage('resources/img/cball.png'));
          object.view.scale.x = 0.20;
          object.view.scale.y = 0.20;  
          object.mass = 20;
          object.restitution = 1.5;    
          object.geometry.radius = 25;
          object.view.position.x = 45;
          object.view.position.y = 300;
          object.x = 45;
          object.y = 300;
          object.cof = 1;
          object.recalc();   
      }
      if (type === "golf") {
          button.setTexture(PIXI.Texture.fromImage('resources/img/golfButtonUp.png'));
          object.view.setTexture(PIXI.Texture.fromImage('resources/img/gball.png'));
          object.view.scale.x = 0.10;
          object.view.scale.y = 0.10;  
          object.mass = 0.15;
          object.restitution = 3.5;    
          object.geometry.radius = 10;
          object.view.position.x = 45;
          object.view.position.y = 300;
          object.x = 45;
          object.y = 300;
          object.cof = 1;
          object.recalc();  
      }

    };
    // Callback functions for on screen buttons
    //
    window.addElement = function addElement(button, world) {
        var object2 = window.objects[0].getSquare();
        var object = object2.square;
        object.view = world._renderer.createDisplay('sprite', {
                texture: 'resources/img/brick.png',
                anchor: {
                    x: 0.5,
                    y: 0.5
          }
        });
        object.view.scale.x = 0.44;
        object.view.scale.y = 0.44;
        world.add(object);
        button.setTexture(PIXI.Texture.fromImage('resources/img/addButtonUp.png'));

    };

}(jQuery));