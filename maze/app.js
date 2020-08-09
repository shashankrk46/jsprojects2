const {Engine,Render,Runner,World,Bodies}=Matter;

const engine=Engine.create();
const {world}=engine;
const render=Render.create({
    element:document.body,
    engine:engine,
    options:{
        width:600,
        height:400
    }
})
Render.run(render);
Runner.run(Runner.create(),engine)

const shape=Bodies.rectangle(100,100,50,100,{
    isStatic:true
});

World.add(world,shape);




