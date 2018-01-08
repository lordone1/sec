var world=GameEngine.World.create();//se deberia poder crear un world pasandole una configuración.
var engine=GameEngine.Engine.create(world);
world.addObject('hola');
engine.run();
world.addObject('adios');
engine.run();
