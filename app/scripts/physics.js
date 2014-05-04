//This is where the objects created at the 'objects' class are rendered and physics qualities of those objects are calculated. T

window.physics = $(function() {
    'use strict';
    new Physics(function(world){
        var objects = window.objects[0].getObjects();
        //Add renderer to the world
        world.add(objects.renderer);
        var backgrounds = window.background[0].getBackgrounds();
        var tennisButton = objects.tennisButton;
        var cannonballButton = objects.cannonballButton;
        var golfButton = objects.golfButton;

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


        var squares = objects.squares;
        for (var i = 0; i < squares.length; i++) {
            squares[i].view = objects.renderer.createDisplay('sprite', {
                texture: 'resources/img/brick.png',
                anchor: {
                    x: 0.5,
                    y: 0.5
            }
          });
          squares[i].view.scale.x = 0.32;
          squares[i].view.scale.y = 0.32;
          world.add(squares[i]);
        };


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
          world.add(sq);

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

        golfButton.mousedown = cannonballButton.touchstart = function(data) {
          this.setTexture(PIXI.Texture.fromImage('resources/img/golfButtonDown.png'));
        };
               
        golfButton.mouseup = cannonballButton.touchend = function(data) {
          buttonUp(this, sq, "golf");
        };



          world._renderer.stage.mousedown = world._renderer.stage.touchstart = function(data) {
            mouseDown(this, data);
          };

          world._renderer.stage.mouseup = world._renderer.stage.mouseupoutside = world._renderer.stage.touchend = world._renderer.stage.touchendoutside = function(data) {
            mouseUp(this, data, world);
          };

          world._renderer.stage.mousemove = world._renderer.stage.touchmove = function(data) {
            mouseMove(this, data, world, backgrounds);
          };

          sq.view.mousedown = sq.view.touchstart = function(data) {
            mouseDownTarget(this, data, world);
          };

          sq.view.mouseup = sq.view.mouseupoutside = sq.view.touchend = sq.view.touchendoutside = function(data) {
            mouseUpTarget(this, data, world);
          };

          sq.view.mousemove = sq.view.touchmove = function(data) {
            mouseMoveTarget(this, data, world);
          };

          // subscribe to ticker to advance the simulation
          Physics.util.ticker.subscribe(function( time){
            world.step( time );
          });
          // start the ticker
        Physics.util.ticker.start();
        world.subscribe('step', function() {
          world.render();
        });

        //Adds gravitation to canvas
        //
        world.add( Physics.behavior('constant-acceleration') );

        //Set boundaries for canvas to recognize collsions.
        //
        var bounds = Physics.aabb(-640, -320, 1280, 320);

        // ensure objects bounce when edge collision is detected this can be extended to contain listener on how to react when collision is detected
        //
        world.add( Physics.behavior('body-impulse-response') );
        world.add( Physics.behavior('edge-collision-detection', {
          aabb: bounds,
          restitution: 0.3, //Sets the bouncing speed and power.
          cof: 1
        }));


        world.add( Physics.behavior('body-collision-detection') ); //Recognizes the collisions between objects.
        world.add( Physics.behavior('sweep-prune') ); //add sweeping and pruning between objects

        var rcm = Physics.behavior('rigid-constraint-manager', {
            targetLength: 1
        });

        world.add( rcm );
    });
}(jQuery));