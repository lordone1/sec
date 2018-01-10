var GameEngine={
    Engine:{
        create:function(world,render){
            var engine={
                run:function(){
                    function mainLoop(){
                        world.eventEngine.process();
                        render.render();
                        window.requestAnimationFrame(mainLoop);
                    };
                    this.init();
                    window.requestAnimationFrame(mainLoop);
                },
                init:function(){
                    Matter.Engine.run(world.phisicEngine);
                }
            }
            return engine;
        }
    },
    Render:{
        create:function(world,ctx,canvas){
            var render={
                    render:function(){
                        function renderComposite(composite){
                            Matter.Composite.allBodies(composite).forEach(body => {
                                ctx.beginPath();
                                var radius=composite.radius;
                                if (radius!=null){
                                    ctx.arc(vector.x,vector.y,radius,0,2*Math.PI);
                                }
                                else{
                                    body.vertices.forEach(vector => {
                                            ctx.lineTo(vector.x,vector.y);          
                                    });
                                }
                                ctx.closePath();
                                ctx.stroke();
                            });
                                        
                        }
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        world.sceneComposites.forEach(composite => {
                            renderComposite(composite);
                        });
                        world.userComposites.forEach(composite => {
                            renderComposite(composite);
                        });
                    }
            }
            return render;
        }
    },
    EventEngine:{
        create:function(){
            var eventEngine={
                listeners:new Map(),
                events:[],
                addEvent:function(eventName,eventData){
                    this.events.push({eventName:eventName,eventData:eventData});
                },
                addListener:function(eventName,callback,object){
                    var currentObject=this.listeners.get(eventName);
                    
                    if (currentObject!=null){ //if exists we add the event to the map.
                        currentObject.push({callback:callback,object:object});
                        this.listeners.set(eventName,currentObject)
                    }
                    else{
                        var newObject=[];
                        newObject.push({callback:callback,object:object});
                        this.listeners.set(eventName,newObject);
                    }
                    
                },
                process:function(){
                    var event;
                    while ((event=this.events.pop())!=undefined){
                        var callbacks=this.listeners.get(event.eventName);
                        if (callbacks != undefined){
                            callbacks.forEach(callback => {
                                callback.callback(event.eventData,callback.object);
                            });
                        }
                   }
                }
            }
            return eventEngine;
        }
    },
    World:{
        create:function(eventEngine){

            var world={
                userComposites:[],
                sceneComposites:[],
                eventEngine:eventEngine,
                phisicEngine:Matter.Engine.create(),
                addUserComposite:function(composite){
                    Matter.World.addComposite(this.phisicEngine.world,composite);
                    this.userComposites.push(composite);
                },
                addSceneComposite:function(composite){
                    Matter.World.addComposite(this.phisicEngine.world,composite);
                    this.sceneComposites.push(composite);
                }
            }
            return world;
        }
    }
}