import { EnterprisePage } from "../components/EnterprisePage";
import { enterprisePages } from "../content/enterprisePages";
import pythonLogo from "../assets/technology/python.svg";
import githubLogo from "../assets/technology/github.svg";
import dockerLogo from "../assets/technology/docker.svg";
import kubernetesLogo from "../assets/technology/kubernetes.svg";
import terraformLogo from "../assets/technology/terraform.svg";

const technologyLogos: Record<string, string> = {
  Python: pythonLogo,
  GitHub: githubLogo,
  Docker: dockerLogo,
  Kubernetes: kubernetesLogo,
  Terraform: terraformLogo,
};

export function AIEngineeringSoftwareDevelopment() {
  return <EnterprisePage content={enterprisePages.aiEngineering} technologyLogos={technologyLogos} />;
}
