var canvas=document.getElementById("world");
var ctx=canvas.getContext("2d");
var eventEngine=GameEngine.EventEngine.create();
var world=GameEngine.World.create(eventEngine);
var render=GameEngine.Render.create(world,ctx,canvas);
var engine=GameEngine.Engine.create(world,render);


eventEngine.addListener('create',function(event,world){
    var composite=Matter.Composite.create();
    Matter.Composite.add(composite,Matter.Bodies.rectangle(event.pageX,event.pageY,10,10));
    world.addUserComposite(composite);
},world);

canvas.addEventListener('click',function(event){
    eventEngine.addEvent('create',event);
});

engine.run();