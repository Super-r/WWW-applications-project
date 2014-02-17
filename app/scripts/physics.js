$(function() {

Physics(function(world){

  var renderer = Physics.renderer('pixi', {
    el: 'viewport', // id of the canvas element
    width: 1920,
    height: 1280
  });

  world.add(renderer);
  var square = Physics.body('convex-polygon', {
    x: 250,
    y: 250,
    vx: 0.01,
    vertices: [
        {x: 0, y: 50},
        {x: 50, y: 50},
        {x: 50, y: 0},
        {x: 0, y: 0}
    ]
});

  world.add( square );
  world.render();
  
  // subscribe to ticker to advance the simulation
  Physics.util.ticker.subscribe(function( time, dt ){
    world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

  world.subscribe('step', function(){
    world.render();
  });

  world.add( Physics.behavior('constant-acceleration') );

  //Set boundaries for canvas.
  var bounds = Physics.aabb(0, 0, 1920, 1280);

  // ensure objects bounce when edge collision is detected
  world.add( Physics.behavior('body-impulse-response') );
  world.add( Physics.behavior('edge-collision-detection', {
    aabb: bounds,
    restitution: 0.3
  }));

  world.add( Physics.body('convex-polygon', {
    x: 250,
    y: 50,
    vx: 0.05,
    vertices: [
      {x: 0, y: 80},
      {x: 60, y: 40},
      {x: 60, y: -40},
      {x: 0, y: -80}
    ]
  }));

  world.add( Physics.body('convex-polygon', {
    x: 400,
    y: 200,
    vx: -0.02,
    vertices: [
      {x: 0, y: 80},
      {x: 80, y: 0},
      {x: 0, y: -80},
      {x: -30, y: -30},
      {x: -30, y: 30}
    ]
  }));

  world.add( Physics.behavior('body-collision-detection') );
  world.add( Physics.behavior('sweep-prune') );

  });
});