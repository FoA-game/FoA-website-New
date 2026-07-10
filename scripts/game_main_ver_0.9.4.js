const UNBtn = document.getElementById('GT-UN');
const MCBtn = document.getElementById('GT-MC');
const LNBtn = document.getElementById('GT-LN');
const FTBtn = document.getElementById('GT-FT');
const FBBtn = document.getElementById('GT-FB');
const CGBtn = document.getElementById('GT-CG');

const navControlVariable = document.getElementById('navBar');

const CCloseBtn = document.getElementById('CbackBtn');
const CSendBtn = document.getElementById('CsendBtn');

const NPCName = document.getElementById('CprofileName');
const NPCRegion = document.getElementById('CprofileLoc');
const NPCPFP = document.getElementById('CprofilePicture');

const PILayer = document.querySelectorAll('.GterritoryContainer');
const CVSL = document.getElementById('conversationLayer');

const NPCS = {
	UPPER_NUOVARTICA: {
		region: 'UPPER NUOVARTICA',
		name: 'Ymir',
		assetPath: 'assets/UpperNuovartica'
	},
	MIRROR_CITY: {
		region: 'MIRROR CITY',
		name: 'Otto',
		assetPath: 'assets/MirrorCity'
	},
	LOWER_NUOVARTICA: {
		region: 'LOWER NUOVARTICA',
		name: 'Li',
		assetPath: 'assets/LowerNuovartica'
	},
	FORTRESS: {
		region: 'FORTRESS',
		name: 'Bdair',
		assetPath: 'assets/Fortress'
	},
	FON_BAY: {
		region: 'FON BAY',
		name: 'Eren',
		assetPath: 'assets/FonBay'
	},
	CRESCENT_GARDEN: {
		region: 'CRESCENT GARDEN',
		name: 'Lineus',
		assetPath: 'assets/CrescentGarden'
	}
};

function applyConversationAssets(assetPath){
	CVSL.style.setProperty('--conversation-background-image', `url('${assetPath}/background.png')`);
	NPCPFP.style.backgroundImage = `url('${assetPath}/CharacterFrame.png')`;
}

function removeMessageLoader(npcKey){
	const loader = document.getElementById('messageLoader');
	if(loader && (!npcKey || loader.dataset.npc === npcKey)){
		loader.remove();
	}
}

async function sendMessage(message, npcKey, CharName) {
	const conversationId = activeConversationId;
	try {
		const tempLine = document.createElement('span');
		tempLine.style.color = '#777';
		tempLine.appendChild(document.createTextNode("Message Successfully Sent."));
		tempLine.appendChild(document.createElement("br"));
		tempLine.appendChild(document.createTextNode(`Receiving transmission from ${CharName}...`));
		tempLine.id = 'messageLoader';
		tempLine.dataset.npc = npcKey;
		if(isActiveConversation(npcKey, conversationId)){
			document.getElementById('conversationHistory').appendChild(tempLine);
		}

		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				npc: npcKey,
				message
			})
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			throw new Error(data.error || `HTTP ERROR EC:${response.status}`);
		}

		removeMessageLoader(npcKey);
		if(isActiveConversation(npcKey, conversationId)){
			addMessage(CharName, data.text);
		}
	} catch (error) {
		console.error('REQUEST FAIL:', error);
		removeMessageLoader(npcKey);
		if(isActiveConversation(npcKey, conversationId)){
			addMessage('SYSTEM', 'REQUEST FAILURE. CHECK CONSOLE.');
		}
	}
}

function addMessage(sender, message) {
	const messagesList = document.getElementById("conversationHistory");
	const newMessage = document.createElement("p");
	const senderLabel = document.createElement("span");
	const messageText = document.createElement("span");

	senderLabel.textContent = `${sender}:`;
	messageText.textContent = String(message ?? "");

	if(sender === "YOU"){
		newMessage.style.textAlign = "right";
		senderLabel.style.color = "#fff";
		messageText.style.color = "#aaa";
	}else{
		senderLabel.style.color = "#acf";
		messageText.style.color = "#ddd";
	}

	newMessage.appendChild(senderLabel);
	newMessage.appendChild(document.createTextNode(" "));
	newMessage.appendChild(messageText);
	messagesList.appendChild(newMessage);
	messagesList.scrollTop = messagesList.scrollHeight;
}
let currentNpc = null;
let activeConversationId = 0;

function clearConversationHistory(){
	document.getElementById("conversationHistory").replaceChildren();
}

function isActiveConversation(npcKey, conversationId){
	return currentNpc === npcKey && activeConversationId === conversationId;
}

function openConversation(npcKey){
	const npc = NPCS[npcKey];
	if(!npc){
		return;
	}

	PILayer.forEach(button =>{
		button.style.opacity = 0;
	});
	CVSL.style.display = 'flex';
	setTimeout(function(){
		CVSL.style.opacity = 1;
		CVSL.style.height = '80vh';
	},10);
	navControl = 1;
	isAnimating = true;
	applyConversationAssets(npc.assetPath);
	slideIn(npc.name, NPCName, 500);
	slideIn(npc.region, NPCRegion, 500);
	activeConversationId++;
	currentNpc = npcKey;
	removeMessageLoader();
	clearConversationHistory();
	if(navControlVariable && !navControlVariable.classList.contains('mainNavHidden')){
		navControlVariable.classList.add('mainNavHidden');
	}
}

CCloseBtn.addEventListener('click',()=>{
	PILayer.forEach(button =>{
		button.style.opacity = 1;
	});
	navControl = 0;
	isAnimating = false;
	CVSL.style.opacity = 0;
	CVSL.style.height = '0.1vh';
	setTimeout(function(){CVSL.style.display = 'none';},300);
	CSendBtn.removeEventListener('click',()=>{});
	activeConversationId++;
	currentNpc = null;
	clearConversationHistory();
	NPCPFP.style.backgroundImage = "url('images/defaultPFP.webp')";
	CVSL.style.setProperty('--conversation-background-image', 'none');
});

UNBtn.addEventListener('click',()=> openConversation('UPPER_NUOVARTICA'));
MCBtn.addEventListener('click',()=> openConversation('MIRROR_CITY'));
LNBtn.addEventListener('click',()=> openConversation('LOWER_NUOVARTICA'));
FTBtn.addEventListener('click',()=> openConversation('FORTRESS'));
FBBtn.addEventListener('click',()=> openConversation('FON_BAY'));
CGBtn.addEventListener('click',()=> openConversation('CRESCENT_GARDEN'));

CSendBtn.addEventListener('click', () => {
	const input = document.getElementById('conversationInput');
	const message = input.value.trim();
	if (message && currentNpc) {
		addMessage('YOU', message);
		sendMessage(message, currentNpc, NPCS[currentNpc].name);
		input.value = '';
	}
});

document.getElementById('conversationInput').addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		CSendBtn.click();
	}
});
