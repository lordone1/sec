var eventEngine=GameEngine.EventEngine.create();
var world=GameEngine.World.create(eventEngine);
var render=GameEngine.Render.create(world);
var engine=GameEngine.Engine.create(world,render);


eventEngine.addListener('create',function(){
    var composite=Matter.Composite.create();
    world.addComposite(composite);
});

eventEngine.addEvent('create',this.world);
engine.run();