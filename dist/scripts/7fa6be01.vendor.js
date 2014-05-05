$(function(){"use strict"}(jQuery)),window.objects=$(function(){"use strict";var a=function(){var a=g().x,b=g().y,c=Physics.renderer("pixi",{el:"viewport",width:a,height:b});return c},b=function(){for(var a=[],b=0;5>b;b++)for(var c=0;5>c;c++){var d=Physics.body("convex-polygon",{x:550+20*c,y:320-20*b,vertices:[{x:0,y:20},{x:20,y:20},{x:20,y:0},{x:0,y:0}],restitution:.05,fixed:!0,mass:5,cof:1});a.push(d)}return a},c=function(){var a=Physics.body("circle",{x:45,y:455,mass:20,radius:25,restitution:1.5,cof:1});return a},d=function(){var a=new PIXI.Sprite(PIXI.Texture.fromImage("resources/img/tennisButtonUp.png"));return a.buttonMode=!0,a.anchor.x=.5,a.anchor.y=.5,a.scale.x=.4,a.scale.y=.4,a.position.x=55,a.position.y=15,a.interactive=!0,a},e=function(){var a=new PIXI.Sprite(PIXI.Texture.fromImage("resources/img/golfButtonUp.png"));return a.buttonMode=!0,a.anchor.x=.5,a.anchor.y=.5,a.scale.x=.4,a.scale.y=.4,a.position.x=275,a.position.y=15,a.interactive=!0,a},f=function(){var a=new PIXI.Sprite(PIXI.Texture.fromImage("resources/img/cannonballButtonUp.png"));return a.buttonMode=!0,a.anchor.x=.5,a.anchor.y=.5,a.scale.x=.4,a.scale.y=.4,a.position.x=165,a.position.y=15,a.interactive=!0,a},g=function(){return{x:640,y:320}};return{getObjects:function(){return{squares:b(),cannonball:c(),renderer:a(),tennisButton:d(),cannonballButton:f(),golfButton:e(),res:g()}}}}(jQuery)),window.background=$(function(){"use strict";var a=function(){var a=PIXI.Texture.fromImage("resources/background/sky.png"),b=new PIXI.TilingSprite(a,640,320);return b.position.x=0,b.position.y=0,b.tilePosition.x=0,b.tilePosition.y=0,b},b=function(){var a=PIXI.Texture.fromImage("resources/background/castle.png"),b=new PIXI.TilingSprite(a,640,320);return b.position.x=10,b.position.y=120,b.tilePosition.x=0,b.tilePosition.y=0,b.scale.x=.9,b.scale.y=.9,b},c=function(){var a=PIXI.Texture.fromImage("resources/background/grass.png"),b=new PIXI.TilingSprite(a,640,320);return b.position.x=-10,b.position.y=54,b.tilePosition.x=0,b.tilePosition.y=0,b.scale.x=1.4,b};return{getBackgrounds:function(){return{far:a(),mid:b(),close:c()}}}}(jQuery)),$(function(){"use strict";function a(a,b,c){var d=window.x-a.global.x;c.far.tilePosition.x-=d/60,c.mid.tilePosition.x-=d/20,c.close.tilePosition.x-=d/10;for(var e=0;e<b._bodies.length;e++)b._bodies[e].state.old.pos._[0]-=d,b._bodies[e].state.pos._[0]-=d;window.x=a.global.x}window.mouseDown=function(a,b){b.originalEvent.preventDefault(),a.data=b,window.x=b.global.x,a.dragging=!0},window.mouseUp=function(a,b,c){a.dragging=!1,c._bodies[25].fixed=!1;for(var d=0;d<c._bodies.length-1;d++)c._bodies[d].fixed=!1;a.data=null},window.mouseMove=function(b,c,d,e){b.dragging&&!d._bodies[25].view.dragging&&(e.far.tilePosition.x<0&&c.originalEvent.webkitMovementX>0||e.far.tilePosition.x>-12&&c.originalEvent.webkitMovementX<0)&&a(c,d,e)},window.mouseDownTarget=function(a,b,c){b.originalEvent.preventDefault(),c._bodies[c._bodies.length-1].fixed=!0,a.data=b,a.dragging=!0},window.mouseUpTarget=function(a,b,c){a.dragging=!1,c._bodies[c._bodies.length-1].fixed=!1,c._bodies[c._bodies.length-1].state.vel._[0]=(c._bodies[c._bodies.length-1].state.pos._[0]-c._bodies[c._bodies.length-1].state.old.pos._[0])/(10*c._dt),c._bodies[c._bodies.length-1].state.vel._[1]=(c._bodies[c._bodies.length-1].state.pos._[1]-c._bodies[c._bodies.length-1].state.old.pos._[1])/(10*c._dt),a.data=null},window.mouseMoveTarget=function(a,b,c){if(a.dragging){var d=a.data.getLocalPosition(a.parent);a.position.x=d.x,a.position.y=d.y,c._bodies[c._bodies.length-1].state.old.pos._[0]=c._bodies[c._bodies.length-1].state.pos._[0],c._bodies[c._bodies.length-1].state.old.pos._[1]=c._bodies[c._bodies.length-1].state.pos._[1],c._bodies[c._bodies.length-1].state.pos._[0]=d.x,c._bodies[c._bodies.length-1].state.pos._[1]=d.y}},window.buttonUp=function(a,b,c){"tennis"===c&&(a.setTexture(PIXI.Texture.fromImage("resources/img/tennisButtonUp.png")),b.view.setTexture(PIXI.Texture.fromImage("resources/img/tball.png")),b.view.scale.x=.13,b.view.scale.y=.13,b.mass=.1,b.restitution=3,b.geometry.radius=13,b.x=45,b.y=350,b.cof=.6,b.recalc()),"cannon"===c&&(a.setTexture(PIXI.Texture.fromImage("resources/img/cannonballButtonUp.png")),b.view.setTexture(PIXI.Texture.fromImage("resources/img/cball.png")),b.view.scale.x=.2,b.view.scale.y=.2,b.mass=20,b.restitution=1.5,b.geometry.radius=25,b.view.position.x=45,b.view.position.y=300,b.x=45,b.y=300,b.cof=1,b.recalc()),"golf"===c&&(a.setTexture(PIXI.Texture.fromImage("resources/img/golfButtonUp.png")),b.view.setTexture(PIXI.Texture.fromImage("resources/img/gball.png")),b.view.scale.x=.1,b.view.scale.y=.1,b.mass=.15,b.restitution=3.5,b.geometry.radius=10,b.view.position.x=45,b.view.position.y=300,b.x=45,b.y=300,b.cof=1,b.recalc())}}(jQuery)),window.physics=$(function(){"use strict";new Physics(function(a){var b=window.objects[0].getObjects();a.add(b.renderer);var c=window.background[0].getBackgrounds(),d=b.tennisButton,e=b.cannonballButton,f=b.golfButton;a._renderer.stage.addChild(c.far),a._renderer.stage.addChild(c.mid),a._renderer.stage.addChild(c.close),a._renderer.stage.addChild(e),a._renderer.stage.addChild(d),a._renderer.stage.addChild(f);for(var g=b.squares,h=0;h<g.length;h++)g[h].view=b.renderer.createDisplay("sprite",{texture:"resources/img/brick.png",anchor:{x:.5,y:.5}}),g[h].view.scale.x=.32,g[h].view.scale.y=.32,a.add(g[h]);var i=b.cannonball;i.view=b.renderer.createDisplay("sprite",{texture:"resources/img/cball.png",anchor:{x:.5,y:.5}}),i.view.setInteractive(!0),i.view.scale.x=.2,i.view.scale.y=.2,a.add(i),d.mousedown=d.touchstart=function(){this.setTexture(PIXI.Texture.fromImage("resources/img/tennisButtonDown.png"))},d.mouseup=d.touchend=function(){buttonUp(this,i,"tennis")},e.mousedown=e.touchstart=function(){this.setTexture(PIXI.Texture.fromImage("resources/img/cannonballButtonDown.png"))},e.mouseup=e.touchend=function(){buttonUp(this,i,"cannon")},f.mousedown=e.touchstart=function(){this.setTexture(PIXI.Texture.fromImage("resources/img/golfButtonDown.png"))},f.mouseup=e.touchend=function(){buttonUp(this,i,"golf")},a._renderer.stage.mousedown=a._renderer.stage.touchstart=function(a){mouseDown(this,a)},a._renderer.stage.mouseup=a._renderer.stage.mouseupoutside=a._renderer.stage.touchend=a._renderer.stage.touchendoutside=function(b){mouseUp(this,b,a)},a._renderer.stage.mousemove=a._renderer.stage.touchmove=function(b){mouseMove(this,b,a,c)},i.view.mousedown=i.view.touchstart=function(b){mouseDownTarget(this,b,a)},i.view.mouseup=i.view.mouseupoutside=i.view.touchend=i.view.touchendoutside=function(b){mouseUpTarget(this,b,a)},i.view.mousemove=i.view.touchmove=function(b){mouseMoveTarget(this,b,a)},Physics.util.ticker.subscribe(function(b){a.step(b)}),Physics.util.ticker.start(),a.subscribe("step",function(){a.render()}),a.add(Physics.behavior("constant-acceleration"));var j=Physics.aabb(-640,-320,1280,320);a.add(Physics.behavior("body-impulse-response")),a.add(Physics.behavior("edge-collision-detection",{aabb:j,restitution:.3,cof:1})),a.add(Physics.behavior("body-collision-detection")),a.add(Physics.behavior("sweep-prune"));var k=Physics.behavior("rigid-constraint-manager",{targetLength:1});a.add(k)})}(jQuery));