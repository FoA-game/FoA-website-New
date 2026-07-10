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
const CONVAI_SESSION_STORAGE_KEY = 'foa-convai-session-ids';

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

const conversationMessages = {};
const NPC_OPENING_MESSAGE = "Hello, welcome. What would you like to chat about?";

function getConversationSessions(){
	try {
		return JSON.parse(localStorage.getItem(CONVAI_SESSION_STORAGE_KEY) || '{}');
	} catch (error) {
		return {};
	}
}

function getConversationSessionId(npcKey){
	const sessions = getConversationSessions();
	return typeof sessions[npcKey] === 'string' && sessions[npcKey].trim() ? sessions[npcKey] : '-1';
}

function setConversationSessionId(npcKey, sessionID){
	if (typeof sessionID !== 'string' || !sessionID.trim()) {
		return;
	}

	try {
		const sessions = getConversationSessions();
		sessions[npcKey] = sessionID.trim();
		localStorage.setItem(CONVAI_SESSION_STORAGE_KEY, JSON.stringify(sessions));
	} catch (error) {
		return;
	}
}

function getConversationMessages(npcKey){
	if(!conversationMessages[npcKey]){
		conversationMessages[npcKey] = [];
	}

	return conversationMessages[npcKey];
}

function applyConversationAssets(assetPath){
	CVSL.style.setProperty('--conversation-background-image', `url('${assetPath}/background.png')`);
	NPCPFP.style.backgroundImage = `url('${assetPath}/CharacterFrame.png')`;
}

function removeMessageLoader(){
	const loader = document.getElementById('messageLoader');
	if(loader){
		loader.remove();
	}
}

async function sendMessage(message, npcKey, CharName) {
	try {
		const tempLine = document.createElement('span');
		tempLine.style.color = '#777';
		tempLine.appendChild(document.createTextNode("Message Successfully Sent."));
		tempLine.appendChild(document.createElement("br"));
		tempLine.appendChild(document.createTextNode(`Receiving transmission from ${CharName}...`));
		tempLine.id = 'messageLoader';
		document.getElementById('conversationHistory').appendChild(tempLine);

		const response = await fetch('/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				npc: npcKey,
				sessionID: getConversationSessionId(npcKey),
				message
			})
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			throw new Error(data.error || `HTTP ERROR EC:${response.status}`);
		}

		setConversationSessionId(npcKey, data.sessionID);

		removeMessageLoader();
		addMessage(CharName, data.text, npcKey);
	} catch (error) {
		console.error('REQUEST FAIL:', error);
		removeMessageLoader();
		addMessage('SYSTEM', 'REQUEST FAILURE. CHECK CONSOLE.', npcKey);
	}
}

function appendMessageToHistory(sender, message) {
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

function renderConversationHistory(npcKey){
	const messagesList = document.getElementById("conversationHistory");
	messagesList.innerHTML = "";
	getConversationMessages(npcKey).forEach(({ sender, message }) => {
		appendMessageToHistory(sender, message);
	});
}

function addMessage(sender, message, npcKey = currentNpc) {
	if(!npcKey){
		return;
	}

	getConversationMessages(npcKey).push({ sender, message });
	if(currentNpc === npcKey){
		appendMessageToHistory(sender, message);
	}
}
let currentNpc = null;

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
	currentNpc = npcKey;
	if (getConversationMessages(npcKey).length === 0) {
		addMessage(npc.name, NPC_OPENING_MESSAGE, npcKey);
	}
	renderConversationHistory(npcKey);
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
	currentNpc = null;
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
