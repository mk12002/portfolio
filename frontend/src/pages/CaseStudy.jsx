import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaGithub, FaExclamationTriangle, FaCheckCircle, FaProjectDiagram, FaPlay } from 'react-icons/fa'
import SEO from '../components/SEO'

const path = ['argocd-application-controller (SA)', 'bound to a ClusterRole with verbs:[*] resources:[*]', 'cluster-admin']

function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">{title}</h2>
      <div className="text-gray-300 leading-relaxed space-y-3 text-[15px]">{children}</div>
    </section>
  )
}
function Code({ children }) {
  return <pre className="bg-[#0d1117] text-emerald-300 rounded-lg p-4 text-xs overflow-x-auto border border-white/10 font-mono whitespace-pre-wrap">{children}</pre>
}

export default function CaseStudy() {
  return (
    <>
      <SEO
        title="Finding: argo-cd's Controller Can Reach cluster-admin | Mohit Kumar"
        description="A vuln-report-style walkthrough: how my open-source scanner Bastion found that argo-cd's application controller is bound to a wildcard ClusterRole — a direct path to cluster-admin — on a real Helm chart where a pod-hygiene linter reported nothing."
        keywords="Kubernetes RBAC, privilege escalation, cluster-admin, argo-cd, Bastion, attack path, security case study, Mohit Kumar"
        pathname="/case-study"
      />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects/bastion" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
            <FaArrowLeft /> Bastion
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30">CRITICAL · Privilege Escalation</span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-gray-400">Case study</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              How Bastion Found argo-cd's Controller Can Reach <span className="gradient-text">cluster-admin</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              A real finding on a widely-used Helm chart — one that a pod-hygiene linter, running on the same input, reported nothing about.
            </p>

            {/* TL;DR */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 mb-10">
              <div className="text-xs uppercase tracking-wider text-vision font-semibold mb-2">TL;DR</div>
              <p className="text-gray-300 text-[15px] leading-relaxed">
                Rendering the public <span className="font-mono">argo/argo-cd</span> chart and scanning it with{' '}
                <Link to="/projects/bastion" className="text-vision hover:underline">Bastion</Link> surfaced{' '}
                <strong className="text-white">19 escalation paths</strong> to <span className="font-mono">cluster-admin</span> — the headline being the{' '}
                <span className="font-mono">argocd-application-controller</span> ServiceAccount, which is bound to a ClusterRole granting{' '}
                <span className="font-mono">verbs:[*]</span> on <span className="font-mono">resources:[*]</span>. It doesn't <em>reach</em> cluster-admin; it <em>is</em> cluster-admin.
                On the same rendered manifests, <span className="font-mono">kube-score</span> produced <strong className="text-white">107 findings and 0</strong> about RBAC or escalation.
              </p>
            </div>

            {/* Path */}
            <Section title="The path">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {path.map((step, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className={`px-2.5 py-1.5 rounded ${i === path.length - 1 ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{step}</span>
                      {i < path.length - 1 && <FaArrowRight className="text-red-400/60 text-[10px]" />}
                    </span>
                  ))}
                </div>
              </div>
              <p>A wildcard ClusterRole is the shortest possible escalation path — a single hop. Anything that can act as that ServiceAccount (exec into the controller's pod, read its projected token, compromise the controller itself) inherits the entire cluster.</p>
            </Section>

            <Section title="The target">
              <p><span className="font-mono">argo/argo-cd</span> is a GitOps continuous-delivery controller installed on a huge number of production clusters. Its application controller legitimately needs broad access to reconcile arbitrary application resources — which is exactly why its permissions are worth naming explicitly rather than assuming they're fine.</p>
              <p>The scan is fully offline: the chart is rendered to plain manifests first, then analyzed statically — no cluster, no kubeconfig, no network.</p>
              <Code>{`helm template argo-cd argo/argo-cd > argo-cd.yaml
bastion scan argo-cd.yaml --format sarif --fail-on P0`}</Code>
            </Section>

            <Section title="Why a pod-hygiene linter misses it">
              <p>Linters like <span className="font-mono">kube-score</span> examine one resource at a time: is this container running as root, does it set resource limits, is there a readiness probe? Those are real checks — kube-score returned 107 of them on argo-cd. But none of them model <em>RBAC subjects, bindings, or the relationships between them</em>, so "this ServiceAccount can become cluster-admin" is invisible to them by construction.</p>
              <p>Escalation is a <strong className="text-white">graph</strong> problem, not a per-resource checklist. Bastion builds the privilege graph and runs a deterministic breadth-first search toward cluster-admin, the node, and secrets — which is how a one-hop wildcard binding, and 18 longer paths, surface at all.</p>
            </Section>

            <Section title="The finding, with evidence">
              <p>Every Bastion finding cites the file and line of the offending grant and explains, in one sentence, why it's an escalation edge. For this path:</p>
              <div className="p-4 rounded-lg bg-white/5 border-l-4 border-red-500">
                <p className="text-sm text-gray-300"><strong className="text-red-300">E6 · CRITICAL</strong> — <span className="font-mono">argocd-application-controller</span> is bound (ClusterRoleBinding) to a ClusterRole whose rules include <span className="font-mono">apiGroups:["*"] resources:["*"] verbs:["*"]</span>. A subject holding this is functionally cluster-admin. <span className="text-gray-500">Evidence: rendered <span className="font-mono">clusterrole.yaml</span> + <span className="font-mono">clusterrolebinding.yaml</span>.</span></p>
              </div>
              <p className="text-sm text-gray-400">Bastion marks confidence honestly: a wildcard grant is unambiguous (HIGH), whereas an edge that depends on Kubernetes' built-in escalation-prevention is marked MEDIUM, and the whole path inherits its weakest edge.</p>
            </Section>

            <Section title="Is it a bug? An honest read">
              <p>Not necessarily — and Bastion says so. Many of the paths on real charts are <em>inherent</em>: an admission controller must manage webhooks; a GitOps controller must provision resources. These are true positives that are also, often, intended.</p>
              <p>The value isn't a verdict — it's <strong className="text-white">visibility</strong>. Bastion <em>names and explains</em> the route where a hygiene linter is silent, so a human can decide: scope the ClusterRole down, isolate the controller, or accept and document the risk. It reports the path; it never walks it.</p>
            </Section>

            <Section title="The fix">
              <p>Replace the wildcard rule with the specific resources the controller actually reconciles, and split read from write where possible:</p>
              <Code>{`# Before — de-facto cluster-admin
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]

# After — least privilege (illustrative)
- apiGroups: ["argoproj.io"]
  resources: ["applications", "appprojects"]
  verbs: ["get", "list", "watch", "update", "patch"]
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list", "watch"]`}</Code>
              <p>Then re-scan and gate the pull request: <span className="font-mono">bastion diff base/ pr/ --fail-on-new-path</span> blocks any change that introduces a <em>new</em> route to cluster-admin, without failing on the pre-existing ones.</p>
            </Section>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/demos" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-vision to-reasoning text-primary rounded-lg font-semibold">
                <FaPlay className="text-xs" /> Try the analysis yourself
              </Link>
              <Link to="/projects/bastion" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all">
                <FaProjectDiagram /> About Bastion
              </Link>
              <a href="https://github.com/mk12002/Bastion" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg transition-all">
                <FaGithub /> Source
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
