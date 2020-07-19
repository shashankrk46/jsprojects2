

// const start=document.querySelector('.start');
// const pause=document.querySelector('.pause');


// start.addEventListener('click',countTiming);
// pause.addEventListener('click',pauseTiming);

// function countTiming(){
//     tick()
//     const timer=setInterval(tick,1000);
//     return timer
    
    
// }

// function tick(){
//     console.log(a++)
// }

// function pauseTiming(){
//    countTiming();
//    const x=timer
// clearInterval(x)
// }


const durationInput=document.querySelector('#duration')
const startBtn=document.querySelector('.start');
const pauseBtn=document.querySelector('.pause');

class Timer{
    constructor(durationInput,startBtn,pauseBtn){
        this.durationInput=durationInput;
        this.startBtn=startBtn;
        this.pauseBtn=pauseBtn;
        
        


        this.startBtn.addEventListener('click',this.start)
        this.pauseBtn.addEventListener('click',this.pause)
        this.durationInput.addEventListener('input',this.exactTime)
        
    }

    start=()=>{
        
        this.tick();
       this.interval= setInterval(this.tick,1000);
    }

    pause=()=>{
        
         clearInterval(this.interval)
    }

    tick=()=>{
         
      let timeRemaining=parseFloat(this.durationInput.value );
      this.durationInput.value=timeRemaining-1;
         
    }
    

}

const timer=new Timer(durationInput,startBtn,pauseBtn)



