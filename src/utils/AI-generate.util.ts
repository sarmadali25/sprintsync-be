import Cerebras from '@cerebras/cerebras_cloud_sdk';

let cerebras: Cerebras | null = null;

function getCerebrasClient(): Cerebras {
  if (!cerebras) {
    const apiKey = process.env['CEREBRAS_API_KEY'];
    if (!apiKey) {
      throw new Error('CEREBRAS_API_KEY environment variable is required for AI features');
    }
    cerebras = new Cerebras({ apiKey });
  }
  return cerebras;
}

async function fetchPromptResult(prompt: string): Promise<string> {
  try {
    const client = getCerebrasClient();
    const stream = await client.chat.completions.create({
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
  } catch (error) {
    console.error('AI generation failed:', error);
    throw new Error('AI generation is currently unavailable');
  }
}

export default fetchPromptResult;