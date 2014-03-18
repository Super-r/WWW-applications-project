//Create pixi objects and renderer here.

window.objects = $(function() {
  'use strict';
 //Create the canvas where the objects and other graphics are rendered 
  var renderer = function () {
    var renderer = Physics.renderer('pixi', {
      el: 'viewport', // id of the canvas element
      width: 640,
      height: 320
    });
    renderer.stage.interactive = true;
    return renderer;
  };


  //Create initial objects for the canvas.
  var squares = function() {
  	var squares = []
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
          ]
        });
      squares.push(square);
      }
    }
    return squares;
  };

  var square = function() {
    var square = Physics.body('circle', {
      x: 25,
      y: 455,
      radius: 25
    });
    return square;
  };
 



  // API
  return {
    'squares': squares(),
    'square': square(),
    'renderer': renderer()
  };

}(jQuery));