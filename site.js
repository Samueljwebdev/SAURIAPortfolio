window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};
function track(name,data){try{window.va('event',{name:name,data:data||{}})}catch(e){}}

document.querySelectorAll('[data-track]').forEach(function(el){
  el.addEventListener('click',function(){
    track(el.dataset.track.indexOf('cta_')===0?'cta_clicked':el.dataset.track,{location:el.dataset.track});
    if(el.dataset.pick){var r=document.querySelector('input[name=want][value="'+el.dataset.pick+'"]');if(r)r.checked=true}
  });
});

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
  var c=e.target.querySelector('[data-count]');if(c&&!matchMedia('(prefers-reduced-motion:reduce)').matches){var n=+c.dataset.count,t0=performance.now();
    (function step(t){var p=Math.min(1,(t-t0)/900);c.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)})(t0)}
}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

var vid=document.getElementById('vid'),player=document.getElementById('player'),playBtn=document.getElementById('playBtn');
if(vid&&player&&playBtn){
playBtn.addEventListener('click',function(){player.classList.add('on');vid.controls=true;vid.play();track('video_played')});
vid.addEventListener('play',function(){player.classList.add('on')});
vid.addEventListener('ended',function(){track('video_finished')});
}

var form=document.getElementById('checkForm');
if(form)form.addEventListener('submit',function(e){
  e.preventDefault();
  var f=e.target,url=f.url.value.trim(),email=f.email.value.trim(),note=document.getElementById('note');
  if(!url){note.textContent='Add your website address so I know what to look at.';f.url.focus();return}
  if(!/^\S+@\S+\.\S+$/.test(email)){note.textContent='Add an email address so I can send the fixes back.';f.email.focus();return}
  var want=f.want.value;
  track('form_submitted',{form_type:want});
  var body='Page: '+url+'\nReply to: '+email+'\nI am after: '+want+'\n\nAnything else I should know:\n';
  location.href='mailto:hello@sauria.studio?subject='+encodeURIComponent(want+': '+url)+'&body='+encodeURIComponent(body);
  note.textContent='Your email app should open with the details filled in. Press send and I will reply within one working day.';
});
