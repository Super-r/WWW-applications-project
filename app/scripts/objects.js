//Create pixi objects and renderer here.

window.objects = $(function() {
  'use strict';

 //Create the canvas where the objects and other graphics are rendered 

 var renderer = function () {
  var xres = resolutions()['x'];
  var yres = resolutions()['y'];
  var renderer = Physics.renderer('pixi', {
    el: 'viewport', // id of the canvas element
    width: xres,
    height: yres
  });
  return renderer;
};


  //Create initial objects for the canvas.
  var squares = function() {
    var squares = [];
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        var square = Physics.body('convex-polygon', {
          x: 550 + j*20,
          y: 320 - i * 20,
          vertices: [
            {x: 0, y: 20},
            {x: 20, y: 20},
            {x: 20, y: 0},
            {x: 0, y: 0}
          ],
          restitution: 0.05,
          fixed: true,
          mass: 5,
          cof: 1
        });
      squares.push(square);
      }
    }
    return squares;
  };
  
  var cannonball = function() {
    var circle = Physics.body('circle', {
      x: 45,
      y: 455,
      mass: 20.0,
      radius: 25,
      restitution: 1.5,
      cof: 1
    });
    return circle;
  };

  var tennisButton = function() {
    var button = new PIXI.Sprite(PIXI.Texture.fromImage('resources/img/tennisButtonUp.png'));
    button.buttonMode = true;

    button.anchor.x = 0.5;
    button.anchor.y = 0.5;
    button.scale.x = 0.4;
    button.scale.y = 0.4;
    button.position.x = 55;
    button.position.y = 15;
    button.interactive = true;
    return button;
  };  

  var golfButton = function() {
    var button = new PIXI.Sprite(PIXI.Texture.fromImage('resources/img/golfButtonUp.png'));
    button.buttonMode = true;
    button.anchor.x = 0.5;
    button.anchor.y = 0.5;
    button.scale.x = 0.4;
    button.scale.y = 0.4;
    button.position.x = 275;
    button.position.y = 15;
    button.interactive = true;
    return button;
  };

  var cannonballButton = function() {
    var button = new PIXI.Sprite(PIXI.Texture.fromImage('resources/img/cannonballButtonUp.png'));
    button.buttonMode = true;
    button.anchor.x = 0.5;
    button.anchor.y = 0.5;
    button.scale.x = 0.4;
    button.scale.y = 0.4;
    button.position.x = 165;
    button.position.y = 15;
    button.interactive = true;
    return button;
  };
  
  var resolutions = function(){
    return {
      //'x': $(window).width()-30,
      //'y': $(window).height()-50
      'x': 640,
      'y': 320
    };
  };

  // API
  return {
    getObjects: function () {
      return {
        'squares': squares(),
        'cannonball': cannonball(),
        'renderer': renderer(),
        'tennisButton': tennisButton(),
        'cannonballButton': cannonballButton(),
        'golfButton': golfButton(),
        'res': resolutions()
      };
    }
  };

}(jQuery));