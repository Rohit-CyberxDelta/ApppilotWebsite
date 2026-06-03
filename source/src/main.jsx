import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Bot, Check, ChevronRight,
  CircleDollarSign, Clock, Database, FileKey2, Gauge, KeyRound, Lock, Play,
  RefreshCw, Search, Shield, ShieldCheck, Sparkles, Upload, Users, Building2, Linkedin,
  Workflow, X, Zap
} from "lucide-react";
import "./styles.css";
import logoIconUrl from "./assets/apppilot-logo-icon.png";
import logoFullUrl from "./assets/apppilot-logo-transparent.png";

// --- Data ---
const painPoints = [
  { icon: Clock, title: "Weeks of SAML Debugging", copy: "Teams waste weeks chasing XML misconfigurations, attribute mapping errors, and broken SSO flows across multiple identity consoles." },
  { icon: RefreshCw, title: "Manual Certificate Rotation Nightmares", copy: "Expiring certificates cause midnight outages. Manual rotation across providers is error-prone, unscalable, and invisible until it's too late." },
  { icon: Database, title: "Identity Silos Everywhere", copy: "Okta, PingOne, and Entra ID — each lives in its own console with no unified view, no shared governance, and no single pane of truth." },
];

const features = [
  { icon: Zap, title: "One-Click Orchestration", copy: "Deploy SAML 2.0 and OIDC applications to Okta, PingOne, or Entra ID with a single API call. No more console hopping.", tag: "Deploy" },
  { icon: Sparkles, title: "AI-Powered Assistance", copy: "Detects misconfigurations early and suggests fixes before they impact production access.", tag: "Intelligence" },
  { icon: FileKey2, title: "Automated Certificate Rotation", copy: "Zero-downtime certificate updates. We link your new verification certificates automatically so you never miss an expiry.", tag: "Security" },
  { icon: BarChart3, title: "Unified Analytics", copy: "A single pane of glass for your entire identity workspace across Okta, PingOne, and Entra ID.", tag: "Observability" },
];

const workflowSteps = [
  ["01", "Intake", "app name, identity provider (Okta, PingOne, or Entra ID), category..."],
  ["02", "Recommend", "AppPilot suggests SAML and OIDC settings, claims, and scopes using AI."],
  ["03", "Deploy", "IAM operators validate and provision the integration into your IdP through one guided flow."],
  ["04", "Operate", "The app is continuously governed with analytics, certificate monitoring, and lifecycle actions."],
];

const outcomes = [
  ["Faster app launches", "Replace incomplete tickets and repeated clarification loops with a structured identity workflow."],
  ["Cleaner governance", "Make provider, protocol, access, certificate, and ownership decisions visible from day one."],
  ["Executive confidence", "Give leadership a clear operating view of app integrations, deployment health, and certificate risk."],
];

const identityProviders = [
  { name: "Okta", sub: "SSO & MFA" },
  { name: "PingOne", sub: "Identity Platform" },
  { name: "Entra ID", sub: "Microsoft Identity" },
];

// --- Hooks ---
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useAnimatedCounter(end, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return [value, ref];
}

// --- Components ---
function Logo({ variant = "icon", size = 40, className = "" }) {
  const src = variant === "full" ? logoFullUrl : logoIconUrl;
  const style =
    variant === "full"
      ? { height: size, width: "auto" }
      : { width: size, height: size };

  return (
    <img
      src={src}
      alt="AppPilot"
      className={`apppilot-logo ${className}`}
      style={style}
      loading="eager"
      decoding="async"
    />
  );
}

function BrandLockup({ iconSize = 36, showTagline = false }) {
  return (
    <div className={`brand-lockup ${showTagline ? "with-tagline" : ""}`}>
      <Logo size={iconSize} className="brand-logo-img" />
      <div className="brand-lockup-text">
        <strong>
          App<span>Pilot</span>
        </strong>
        {showTagline && <em>Integration at the Speed of Business</em>}
      </div>
    </div>
  );
}

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        size: 2 + (i % 4),
        delay: `${(i % 7) * 0.45}s`,
        duration: `${4 + (i % 5)}s`,
      })),
    []
  );

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

