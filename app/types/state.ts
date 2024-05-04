export interface AppState {
  screen: ScreenName
  prompt?: Prompt
}

export enum ScreenName {
  home = "home",
  settings = "settings",
  analyzeText = "analyze-text",
  analyzeMultimodal = "analyze-multimodal",
  respondText = "respondtext",
  respondMultimodal = "respondmultimodal",
}

export type Prompt =
  | {
      type: "text"
      text: string
    }
  | {
      type: "multimodal"
      text: string
      images: Array<Buffer>
      data?: {
        type: AdditionalDataType
        value: string
      }
    }

export enum AdditionalDataType {
  bitcoinAddress = "bitcoinaddress",
  lightningAddress = "lightningAddress",
  url = "url",
  unknown = "unknown",
}
