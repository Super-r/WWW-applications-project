//This is where the objects created at the 'objects' class are rendered and physics qualities of those objects are calculated. T

window.physics = $(function() {
  'use strict';
  Physics(function(world){
    objects = window.objects[0].getObjects();;
    //Add renderer to the world
    world.add(objects.renderer);
    
    /*var squares = objects.squares;
    for (var i = 0; i < squares.length; i++) {
      squares[i].view = objects.renderer.createDisplay('sprite', {
        texture: 'img/brick.png',
        anchor: {
            x: 0.5,
            y: 0.5
        }
      });
      //squares[i].view.setInteractive(true);
      //squares[i].view.scale.x = 0.20;
      //squares[i].view.scale.y = 0.20;
      world.add(squares[i]); 
    }
    console.log(world);*/
    var sq = objects.square;
    sq.view = objects.renderer.createDisplay('sprite', {
      texture: 'img/cball.png',
      anchor: {
        x: 0.5,
        y: 0.5
      }
    });
    sq.view.setInteractive(true);
    sq.view.scale.x = 0.20;
    sq.view.scale.y = 0.20;
    
    objects.renderer.loadSpritesheets(['img/brick.png'], loadActors);

    //Here are the listeners for mouse and touch events of the ball

    sq.view.mousedown = sq.view.touchstart = function(data) {
      // stop the default event...
      data.originalEvent.preventDefault();
      world._bodies[world._bodies.length-1].fixed = true;
      // store a reference to the data
      // The reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = data;
      this.dragging = true;
    };

    // set the events for when the mouse is released or a touch is released
    sq.view.mouseup = sq.view.mouseupoutside = sq.view.touchend = sq.view.touchendoutside = function(data) {
      this.dragging = false;
      world._bodies[world._bodies.length-1].fixed = false;
      //Calculate the current velocity of the object.
      world._bodies[world._bodies.length-1].state.vel._[0] = (world._bodies[world._bodies.length-1].state.pos._[0] - world._bodies[world._bodies.length-1].state.old.pos._[0]) / (world._dt*10);
      world._bodies[world._bodies.length-1].state.vel._[1] = (world._bodies[world._bodies.length-1].state.pos._[1] - world._bodies[world._bodies.length-1].state.old.pos._[1]) / (world._dt*10);
      // set the interaction data to null
      this.data = null;
    };

    // set the callbacks for when the mouse or a touch moves
    sq.view.mousemove = sq.view.touchmove = function(data) {
        if(this.dragging) {
          var newPosition = this.data.getLocalPosition(this.parent);
          this.position.x = newPosition.x;
          this.position.y = newPosition.y;
          world._bodies[world._bodies.length-1].state.old.pos._[0] = world._bodies[world._bodies.length-1].state.pos._[0];
          world._bodies[world._bodies.length-1].state.old.pos._[1] = world._bodies[world._bodies.length-1].state.pos._[1];
          world._bodies[world._bodies.length-1].state.pos._[0] = newPosition.x;
          world._bodies[world._bodies.length-1].state.pos._[1] = newPosition.y;
        }
    };

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function( time, dt ){
      world.step( time );
    });
    // start the ticker
    Physics.util.ticker.start();
    world.subscribe('step', function(){
      world.render();
    });
  console.log(world);
  //Add renderer to the world
  world.add(objects.renderer);

  //for (var i = 0; i < objects.squares.length; i++) {
  //  var object = objects.squares[i];
  //  world.add(object);
  //}
  
  world.add(objects.square);

    //Adds gravitation to canvas
    world.add( Physics.behavior('constant-acceleration') );

    //Set boundaries for canvas to recgnize collsions.
    var bounds = Physics.aabb(0, 0, objects.res["x"], objects.res["y"]);

    // ensure objects bounce when edge collision is detected this can be extended to contain listener on how to react when collision is detected
    world.add( Physics.behavior('body-impulse-response') );
    world.add( Physics.behavior('edge-collision-detection', {
      aabb: bounds,
      restitution: 0.3 //Sets the bouncing speed and power.
    }));

    world.add( Physics.behavior('body-collision-detection') ); //Recognizes the collisions between objects.
    world.add( Physics.behavior('sweep-prune') ); //add sweeping and pruning between objects

  var rcm = Physics.behavior('rigid-constraint-manager', {
    targetLength: 1
  });

  world.add( rcm );

  function loadActors(){
    var xres = objects.res["x"];
    var yres = objects.res["y"];
    var castle = new Array();
    var bh = 32;
    var distances = [400, 100, 16, 16];
    
    /*if (yres < 400){
      bh = bh/1.5;
      for (i = 0; i < distances.length; i++){
        distances[i] = distances[i]/1.5;
      }
    }*/
  
    var tower = new Array();
    for (var i = 0; i < 8; i++){
      var m = 1.0;
      for (var j = 0; j < 3; j++){    
        var square = Physics.body('convex-polygon', {
          x: xres - distances[0] + j * bh,
          y: yres - distances[2] - i * bh,
          mass: m,
          fixed: false,
          // body restitution. How "bouncy" is it?
          restitution: 1.0,
          cof: 3.0,
          vertices: [
            {x: 0, y: bh},
            {x: bh, y: bh},
            {x: bh, y: 0},
            {x: 0, y: 0}
            ]
        });
        square.view = objects.renderer.createDisplay('sprite', {
          texture: 'img/brick.png',
          anchor: {
              x: 0.5,
              y: 0.5
          }
        });
        square.view.scale.x = 0.5;
        square.view.scale.y = 0.5;
        world.add(square);  
             
      }
    }
    world.add(sq); 
  }

  });
}(jQuery));