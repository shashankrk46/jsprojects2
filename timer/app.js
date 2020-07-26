
const durationInput=document.querySelector('#duration')
const startBtn=document.querySelector('.start');
const pauseBtn=document.querySelector('.pause');
const resumeBtn=document.querySelector('.resume');
const circle=document.querySelector('circle');

const perimeter=circle.getAttribute('r')*2*Math.PI;
circle.setAttribute('stroke-dasharray',perimeter);

let duration;
// function removeFill(){
//     circle.setAttribute('fill','transparent')
// }
const timer=new Timer(durationInput,startBtn,pauseBtn,resumeBtn,{
    onStart(totalDuration){
      duration=totalDuration;
    },
    onResumed(timeRemaining){
      circle.setAttribute('stroke-dashoffset',
      perimeter*timeRemaining/duration-perimeter);
    },
    onTick(timeRemaining){
        
        circle.setAttribute('stroke-dashoffset',
        perimeter*timeRemaining/duration-perimeter);
        
    },
    onComplete(){
        console.log("completed")
        // circle.setAttribute('fill','#D4458E')
        // setTimeout(removeFill,1000)
    }
    
})



