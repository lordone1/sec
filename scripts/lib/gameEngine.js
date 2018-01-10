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
                addEvent:function(eventName,object){
                    this.events.push({eventName:eventName,on:object});
                },
                addListener:function(eventName,callback){
                    this.listeners.set(eventName,callback);
                },
                process:function(){
                    var event;
                    while ((event=this.events.pop())!=undefined){
                        var callback=this.listeners.get(event.eventName);
                        if (callback != undefined){
                            callback(event.on);
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