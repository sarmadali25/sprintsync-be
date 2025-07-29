import Cerebras from '@cerebras/cerebras_cloud_sdk';

const cerebras = new Cerebras({
  apiKey: process.env['CEREBRAS_API_KEY']
});

async function fetchPromptResult(prompt: string): Promise<string> {
  const stream = await cerebras.chat.completions.create({
    messages: [
        {
            "role": "system",
            "content": prompt
        }
    ],
    model: 'qwen-3-235b-a22b-instruct-2507',
    stream: true,
    max_completion_tokens: 20000,
    temperature: 0.7,
    top_p: 0.8
  });

  let result = '';
  for await (const chunk of stream) {
    result += (chunk as any).choices[0]?.delta?.content || '';
  }
  console.log('Ai response: ', result);
  
  return result;
}

export default fetchPromptResult;