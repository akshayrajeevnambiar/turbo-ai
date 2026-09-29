import { EnterprisePage } from "../components/EnterprisePage";
import { enterprisePages } from "../content/enterprisePages";
import microsoftAzureLogo from "../assets/technology/microsoft-azure.svg";
import googleCloudLogo from "../assets/technology/google-cloud.svg";
import nvidiaLogo from "../assets/technology/nvidia.svg";
import kubernetesLogo from "../assets/technology/kubernetes.svg";

const technologyLogos: Record<string, string> = {
  "Microsoft Azure": microsoftAzureLogo,
  "Google Cloud": googleCloudLogo,
  NVIDIA: nvidiaLogo,
  Kubernetes: kubernetesLogo,
};

export function CloudInfrastructureAICompute() {
  return <EnterprisePage content={enterprisePages.cloudCompute} technologyLogos={technologyLogos} />;
}