function PainPointsSection() {
  return (
    <section className="section pain-section" id="challenge">
      <div className="section-heading centered reveal">
        <p className="eyebrow">The challenge</p>
        <h2>
          Identity teams are drowning<br />
          <span className="gradient-text">in manual work.</span>
        </h2>
        <p>Every enterprise feels the same friction before AppPilot enters the story.</p>
      </div>
      <div className="pain-grid">
        {painPoints.map((item, i) => {
          const Icon = item.icon;
          return (
            <article className="pain-card reveal" key={item.title} style={{ animationDelay: `${i * 0.12}s` }}>
              <span className="pain-icon">
                <Icon size={22} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="pain-meter" aria-hidden="true">
                <span style={{ width: `${72 + i * 8}%` }} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ClientJourneyTimeline() {
  const steps = [
    { label: "Week 0", title: "The request lands", desc: "A new SaaS app needs SSO. Tickets open. Nobody owns the full picture.", stat: "6+ stakeholders" },
    { label: "Week 2", title: "Console chaos", desc: "SAML metadata, attribute maps, and cert expiry hunts across Okta, PingOne, and Entra ID.", stat: "40+ hrs lost" },
    { label: "Day 1", title: "AppPilot intake", desc: "One guided flow captures provider, protocol, claims, and ownership.", stat: "< 5 min setup" },
    { label: "Seconds", title: "Governed launch", desc: "Deploy, monitor certificates, and operate from a unified command center.", stat: "< 60s deploy" },
  ];

  return (
    <section className="section journey-section" id="story">
      <div className="section-heading reveal">
        <p className="eyebrow">Client story</p>
        <h2>
          From weeks of friction<br />
          <span className="gradient-text">to seconds of orchestration.</span>
        </h2>
        <p>Follow the arc your identity team — and your executives — actually care about.</p>
      </div>
      <div className="journey-track reveal">
        <div className="journey-line" />
        {steps.map((step, i) => (
          <article className="journey-step" key={step.title} style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="journey-node">{i + 1}</div>
            <p className="journey-label">{step.label}</p>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
            <strong className="journey-stat">{step.stat}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterChart() {
  const bars = [
    { label: "Time to deploy", before: 88, after: 12, unit: "days → sec" },
    { label: "Manual touchpoints", before: 92, after: 8, unit: "steps" },
    { label: "Certificate incidents", before: 76, after: 14, unit: "risk index" },
  ];

  return (
    <div className="before-after-chart reveal">
      <div className="chart-header">
        <p className="mini-label">Impact at a glance</p>
        <strong>Manual IAM vs AppPilot</strong>
      </div>
      <div className="bar-chart">
        {bars.map((bar) => (
          <div className="bar-row" key={bar.label}>
            <span className="bar-label">{bar.label}</span>
            <div className="bar-pair">
              <div className="bar before" style={{ width: `${bar.before}%` }}>
                <em>Before</em>
              </div>
              <div className="bar after" style={{ width: `${bar.after}%` }}>
                <em>AppPilot</em>
              </div>
            </div>
            <span className="bar-unit">{bar.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrchestrationVisual() {
  const nodes = [
    { label: "Okta", color: "#007dc1", icon: Activity },
    { label: "PingOne", color: "#da291c", icon: KeyRound },
    { label: "Entra ID", color: "#00a4ef", icon: Database },
  ];

  return (
    <div className="orchestration-container reveal">
      <div className="orch-core">
        <Logo size={80} />
        <div className="orch-pulse"></div>
      </div>
      <div className="orch-nodes">
        {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
                <div className={`orch-node node-${i}`} key={node.label}>
                    <div className="orch-line"></div>
                    <div className="orch-node-icon" style={{ borderColor: node.color }}>
                        <Icon size={24} color={node.color} />
                    </div>
                    <span>{node.label}</span>
                </div>
            )
        })}
      </div>
    </div>
  );
}

function LiveOperationsFeed() {
  const activities = [
    { time: "Just now", action: "SAML Application Provisioned", target: "Salesforce (Okta)", status: "Success" },
    { time: "2m ago", action: "OIDC Client Registered", target: "Internal CRM (Entra ID)", status: "Success" },
    { time: "5m ago", action: "Certificate Rotation Triggered", target: "SSO-Prod (PingOne)", status: "In Progress" },
    { time: "8m ago", action: "Misconfiguration Detected", target: "Marketing Portal", status: "Auto-Fixed", ai: true },
  ];

  return (
    <div className="activity-feed reveal">
      <div className="feed-header">
        <p className="mini-label">Live Orchestration Stream</p>
        <div className="live-indicator"><span className="pulse-dot"></span> LIVE</div>
      </div>
      <div className="feed-list">
        {activities.map((item, i) => (
          <div className="feed-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="feed-time">{item.time}</div>
            <div className="feed-content">
              <strong>{item.action}</strong>
              <span>{item.target}</span>
            </div>
            <div className={`feed-status ${item.status.toLowerCase().replace(" ", "-")}`}>
                {item.ai && <Sparkles size={12} className="ai-icon" />} {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IdentityAccessGraph() {
  return (
    <div className="access-graph-container reveal">
      <div className="access-graph-header">
        <p className="eyebrow">Identity Reimagined</p>
        <h2>Reveal, Visualize, and Orchestrate<br/><span className="gradient-text">Your Entitlements Everywhere.</span></h2>
        <p>AppPilot unifies identities and entitlements across apps, data, on-prem, and SaaS.</p>
      </div>
      <div className="access-graph-visualization">
        <div className="ag-nodes-column ag-users">
          <div className="ag-node"><Search size={18}/> Directory</div>
          <div className="ag-node"><Lock size={18}/> Admins</div>
          <div className="ag-node"><Bot size={18}/> Service Accts</div>
        </div>
        <div className="ag-lines">
            <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="ag-lines-svg">
              <path d="M0,30 C100,30 100,100 200,100" />
              <path d="M0,100 C100,100 100,100 200,100" />
              <path d="M0,170 C100,170 100,100 200,100" />
            </svg>
        </div>
        <div className="ag-center-core">
            <div className="ag-core-ring"></div>
            <div className="ag-core-ring delay"></div>
            <Logo size={48} className="ag-logo-svg" />
            <strong>AppPilot</strong>
        </div>
        <div className="ag-lines reverse">
            <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="ag-lines-svg">
              <path d="M0,100 C100,100 100,30 200,30" />
              <path d="M0,100 C100,100 100,100 200,100" />
              <path d="M0,100 C100,100 100,170 200,170" />
            </svg>
        </div>
        <div className="ag-nodes-column ag-resources">
          <div className="ag-node okta"><Activity size={18}/> Okta</div>
          <div className="ag-node ping"><KeyRound size={18}/> PingOne</div>
          <div className="ag-node entra"><Database size={18}/> Entra ID</div>
        </div>
      </div>
    </div>
  );
}

function DeploymentVelocityGraph() {
  return (
    <div className="velocity-graph reveal">
      <div className="graph-header">
        <p className="mini-label">Deployment Velocity</p>
        <strong>8.4x Faster</strong>
      </div>
      <div className="velocity-svg-container">
        <svg viewBox="0 0 400 200" className="velocity-svg">
          <defs>
            <linearGradient id="velocity-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Manual Workflow Line */}
          <path d="M0,180 L80,175 L160,178 L240,172 L320,176 L400,174" className="line-manual" />
          {/* AppPilot Line */}
          <path d="M0,180 L80,140 L160,90 L240,50 L320,30 L400,20" className="line-apppilot velocity-line-draw" />
          <path d="M0,180 L80,140 L160,90 L240,50 L320,30 L400,20 L400,200 L0,200 Z" fill="url(#velocity-grad)" />
          <text x="10" y="195" className="graph-label">Weeks</text>
          <text x="360" y="15" className="graph-label">Seconds</text>
        </svg>
      </div>
      <p className="graph-footer">Manual: Weeks of tickets & loops | <strong>AppPilot: Instant orchestration</strong></p>
    </div>
  );
}

function SecurityRadar() {
  return (
    <div className="radar-graph reveal">
      <div className="graph-header">
        <p className="mini-label">Security Posture</p>
        <strong className="healthy-text">Elite Level</strong>
      </div>
      <div className="radar-svg-container">
        <svg viewBox="0 0 200 200" className="radar-svg">
          <circle cx="100" cy="100" r="80" className="radar-circle" />
          <circle cx="100" cy="100" r="60" className="radar-circle" />
          <circle cx="100" cy="100" r="40" className="radar-circle" />
          <path d="M100,20 L100,180 M20,100 L180,100 M43,43 L157,157 M43,157 L157,43" className="radar-axis" />
          <polygon points="100,40 160,70 150,140 100,170 50,140 40,70" className="radar-polygon" />
        </svg>
      </div>
      <div className="radar-labels">
        <span>Compliance</span>
        <span>MFA</span>
        <span>Certificates</span>
        <span>Governance</span>
      </div>
    </div>
  );
}

function EarlyAccessForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form)).toString();

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="demo-card demo-form-success" role="status">
        <Check size={32} />
        <h3>Thank you for contacting</h3>
        <p>We have received your details and will connect with you shortly.</p>
      </div>
    );
  }

  return (
    <form
      className="demo-card reveal demo-card-form"
      name="early-access"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="early-access" />
      <input type="text" name="bot-field" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="demo-field" htmlFor="demo-email">
        Work email
        <input
          placeholder="you@acmecorp.com"
          type="email"
          id="demo-email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "submitting"}
        />
      </label>
      <label className="demo-field" htmlFor="demo-provider">
        Current identity provider
        <select
          id="demo-provider"
          name="provider"
          defaultValue="PingOne"
          required
          disabled={status === "submitting"}
        >
          <option value="PingOne">PingOne</option>
          <option value="Okta">Okta</option>
          <option value="Entra ID">Entra ID</option>
          <option value="Multiple">Multiple providers (Okta, PingOne, or Entra ID)</option>
        </select>
      </label>
      {status === "error" && (
        <p className="demo-form-error" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        className="button button-primary demo-submit"
        type="submit"
        id="demo-submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Schedule a Demo Session"}
        {status !== "submitting" && <ArrowRight size={18} />}
      </button>
    </form>
  );
}

function AnimatedChatDemo() {
  const configFields = [
    ["Protocol", "SAML"],
    ["App name", "saml-aws-iam"],
    ["Entity ID", "https://signin.aws.amazon.com/saml"],
    ["ACS URL", "https://signin.aws.amazon.com/saml"],
    ["Name ID format", "urn:oasis:names:tc:SAML:2.0:nameid-format:transient"],
    ["Identity provider", "PingOne"],
  ];

  const pipeline = [
    ["Auto-filling configuration", "done"],
    ["Validating payload", "done"],
    ["Calling onboarding API", "done"],
    ["Finalizing deployment", "done"],
  ];

  return (
    <section className="section ai-demo-section" id="ai-demo">
      <div className="ai-demo-heading reveal">
        <p className="ai-demo-pill"><Sparkles size={16} /> AI-powered automation</p>
        <h2>Watch AppPilot turn a chat into a deployed SSO integration.</h2>
        <p>
          A guided copilot captures the request, parses metadata, recommends the right provider settings,
          and drives the deployment pipeline.
        </p>
      </div>

      <div className="ai-demo-shell reveal" aria-label="Animated AI configuration assistant demo">
        <div className="ai-demo-topbar">
          <span className="ai-demo-icon"><Bot size={22} /></span>
          <div>
            <strong>AI Configuration Assistant</strong>
            <p>Describe your app, upload metadata, and let AppPilot configure the workflow.</p>
          </div>
        </div>

        <div className="ai-demo-stage">
          <div className="chat-message bot intro">Hi! I'm your onboarding assistant. Ask me how to integrate any app with Okta, PingOne, or any IdP.</div>
          <div className="chat-message user ask">How do I onboard an app to Okta?</div>
          <div className="chat-card answer">
            <strong>Great question. I can handle onboarding automatically as your Autonomous Deployment Agent.</strong>
            <span>Export your SP metadata XML, upload it here, and I will parse settings, fill the wizard, and prepare deployment.</span>
          </div>
          <div className="chat-message user upload-ask">Yes, I want to upload my metadata file.</div>
          <div className="upload-zone">
            <Upload size={22} />
            <strong>Click to select XML or JSON</strong>
            <span>saml-aws-iam.xml detected</span>
          </div>
          <div className="chat-message bot provider">I received `saml-aws-iam.xml`. Please select your Identity Provider for this application.</div>
          <div className="chat-message user provider-choice">PingOne</div>

          <div className="config-preview">
            <div className="agent-label"><span>Agent</span> Review Configuration Preview</div>
            <div className="config-grid">
              {configFields.map(([label, value]) => (
                <div className="config-field" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-message bot deploy-note">
            Configuration is ready for <strong>saml-aws-iam</strong>. Review the preview and deploy when ready.
          </div>
          <div className="chat-message user deploy-cta">Yes, deploy this application.</div>

          <div className="pipeline-card">
            <div className="agent-label"><span>Agent</span> Deployment Pipeline</div>
            {pipeline.map(([label, status], index) => (
              <div className={`pipeline-step ${status}`} key={label}>
                <span>{status === "done" ? <Check size={14} /> : index + 1}</span>
                <strong>{label}...</strong>
              </div>
            ))}
          </div>

          <div className="success-card">
            <strong>Deployment Successful!</strong>
            <span><Check size={14} /> "Test app 001" is now live in the registry.</span>
            <span><Check size={14} /> Protocol: SAML</span>
            <span><Check size={14} /> Provider: PingOne</span>
          </div>

          <div className="download-list">
            <div><span>Document</span> SAML Metadata XML <button type="button">Download</button></div>
            <div><span>Key</span> Signing Certificate (PEM) <button type="button">Download</button></div>
          </div>

          <div className="deploy-more-pill"><Sparkles size={13} /> Want to deploy an app?</div>
        </div>

        <div className="ai-demo-input">
          <span>Describe your app or ask a question...</span>
          <button type="button" aria-label="Send demo message"><ArrowRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}

// --- About Us Section ---
const teamMembers = [
  { name: "Abhishek Pandey", role: "IAM Engineer", image: "/Abhishek.jfif" },
  { name: "Prashanthi Aredla", role: "IAM Engineer", image: "/Prashanthi.jfif" },
  { name: "Bhuvan Gaddam", role: "IAM Engineer", image: "/Bhuvan.png" },
  { name: "Shivam Rai", role: "IAM Engineer", image: "/Shivam.jfif", objectPosition: "top" },
  { name: "Mohit Haibatpure", role: "Software Developer", image: "/Mohit.jpeg" },
  { name: "Rohit Patil", role: "Software Developer", image: "/Rohit.jpeg", objectPosition: "top" },
];

function AboutUsSection() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading reveal">
        <p className="eyebrow">About Us</p>
        <h2>
          Built by security experts,<br />
          <span className="gradient-text">for security teams.</span>
        </h2>
      </div>

      <div className="about-content reveal">
        <div className="about-text-block">
          <h3><Logo size={28} className="inline-logo" /> AppPilot</h3>
          <p className="about-flagship-badge">Flagship Product of CyberXDelta</p>
          <p>
            AppPilot is the first AI-driven platform that orchestrates application onboarding across PingOne, Okta, and Microsoft Entra ID &mdash; through a single governed portal, an AI-powered assistant, and a security architecture built for enterprise scale.
          </p>
        </div>

        <div className="about-divider"></div>

        <div className="about-text-block">
          <h3><Building2 size={24} className="inline-icon" /> CyberXDelta</h3>
          <p className="about-tagline">Your Missing Piece in Security</p>
          <p>
            CyberXDelta is a Cybersecurity Training &amp; Consulting company dedicated to bridging the widening talent and knowledge gaps that enterprises face in a rapidly evolving threat landscape. Their promise is direct: <strong>Real Skills. Real Impact. Real Security.</strong>
          </p>
          <p className="about-motto">
            We're not just teaching cybersecurity &mdash; we're building the next generation of cyber defenders.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="about-team-heading reveal">
        <p className="eyebrow"><Users size={16} /> The Team</p>
        <h3>Meet the minds behind AppPilot.</h3>
        <p>A cross-functional team of IAM engineers, cybersecurity architects, and product builders obsessed with automation.</p>
      </div>
      <div className="team-grid six-members">
        {teamMembers.map((member, i) => (
          <article className="team-card reveal" key={member.name} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="team-image-container">
              <img src={member.image} alt={member.name} className="team-image" loading="lazy" style={{ objectPosition: member.objectPosition || 'center' }} />
            </div>
            <h4>{member.name}</h4>
            <p className="team-role">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  useScrollReveal();

  const [reductionVal, reductionRef] = useAnimatedCounter(90);
  const [deployVal, deployRef] = useAnimatedCounter(60);
  const [providerVal, providerRef] = useAnimatedCounter(3);

  return (
    <main className="site-shell">
      <div className="background-grid" />
      <ParticleField />
      <Header />

      {/* ── Hero ── */}
      <section className="hero" id="top">
        <div className="hero-copy reveal">
          <div className="hero-copy-lines">
            <div className="hero-brand-badge">
              <Logo size={44} className="hero-logo" />
              <span>Integration at the Speed of Business</span>
            </div>
            <p className="eyebrow">Zero-Touch Identity Orchestration</p>
          </div>
          <h1>Automate Your Identity Lifecycle.<br /><span className="gradient-text">Not Just Your Users.</span></h1>
          <p className="hero-lede">
            The first AI-driven platform that orchestrates SAML and OIDC integrations across Okta, PingOne, and Entra ID in seconds. Stop manual configurations; start AppPilot.
          </p>
          <div className="hero-actions">
            <a className="button button-primary pulse-glow" href="#demo" id="cta-early-access">
              Get Early Access
              <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#ai-demo" id="cta-watch-demo">
              <Play size={16} />
              Watch the Demo
            </a>
          </div>
          <div className="signal-row">
            <span>Okta</span>
            <span>PingOne</span>
            <span>Entra ID</span>
            <span>SAML 2.0</span>
            <span>OIDC</span>
          </div>
        </div>

        <IdentityGraph />
      </section>

      <PainPointsSection />

      {/* ── Ecosystem Marquee ── */}
      <section className="section ecosystem-marquee" id="ecosystem">
        <p className="eyebrow reveal">Trusted across the identity ecosystem</p>
        <div className="ecosystem-marquee-track reveal" aria-hidden="true">
          <div className="ecosystem-marquee-inner">
            {[...identityProviders, ...identityProviders, ...identityProviders].map((prov, i) => (
              <article className="ecosystem-item" key={`${prov.name}-${i}`}>
                <strong>{prov.name}</strong>
                <span>{prov.sub}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClientJourneyTimeline />

      {/* ── Access Graph Reveal ── */}
      <section className="section">
         <IdentityAccessGraph />
      </section>

      {/* ── Proof Band — Animated Counters ── */}
      <section className="proof-band reveal">
        <article ref={reductionRef}>
          <b className="counter-value">{reductionVal}%</b>
          <span>Reduction in Onboarding Time</span>
        </article>
        <article ref={providerRef} className="proof-card-featured">
          <div className="featured-number">{providerVal}</div>
          <div className="featured-content">
            <strong>Identity Providers</strong>
            <span>Okta · PingOne · Entra ID — one workflow</span>
          </div>
        </article>
        <article ref={deployRef}>
          <b className="counter-value">&lt; {deployVal}s</b>
          <span>Average Deploy Time</span>
        </article>
      </section>

      {/* ── Feature Deep-Dive ── */}
      <section className="section feature-section" id="features">
        <div className="section-heading centered reveal">
          <p className="eyebrow">The Solution</p>
          <h2>Everything your identity team needs.<br /><span className="gradient-text">Nothing it doesn't.</span></h2>
          <p>Four pillars of automation that turn weeks of manual IAM work into seconds of orchestrated precision.</p>
        </div>
        <div className="feature-grid">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <article className="feature-card reveal" key={item.title} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-card-header">
                  <span className="feature-icon"><Icon size={22} /></span>
                  <span className="feature-tag">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Pain Points & Workflow Combined (The Flow) ── */}
      <section className="section combined-flow-section" id="workflow">
        <div className="workflow-container">
            <div className="workflow-copy reveal">
                <p className="eyebrow">Workflow</p>
                <h2>From request to governed application<br />in four steps.</h2>
                <p>Teams waste weeks chasing XML misconfigurations and attribute errors. Replace incomplete tickets and manual loops with a structured identity workflow.</p>
            </div>
            <div className="workflow-steps">
            {workflowSteps.map(([number, title, copy], i) => (
                <article className="workflow-step reveal" key={number} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="step-number">{number}</div>
                <div className="step-content">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                </div>
                </article>
            ))}
            </div>
        </div>
      </section>

      {/* ── Governance ── */}
      <AnimatedChatDemo />

      <section className="section governance-section" id="governance">
        <div className="section-heading reveal">
          <p className="eyebrow">Governance layer</p>
          <h2>Certificate risk, analytics, and app health<br />in one premium view.</h2>
        </div>
        <div className="governance-grid reveal">
          <SecurityRadar />
          
          <article className="trend-card">
            <div className="trend-head">
              <p className="mini-label">Deployment trend</p>
              <span>7 days</span>
            </div>
            <div className="trend-graph-container">
              <svg viewBox="0 0 400 160" className="trend-line-graph">
                <defs>
                  <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--purple)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,130 Q50,110 100,140 T200,80 T300,60 T400,40" className="trend-line-path" />
                <path d="M0,130 Q50,110 100,140 T200,80 T300,60 T400,40 L400,160 L0,160 Z" fill="url(#area-grad)" />
                {[0, 100, 200, 300, 400].map(x => <circle key={x} cx={x} cy={x === 0 ? 130 : x === 100 ? 140 : x === 200 ? 80 : x === 300 ? 60 : 40} r="4" fill="var(--purple)" />)}
              </svg>
            </div>
            <div className="trend-summary">
              <span>12 deployed</span>
              <span className="trend-up">↑ 23%</span>
            </div>
          </article>

          <DeploymentVelocityGraph />
        </div>

        {/* Approval Workflow */}
        <div className="approval-showcase reveal">
          <div className="approval-copy">
            <span className="approval-badge"><Shield size={18} /> Security</span>
            <h3>Every Sensitive Action,<br />Securely Queued.</h3>
            <p>Every sensitive action — like app deletion, certificate rotation, or provider changes — is caught in a secure approval queue for your Admins. Nothing slips through.</p>
            <div className="approval-features">
              <span><Check size={15} /> Admin-only approval gates</span>
              <span><Check size={15} /> Full audit trail</span>
              <span><Check size={15} /> Role-based access control</span>
            </div>
          </div>
          <div className="approval-card">
            <div className="approval-card-header">
              <AlertTriangle size={18} />
              <span>Pending Approval</span>
              <span className="approval-time">2 min ago</span>
            </div>
            <div className="approval-card-body">
              <p className="approval-action">Delete Application</p>
              <p className="approval-target">"Production SSO — Okta"</p>
              <p className="approval-user">Requested by: <strong>iam-admin@acmecorp.com</strong></p>
            </div>
            <div className="approval-card-actions">
              <button className="approve-btn" type="button"><Check size={16} /> Approve</button>
              <button className="deny-btn" type="button"><X size={16} /> Deny</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="section outcomes-section">
        <div className="outcome-copy reveal">
          <p className="eyebrow">Business outcomes</p>
          <h2>Launch apps faster<br />without losing control.</h2>
          <p>
            AppPilot removes manual IAM friction while giving teams clear visibility into the entire application integration lifecycle.
          </p>
        </div>
        <BeforeAfterChart />
        <div className="outcome-list">
          {outcomes.map(([title, copy], i) => (
            <article className="reveal" key={title} style={{ animationDelay: `${i * 0.1}s` }}>
              <Check size={19} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── About Us ── */}
      <AboutUsSection />

      {/* ── System Orchestration Section (Replaces ROI) ── */}
      <section className="section orchestration-section">
        <div className="section-heading centered reveal">
          <p className="eyebrow">Real-time Control</p>
          <h2>Orchestrate your entire<br /><span className="gradient-text">Identity Ecosystem.</span></h2>
          <p>A central command center for managing applications, certificates, and access across multiple providers simultaneously.</p>
        </div>
        <div className="orch-layout reveal">
          <OrchestrationVisual />
          <LiveOperationsFeed />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="demo" id="demo">
        <div className="reveal">
          <p className="eyebrow">Get started</p>
          <h2>Ready to reclaim your<br /><span className="gradient-text">engineering hours?</span></h2>
          <p>
            Bring faster launches, fewer incomplete requests, clearer analytics, and governed certificate operations to your identity program.
          </p>
        </div>
        <EarlyAccessForm />
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <a className="brand" href="#top">
          <Logo size={38} className="brand-logo-img" />
          <strong>App<span>Pilot</span></strong>
        </a>
        <nav>
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#ai-demo">AI Demo</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#governance">Governance</a>
          <a href="#about">About</a>
          <a href="#demo">Demo</a>
        </nav>
        <p>Zero-touch identity orchestration & automated application onboarding.</p>
      </footer>
    </main>
  );
}

// --- Header ---
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
      <a className="brand" href="#top">
        <Logo size={38} className="brand-logo-img" />
        <strong>App<span>Pilot</span></strong>
      </a>
      <nav>
        <a href="#story">Story</a>
        <a href="#features">Features</a>
        <a href="#workflow">Workflow</a>
        <a href="#ai-demo">AI Demo</a>
        <a href="#governance">Governance</a>
        <a href="#about">About</a>
        <a href="#demo">Demo</a>
      </nav>
      <a className="nav-cta" href="#demo">Get Early Access</a>
    </header>
  );
}

// --- Hero Identity Graph ---
function IdentityGraph() {
  const nodes = [
    ["PingOne", "15%", "32%", RadioTowerFallback, "delay-1"],
    ["Okta", "85%", "32%", Lock, "delay-2"],
    ["Entra ID", "50%", "10%", Database, "delay-3"],
    ["SAML", "18%", "68%", KeyRound, "delay-4"],
    ["OIDC", "82%", "68%", Workflow, "delay-5"],
    ["Certs", "50%", "90%", FileKey2, "delay-6"],
  ];

  return (
    <div className="identity-graph reveal" aria-label="AppPilot identity graph visualization">
      <div className="graph-particles"></div>
      <svg viewBox="0 0 620 560" role="img" className="hero-svg-graph">
        <defs>
          <linearGradient id="line-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path d="M115 160 C210 80 410 80 505 160" className="path-animated"/>
        <path d="M115 400 C210 480 410 480 505 400" className="path-animated"/>
        <path d="M170 175 C240 250 240 310 170 385" className="path-animated"/>
        <path d="M450 175 C380 250 380 310 450 385" className="path-animated"/>
        <path d="M310 90 L310 470" className="path-animated"/>
        <circle cx="310" cy="280" r="108" className="path-animated"/>
      </svg>

      <div className="graph-core">
        <div className="core-pulse-1"></div>
        <div className="core-pulse-2"></div>
        <Logo size={44} className="core-logo-svg" />
        <strong>AppPilot</strong>
        <p>Identity command center</p>
      </div>

      {nodes.map(([label, left, top, Icon, delayClass]) => (
        <div className={`graph-node ${delayClass}`} style={{ left, top }} key={label}>
          <Icon size={18} />
          <span>{label}</span>
        </div>
      ))}

      <div className="floating-panel panel-one">
        <p>Deploy readiness</p>
        <strong className="panel-green">96%</strong>
      </div>
      <div className="floating-panel panel-two">
        <p>Certificate watch</p>
        <strong className="panel-amber">1 urgent</strong>
      </div>
    </div>
  );
}

function RadioTowerFallback(props) {
  return <Activity {...props} />;
}

createRoot(document.getElementById("root")).render(<App />);
