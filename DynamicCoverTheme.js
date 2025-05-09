let ca_style = document.createElement('style');
ca_style.innerHTML = `
:root {
    --primary-tc: rgb(0, 0, 0);
    --secondary-tc:rgb(255, 255, 255);
    --tertiary-tc: rgb(127, 127, 127);
    
    --spice-main: var(--primary-tc) !important; 
    --spice-main-elevated: var(--primary-tc) !important; 
    --spice-text: var(--tertiary-tc) !important; 
    --spice-subtext: var(--secondary-tc) !important;
    --spice-button-active: var(--secondary-tc) !important;
    --spice-button-disabled: var(--tertiary-tc) !important;
    --spice-button: var(--tertiary-tc) !important;
    --spice-notification: var(--tertiary-tc) !important;
    --spice-card: var(--spice-main) !important;
    --spice-sidebar: var(--secondary-tc) !important; 
    --spice-sidebar-text: var(--tertiary-tc) !important;
    --spice-tab-active: var(--primary-tc) !important;
    --spice-player: var(--primary-tc) !important;

    --previous-color: '';
    --next-color: '';
    
}

.encore-dark-theme .encore-bright-accent-set {
    --background-base: var(--primary-tc) !important;
    --background-highlight: var(--secondary-tc) !important;
    --background-press: var(--secondary-tc) !important;
}

.main-trackList-active {
    background: linear-gradient(to right, var(--secondary-tc) 0%, #ffffff00 5%, #ffffff00 95%, var(--secondary-tc) 100%) !important;
}

.lyrics-lyrics-container {
    --lyrics-color-active: var(--secondary-tc) !important;
    --lyrics-color-passed: var(--tertiary-tc) !important;
}

.progress-bar {
    --fg-color: var(--tertiary-tc) !important;
    --bg-color: rgba(255, 255, 255, 0) !important;
}
    
.main-nowPlayingBar-container {
    all: unset !important;
}

.main-contextMenu-menuItemButton, .main-actionBar-ActionBarRow button, .main-actionBar-ActionBarRow svg:not(.main-playButton-PlayButton svg), .encore-internal-color-text-subdued {
    color: var(--tertiary-tc) !important;
}



/*^DCT | DF-> */



.progress-bar {
    --progress-bar-height: 5px !important;  
    --progress-bar-radius: 5px !important;   
}

.npv-nowPlayingBar-controls {
    background-image: linear-gradient(to bottom,rgba(255, 0, 0, 0) 0%, var(--spice-main) 10%, var(--spice-main) 100%) !important;
    border-radius: 30px !important;
    padding: 30px !important;
}

.playback-bar {
    scale: 0.98 !important;
}


.npv-exitFullScreenButton-button, .Lgyj1e9c3lrdgVGlMIyV {
    color: var(--spice-text) !important;
}

.npv-track.npv-track--audio.npv-track--visible {
    scale: 3;
    margin: auto;
}

.npv-background-image__overlay{
    background-color: var(--spice-subtext) !important;
}

.npv-cover-art.npv-cover-art--audio.npv-cover-art--visible {
    
    position: static !important;
}

.npv-previous {
    scale: 0.7;
    transform-origin: center !important;
    box-shadow: 0px 0px 200px 200px var(--previous-color) !important;
}

.npv-next {
    scale: 0.7;
    transform-origin: center !important;
    box-shadow: 0px 0px 200px 200px var(--next-color) !important;
}

.npv-current {
    scale: 1;
    transform-origin: center !important;
}

.spotifyinternal-artistnpv.npv-what-is-playing.npv-cover-art{
    position: static !important;
    transform-origin: center !important;
}

.spotifyinternal-artistnpv .npv-what-is-playing__metadata{
    display: flex !important;
    justify-content: space-between !important;
    bottom: -400px !important;
    overflow: visible !important;
}

.spotifyinternal-artistnpv .npv-what-is-playing .npv-cover-art--not-expanded {
    -webkit-transform: scale(1) !important;
    transform: scale(1) !important; 
    -webkit-transform-origin: center !important;
    transform-origin: center !important;
}
`;
document.head.appendChild(ca_style);

