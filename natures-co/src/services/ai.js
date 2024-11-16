import axios from 'axios';

export const generateChatResponse = async (userMessage, apiKey) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [{ text: userMessage }],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // Ambil teks dari respons pada lokasi yang tepat
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, tidak dapat menghasilkan jawaban.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Maaf, tidak dapat menghasilkan jawaban.";
    }
};



export const chatProduct = async (userMessage, apiKey, dataAi) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `tolong tampilkan produk sesauai yang ada di dalam API berikut ini ${dataAi}`
                            },
                            {
                                text: userMessage
                            }
                        ],
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, tidak dapat menghasilkan jawaban.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Maaf, tidak dapat menghasilkan jawaban.";
    }
};
