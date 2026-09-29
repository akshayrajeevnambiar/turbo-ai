import { EnterprisePage } from "../components/EnterprisePage";
import { enterprisePages } from "../content/enterprisePages";
import openaiLogo from "../assets/technology/openai-symbol.svg";
import anthropicLogo from "../assets/technology/anthropic.svg";
import microsoftLogo from "../assets/technology/microsoft.svg";
import googleLogo from "../assets/technology/google.svg";
import nvidiaLogo from "../assets/technology/nvidia.svg";

const technologyLogos: Record<string, string> = {
  OpenAI: openaiLogo,
  Anthropic: anthropicLogo,
  Microsoft: microsoftLogo,
  Google: googleLogo,
  NVIDIA: nvidiaLogo,
};

export function GenerativeAgenticAI() {
  return <EnterprisePage content={enterprisePages.generativeAgenticAI} technologyLogos={technologyLogos} />;
}
