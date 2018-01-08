var GameEngine={
    Engine:{
        create:function(world){
            console.log('createEngine');
            var engine={
                run:function(){
                    console.log('run');
                    this.init();
                    this.mainLoop();
                    this.finalize();
                },
                init:function(){
                    console.log('init');
                    this.render=GameEngine.Render.create(world);
                },
                mainLoop: function(){
                    console.log('mainLoop');
                    this.update();
                    this.render.render();
                },
                update:function(){
                    console.log('update');
                },
                finalize:function(){
                    console.log('finalize');
                }
            }
            return engine;
        }
    },
    Render:{
        create:function(world){
            console.log('createRender');
            var render={
                    render:function(){
                        console.log('render');
                        world.objects.forEach(object => {
                            console.log(object);
                    });
                }
            }
            return render;
        }
    },
    World:{
        create:function(){
            console.log('createWorld')
            var world={
                objects:[],
                addObject:function(object){
                    console.log('addObjects');
                    this.objects.push(object);
                }
            }
            return world;
        }
    }
}