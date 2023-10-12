(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const y="https://random-word.ryanrk.com",p=async()=>{try{const o=await fetch(`${y}/api/en/word/random/?length=5`);if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);const t=await o.json();return console.log(t[0]),t[0]}catch(o){console.error(o)}};let i="";(async()=>i=(await p()).toUpperCase())();let s=1,c=1,d=!1,f=!1;document.addEventListener("keyup",o=>{o.preventDefault(),console.log(o.code);let t=document.querySelector(`.box-container-${c}>.box-${s}`),r=document.querySelector(`.box-container-${c}>.box-5`);d||(o.code>="KeyA"&&o.code<="KeyZ"?t.textContent===""&&(t.textContent=`${o.code[3]}`,t.style.border="transparent",setTimeout(()=>{t.style.border="2px solid #fff"},50),s<5&&s++,console.log(s)):o.code==="Backspace"?(t.innerHTML===""&&s>1&&(s--,t=document.querySelector(`.box-container-${c}>.box-${s}`)),t.style.border="transparent",setTimeout(()=>{t.style.border="2px solid #fff"},50),t.innerHTML=""):o.code==="Enter"&&(s<5||r.textContent===""?u():b()))});function b(){let o=document.querySelectorAll(`.box-container-${c}>.box`),t=[];for(const r of o)t.push(r.innerText);t.join("")===i&&(f=!0,u()),t.forEach((r,l)=>{const e=document.querySelector(`.box-container-${c}>.box-${l+1}`);r===i[l]?(e.style.backgroundColor="#15903e",e.style.color="#fff"):i.includes(r)?(e.style.backgroundColor="#908815",e.style.color="#fff"):(e.style.backgroundColor="#901915",e.style.color="#fff")}),s=1,c+=1}function u(){let o=document.querySelector(".back-filter"),t=document.getElementById("modal"),r=document.querySelector(".close-btn"),l=document.querySelector(".modal-container");o.style.display="block",t.style.display="block",d=!0,f?l.innerHTML=`
    <div class="text-box">
    <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
    <p>
      ${c}번 만에 <br />
      정답!!
    </p>
    <i class="fa-solid fa-champagne-glasses" style="color: #908815"></i>
  </div>
  <div class="button-box">
    <button>다시하기</button>
    <button>기록보기</button>
  </div>`:l.innerHTML=`
    <div class="text-box">
    <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: #901915" ></i>
    <p>
      5글자를 입력해주세요 !!
    </p>
    <i class="fa-sharp fa-solid fa-circle-exclamation" style="color: #901915" ></i>
  </div>
  <div class="button-box">
  </div>`,r==null||r.addEventListener("click",e=>{e.preventDefault(),o.style.display="none",t.style.display="none",d=!1})}
