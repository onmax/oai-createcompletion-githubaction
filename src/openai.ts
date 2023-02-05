import {Configuration, CreateCompletionResponse, OpenAIApi} from 'openai'

function checkParam(param: string, value: string): void {
  if (param === '') {
    throw new Error(
      `No ${param} provided. Please provide a ${param}. Current ${param}: ${value}`
    )
  }
}

type OpenAIOptions = {
  modelConf: {
    model: string
    prompt: string
    max_tokens?: number
    temperature?: number
  }
  apiConf: {
    apiKey: string
    organization?: string
  }
}

type GetResponse = {
  raw: CreateCompletionResponse
  texts: string[] | undefined
}

export async function getResponse({
  modelConf,
  apiConf
}: OpenAIOptions): Promise<GetResponse> {
  const {model, prompt, max_tokens = 12, temperature = 0.4} = modelConf
  checkParam('model', model)
  checkParam('prompt', prompt)

  const {apiKey, organization} = apiConf
  checkParam('openai_api_key', apiKey)

  const configuration = new Configuration({organization, apiKey})
  const openai = new OpenAIApi(configuration)

  const response = await openai.createCompletion({
    model,
    prompt,
    max_tokens,
    temperature
  })

  if (response.status !== 200) {
    throw new Error(`OpenAI responded with status code ${response.status}`)
  }

  return {
    raw: response.data,
    texts:
      (response.data.choices
        .filter(c => c.text)
        .map(choice => choice.text) as string[]) || []
  }
}
