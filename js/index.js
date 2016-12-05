//Canvas version
$(function() {
  var ctx = clock.getContext('2d');
  var h = clock.height;
  var w = clock.width;
  var lmin = Math.min(h, w);
  var r = lmin/2 - lmin*0.05;
  var run = false;
  var workMin = $('#work-range').val();
  var pauseMin = $('#pause-range').val();
  var min = 1;
  var sec = 1;
  var timer = 0;
  var perc = 0;
  var pause = false;
  
  ctx.strokeStyle = '#FFF';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#FFF';
  ctx.textAlign = "center";
  
  //Initialize text. setTimeOut is needed in order to give enough time to the canvas for loading the font.
  setTimeout(function() {
    ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
    ctx.textBaseline = "ideographic";
    ctx.fillText(workMin+':00', w/2, h/2+lmin*0.075);
    ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
    ctx.textBaseline = "top";
    ctx.fillText(pauseMin+':00', w/2, h/2+lmin*0.075);
  }, 150);
  
  //IE doesn't seem to support the input event, however it work with the the change event.
  $('#work-range, #pause-range').on("input change", function() {
    workMin = $('#work-range').val();
    pauseMin = $('#pause-range').val();
    min = 1;
    sec = 1;
    perc = 0;
    
    //Clear the canvas before drawing on it;
    ctx.clearRect(0,0,250,250);
    
    //Update the text;
    ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
    ctx.textBaseline = "ideographic";
    ctx.fillText(workMin+':00', w/2, h/2+lmin*0.075);
    ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
    ctx.textBaseline = "top";
    ctx.fillText(pauseMin+':00', w/2, h/2+lmin*0.075);
    });
  
  $('#clock').click(function() {
  if(run === false) {
    run = true;

    $('#work-range, #pause-range').prop('disabled', true);
    
    //Update the timer;
    timer = setInterval(function() {      
      //Clear the canvas before drawing on it;
      ctx.clearRect(0,0,250,250);
      
      //Work time...
      if(pause === false) {
        //Update the circle;
        ctx.beginPath();
        ctx.arc(w/2, h/2, r, -Math.PI/2, 2*(++perc/(workMin*60))*Math.PI-Math.PI/2);
        ctx.stroke();
        
        //Update the text;
        if(sec === 60 && min == workMin) {
          document.querySelector('#bell').play();
          
          ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "ideographic";
          ctx.fillText(pauseMin+':00', w/2, h/2+lmin*0.075);
          ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "top";
          ctx.fillText(workMin+':00', w/2, h/2+lmin*0.075);
          
          perc = 0;
          pause = true;
          sec = 1;
          min = 1;
        }
        else if(sec === 60){
          ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "ideographic";
          ctx.fillText(workMin-min+':00', w/2, h/2+lmin*0.075);
          ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "top";
          ctx.fillText(pauseMin+':00', w/2, h/2+lmin*0.075);
          
          min++;
          sec = 1;
        }
        else {
          ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "ideographic";
          ctx.fillText((workMin-min)+':'+(60-sec), w/2, h/2+lmin*0.075);
          ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "top";
          ctx.fillText(pauseMin+':00', w/2, h/2+lmin*0.075);
          
          sec++;
        }  
      }
      
      //Pause time!
      else {
        //Update the circle;
        ctx.beginPath();
        ctx.arc(w/2, h/2, r, 2*(++perc/(pauseMin*60))*Math.PI-Math.PI/2, 2*Math.PI-Math.PI/2);
        ctx.stroke();
        
        //Update the text;
        if(sec === 60 && min == pauseMin) {
          document.querySelector('#bell').play();
        
          ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "ideographic";
          ctx.fillText(workMin+':00', w/2, h/2+lmin*0.075);
          ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "top";
          ctx.fillText(pauseMin+':00', w/2, h/2+lmin*0.075);
          
          perc = 0;
          pause = false;
          sec = 1;
          min = 1;
        }
        else if(sec === 60){
          ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "ideographic";
          ctx.fillText(pauseMin-min+':00', w/2, h/2+lmin*0.075);
          ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "top";
          ctx.fillText(workMin+':00', w/2, h/2+lmin*0.075);
          
          min++;
          sec = 1;
        }
        else {
          ctx.font = lmin*0.15+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "ideographic";
          ctx.fillText((pauseMin-min)+':'+(60-sec), w/2, h/2+lmin*0.075);
          ctx.font = lmin*0.075+"px 'Poiret One', 'Arial'";
          ctx.textBaseline = "top";
          ctx.fillText(workMin+':00', w/2, h/2+lmin*0.075);
          
          sec++;
        }
      }
    }, 1000);
  }
  else {
    run = false;
    $('#work-range, #pause-range').prop('disabled', false);
    return clearInterval(timer);
    }
  });
});