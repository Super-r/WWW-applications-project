//Create pixi objects and renderer here.

window.background = $(function() {
  'use strict';

  // Background images from far to close are created here.
  //
  var far = function() {
    var farTexture = PIXI.Texture.fromImage('resources/background/sky.png');
    var far = new PIXI.TilingSprite(farTexture, 640, 320);
    far.position.x = 0;
    far.position.y = 0;
    far.tilePosition.x = 0;
    far.tilePosition.y = 0;
    return far;
  };

  var mid = function() {
    var midTexture = PIXI.Texture.fromImage('resources/background/castle.png');
    var mid = new PIXI.TilingSprite(midTexture, 640, 320);
    mid.position.x = 10;
    mid.position.y = 120;
    mid.tilePosition.x = 0;
    mid.tilePosition.y = 0;
    mid.scale.x = 0.9;
    mid.scale.y = 0.9;
    return mid;
  };

  var close = function() {
    var closeTexture = PIXI.Texture.fromImage('resources/background/grass.png');
    var close = new PIXI.TilingSprite(closeTexture, 640, 320);
    close.position.x = -10;
    close.position.y = 54;
    close.tilePosition.x = 0;
    close.tilePosition.y = 0;
    close.scale.x = 1.4;
    return close;
  };

  // API
  return {
    getBackgrounds: function () {
      return {
        'far': far(),
        'mid': mid(),
        'close': close()
      };
    }
  };

}(jQuery));