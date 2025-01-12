<script>
    import OpenAi from 'openai';
    
    let haiku = "Loading..."; 

    const config = {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    }
    const openai = new OpenAi(config);
    
    async function runPrompt() {
        const response = await openai.chat.completions.create({
            model: "gtp-4o-mini",
            messages: [{role: "user", content: "What is chainsaw men about"}],
        });
        haiku= response.choices[0].message.content;
    }

    runPrompt()
</script>

<p>{haiku}</p>