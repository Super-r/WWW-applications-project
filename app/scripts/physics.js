//This is where the objects created at the 'objects' class are rendered and physics qualities of those objects are calculated. T

window.physics = $(function() {

Physics(function(world){
  //Get objects and renderer from objects class.
  var objects = window.objects[0].getObjects();

  //Add renderer to the world
  world.add(objects.renderer);

  for (var i = 0; i < objects.squares.length; i++) {
    world.add(objects.squares[i]);
  }
  world.add(objects.square);

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.subscribe(function( time, dt ){
    world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

  world.subscribe('step', function(){
    world.render();
  });


  //Adds gravitation to canvas
  world.add( Physics.behavior('constant-acceleration') );

  //Set boundaries for canvas to recgnize collsions.
  var bounds = Physics.aabb(0, 0, 1920, 1280);

  // ensure objects bounce when edge collision is detected this can be extended to contain listener on how to react when collision is detected
  world.add( Physics.behavior('body-impulse-response') );
  world.add( Physics.behavior('edge-collision-detection', {
    aabb: bounds,
    restitution: 0.3 //Sets the bouncing speed and power.
  }));

  world.add( Physics.behavior('body-collision-detection') ); //Recognizes the collisions between objects.
  world.add( Physics.behavior('sweep-prune') ); //add sweeping and pruning between objects

  });
}(jQuery));