//DynamicFullscreen (compacted)

// === OBSERVER: Adds a class to a target element ===
let observerPlay = null;
let observerFs = null;
const targetSelector = '.ylcmjHXKpwmez5_bBVgt';
const classToAdd = 'kChcaF3yz3SoL5dZPwEr';
function setupObserverPlay() {
  if (observerPlay) {
    observerPlay.disconnect();
    //log("Observerplay disconnected (re-init)", "observer");
  }

  observerPlay = new MutationObserver((mutationsList) => {
    mutationsList.forEach(() => {
      const element = document.querySelector(targetSelector);
      if (element && !element.classList.contains(classToAdd)) {
        element.classList.add(classToAdd);
      }
    });
  });

  observerPlay.observe(document.body, { childList: true, subtree: true });
  //log("Observerplay created", "observer");
}

// === OBSERVER: Handles fullscreen track DOM ===
function setupObserverFs() {
  if (observerFs) {
    observerFs.disconnect();
    //log("Observerfs disconnected (re-init)", "observer");
  }

  observerFs = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.getAttribute('data-testid') === 'fullscreen-mode-container'
        ) {
          //log("Fullscreen mode active", "observer");

          const npvTrack = document.querySelector('.npv-track');
          const lowerplayerleft = node.querySelector('.npv-nowPlayingBar-section.npv-nowPlayingBar-left');
          if (lowerplayerleft && npvTrack) {
            lowerplayerleft.appendChild(npvTrack);
          }

          const artistimage = node.querySelector('.npv-cross-fade-container.undefined');
          if (artistimage) artistimage.remove();

          const albumcontainer = document.querySelector('.npv-what-is-playing__metadata.npv-what-is-playing__metadata--docked.npv-what-is-playing__metadata--audio');
          if (albumcontainer && albumcontainer.firstElementChild) {
            const a1 = albumcontainer.firstElementChild.cloneNode(true);
            const a2 = albumcontainer.firstElementChild.cloneNode(true);
            const a3 = albumcontainer.firstElementChild.cloneNode(true);

            a1.classList.add('npv-previous');
            a2.classList.add('npv-current');
            a3.classList.add('npv-next');

            albumcontainer.firstElementChild.remove();
            albumcontainer.append(a1, a2, a3);

            a1.firstElementChild.appendChild(a1image);
            a2.firstElementChild.appendChild(a2image);
            a3.firstElementChild.appendChild(a3image);
          }
        }
      });
    });
  });

  observerFs.observe(document.body, { childList: true, subtree: true });
  //log("Observerfs created", "observer");
}

// === INIT OBSERVERS ===
setupObserverPlay();
setupObserverFs();

// === Cleanup on unload ===
window.addEventListener('beforeunload', () => {
  if (observerPlay) {
    observerPlay.disconnect();
    //log("Observerplay disconnected", "observer");
  }
  if (observerFs) {
    observerFs.disconnect();
    //log("Observerfs disconnected", "observer");
  }
});

var a1image = document.createElement('img');
a1image.classList.add('npv-cross-fade-image','npv-cross-fade--next')
var a2image = document.createElement('img');
a2image.classList.add('npv-cross-fade-image','npv-cross-fade--next')
var a3image = document.createElement('img');
a3image.classList.add('npv-cross-fade-image','npv-cross-fade--next')

//DynamicCoverTheme

const changeLights = true;
const topN = 6;

let currentShuffleState = false;

let data_next = null;
let data_next_id = "";
let isDataNextReady = false;

// == SERVER URLS ==
const serverApiUrl = [
    'https://colorapi-795373524969.us-central1.run.app',
    // 'https://albeelocal.ddns.net', secondary server (offline leave it commented)
    // 'http://localhost:5000' enable this url if you have the server docker image (5x less latency)
]
let apiTimout = 10000

