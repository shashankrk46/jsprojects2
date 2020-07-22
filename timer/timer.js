class Timer{
    constructor(durationInput,startBtn,pauseBtn,callbacks){
        this.durationInput=durationInput;
        this.startBtn=startBtn;
        this.pauseBtn=pauseBtn;

        if(callbacks){
            this.onStart=callbacks.onStart;
            this.onTick=callbacks.onTick;
            this.onComplete=callbacks.onComplete;
        }
        
        this.startBtn.addEventListener('click',this.start)
        this.pauseBtn.addEventListener('click',this.pause)
  
        
    }

    start=()=>{
        if(this.onStart){
            this.onStart()
        }
        this.tick();
       this.interval= setInterval(this.tick,50);
    }

    pause=()=>{
        
         clearInterval(this.interval)
    }

    tick=()=>{
        
        if(this.timeRemaining<=0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
               }
        }else{
            this.timeRemaining=this.timeRemaining-0.5;
            if(this.onTick){
                this.onTick();
               }
        }
         
    //   const timeRemaining=this.timeRemaining;
      
    }
    get timeRemaining(){
       return parseFloat(this.durationInput.value );
    }
    set timeRemaining(time){
        this.durationInput.value=time.toFixed(2);
    }

}