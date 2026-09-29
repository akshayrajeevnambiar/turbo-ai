import { lazy, Suspense, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AITransformation } from "./pages/AITransformation";
import { StrategicIntelligence } from "./pages/StrategicIntelligence";
import { RemoteInfrastructureManagement } from "./pages/RemoteInfrastructureManagement";
import { DigitalArchitecture } from "./pages/DigitalArchitecture";
import { CyberSecuritySolutions } from "./pages/CyberSecuritySolutions";
import { AIDataInsights } from "./pages/AIDataInsights";
import { CloudSolutions } from "./pages/CloudSolutions";
import { QualityEngineering } from "./pages/QualityEngineering";
import { GenerativeAgenticAI } from "./pages/GenerativeAgenticAI";
import { DataEngineeringAIFoundations } from "./pages/DataEngineeringAIFoundations";
import { AIEngineeringSoftwareDevelopment } from "./pages/AIEngineeringSoftwareDevelopment";
import { AIGovernanceCybersecurity } from "./pages/AIGovernanceCybersecurity";
import { CloudInfrastructureAICompute } from "./pages/CloudInfrastructureAICompute";
import { IndustriesWeServe } from "./pages/IndustriesWeServe";
import { IndustryDetail } from "./pages/IndustryDetail";
import { EnterpriseAISolutions } from "./pages/EnterpriseAISolutions";
import { ProductsIndex } from "./pages/ProductsIndex";
import { DCI360 } from "./pages/DCI360";
import { ILakehouse } from "./pages/ILakehouse";
import { ADRS } from "./pages/ADRS";
import { AboutTurboAI } from "./pages/AboutTurboAI";
import { BlogList } from "./pages/BlogList";
import { BlogPost } from "./pages/BlogPost";
import { tokens } from "./content/turboai";
import { CmsContentPage, CmsNotFound } from "./cms/CmsContentPage";
import { Helmet } from "react-helmet-async";
import { CmsProductRoute } from "./cms/CmsProductRoute";
import { CmsExistingRoute } from "./cms/CmsExistingRoute";

const page = (slug: string, content: React.ReactNode) => <CmsExistingRoute kind="page" slug={slug}>{content}</CmsExistingRoute>;
const AdminApp = lazy(() => import("./cms/AdminApp").then((module) => ({ default: module.AdminApp })));

function App() {
  const { pathname, hash } = useLocation();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  // Handle scroll to hash on route change
  useEffect(() => {
    // If there is a hash, scroll to it
    if (hash) {
      const sectionId = hash.replace("#", "");
      const scrollToSection = () => {
        if (sectionId === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = tokens.layout.headerH;
          const targetY = element.offsetTop - headerHeight;
          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      };

      // Slight delay to ensure content is rendered
      const timer1 = setTimeout(scrollToSection, 100);
      const timer2 = setTimeout(scrollToSection, 350);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // If no hash and path changed, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      {isAdmin && <Helmet><title>Turbo AI CMS</title><meta name="robots" content="noindex,nofollow" /></Helmet>}
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/admin/*" element={<Suspense fallback={<main className="min-h-screen bg-[#020617] p-10 text-white">Loading admin…</main>}><AdminApp /></Suspense>} />
        <Route path="/" element={page("home", <Home />)} />
        <Route path="/ai-transformation" element={page("ai-transformation", <AITransformation />)} />
        <Route path="/strategic-intelligence" element={page("strategic-intelligence", <StrategicIntelligence />)} />
        <Route path="/digital-architecture" element={page("digital-architecture", <DigitalArchitecture />)} />
        <Route path="/remote-infrastructure-management" element={page("remote-infrastructure-management", <RemoteInfrastructureManagement />)} />
        <Route path="/cyber-security-solutions" element={page("cyber-security-solutions", <CyberSecuritySolutions />)} />
        <Route path="/ai-data-insights" element={page("ai-data-insights", <AIDataInsights />)} />
        <Route path="/cloud-solutions" element={page("cloud-solutions", <CloudSolutions />)} />
        <Route path="/quality-engineering" element={page("quality-engineering", <QualityEngineering />)} />
        <Route path="/generative-ai-agentic-ai" element={page("generative-ai-agentic-ai", <GenerativeAgenticAI />)} />
        <Route path="/data-engineering-ai-foundations" element={page("data-engineering-ai-foundations", <DataEngineeringAIFoundations />)} />
        <Route path="/ai-engineering-software-development" element={page("ai-engineering-software-development", <AIEngineeringSoftwareDevelopment />)} />
        <Route path="/ai-governance-cybersecurity" element={page("ai-governance-cybersecurity", <AIGovernanceCybersecurity />)} />
        <Route path="/cloud-infrastructure-ai-compute" element={page("cloud-infrastructure-ai-compute", <CloudInfrastructureAICompute />)} />
        <Route path="/industries-we-serve" element={page("industries-we-serve", <IndustriesWeServe />)} />
        <Route path="/enterprise-ai-solutions" element={page("enterprise-ai-solutions", <EnterpriseAISolutions />)} />
        <Route path="/products" element={page("products", <ProductsIndex />)} />
        <Route path="/products/dci-360" element={<CmsProductRoute slug="dci-360"><DCI360 /></CmsProductRoute>} />
        <Route path="/products/i-lakehouse" element={<CmsProductRoute slug="i-lakehouse"><ILakehouse /></CmsProductRoute>} />
        <Route path="/products/adrs" element={<CmsProductRoute slug="adrs"><ADRS /></CmsProductRoute>} />
        <Route path="/products/:slug" element={<CmsContentPage kind="product" />} />
        <Route path="/about" element={page("about", <AboutTurboAI />)} />
        <Route path="/industries" element={<Navigate to="/industries-we-serve" replace />} />
        <Route path="/industries/:slug" element={<CmsExistingRoute kind="industry" appendContent={false}><IndustryDetail /></CmsExistingRoute>} />
        <Route path="/solutions/:slug" element={<CmsContentPage kind="solution" />} />
        <Route path="/blog" element={page("blog", <BlogList />)} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/:slug" element={<CmsContentPage kind="page" />} />
        <Route path="*" element={<CmsNotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