let lastApiUrl = null;
 
function extractDominantColors(metadata) {
    const payload = {
        image_url: metadata.image_url,
        top_n: topN,
        album_title: metadata.album_title,
        album_artist_name: metadata.album_artist_name
    };
    //log("payload","api")
    //console.log(payload)

    async function makeRequest(url) {
        //log(url,"api")
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), apiTimout);

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            clearTimeout(timer);

            if (res.ok) {
                lastApiUrl = url;
                return await res.json();
            }
        } catch (err) {
            //log(`Failed on ${url}: `+ err.name+err.message, "network");
        }
    }

    async function fetchFromServer(path) {
        if(lastApiUrl!==null){
            //log("using already used url "+lastApiUrl, "network")
            const res = await makeRequest(lastApiUrl);
            if (res) return res;
        }
        for (const baseURL of serverApiUrl) {
            if(`${baseURL}${path}`!==lastApiUrl){
                const res = await makeRequest(`${baseURL}${path}`);
                if (res) return res;
            }
        }  
        throw new Error('All servers failed.');
    }
    
    return fetchFromServer('/dominant-colors').catch(err => log(err.message,"error"));
}

async function getGradient(metadata) {
    let data= null;
    try {
        data = await extractDominantColors(metadata);
        //log("extracted colors", "metadata")
        //console.log(data)
        return data;
    } catch (error) {
        //log('Error getting top colors:'+ error, "error");
        return null;
    }    
}

async function applyGradient(data){
    let pf_gradient = performance.now()
    if(a1image.src){
        document.documentElement.style.setProperty('--previous-color', getComputedStyle(document.documentElement).getPropertyValue('--secondary-tc').trim());
    }
    document.documentElement.style.setProperty('--next-color', '');
    document.documentElement.style.setProperty('--primary-tc', `rgb(${data.dominant_colors[0][0]}, ${data.dominant_colors[0][1]}, ${data.dominant_colors[0][2]})`);
    document.documentElement.style.setProperty('--secondary-tc', `rgb(${data.dominant_colors[1][0]}, ${data.dominant_colors[1][1]}, ${data.dominant_colors[1][2]})`);
    
    if(topN==3){
        document.documentElement.style.setProperty('--tertiary-tc', `rgb(${data.dominant_colors[2][0]}, ${data.dominant_colors[2][1]}, ${data.dominant_colors[2][2]})`);
    } else {
        const brightness = 0.299 * data.dominant_colors[0][0] + 0.587 * data.dominant_colors[0][1] + 0.114 * data.dominant_colors[0][2];
        if(brightness >= 128){
            document.documentElement.style.setProperty('--tertiary-tc', `rgb(0,0,0)`);
        }else{
            document.documentElement.style.setProperty('--tertiary-tc', `rgb(255,255,255)`);
        }
    }
    isDataNextReady = false;
    pf_gradient = performance.now() - pf_gradient
    //log(`gradient apply: ${pf_gradient} ms.`,"time");

    if(changeLights){
        //removed
    }
}

async function applyNextSongGradient() {
    let pf_gradient_total = performance.now();
    //log("Starting applyNextSongGradient", "performance");
    
    if(data_next){
        if((data_next_id === Spicetify.Player.data.item.uid) && isDataNextReady){
            applyGradient(data_next);
            if(a2image.src) {
                a1image.src = a2image.src;
            }
            a2image.src = a3image.src;
        } else {
            let metadata = Spicetify.Player.data.item.metadata;
            if(a2image.src) {
                a1image.src = a2image.src;
            }
            a2image.src = metadata.image_url;
            metadata.image_url = `https://i.scdn.co/image/${metadata.image_url.split(":")[2]}`;
            getGradient(metadata).then(result => {
                data = result;
                applyGradient(data)
            });
        }
        
    }

    pf_gradient_total = performance.now() - pf_gradient_total;
    //log(`Total gradient apply: ${pf_gradient_total} ms.`, "performance");

    let pf_while = performance.now();
    while (Spicetify.Player.data.item.uid === Spicetify.Queue.nextTracks[0].contextTrack.uid) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }
    pf_while = performance.now() - pf_while;
    //log(`While loop duration: ${pf_while} ms.`, "performance");

    updateDataOnQueue();
}

