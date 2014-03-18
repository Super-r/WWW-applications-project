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

  //Create the castle to destroy
  var castle = function(){
    
    var xres = resolutions()["x"];
    var yres = resolutions()["y"];
    var castle = new Array();
    var bh = 25;
    var distances = [400, 100, 16, 16];
    
    /*if (yres < 400){
      bh = bh/1.5;
      for (i = 0; i < distances.length; i++){
        distances[i] = distances[i]/1.5;
      }
    }*/

    
    var tower = new Array();
    for (var i = 0; i < 8; i++){
      var m = 0.4;
      for (var j = 0; j < 3; j++){    
        var square = Physics.body('convex-polygon', {
          x: xres - distances[0] + j * bh,
          y: yres - distances[2] - i * bh,
          mass: m,
          fixed: false,
          // body restitution. How "bouncy" is it?
          restitution: 1.0,
          cof: 1.0,
          vertices: [
            {x: 0, y: bh},
            {x: bh, y: bh},
            {x: bh, y: 0},
            {x: 0, y: 0}
            ]
        });
        tower.push(square);       
      }
    }
    
    var tower2 = new Array();
    for (var i = 0; i < 10; i++){
      var m = 0.4;
      for (var j = 0; j < 3; j++){    
        var square = Physics.body('convex-polygon', {
          x: xres - distances[1] + j * bh,
          y: yres - distances[3] - i * bh,
          mass: m,
          // body restitution. How "bouncy" is it?
          restitution: 1.0,
          fixed: false,
          cof: 1.0,
          vertices: [
            {x: 0, y: bh},
            {x: bh, y: bh},
            {x: bh, y: 0},
            {x: 0, y: 0}
            ]
        });
        tower2.push(square);       
      }
    }
    
    var arch = new Array();
    
    
    castle.push(tower);
    //castle.push(tower2)
    //castle.push(arch);
    return castle;
  }

  //Create initial objects for the canvas.
  var squares = function() {
    var xres = resolutions()["x"];
    var yres = resolutions()["y"];
  	var squares = []
 	    for (var i = 0; i < 5; i++) {
   	    for (var j = 0; j < 5; j++) {
          var square = Physics.body('convex-polygon', {
            x: xres + j*50,
            y: yres - i * 50,
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
        'squares': castle(),
        'square': square(),
        'renderer': renderer(),
        'res': resolutions()
      };
    }
  };

}(jQuery));