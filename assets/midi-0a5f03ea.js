import{u as c,P as g,W as v,S as y,a as b,b as w}from"./magenta-480b022c.js";/**
 * html-midi-player@1.5.0
 * https://github.com/cifkao/html-midi-player.git
 * @author Ondřej Cífka (@cifkao)
 * @license BSD-2-Clause
 */var z=`<svg width="24" height="24" version="1.1" viewBox="0 0 6.35 6.35" xmlns="http://www.w3.org/2000/svg">
 <path d="m4.4979 3.175-2.1167 1.5875v-3.175z" stroke-width=".70201"/>
</svg>
`,S=`<svg width="24" height="24" version="1.1" viewBox="0 0 6.35 6.35" xmlns="http://www.w3.org/2000/svg">
 <path d="m1.8521 1.5875v3.175h0.92604v-3.175zm1.7198 0v3.175h0.92604v-3.175z" stroke-width=".24153"/>
</svg>
`,k=`<svg width="24" height="24" version="1.1" viewBox="0 0 6.35 6.35" xmlns="http://www.w3.org/2000/svg">
 <path transform="scale(.26458)" d="m12 3.5a8.4993 8.4993 0 0 0-8.5 8.5 8.4993 8.4993 0 0 0 8.5 8.5 8.4993 8.4993 0 0 0 8.5-8.5 8.4993 8.4993 0 0 0-8.5-8.5zm-1.4062 3.5h3v6h-3v-6zm0 8h3v2h-3v-2z"/>
</svg>
`,L=`:host {
  display: inline-block;
  width: 300px;
  margin: 3px;
  vertical-align: bottom;
  font-family: sans-serif;
  font-size: 14px;
}

:focus:not(.focus-visible) {
  outline: none;
}

.controls {
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  align-items: center;
  border-radius: 100px;
  background: #f2f5f6;
  padding: 0 0.25em;
  user-select: none;
}
.controls > * {
  margin: 0.8em 0.45em;
}
.controls input, .controls button {
  cursor: pointer;
}
.controls input:disabled, .controls button:disabled {
  cursor: inherit;
}
.controls button {
  text-align: center;
  background: rgba(204, 204, 204, 0);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  transition: background-color 0.25s ease 0s;
  padding: 0;
}
.controls button:not(:disabled):hover {
  background: rgba(204, 204, 204, 0.3);
}
.controls button:not(:disabled):active {
  background: rgba(204, 204, 204, 0.6);
}
.controls button .icon {
  display: none;
}
.controls button .icon, .controls button .icon svg {
  vertical-align: middle;
}
.controls button .icon svg {
  fill: currentColor;
}
.controls .seek-bar {
  flex: 1;
  min-width: 0;
  margin-right: 1.1em;
  background: transparent;
}
.controls .seek-bar::-moz-range-track {
  background-color: #555;
}
.controls.stopped .play-icon, .controls.playing .stop-icon, .controls.error .error-icon {
  display: inherit;
}
.controls.frozen > div, .controls > button:disabled .icon {
  opacity: 0.5;
}
.controls .overlay {
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  box-sizing: border-box;
  display: none;
  opacity: 1;
}
.controls.loading .loading-overlay {
  display: block;
  background: linear-gradient(110deg, #92929200 5%, #92929288 25%, #92929200 45%);
  background-size: 250% 100%;
  background-repeat: repeat-y;
  animation: shimmer 1.5s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: 125% 0;
  }
  100% {
    background-position: -200% 0;
  }
}`,T=`:host {
  display: block;
}

::slotted(.piano-roll-visualizer) {
  overflow-x: auto;
}`;const u=document.createElement("template");u.innerHTML=`
<style>
${L}
</style>
<div class="controls stopped frozen" part="control-panel">
  <button class="play" part="play-button" disabled>
    <span class="icon play-icon">${z}</span>
    <span class="icon stop-icon">${S}</span>
    <span class="icon error-icon">${k}</span>
  </button>
  <div part="time"><span class="current-time" part="current-time">0:00</span> / <span class="total-time" part="total-time">0:00</span></div>
  <input type="range" min="0" max="0" value="0" step="any" class="seek-bar" part="seek-bar" disabled>
  <div class="overlay loading-overlay" part="loading-overlay"></div>
</div>
`;const d=document.createElement("template");d.innerHTML=`
<style>
${T}
</style>
<slot>
</slot>
`;function r(n){const t=n<0;n=Math.floor(Math.abs(n||0));const e=n%60,i=(n-e)/60,s=(n-e-60*i)/3600,a=e>9?`${e}`:`0${e}`,m=i>9||!s?`${i}:`:`0${i}:`,f=s?`${s}:`:"";return(t?"-":"")+f+m+a}const l=["piano-roll","waterfall","staff"];class p extends HTMLElement{constructor(){super(...arguments),this.domInitialized=!1,this.ns=null,this._config={}}static get observedAttributes(){return["src","type"]}connectedCallback(){this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(d.content.cloneNode(!0)),!this.domInitialized&&(this.domInitialized=!0,this.wrapper=document.createElement("div"),this.appendChild(this.wrapper),this.initVisualizerNow())}attributeChangedCallback(t,e,i){(t==="src"||t==="type")&&this.initVisualizer()}initVisualizer(){this.initTimeout==null&&(this.initTimeout=window.setTimeout(()=>this.initVisualizerNow()))}async initVisualizerNow(){if(this.initTimeout=null,!!this.domInitialized&&(this.src&&(this.ns=null,this.ns=await c(this.src)),this.wrapper.innerHTML="",!!this.ns)){if(this.type==="piano-roll"){this.wrapper.classList.add("piano-roll-visualizer");const t=document.createElementNS("http://www.w3.org/2000/svg","svg");this.wrapper.appendChild(t),this.visualizer=new g(this.ns,t,this._config)}else if(this.type==="waterfall")this.wrapper.classList.add("waterfall-visualizer"),this.visualizer=new v(this.ns,this.wrapper,this._config);else if(this.type==="staff"){this.wrapper.classList.add("staff-visualizer");const t=document.createElement("div");this.wrapper.appendChild(t),this.visualizer=new y(this.ns,t,this._config)}}}reload(){this.initVisualizerNow()}redraw(t){this.visualizer&&this.visualizer.redraw(t,t!=null)}clearActiveNotes(){this.visualizer&&this.visualizer.clearActiveNotes()}get noteSequence(){return this.ns}set noteSequence(t){this.ns!=t&&(this.ns=t,this.removeAttribute("src"),this.initVisualizer())}get src(){return this.getAttribute("src")}set src(t){this.ns=null,this.setOrRemoveAttribute("src",t),this.initVisualizer()}get type(){let t=this.getAttribute("type");return l.indexOf(t)<0&&(t="piano-roll"),t}set type(t){if(t!=null&&l.indexOf(t)<0)throw new Error(`Unknown visualizer type ${t}. Allowed values: ${l.join(", ")}`);this.setOrRemoveAttribute("type",t)}get config(){return this._config}set config(t){this._config=t,this.initVisualizer()}setOrRemoveAttribute(t,e){e==null?this.removeAttribute(t):this.setAttribute(t,e)}}const h=["start","stop","note"],P="https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus";let o=null;class E extends HTMLElement{constructor(){super(),this.domInitialized=!1,this.needInitNs=!1,this.visualizerListeners=new Map,this.ns=null,this._playing=!1,this.seeking=!1,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(u.content.cloneNode(!0)),this.controlPanel=this.shadowRoot.querySelector(".controls"),this.playButton=this.controlPanel.querySelector(".play"),this.currentTimeLabel=this.controlPanel.querySelector(".current-time"),this.totalTimeLabel=this.controlPanel.querySelector(".total-time"),this.seekBar=this.controlPanel.querySelector(".seek-bar")}static get observedAttributes(){return["sound-font","src","visualizer"]}connectedCallback(){if(this.domInitialized)return;this.domInitialized=!0;const t=window.applyFocusVisiblePolyfill;t!=null&&t(this.shadowRoot),this.playButton.addEventListener("click",()=>{this.player.isPlaying()?this.stop():this.start()}),this.seekBar.addEventListener("input",()=>{this.seeking=!0,this.player&&this.player.getPlayState()==="started"&&this.player.pause()}),this.seekBar.addEventListener("change",()=>{const e=this.currentTime;this.currentTimeLabel.textContent=r(e),this.player&&this.player.isPlaying()&&(this.player.seekTo(e),this.player.getPlayState()==="paused"&&this.player.resume()),this.seeking=!1}),this.initPlayerNow()}attributeChangedCallback(t,e,i){if(this.hasAttribute(t)||(i=null),t==="sound-font"||t==="src")this.initPlayer();else if(t==="visualizer"){const s=()=>{this.setVisualizerSelector(i)};document.readyState==="loading"?window.addEventListener("DOMContentLoaded",s):s()}}initPlayer(t=!0){this.needInitNs=this.needInitNs||t,this.initTimeout==null&&(this.stop(),this.setLoading(),this.initTimeout=window.setTimeout(()=>this.initPlayerNow(this.needInitNs)))}async initPlayerNow(t=!0){if(this.initTimeout=null,this.needInitNs=!1,!!this.domInitialized)try{let e=null;if(t&&(this.src&&(this.ns=null,this.ns=await c(this.src)),this.currentTime=0,this.ns||this.setError("No content loaded")),e=this.ns,e)this.seekBar.max=String(e.totalTime),this.totalTimeLabel.textContent=r(e.totalTime);else{this.seekBar.max="0",this.totalTimeLabel.textContent=r(0);return}let i=this.soundFont;const s={run:a=>this.ns===e&&this.noteCallback(a),stop:()=>{}};if(i===null?this.player=new b(!1,s):(i===""&&(i=P),this.player=new w(i,void 0,void 0,void 0,s),await this.player.loadSamples(e)),this.ns!==e)return;this.setLoaded(),this.dispatchEvent(new CustomEvent("load"))}catch(e){throw this.setError(String(e)),e}}reload(){this.initPlayerNow()}start(){this._start()}_start(t=!1){(async()=>{if(this.player)if(this.player.getPlayState()=="stopped"){o&&o.playing&&!(o==this&&t)&&o.stop(),o=this,this._playing=!0;let e=this.currentTime;this.ns.notes.filter(i=>i.startTime>e).length==0&&(e=0),this.currentTime=e,this.controlPanel.classList.remove("stopped"),this.controlPanel.classList.add("playing");try{for(const s of this.visualizerListeners.keys())s.noteSequence!=this.ns&&(s.noteSequence=this.ns,s.reload());const i=this.player.start(this.ns,void 0,e);t?this.dispatchEvent(new CustomEvent("loop")):this.dispatchEvent(new CustomEvent("start")),await i,this.handleStop(!0)}catch(i){throw this.handleStop(),i}}else this.player.getPlayState()=="paused"&&this.player.resume()})()}stop(){this.player&&this.player.isPlaying()&&this.player.stop(),this.handleStop(!1)}addVisualizer(t){const e={start:()=>{t.noteSequence=this.noteSequence},stop:()=>{t.clearActiveNotes()},note:i=>{t.redraw(i.detail.note)}};for(const i of h)this.addEventListener(i,e[i]);this.visualizerListeners.set(t,e)}removeVisualizer(t){const e=this.visualizerListeners.get(t);for(const i of h)this.removeEventListener(i,e[i]);this.visualizerListeners.delete(t)}noteCallback(t){this.playing&&(this.dispatchEvent(new CustomEvent("note",{detail:{note:t}})),!this.seeking&&(this.seekBar.value=String(t.startTime),this.currentTimeLabel.textContent=r(t.startTime)))}handleStop(t=!1){if(t){if(this.loop){this.currentTime=0,this._start(!0);return}this.currentTime=this.duration}this.controlPanel.classList.remove("playing"),this.controlPanel.classList.add("stopped"),this._playing&&(this._playing=!1,this.dispatchEvent(new CustomEvent("stop",{detail:{finished:t}})))}setVisualizerSelector(t){for(const e of this.visualizerListeners.values())for(const i of h)this.removeEventListener(i,e[i]);if(this.visualizerListeners.clear(),t!=null)for(const e of document.querySelectorAll(t)){if(!(e instanceof p)){console.warn(`Selector ${t} matched non-visualizer element`,e);continue}this.addVisualizer(e)}}setLoading(){this.playButton.disabled=!0,this.seekBar.disabled=!0,this.controlPanel.classList.remove("error"),this.controlPanel.classList.add("loading","frozen"),this.controlPanel.removeAttribute("title")}setLoaded(){this.controlPanel.classList.remove("loading","frozen"),this.playButton.disabled=!1,this.seekBar.disabled=!1}setError(t){this.playButton.disabled=!0,this.seekBar.disabled=!0,this.controlPanel.classList.remove("loading","stopped","playing"),this.controlPanel.classList.add("error","frozen"),this.controlPanel.title=t}get noteSequence(){return this.ns}set noteSequence(t){this.ns!=t&&(this.ns=t,this.removeAttribute("src"),this.initPlayer())}get src(){return this.getAttribute("src")}set src(t){this.ns=null,this.setOrRemoveAttribute("src",t),this.initPlayer()}get soundFont(){return this.getAttribute("sound-font")}set soundFont(t){this.setOrRemoveAttribute("sound-font",t)}get loop(){return this.getAttribute("loop")!=null}set loop(t){this.setOrRemoveAttribute("loop",t?"":null)}get currentTime(){return parseFloat(this.seekBar.value)}set currentTime(t){this.seekBar.value=String(t),this.currentTimeLabel.textContent=r(this.currentTime),this.player&&this.player.isPlaying()&&this.player.seekTo(t)}get duration(){return parseFloat(this.seekBar.max)}get playing(){return this._playing}setOrRemoveAttribute(t,e){e==null?this.removeAttribute(t):this.setAttribute(t,e)}}window.customElements.define("midi-player",E);window.customElements.define("midi-visualizer",p);
