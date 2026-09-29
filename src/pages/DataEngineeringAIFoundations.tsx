import { EnterprisePage } from "../components/EnterprisePage";
import { enterprisePages } from "../content/enterprisePages";
import apacheIcebergLogo from "../assets/technology/apache-iceberg.svg";
import databricksLogo from "../assets/technology/databricks.svg";
import snowflakeLogo from "../assets/technology/snowflake.svg";
import apacheSparkLogo from "../assets/technology/apache-spark.svg";
import nvidiaLogo from "../assets/technology/nvidia.svg";

const technologyLogos: Record<string, string> = {
  "Apache Iceberg": apacheIcebergLogo,
  Databricks: databricksLogo,
  Snowflake: snowflakeLogo,
  "Apache Spark": apacheSparkLogo,
  NVIDIA: nvidiaLogo,
};

export function DataEngineeringAIFoundations() {
  return <EnterprisePage content={enterprisePages.dataFoundations} technologyLogos={technologyLogos} technologyLogoOnly={["Apache Iceberg"]} />;
}
