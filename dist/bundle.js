!function(t){var e={};function r(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(o,i,function(e){return t[e]}.bind(null,i));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e){const r=document.getElementById("myCanvas"),o=r.getContext("2d");let i=(r.width-150)/2,n=!1,l=!1;const s=new class{constructor(t,e="#0095DD"){this.radius=t,this.color=e,this.x=r.width/2,this.y=r.height-100,this.dx=5,this.dy=-5}move(){this.x+=this.dx,this.y+=this.dy}render(){o.beginPath(),o.arc(this.x,this.y,this.radius,0,2*Math.PI),o.fillStyle=this.color,o.fill(),o.closePath()}}(20);const c=new class{constructor(t="#FFFFFF"){this.fillStyle=t}render(){o.beginPath(),o.rect(i,r.height-20,150,20),o.fillStyle=this.fillStyle,o.fill(),o.closePath()}};const d=new class{constructor(t=0,e="16px Arial",r="#FFFFFF"){this.score=t,this.font=e,this.color=r}render(){o.font="16px Arial",o.fillStyle=this.color,o.fillText(`Score: ${this.score}`,8,20)}};const u=new class{constructor(t=3,e="16px Arial",r="#FFFFFF"){this.lives=t,this.font=e,this.color=r}render(){o.font="16px Arial",o.fillStyle=this.color,o.fillText(`Lives: ${this.lives}`,r.width-65,20)}},f=[];for(let t=0;t<3;t+=1){f[t]=[];for(let e=0;e<5;e+=1){const r=170*e+60,o=60*t+60;f[t][e]={x:r,y:o,status:1}}}document.addEventListener("keydown",(function(t){"Right"===t.key||"ArrowRight"===t.key?n=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(l=!0)}),!1),document.addEventListener("keyup",(function(t){"Right"===t.key||"ArrowRight"===t.key?n=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(l=!1)}),!1),document.addEventListener("mousemove",(function(t){const e=t.clientX-r.offsetLeft;e>0&&e<r.width&&(i=e-75)}),!1),function t(){o.clearRect(0,0,r.width,r.height),s.move(),s.render(o),d.render(o),u.render(o),function(){for(let t=0;t<3;t+=1)for(let e=0;e<5;e+=1)if(1===f[t][e].status){const r=f[t][e];o.beginPath(),o.rect(r.x,r.y,150,40),o.fillStyle=0===t?"#1DFF00":1===t?"#6DFF5A":"#ABFFA0",o.fill(),o.closePath()}}(),c.render(o),function(){for(let t=0;t<3;t+=1)for(let e=0;e<5;e+=1){const r=f[t][e];1===r.status&&s.x>r.x&&s.x<r.x+150&&s.y>r.y&&s.y<r.y+40+20&&(s.dy=-s.dy,r.status=0,d.score+=1,15===d.score&&(alert("YOU WIN, CONGRATS!"),document.location.reload()))}}(),(s.x+s.dx>r.width-s.radius||s.x+s.dx<s.radius)&&(s.dx=-s.dx),s.y+s.dy<s.radius?s.dy=-s.dy:s.y+s.dy>r.height-s.radius&&(s.x>i&&s.x<i+150?s.dy=-s.dy:(u.lives-=1,u.lives?(s.x=r.width/2,s.y=r.height-80,s.dx=5,s.dy=-5,i=(r.width-150)/2):(alert("GAME OVER"),document.location.reload()))),n&&i<r.width-150?i+=7:l&&i>0&&(i-=7),s.x+=s.dx,s.y+=s.dy,requestAnimationFrame(t)}()}]);