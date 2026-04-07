export default function handler(req, res) {
    // CORS হেডার সেট করো
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { message } = req.body;
    let reply = "";
    
    const msg = message.toLowerCase();
    
    // বাংলা রুলস
    if (msg.includes("হ্যালো") || msg.includes("সালাম") || msg.includes("হাই")) {
        reply = "ওহে! 👋 কেমন আছো? আমি তোমার চ্যাটবট।";
    }
    else if (msg.includes("কেমন আছ") || msg.includes("কী অবস্থা")) {
        reply = "আমি দারুণ আছি! তুমি কেমন আছো? 😊";
    }
    else if (msg.includes("নাম")) {
        reply = "আমার নাম চ্যাটবট! তুমি যেকোনো প্রশ্ন করতে পারো।";
    }
    else if (msg.includes("সাহায্য") || msg.includes("হেল্প")) {
        reply = "আমি যা জানি: \n- হ্যালো বলা \n- নাম জানা \n- কিছু সাধারণ প্রশ্নের উত্তর। তুমি কী জানতে চাও?";
    }
    else if (msg.includes("ধন্যবাদ") || msg.includes("থ্যাংকস")) {
        reply = "আমাকে ধন্যবাদ দিয়েছ? সত্যি? ধন্যবাদ! 🤗";
    }
    else if (msg.includes("ভালোবাসি") || msg.includes("লাভ")) {
        reply = "আমিও তোমায় ❤️! (যদিও আমি একটা বট) 😄";
    }
    else {
        reply = "দুঃখিত, আমি এখনো এটা শিখিনি। তুমি কি অন্য কিছু জানতে চাও? আমার সাথে 'সাহায্য' লিখে দেখো।";
    }
    
    res.status(200).json({ reply });
}
