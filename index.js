var start = document.getElementById('start');
var box=document.getElementById('box');
var score = document.getElementById('score');
var clertbox = document.getElementById('clertbox');
var clert = document.getElementById('clert');
var clertbtn = document.getElementById('clertbtn');
var minenum=10;
var mineover = 10;
var minemap=[];
var startflag=true;
bindevent();
function bindevent(){
        start.onclick = function(){
            if(startflag){
                startflag=false;
                init(); 
            }
         
        }
   
}
function init(){
    box.style.display = 'block';
    score.style.display = 'block';
    console.log(11)
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            var block = document.createElement('div');
            block.setAttribute('id',i+'-'+j);
            block.classList.add('block');
            box.appendChild(block);
            minemap.push({mine:0})
        }
    }
    var all = document.getElementsByClassName('block');
    while(minenum){
        var num = Math.floor(Math.random()*100);
        if(minemap[num].mine == 0){
            all[num].classList.add('islei');
            minemap[num].mine=1;
            minenum --;
        }
      
        console.log(all[num]);
    }
 
 
    box.oncontextmenu = function(){
        return false;
    }
    box.onmousedown = function(e){
        var event = e.target;
        if(e.which == 1){
            //left
            leftbtn(event);
        }else if(e.which == 3){
            //right
            rightbtn(event);
        }
    }
    clertbtn.onclick = function(){
        score.style.display='none';
        box.style.display='none';
        clertbox.style.display='none';
        box.innerHTML='';
        minenum=10;
        mineover=10;
        minemap=[];
        startflag=true;
    }
    function leftbtn(dom){
        if(dom&&dom.classList.contains('islei')){
            dom.classList.add('lei');
            box.onmousedown=null;
            setTimeout(function(){
                for(var i=0;i<100;i++){
                    if(all[i].classList.contains('islei')){
                        all[i].classList.add('lei');
                    }
                }
                clertbox.style.display = 'block';
                clert.style.backgroundImage='url("./img/lose.jpg")';
            },800)
           
        }else{
            //算数字
            var n =0;
            var posarr = dom&&dom.getAttribute('id').split('-');
            var posx = posarr&&(+posarr[0]);
            var posy = posarr&&(+posarr[1]);
            dom&&dom.classList.add('notlei');
            for(var i = posx-1 ;i<= posx+1;i++){
                for(var j = posy-1;j<=posy+1;j++){
                   var con = document.getElementById(i+'-'+j);
                   if(con&&con.classList.contains('islei')){
                       n++;
                   }
                }
            }
            dom&&(dom.innerText = n);
            if(n==0){  
                for(var i = posx-1 ;i<= posx+1;i++){
                    for(var j = posy-1;j<=posy+1;j++){
                      var nearbox = document.getElementById(i+'-'+j);
                      if(nearbox&&nearbox.length!=0){
                          if(!nearbox.classList.contains('check')){
                               nearbox.classList.add('check');
                               leftbtn(nearbox);
                          }
                      }   
                    }  
                }   
            }
           
        }
    }
    function rightbtn(dom){
        if(dom.classList.contains('notlei')){
            return;
        }
        dom.classList.toggle('note');
        if(dom.classList.contains('islei')&&dom.classList.contains('note')){
            mineover--
        }
        if(dom.classList.contains('islei')&&!dom.classList.contains('note')){
            mineover++
        }
        score.innerHTML = mineover;
        if(mineover == 0){
            clertbox.style.display='block';
            clert.style.backgroundImage='url("./img/win.jpeg")';
       
        }
    }
}

