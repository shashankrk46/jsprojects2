class Timer{
    constructor(durationInput,startBtn,pauseBtn,resumeBtn,callbacks){
        this.durationInput=durationInput;
        this.startBtn=startBtn;
        this.pauseBtn=pauseBtn;
        this.resumeBtn=resumeBtn;

        if(callbacks){
            this.onStart=callbacks.onStart;
            this.onTick=callbacks.onTick;
            this.onComplete=callbacks.onComplete;
            this.onResumed=callbacks.onResumed;
        }
        
        this.startBtn.addEventListener('click',this.start)
        this.pauseBtn.addEventListener('click',this.pause)  
        this.resumeBtn.addEventListener('click',this.resume)  
    }
    
    start=()=>{
        if(this.onStart){
            this.onStart(this.timeRemaining)

        }
        this.tick();
        
        this.startBtn.disabled=true;
       this.interval=setInterval(this.tick,20);
    }

    pause=()=>{
         clearInterval(this.interval)
         clearInterval(this.resAt)
         this.startBtn.disabled=true;
         this.resumeBtn.disabled=false;
        //  setInterval(this.timeRemaining=this.timeRemaining-.02,20)
    }
    resume=()=>{
        this.resumeBtn.disabled=true;  
    this.resAt=setInterval(this.res,20);
        
    }
    res=()=>{
        if(this.timeRemaining<=0){
            this.pause();
            
            this.startBtn.disabled=true;
            if(this.onComplete){
                this.onComplete();
               }
               
               location.reload();
               
           
        }else{
            
            this.timeRemaining=this.timeRemaining-.02;
            if(this.onResumed){
                this.onResumed(this.timeRemaining);
               }
        }

    }

    tick=()=>{
        
        if(this.timeRemaining<=0){
            this.pause();
            

            if(this.onComplete){
                this.onComplete();
               }
               
            location.reload();
           
        }else{
            
            this.timeRemaining=this.timeRemaining-.02;
            if(this.onTick){
                this.onTick(this.timeRemaining);
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