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
        wireframes:true,
        width,
        height
    }
})
Render.run(render);
Runner.run(Runner.create(),engine);


// walls
const walls=[
    Bodies.rectangle(width/2,0,width,40,{
        isStatic:true
    }),
    Bodies.rectangle(width/2,height,width,40,{
        isStatic:true
    }),
    Bodies.rectangle(0,height/2,40,width,{
        isStatic:true
    }),
    Bodies.rectangle(width,height/2,40,width,{
        isStatic:true
    }),
    
]

World.add(world,walls);

// maze generations

const shuffle=(arr)=>{
    let counter=arr.length;
    console.log(counter);

    while(counter>0){
        const index=Math.floor(Math.random()*counter);
        console.log(index)
        counter--;
        console.log(counter--)

        const temp=arr[counter];
        console.log(temp)
        arr[counter]=arr[index];
        arr[index]=temp;
    }
    return arr;
}

const grid=Array(cells).fill(null).map(()=>
    Array(cells).fill(false)
    );

    const verticals=Array(cells).fill(null).map(()=>
    Array(cells-1).fill(false))
    const horizontals=Array(cells-1).fill(null).map(()=>
    Array(cells).fill(false))
    

const startRow=Math.floor(Math.random()*cells);

const startColumn=Math.floor(Math.random()*cells);


const stepThoughCell=(row,column)=>{
    // if i have vissited the cell at[row,column],the return 
    if(grid[row][column]){
        return true
    }
    // mark this cell as being visted
    grid[row][column]=true;

    // assemble randomly-ordered list of neighbours
      const neighbors=shuffle([
          [row - 1,column],
          [row,column + 1],
          [row + 1,column],
          [row,column - 1]
      ])
      console.log(neighbors)
    // for each neighbours
    // see if that neighbour is out of bounds
    // if we have visted that neighbour,contine to nect neighbour
    // remove a wall from either horizontals or verticals
    // visit that nect cell
}
// console.log(stepThoughCell(1,1))
stepThoughCell(1,1)








