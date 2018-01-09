var world=GameEngine.World.create();//se deberia poder crear un world pasandole una configuración.
var engine=GameEngine.Engine.create(world);
world.addObject('hola');
engine.run();
GameEngine.Event.add('click',{nombre:'luis'});
//GameEngine.Event.add('mouse-over',function(){console.log('esto es un mouse-over')});
GameEngine.EventListener.add('click',function(object){console.log(object.nombre)});
GameEngine.EventListener.process(GameEngine.Event.getEvents());


