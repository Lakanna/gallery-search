import{i as l,S as u}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function m(s){return s.map(({comments:t,likes:o,downloads:i,views:e,largeImageURL:r,webformatURL:a,tags:c})=>`
        <li class="gallery-item">
          <a href="${r}" class="img-container">
             <img src="${a}" alt="${c}" />
          </a>
          <ul class="tags-list">
               <li>Comments: ${t}</li>
               <li>Likes: ${o}</li>
               <li>Views: ${e} </li>
               <li>Downloads: ${i}</li>
          </ul>
        </li>`).join("")}const d="40437222-3b8e1aead0ae08f3118e12752",f="https://pixabay.com/api/";function h(s){const t=new URLSearchParams({key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});let o=`${f}?${t}`;return fetch(o).then(i=>{if(!i.ok)throw new Error(i.status);return i.json()})}const n={searchForm:document.querySelector(".js-form"),imageList:document.querySelector(".js-list"),loader:document.querySelector(".loader")};n.searchForm.addEventListener("submit",g);function g(s){s.preventDefault();let t=s.currentTarget.elements.searchImg.value.trim();if(t===""){l.show({message:"Please, input what are you searching!",color:"red",position:"topCenter"});return}n.loader.hidden=!1,console.dir(n.loader),h(t).then(({hits:o})=>{o.length===0&&l.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topCenter"}),n.imageList.innerHTML=m(o),new u(".image-list a").refresh()}).catch(o=>console.log(o)),n.loader.hidden=!0,s.target.reset()}console.log("hello");
//# sourceMappingURL=commonHelpers.js.map
