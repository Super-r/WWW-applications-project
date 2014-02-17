//Create pixi objects and rederer here.

window.objects = $(function() {

 //Create the canvas where the objects and other graphics are rendered 
 var renderer = function () {
  var renderer = Physics.renderer('pixi', {
    el: 'viewport', // id of the canvas element
    width: 1920,
    height: 1280
  });
  return renderer;
};


  //Create initial objects for the canvas.
  var squares = function() {
  	var squares = []
 	for (var i = 0; i < 5; i++) {
   	  for (var j = 0; j < 5; j++) {
      var square = Physics.body('convex-polygon', {
        x: 1000 + j*50,
        y: 1280 - i * 50,
        vertices: [
          {x: 0, y: 50},
          {x: 50, y: 50},
          {x: 50, y: 0},
          {x: 0, y: 0}
          ]
        });
      squares.push(square);
      }
    }
    return squares;
  };

  var square = function() {
    var square = Physics.body('convex-polygon', {
      x: 0,
      y: 1000,
      vx: 3,
      vertices: [
        {x: 0, y: 50},
        {x: 50, y: 50},
        {x: 50, y: 0},
        {x: 0, y: 0}
        ]
    });
    return square;
  };

  // API
  return {
    getObjects: function () {
      return {
        'squares': squares(),
        'square': square(),
        'renderer': renderer()
      };
    }
  };

}(jQuery));