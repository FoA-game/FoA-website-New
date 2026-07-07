const CONVAI_API_URL = 'https://api.convai.com/character/getResponse';
const NPC_CONFIG = {
	UPPER_NUOVARTICA: {
		characterId: 'c8b71aa2-d42c-11ed-be15-42010a7c4003'
	},
	MIRROR_CITY: {
		characterId: 'f6b51484-71d6-11ee-9277-42010a40000e'
	},
	LOWER_NUOVARTICA: {
		characterId: '38e6efc6-676f-11ed-8762-42010a80000c'
	},
	FORTRESS: {
		characterId: '7e5dcdda-6522-11ed-af42-42010a80000c'
	},
	FON_BAY: {
		characterId: 'd0da9298-6a7f-11ed-8071-42010a80000c'
	},
	CRESCENT_GARDEN: {
		characterId: 'e5a30300-6a92-11ed-9d3d-42010a80000c'
	}
};

module.exports = async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const apiKey = process.env.CONVAI_API_KEY;
	if (!apiKey) {
		return res.status(500).json({ error: 'CONVAI_API_KEY is not configured' });
	}

	const { npc, message, sessionID } = req.body || {};
	const npcConfig = NPC_CONFIG[npc];

	if (!npcConfig) {
		return res.status(400).json({ error: 'Unknown NPC' });
	}

	if (typeof message !== 'string' || !message.trim()) {
		return res.status(400).json({ error: 'Message is required' });
	}

	const payload = new URLSearchParams({
		userText: message.trim(),
		charID: npcConfig.characterId,
		sessionID: typeof sessionID === 'string' && sessionID.trim() ? sessionID.trim() : '-1',
		voiceResponse: 'false'
	});

	try {
		const convaiResponse = await fetch(CONVAI_API_URL, {
			method: 'POST',
			headers: {
				'CONVAI-API-KEY': apiKey
			},
			body: payload
		});

		const data = await convaiResponse.json().catch(() => ({}));

		if (!convaiResponse.ok) {
			return res.status(convaiResponse.status).json({
				error: data.error || 'Convai request failed'
			});
		}

		return res.status(200).json({
			text: data.text || '',
			sessionID: data.sessionID || payload.get('sessionID')
		});
	} catch (error) {
		console.error('Convai proxy error:', error);
		return res.status(500).json({ error: 'Convai request failed' });
	}
};
