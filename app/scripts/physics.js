//This is where the objects created at the 'objects' class are rendered and physics qualities of those objects are calculated. T

window.physics = $(function() {
  'use strict';
  Physics(function(world){
    //Add renderer to the world
    world.add(window.objects[0].renderer);
    
    var squares = window.objects[0].squares;
    for (var i = 0; i < squares.length; i++) {
      world.add(squares[i]);
    }

    var farTexture = PIXI.Texture.fromImage("resources/background/bg-far.png");
    var far = new PIXI.TilingSprite(farTexture, 640, 320);
    far.position.x = 0;
    far.position.y = 0;
    far.tilePosition.x = 0;
    far.tilePosition.y = 0;
    world._renderer.stage.addChild(far);

    var midTexture = PIXI.Texture.fromImage("resources/background/bg-mid.png");
    var mid = new PIXI.TilingSprite(midTexture, 640, 320);
    mid.position.x = 0;
    mid.position.y = 128;
    mid.tilePosition.x = 0;
    mid.tilePosition.y = 0;
    world._renderer.stage.addChild(mid);


    var sq = window.objects[0].square;
    sq.view = window.objects[0].renderer.createDisplay('sprite', {
      texture: 'resources/img/cball.png',
      anchor: {
        x: 0.5,
        y: 0.5
      }
    });
    sq.view.setInteractive(true);
    sq.view.scale.x = 0.20;
    sq.view.scale.y = 0.20;
    world.add(sq);


    //Here are the listeners for mouse and touch events of the ball
    //

    world._renderer.stage.mousedown = world._renderer.stage.touchstart = function(data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      // store a reference to the data
      // The reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = data;
      window.x = data.global.x;
      this.dragging = true;
    };

    // set the events for when the mouse is released or a touch is released
    world._renderer.stage.mouseup = world._renderer.stage.mouseupoutside = world._renderer.stage.touchend = world._renderer.stage.touchendoutside = function(data) {
      this.dragging = false;
      world._bodies[25].fixed = false;
      //Calculate the current velocity of the object.
      world._bodies[25].state.vel._[0] = (world._bodies[25].state.pos._[0] - world._bodies[25].state.old.pos._[0]) / (world._dt*10);
      world._bodies[25].state.vel._[1] = (world._bodies[25].state.pos._[1] - world._bodies[25].state.old.pos._[1]) / (world._dt*10);
      // set the interaction data to null
      this.data = null;
    };

    // set the callbacks for when the mouse or a touch moves
    world._renderer.stage.mousemove = world._renderer.stage.touchmove = function(data) {
        if(this.dragging) {
          var xDiff = window.x - data.global.x;
          console.log(xDiff);
          far.tilePosition.x += xDiff/60;
          mid.tilePosition.x += xDiff/10;
          window.x = data.global.x;
        }
    };



    //Here are the listeners for mouse and touch events of the ball
    //

    sq.view.mousedown = sq.view.touchstart = function(data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      world._bodies[25].fixed = true;
      // store a reference to the data
      // The reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = data;
      this.dragging = true;
    };

        // set the events for when the mouse is released or a touch is released
    sq.view.mouseup = sq.view.mouseupoutside = sq.view.touchend = sq.view.touchendoutside = function(data) {
      this.dragging = false;
      world._bodies[25].fixed = false;
      //Calculate the current velocity of the object.
      world._bodies[25].state.vel._[0] = (world._bodies[25].state.pos._[0] - world._bodies[25].state.old.pos._[0]) / (world._dt*10);
      world._bodies[25].state.vel._[1] = (world._bodies[25].state.pos._[1] - world._bodies[25].state.old.pos._[1]) / (world._dt*10);
      // set the interaction data to null
      this.data = null;
    };

    // set the callbacks for when the mouse or a touch moves
    sq.view.mousemove = sq.view.touchmove = function(data) {
        if(this.dragging) {
          var newPosition = this.data.getLocalPosition(this.parent);
          this.position.x = newPosition.x;
          this.position.y = newPosition.y;
          world._bodies[25].state.old.pos._[0] = world._bodies[25].state.pos._[0];
          world._bodies[25].state.old.pos._[1] = world._bodies[25].state.pos._[1];
          world._bodies[25].state.pos._[0] = newPosition.x;
          world._bodies[25].state.pos._[1] = newPosition.y;
        }
    };

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function( time, dt ){
      world.step( time );
    });
    // start the ticker
    Physics.util.ticker.start();
    world.subscribe('step', function(){
      //far.tilePosition.x -= 0.128;
      //mid.tilePosition.x -= 0.64;
      world.render();
    });


    //Adds gravitation to canvas
    //
    world.add( Physics.behavior('constant-acceleration') );

    //Set boundaries for canvas to recognize collsions.
    //
    var bounds = Physics.aabb(0, 0, 640, 320);

    // ensure objects bounce when edge collision is detected this can be extended to contain listener on how to react when collision is detected
    //
    world.add( Physics.behavior('body-impulse-response') );
    world.add( Physics.behavior('edge-collision-detection', {
      aabb: bounds,
      restitution: 0.3 //Sets the bouncing speed and power.
    }));

    world.add( Physics.behavior('body-collision-detection') ); //Recognizes the collisions between objects.
    world.add( Physics.behavior('sweep-prune') ); //add sweeping and pruning between objects

  });
}(jQuery));