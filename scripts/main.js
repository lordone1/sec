var eventEngine=GameEngine.EventEngine.create();
var world=GameEngine.World.create(eventEngine);
var render=GameEngine.Render.create(world);
var engine=GameEngine.Engine.create(world,render);

engine.run();
world.addObject('hola');

eventEngine.addEvent('click',{nombre:'luis'});
eventEngine.addListener('click',function(object){console.log(object.nombre)});
eventEngine.addEvent('click',{nombre:'paco'});
eventEngine.addEvent('click',{nombre:'manolo'});