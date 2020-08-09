const {Engine,Render,Runner,World,Bodies,MouseConstraint,Mouse}=Matter;

const width=600;
const height=400;
const engine=Engine.create();
const {world}=engine;
const render=Render.create({
    element:document.body,
    engine:engine,
    options:{
        wireframes:false,
        width,
        height
    }
})
Render.run(render);
Runner.run(Runner.create(),engine);

World.add(world,MouseConstraint.create(engine,{
    mouse:Mouse.create(render.canvas)
}))


// walls
const walls=[
    Bodies.rectangle(300,0,600,40,{
        isStatic:true
    }),
    Bodies.rectangle(300,400,600,40,{
        isStatic:true
    }),
    Bodies.rectangle(0,200,40,600,{
        isStatic:true
    }),
    Bodies.rectangle(600,200,40,600,{
        isStatic:true
    }),
    
]

World.add(world,walls);

// random shapes

for(let i=0;i<10;i++){
    if(Math.random()>0.5){
        World.add(world,Bodies.rectangle(Math.random()*width,Math.random()*height,50,50,{
            render:{
                fillStyle:'red'
            }
        }));  
    }else{
        World.add(world,Bodies.circle(Math.random()*width,Math.random()*height,30,{
            render:{
                fillStyle:'yellow'
            }
        }));  
    }
    
}