async function updateDataOnQueue() {
    //log("Updating data on queue", "network");
    try {
        let metadata = Spicetify.Queue.nextTracks[0].contextTrack.metadata;
        a3image.src = metadata.image_url;
        if (metadata.image_url.split(":")[2] !== undefined) {
            metadata.image_url = `https://i.scdn.co/image/${metadata.image_url.split(":")[2]}`;

            data_next_id = Spicetify.Queue.nextTracks[0].contextTrack.uid;

            data_next = await getGradient(metadata);
            isDataNextReady = true;
            document.documentElement.style.setProperty('--next-color', `rgb(${data_next.dominant_colors[1][0]}, ${data_next.dominant_colors[1][1]}, ${data_next.dominant_colors[1][2]})`);
        }
    } catch (error) {
        //log('Error updating data on queue: ' + error.message, "error");
    }
}

function handleShuffleChange() {
    //log("Handling shuffle change", "ui");
    const isShuffle = Spicetify.Player.getShuffle();
    if (isShuffle !== currentShuffleState) {
        currentShuffleState = isShuffle;
        updateDataOnQueue();
    }
}

function log(message, tag) {
    const styles = {
        metadata: "background-color: orange",
        observer: "background-color: green",
        time: "background-color: blue",
        api: "background-color: DarkViolet",
        observerCleanup: "background-color: red",
        performance: "background-color: purple",
        error: "background-color: red",
        network: "background-color: teal",
        ui: "background-color: pink",
        default: "color: white"
      };
    console.log("%c"+ message, styles[tag] || styles.default);
  }
  

function initiate() {
    //log("Initiate function called", "metadata");
    currentShuffleState = Spicetify.Player.getShuffle();

    let metadata = Spicetify.Player.data.item.metadata;
    if(metadata){
        a2image.src = metadata.image_url;
        //log("metadata","metadata")
        //console.log(metadata)
        metadata.image_url = `https://i.scdn.co/image/${metadata.image_url.split(":")[2]}`;
        getGradient(metadata).then(result => {
            let pf_total = performance.now()
            data = result;
            applyGradient(data)
            pf_total = performance.now() - pf_total
            //log(`gradient total apply: ${pf_total} ms.`,"time");
        });
    }
    //log("next tracks","metadata")
    //console.log(Spicetify.Queue.nextTracks[0])
    metadata = Spicetify.Queue.nextTracks[0].contextTrack.metadata;
    if(metadata){
        a3image.src = metadata.image_url;
        metadata.image_url = `https://i.scdn.co/image/${metadata.image_url.split(":")[2]}`;
    }
    data_next_id = Spicetify.Queue.nextTracks[0].contextTrack.uid;

    getGradient(metadata).then(result =>{
        data_next = result;
        document.documentElement.style.setProperty('--next-color', `rgb(${data_next.dominant_colors[1][0]}, ${data_next.dominant_colors[1][1]}, ${data_next.dominant_colors[1][2]})`);
    });

    Spicetify.Player.addEventListener('songchange', applyNextSongGradient);
    Spicetify.Player.addEventListener('queuechange', updateDataOnQueue);
    setInterval(handleShuffleChange, 1000);
}

if (Spicetify.Player.data) {
    initiate();
} else {
    const observerinit = new MutationObserver((_, observerinit) => {
        if (Spicetify.Player.data) {
            observerinit.disconnect();
            initiate();
        }
    });
    observerinit.observe(document.body, {
        childList: true,
        subtree: true
    });
}