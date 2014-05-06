//This is where the objects created at the 'objects' class are rendered and physics qualities of those objects are calculated. T

window.physics = $(function() {
    'use strict';
    new Physics(function(world){
        var objects = window.objects[0].getObjects();
        //Add renderer to the world
        world.add(objects.renderer);
        var backgrounds = window.background[0].getBackgrounds();
        
        var tennisButton = objects.tennisButton;
        var addButton = objects.addButton;
        var golfButton = objects.golfButton;
        var cannonballButton = objects.cannonballButton;

        // Add background images
        //
        world._renderer.stage.addChild(backgrounds.far);

        world._renderer.stage.addChild(backgrounds.mid);

        world._renderer.stage.addChild(backgrounds.close);

        //Add buttons
        //
        world._renderer.stage.addChild(cannonballButton);
        world._renderer.stage.addChild(tennisButton);
        world._renderer.stage.addChild(golfButton);
        world._renderer.stage.addChild(addButton);


        var sq = objects.cannonball;
        sq.view = objects.renderer.createDisplay('sprite', {
          texture: 'resources/img/cball.png',
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });
        sq.view.setInteractive(true);
        sq.view.scale.x = 0.20;
        sq.view.scale.y = 0.20;
        sq.view.parentBody = sq;
        world.add(sq);

        // Eventlistener for events related to movement of ball
        //

        sq.view.mousedown = sq.view.touchstart = function(data) {
          mouseDownTarget(this, data, world);
        };

        sq.view.mouseup = sq.view.mouseupoutside = sq.view.touchend = sq.view.touchendoutside = function(data) {
          mouseUpTarget(this, data, world);
        };

        sq.view.mousemove = sq.view.touchmove = function(data) {
          mouseMoveTarget(this, data, world);
        };



        // set the mousedown and touchstart callbacks for buttons.
        //
        tennisButton.mousedown = tennisButton.touchstart = function(data) {
          this.setTexture(PIXI.Texture.fromImage('resources/img/tennisButtonDown.png'));
        };
               
        tennisButton.mouseup = tennisButton.touchend = function(data) {
          buttonUp(this, sq, "tennis");  
        };

        cannonballButton.mousedown = cannonballButton.touchstart = function(data) {
          this.setTexture(PIXI.Texture.fromImage('resources/img/cannonballButtonDown.png'));
        };
               
        cannonballButton.mouseup = cannonballButton.touchend = function(data) {
          buttonUp(this, sq, "cannon");
        };

        golfButton.mousedown = golfButton.touchstart = function(data) {
          this.setTexture(PIXI.Texture.fromImage('resources/img/golfButtonDown.png'));
        };
               
        golfButton.mouseup = golfButton.touchend = function(data) {
          buttonUp(this, sq, "golf");
        };

        addButton.mousedown = addButton.touchstart = function(data) {
          this.setTexture(PIXI.Texture.fromImage('resources/img/addButtonDown.png'));
        };
               
        addButton.mouseup = addButton.touchend = function(data) {
          addElement(this, world);
        };

        // Eventlisteners for stage events
        //

        world._renderer.stage.mousedown = world._renderer.stage.touchstart = function(data) {
          mouseDown(this, data);
        };

        world._renderer.stage.mouseup = world._renderer.stage.mouseupoutside = world._renderer.stage.touchend = world._renderer.stage.touchendoutside = function(data) {
          mouseUp(this, data, world);
        };

        world._renderer.stage.mousemove = world._renderer.stage.touchmove = function(data) {
          mouseMove(this, data, world, backgrounds);
        };


        // subscribe to ticker to advance the simulation
        //
        Physics.util.ticker.subscribe(function( time){
          world.step( time );
        });

        // start the ticker
        Physics.util.ticker.start();
        world.subscribe('step', function() {
          world.render();
        });

        // Adds gravitation to canvas
        //
        world.add( Physics.behavior('constant-acceleration') );

        // Set boundaries for canvas to recognize collsions.
        //
        var bounds = Physics.aabb(-640, -320, 1280, 320);

        // Ensure objects bounce when edge collision is detected this can be extended to contain listener on how to react when collision is detected
        //
        world.add( Physics.behavior('body-impulse-response') );
        world.add( Physics.behavior('edge-collision-detection', {
          aabb: bounds,
          restitution: 0.3, //Sets the bouncing speed and power.
          cof: 1
        }));


        world.add( Physics.behavior('body-collision-detection') ); //Recognizes the collisions between objects.
        world.add( Physics.behavior('sweep-prune') ); //add sweeping and pruning between objects
    });
}(jQuery));