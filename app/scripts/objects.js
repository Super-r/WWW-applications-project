//Create pixi objects and renderer here.

window.objects = $(function() {

  'use strict';

 //Create the canvas where the objects and other graphics are rendered 

 var renderer = function () {
  var xres = resolutions()["x"];
  var yres = resolutions()["y"];
  var renderer = Physics.renderer('pixi', {
    el: 'viewport', // id of the canvas element
    width: xres,
    height: yres
  });
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
      m: 10.0,
      radius: 25
    });
    return square;
  };
  
  var resolutions = function(){
    return {
      //'x': $(window).width()-30,
      //'y': $(window).height()-50
      'x': 640,
      'y': 320
    }
  }

  // API
  return {
    getObjects: function () {
      return {
        'squares': squares(),
        'square': square(),
        'renderer': renderer(),
        'res': resolutions()
      };
    }
  };

}(jQuery));