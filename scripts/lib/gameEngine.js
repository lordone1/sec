var GameEngine={
    Engine:{
        create:function(world,render){
            var engine={
                phisicEngine:Matter.Engine.create(),
                run:function(){
                    this.init();
                    function mainLoop(){
                        render.render();
                        world.eventEngine.process();
                        window.requestAnimationFrame(mainLoop);
                    };
                    mainLoop();
                },
                init:function(){
                    world.composites.forEach(composite => {
                        phisicEngine.add(phisicEngine.world,composite);
                    });
                    Matter.Engine.run(this.phisicEngine);
                }
            }
            return engine;
        }
    },
    Render:{
        create:function(world){
            var render={
                    render:function(){
                        world.composites.forEach(composite => {
                            //console.log(composite);
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
                composites:[],
                eventEngine:eventEngine,
                addComposite:function(composite){
                    this.composites.push(composite);
                }
            }
            return world;
        }
    }
}