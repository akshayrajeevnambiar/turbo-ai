import { lazy, Suspense, useEffect } from "react";
import { Navigate, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { tokens } from "./content/turboai";
import { CmsContentPage, CmsNotFound } from "./cms/CmsContentPage";
import { Helmet } from "react-helmet-async";
import { CmsProductRoute } from "./cms/CmsProductRoute";
import { CmsExistingRoute } from "./cms/CmsExistingRoute";

const page = (slug: string, content: React.ReactNode) => <CmsExistingRoute kind="page" slug={slug}>{content}</CmsExistingRoute>;
const AdminApp = lazy(() => import("./cms/AdminApp").then((module) => ({ default: module.AdminApp })));
// Keep the homepage immediate; other pages are downloaded when their route is opened.
const AITransformation = lazy(() => import("./pages/AITransformation").then((module) => ({ default: module.AITransformation })));
const StrategicIntelligence = lazy(() => import("./pages/StrategicIntelligence").then((module) => ({ default: module.StrategicIntelligence })));
const RemoteInfrastructureManagement = lazy(() => import("./pages/RemoteInfrastructureManagement").then((module) => ({ default: module.RemoteInfrastructureManagement })));
const DigitalArchitecture = lazy(() => import("./pages/DigitalArchitecture").then((module) => ({ default: module.DigitalArchitecture })));
const CyberSecuritySolutions = lazy(() => import("./pages/CyberSecuritySolutions").then((module) => ({ default: module.CyberSecuritySolutions })));
const AIDataInsights = lazy(() => import("./pages/AIDataInsights").then((module) => ({ default: module.AIDataInsights })));
const CloudSolutions = lazy(() => import("./pages/CloudSolutions").then((module) => ({ default: module.CloudSolutions })));
const QualityEngineering = lazy(() => import("./pages/QualityEngineering").then((module) => ({ default: module.QualityEngineering })));
const GenerativeAgenticAI = lazy(() => import("./pages/GenerativeAgenticAI").then((module) => ({ default: module.GenerativeAgenticAI })));
const DataEngineeringAIFoundations = lazy(() => import("./pages/DataEngineeringAIFoundations").then((module) => ({ default: module.DataEngineeringAIFoundations })));
const AIEngineeringSoftwareDevelopment = lazy(() => import("./pages/AIEngineeringSoftwareDevelopment").then((module) => ({ default: module.AIEngineeringSoftwareDevelopment })));
const AIGovernanceCybersecurity = lazy(() => import("./pages/AIGovernanceCybersecurity").then((module) => ({ default: module.AIGovernanceCybersecurity })));
const CloudInfrastructureAICompute = lazy(() => import("./pages/CloudInfrastructureAICompute").then((module) => ({ default: module.CloudInfrastructureAICompute })));
const IndustriesWeServe = lazy(() => import("./pages/IndustriesWeServe").then((module) => ({ default: module.IndustriesWeServe })));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail").then((module) => ({ default: module.IndustryDetail })));
const EnterpriseAISolutions = lazy(() => import("./pages/EnterpriseAISolutions").then((module) => ({ default: module.EnterpriseAISolutions })));
const ProductsIndex = lazy(() => import("./pages/ProductsIndex").then((module) => ({ default: module.ProductsIndex })));
const DCI360 = lazy(() => import("./pages/DCI360").then((module) => ({ default: module.DCI360 })));
const ILakehouse = lazy(() => import("./pages/ILakehouse").then((module) => ({ default: module.ILakehouse })));
const ADRS = lazy(() => import("./pages/ADRS").then((module) => ({ default: module.ADRS })));
const AboutTurboAI = lazy(() => import("./pages/AboutTurboAI").then((module) => ({ default: module.AboutTurboAI })));
const BlogList = lazy(() => import("./pages/BlogList").then((module) => ({ default: module.BlogList })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((module) => ({ default: module.BlogPost })));

// Run scroll effects after the route's lazy content has mounted.
function RouteScroll() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Unlike DOM attributes, this cannot be mistaken for stale prerendered HTML.
    // The prerenderer also checks that route and CMS loading states have cleared.
    (window as Window & { __TURBOAI_RENDERED_PATH__?: string }).__TURBOAI_RENDERED_PATH__ = pathname;
  }, [pathname]);

  // Handle scroll to hash on route change
  useEffect(() => {
    // Keep bookmarked hero links working with a clean homepage URL.
    if (pathname === "/" && hash === "#hero") {
      navigate({ pathname, search, hash: "" }, { replace: true });
      return;
    }

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

      // Allow layout to settle, including after a CMS response mounts the page.
      const timers: ReturnType<typeof setTimeout>[] = [];
      const scheduleScroll = () => {
        timers.push(setTimeout(scrollToSection, 100), setTimeout(scrollToSection, 350));
      };
      const root = document.getElementById("root");
      const loadingSelector = "[data-route-loading], [data-cms-loading]";
      let observer: MutationObserver | undefined;
      if (sectionId !== "hero" && !document.getElementById(sectionId) && root && document.querySelector(loadingSelector)) {
        observer = new MutationObserver(() => {
          if (!document.querySelector(loadingSelector)) {
            observer?.disconnect();
            if (document.getElementById(sectionId)) scheduleScroll();
          }
        });
        observer.observe(root, { childList: true, subtree: true });
        timers.push(setTimeout(() => observer?.disconnect(), 30000));
      } else {
        scheduleScroll();
      }
      return () => {
        timers.forEach(clearTimeout);
        observer?.disconnect();
      };
    } else {
      // If no hash and path changed, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash, navigate]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {isAdmin && <Helmet><title>Turbo AI CMS</title><meta name="robots" content="noindex,nofollow" /></Helmet>}
      {!isAdmin && <Header />}
      <Suspense fallback={<main data-route-loading className="min-h-screen bg-[#020617] pt-40 text-center text-slate-300" role="status">Loading...</main>}>
        <Routes>
          <Route path="/admin/*" element={<Suspense fallback={<main className="min-h-screen bg-[#020617] p-10 text-white">Loading admin…</main>}><AdminApp /></Suspense>} />
          <Route path="/" element={page("home", <Home />)} />
          <Route path="/index.php" element={<Navigate to="/" replace />} />
          <Route path="/offshore-development" element={<Navigate to="/ai-engineering-software-development" replace />} />
          <Route path="/404" element={<CmsNotFound resolveRedirects={false} />} />
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
        <RouteScroll />
      </Suspense>
      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
