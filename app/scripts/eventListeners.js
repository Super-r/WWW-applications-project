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
      world._bodies[25].fixed = false;
      for (var i = 0; i < world._bodies.length -1; i++) {
        world._bodies[i].fixed = false;
      }
      stage.data = null;
    };

    // set the callbacks for when the mouse or a touch moves
    //
    window.mouseMove = function mouseMove(stage, data, world, backgrounds) {
      if(stage.dragging && !world._bodies[25].view.dragging && ((backgrounds.far.tilePosition.x < 0 && data.originalEvent.webkitMovementX > 0) || (backgrounds.far.tilePosition.x > -12 && data.originalEvent.webkitMovementX < 0))) {
        moveViewport(data, world, backgrounds);
      }
    };

    //Here are the listeners for mouse and touch events of the ball
    //
    window.mouseDownTarget = function mouseDownTarget(target, data, world) {
      // stop the default event...
      data.originalEvent.preventDefault();
      world._bodies[world._bodies.length-1].fixed = true;
      // store a reference to the data
      // The reason for this is because of multitouch
      // we want to track the movement of this particular touch
      target.data = data;
      target.dragging = true;
    };


    // set the events for when the mouse is released or a touch is released
    //
    window.mouseUpTarget = function mouseUpTarget(target, data, world) {
      target.dragging = false;
      world._bodies[world._bodies.length-1].fixed = false;
      //Calculate the current velocity of the object.
      world._bodies[world._bodies.length-1].state.vel._[0] = (world._bodies[world._bodies.length-1].state.pos._[0] - world._bodies[world._bodies.length-1].state.old.pos._[0]) / (world._dt*10);
      world._bodies[world._bodies.length-1].state.vel._[1] = (world._bodies[world._bodies.length-1].state.pos._[1] - world._bodies[world._bodies.length-1].state.old.pos._[1]) / (world._dt*10);
      // set the interaction data to null
      target.data = null;
    };


    // set the callbacks for when the mouse or a touch moves
    //
    window.mouseMoveTarget = function mouseMoveTarget(target, data, world) {
      if(target.dragging) {
        var newPosition = target.data.getLocalPosition(target.parent);
        target.position.x = newPosition.x;
        target.position.y = newPosition.y;
        world._bodies[world._bodies.length-1].state.old.pos._[0] = world._bodies[world._bodies.length-1].state.pos._[0];
        world._bodies[world._bodies.length-1].state.old.pos._[1] = world._bodies[world._bodies.length-1].state.pos._[1];
        world._bodies[world._bodies.length-1].state.pos._[0] = newPosition.x;
        world._bodies[world._bodies.length-1].state.pos._[1] = newPosition.y;
      }
    };

}(jQuery));