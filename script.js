let current="intro", audioCtx=null;
const screens=[...document.querySelectorAll(".screen")];

function particles(){
  const box=document.getElementById("particles");
  for(let i=0;i<42;i++){
    const s=document.createElement("i"); s.className="spark";
    s.style.left=Math.random()*100+"%"; s.style.animationDuration=(6+Math.random()*9)+"s";
    s.style.animationDelay=(-Math.random()*12)+"s"; s.style.opacity=.2+Math.random()*.7;
    box.appendChild(s);
  }
}
particles();

function startSound(){
  try{
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    const gain=audioCtx.createGain(); gain.gain.value=.025; gain.connect(audioCtx.destination);
    [261.63,329.63,392,523.25].forEach((f,i)=>{
      const o=audioCtx.createOscillator(); o.type="sine"; o.frequency.value=f;
      o.connect(gain); o.start(audioCtx.currentTime+i*.12); o.stop(audioCtx.currentTime+1.8+i*.12);
    });
  }catch(e){}
}
function startExperience(){startSound();go("reveal")}
function go(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active"); current=id;
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="letter") setTimeout(()=>document.querySelector(".letter-wrap").scrollIntoView({block:"center"}),80);
}
function openLetter(){
  const wrap=document.querySelector(".letter-wrap");
  wrap.classList.add("letter-open");
  const text="Ananya, birthday par bas itna bolunga ki tu meri life ke un logon mein se hai jinke saath chhoti chhoti cheezein bhi yaad reh jaati hain. Teri bakbak, tera pagalpan aur tera woh random sa attitude — sab apni jagah special hai. 😂🩷 Bas hamesha khush reh, apne dreams ke peeche bhaag, aur jab bhi life thodi boring lage na… yaad rakhna ki tera ek pagal dost yahan hamesha bakchodi ke liye available hai. 😭🫶";
  const el=document.getElementById("typed"); el.textContent="";
  let i=0; const timer=setInterval(()=>{el.textContent+=text[i++]||"";if(i>=text.length)clearInterval(timer)},18);
}
function blowCandles(){
  document.querySelector("#cake .cake-scene").classList.add("no-flames");
  confetti();
  setTimeout(()=>go("wish"),1200);
}
function confetti(){
  const box=document.getElementById("fireworks");
  for(let b=0;b<7;b++){
    const burst=document.createElement("div"); burst.className="burst";
    const shadows=[];
    for(let i=0;i<24;i++){
      const a=Math.PI*2*i/24, r=55+Math.random()*90;
      const x=Math.cos(a)*r, y=Math.sin(a)*r;
      shadows.push(`${x}px ${y}px 0 1px #ff${(70+Math.floor(Math.random()*120)).toString(16)}${(130+Math.floor(Math.random()*90)).toString(16)}`);
    }
    burst.style.left=(20+Math.random()*60)+"%"; burst.style.top=(20+Math.random()*55)+"%";
    burst.style.setProperty("--sh",shadows.join(","));
    box.appendChild(burst); setTimeout(()=>burst.remove(),1400);
  }
                  }
