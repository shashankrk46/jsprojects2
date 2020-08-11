const {Engine,Render,Runner,World,Bodies,MouseConstraint,Mouse}=Matter;


const cells=3;
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

// maze generations

const grid=Array(cells).fill(null).map(()=>
    Array(cells).fill(false)
    );

    const verticals=Array(cells).fill(null).map(()=>
    Array(cells-1).fill(false))
    const horizontals=Array(cells-1).fill(null).map(()=>
    Array(cells).fill(false))
    

const startRow=Math.floor(Math.random()*cells);
console.log(startRow)
const startColumn=Math.floor(Math.random()*cells);
console.log(startColumn)


console.log(grid);
console.log(verticals);
console.log(horizontals);





