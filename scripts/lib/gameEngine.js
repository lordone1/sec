var GameEngine={
    Engine:{
        create:function(world,render){
            var engine={
                run:function(){
                    this.mainLoop();
                    window.requestAnimationFrame(this.mainLoop);
                },
                mainLoop: function(){
                    render.render();
                    world.eventEngine.process();
                }
            }
            return engine;
        }
    },
    Render:{
        create:function(world){
            var render={
                    render:function(){
                        world.objects.forEach(object => {
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
                objects:[],
                eventEngine:eventEngine,
                addObject:function(object){
                    this.objects.push(object);
                }
            }
            return world;
        }
    }
}