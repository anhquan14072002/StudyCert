window.DATA = [
  {
    id: 1,
    kind: "single",
    text: "You are configuring tool permissions for a Claude-based assistant. The assistant's defined responsibilities require read access to a knowledge base and write access to a draft queue, and nothing else. Which scoping design best applies least privilege?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Allow access to all tools with read permissions globally across the system.",
      },
      {
        letter: "B",
        text: "Per-role allow-list of exactly the read-knowledge-base and write-draft-queue tools, enforced at the orchestration layer.",
      },
      {
        letter: "C",
        text: "Allow access to every tool in the catalog and rely on the model to decline tools it should not use.",
      },
      {
        letter: "D",
        text: "Disable all tools entirely to achieve a minimal permission surface.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "Least privilege means granting exactly the permissions the role needs and enforcing that outside the model. A per-role allow-list containing only the read-knowledge-base and write-draft-queue tools, enforced at the orchestration layer, does both. A grants read access to every tool, which is too broad, and it still does not cover the write access the role needs. C relies on the model to refuse tools, which is not a real control. D blocks tools the role actually needs, so the assistant can no longer do its job.",
      source_e:
        "Discussion:\nSelected Answer: B - Least privilege means granting the exact capabilities required for the defined responsibility-no more and no less. Option B permits the assistant to read the approved knowledge base and write only to the draft queue. Enforcing the allow-list at the orchestration layer creates a deterministic authorization boundary outside the model's prompt and reasoning. The rule should also be role-specific so different users or operational roles receive only the tools and data scopes they require. The knowledge-base tool should remain read-only, while the draft-queue tool should be restricted to draft creation rather than external sending, approval, or production publication. Option A exposes every globally readable tool, creating unnecessary access to unrelated information. Option C relies on voluntary model behavior instead of enforceable authorization. A mistaken tool selection or successful prompt injection could therefore invoke an inappropriate capability. Option D minimizes permissions by eliminating the assistant's required functionality and is not a viable least-privilege implementation. Anthropic's permission guidance distinguishes allow, ask, and deny rules and confirms that these controls are enforced by Claude Code rather than by model instructions. Configure Permissions Study Guide references/topics: Least privilege; per-role authorization; orchestration-layer enforcement; capability scoping; read/write separation; tool allow-lists.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 2,
    kind: "multi",
    text: "You are running a controlled experiment to compare two prompts and must complete the design steps before executing the experiment. Which two steps must be completed BEFORE running the experiment with random assignment? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Determine the minimum detectable effect size and the sample size needed for power.",
      },
      {
        letter: "B",
        text: "Decide whether to promote, reject, or iterate the candidate based on the analysis.",
      },
      {
        letter: "C",
        text: "Define the hypothesis and the primary success metric for the comparison.",
      },
      {
        letter: "D",
        text: "Analyze the results against the predefined success metric and significance threshold.",
      },
      {
        letter: "E",
        text: "Document the recommendation, the trade-offs accepted, and the alternatives considered.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AC", source_c: "AC", source_e: "AC" },
    explanations: {
      claude:
        "The hypothesis and the primary success metric (C) have to be set before running, or you risk choosing the metric after seeing the results. The minimum detectable effect and the sample size needed for power (A) also have to be set first, so the experiment is big enough to detect a real difference. Analyzing results (D), deciding to promote, reject or iterate (B), and documenting the recommendation (E) all happen after the experiment runs.",
      source_e:
        "Discussion:\nSelected Answer: A,C - A controlled prompt experiment must begin with a falsifiable hypothesis and a predefined primary metric. Option C prevents the team from examining results first and then selecting whichever metric makes the candidate look successful. The metric might measure task accuracy, rubric score, citation validity, escalation rate, latency, cost, or another criterion directly connected to the hypothesis. Option A determines whether the experiment can detect a practically meaningful improvement. The minimum detectable effect expresses the smallest difference worth acting upon, while the power calculation determines the required sample size. Without this step, the experiment may be too small to detect a real improvement or unnecessarily large and expensive. Random assignment should then distribute representative traffic between the control and candidate prompts while controlling model version, retrieval configuration, tool availability, and other confounding variables. Options B and D occur after data collection. Option E follows the completed analysis and decision. The team should also define significance thresholds, stopping rules, guardrail metrics, exclusion criteria, and treatment of repeated observations before launch. Study Guide references/topics: Prompt A/B testing; hypothesis definition; primary metrics; minimum detectable effect; statistical power; random assignment; decision sequencing.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 3,
    kind: "single",
    text: "You are reviewing a peer's Claude Code permission rules for an enterprise rollout. The rules grant unrestricted Bash access to all projects across all developers. Which response is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Add unrestricted access to additional tool categories as well, so that Bash is not asymmetrically more permissive than other tools, expanding the attack surface further in the name of consistency.",
      },
      {
        letter: "B",
        text: "Approve the unrestricted Bash access as written on the grounds that narrowing the rules would add configuration complexity, accepting the full attack surface for all engineers across all projects.",
      },
      {
        letter: "C",
        text: "Replace unrestricted Bash with narrowly scoped tool patterns that allow only the specific commands the workflows require, and add explicit deny rules for sensitive operations.",
      },
      {
        letter: "D",
        text: "Disable all permission rules for the enterprise rollout so every command across every project runs without any tool-pattern scoping or explicit deny rules for sensitive operations.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Least privilege is the right approach. Replace the blanket Bash grant with narrowly scoped allow patterns for the commands the workflows actually need, such as Bash(npm run test:*). Then add explicit deny rules for sensitive operations, like reading secrets or running destructive commands. Option A makes the attack surface bigger just for consistency. Option B accepts the full risk to avoid a little configuration work. Option D removes all scoping and deny protections, which is the worst outcome.",
      source_e:
        "Discussion:\nSelected Answer: C - Unrestricted Bash access exposes filesystem, credential, process, network, package-management, and potentially infrastructure-administration capabilities across every repository. Option C applies least privilege by identifying the commands genuinely required by approved workflows and permitting only those patterns. Explicit deny rules should protect destructive commands, sensitive files, credential stores, deployment systems, and other prohibited operations. Anthropic's permission system supports allow, ask, and deny rules, with deny evaluated before ask and allow. It also warns that command patterns intended to constrain network utilities can be fragile, so stronger controls such as WebFetch domain restrictions, hooks, and sandbox boundaries may be required. Claude Code Permissions Enterprise configuration should combine managed baseline restrictions with project-specific permissions where necessary. High-impact commands should remain subject to confirmation, and sandboxing should provide operating-system-level filesystem and network containment. Options A and D deliberately enlarge the attack surface. Option B treats configuration simplicity as more important than enterprise security and fails to account for prompt injection, accidental commands, compromised repositories, or excessive human approval. The configuration should be narrow, auditable, centrally governed, and validated against real development workflows. Study Guide references/topics: Claude Code permissions; Bash restrictions; least privilege; managed controls; explicit deny rules; sandboxing; enterprise rollout security.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 4,
    kind: "multi",
    text: "A senior architect is managing stakeholder expectations for a Claude-based reporting assistant midway through development. Stakeholders have escalating concerns about response latency. Which two actions most directly address stakeholder expectation alignment in this situation? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Present measured p50 and p95 latency baselines against the agreed SLA thresholds so stakeholders have accurate data.",
      },
      {
        letter: "B",
        text: "Pause all development until latency concerns are fully resolved.",
      },
      {
        letter: "C",
        text: "Communicate that latency concerns are a known LLM limitation that cannot be addressed.",
      },
      {
        letter: "D",
        text: "Replace the current Claude model with a third-party model to signal responsiveness.",
      },
      {
        letter: "E",
        text: "Revise the SLA definition collaboratively with stakeholders if current targets are not achievable given production constraints.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "AE", source_c: "AE" },
    explanations: {
      claude:
        "To align expectations, first show stakeholders the facts: measured p50/p95 latency compared with the agreed SLA (A). If those targets can't be met under real production constraints, the next step is to revise the SLA together with stakeholders (E), so expectations stay realistic and agreed. Pausing all development (B) is an overreaction. Saying latency can't be addressed (C) is wrong because caching, streaming, model choice and prompt size can all help, and it brushes off the concern. Switching models just to look responsive (D) is a signal, not a fix, and isn't based on data.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 5,
    kind: "single",
    text: "You are supporting a team whose Claude Code sessions consistently load 60 or more MCP tools from many servers, exhausting context budget before the session begins. Which adjustment most directly addresses this issue without removing capability?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Enable Tool Search so tool definitions are deferred and discovered on demand rather than loaded into context upfront.",
      },
      {
        letter: "B",
        text: "Disable every MCP server in the configuration to free up context budget, accepting that the team loses all tool access and cannot perform any MCP-dependent task in the session.",
      },
      {
        letter: "C",
        text: "Increase the prompt's verbosity with additional instructions and context, which consumes more of the context budget rather than reducing the tool-definition overhead causing the issue.",
      },
      {
        letter: "D",
        text: "Add additional MCP servers to give the team more capability, which increases rather than reduces the number of tool definitions loaded into the session's context budget.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "A", source_c: "A" },
    explanations: {
      claude:
        "Tool Search defers MCP tool definitions. Claude loads only the tools it needs, when it needs them, instead of putting all 60+ schemas into context at the start. That frees context and keeps every tool available. B frees context but removes all MCP capability. C and D make the problem worse because they add more tokens or more tool definitions.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 6,
    kind: "multi",
    text: "You are reviewing an integration specification for security gaps. Which two findings constitute valid security gaps in the specification? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Tool calls execute server-side under a least-privilege service principal with scoped permissions.",
      },
      {
        letter: "B",
        text: "Service credentials are placed in the prompt context, where they can leak into logs and traces.",
      },
      {
        letter: "C",
        text: "Role-based access control is enforced only at the response-rendering layer after the model accesses restricted data.",
      },
      {
        letter: "D",
        text: "Per-user OAuth tokens are exchanged with scope-restricted permissions and refreshed within the active session.",
      },
      {
        letter: "E",
        text: "Tool inputs and outputs are encrypted in transit using transport-layer security between services.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BC", source_c: "BC", source_e: "BC" },
    explanations: {
      claude:
        "B is a gap: if service credentials sit in the prompt context, they can leak through logs, traces or the model's own output. Credentials should stay server-side, outside the model's context. C is a gap: if access control only filters at the rendering layer, the model has already read the restricted data, which can then leak through its reasoning or other outputs. Permissions should be checked at the data and tool layer before anything is retrieved. A (least-privilege service principal), D (scoped per-user OAuth tokens) and E (TLS in transit) are good security practices, not gaps.",
      source_e:
        "Discussion:\nSelected Answer: B,C - Credentials must never be supplied as prompt content. Prompts can be retained in traces, debugging output, caches, or logs, and model output may inadvertently expose included secrets. Credentials should instead be resolved server-side through an approved secret store or delegated authentication mechanism. Option C is also a serious gap because post-response RBAC occurs after unauthorized data has already entered model context. Authorization must be enforced before retrieval and prompt construction. Options A, D, and E describe appropriate controls: least-privilege service identities, per-user scoped OAuth, and encrypted transport. Anthropic's prompt-leak guidance recommends excluding unnecessary sensitive information, while Claude Code security relies on permission-based enforcement rather than natural-language instructions alone. Reduce prompt leak",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 7,
    kind: "single",
    text: "You are investigating an MCP server that fails on first launch but succeeds on subsequent runs. System permission dialogs appeared during the first launch. Which response is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Recognize the first-run permission grant as the cause, document the expected behavior in onboarding guidance, and confirm that subsequent runs succeed.",
      },
      {
        letter: "B",
        text: "Reinstall the operating system to clear all permission state without first confirming whether the one-time permission grant caused the failure.",
      },
      {
        letter: "C",
        text: "Disable operating-system permission dialogs entirely, accept the resulting security implications, and proceed without confirming whether the failure recurs.",
      },
      {
        letter: "D",
        text: "Treat the first-run failure as a permanent fault, replace the MCP server, and do not verify whether subsequent runs succeed.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "D" },
    explanations: {
      claude:
        "The answer is A. The failure only happens on the first launch, it happens alongside system permission dialogs, and later runs work. That points to a one-time permission grant interrupting the first launch, so the right steps are to confirm that later runs succeed and add the expected behavior to onboarding guidance. B (reinstall the operating system) is far too drastic and skips diagnosis. C (turn off permission dialogs) weakens security for no reason and never checks the failure again. D treats a one-time issue as a permanent fault and replaces a server that works without checking.",
      source_e:
        "Discussion:\nSelected Answer: D Blindly granting system permissions appears to be a security risk rather than expected behaviour. upvoted 1 time Submit Cancel\n\n---\n\nBlindly granting system permissions appears to be a security risk rather than expected behaviour.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 8,
    kind: "multi",
    text: "A technical team is cataloguing risks specific to Claude's use in a document-grounded Q&A system. Which two items represent failure modes intrinsic to LLM-based systems rather than generic software defects? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "An expired TLS certificate blocks outbound API calls to Claude.",
      },
      {
        letter: "B",
        text: "A database connection timeout causes retrieval to return an empty result set.",
      },
      {
        letter: "C",
        text: "The model refuses a legitimate query because surface features trigger an overly broad safety pattern.",
      },
      {
        letter: "D",
        text: "A misconfigured load balancer routes requests to a deprecated API version.",
      },
      {
        letter: "E",
        text: "The model generates a plausible-sounding answer unsupported by any retrieved document.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "CE",
      source_c: "CE",
      source_e: "CE",
      source_e_dup_2: "CE",
    },
    explanations: {
      claude:
        "C (over-refusal, where surface features trigger an overly broad safety pattern) and E (hallucination, a confident answer that no retrieved document supports) both come from how the model behaves, so they are specific to LLM-based systems. They need LLM-specific fixes such as grounding checks, citation requirements, prompt calibration and evals. A (expired TLS certificate), B (database timeout) and D (load balancer misrouting) are ordinary infrastructure or configuration faults that could happen in any software system.",
      source_e:
        "Discussion:\nSelected Answer: A,B - Options A and B describe model-specific behavioral risks. An overly broad safety response is a false positive caused by how the language model interprets contextual or surface-level signals. A plausible but unsupported answer is a hallucination: the generated statement appears credible but lacks grounding in the retrieved evidence. Anthropic recommends grounding factual responses in source material, requiring citations, allowing Claude to express uncertainty, and verifying generated claims. Options C, D, and E are conventional infrastructure or application failures involving certificates, routing, and database connectivity. They can occur in systems that do not use an LLM and should be addressed through standard monitoring, configuration management, retry policies, and operational testing. Anthropic: Reduce hallucinations",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 9,
    kind: "multi",
    text: "You are running a risk assessment on a planned Claude-based deployment and must complete the inventory steps before assessing threats against assets. Which two steps must be completed BEFORE assessing threats against assets to estimate likelihood and impact? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Document the assessment outcome and present it to the risk committee.",
      },
      {
        letter: "B",
        text: "Recommend mitigations and residual-risk acceptance for all identified threats.",
      },
      {
        letter: "C",
        text: "Identify the assets that the deployment touches, along with the sensitivity of each asset.",
      },
      {
        letter: "D",
        text: "Recommend mitigations and residual-risk acceptance for risks that remain.",
      },
      {
        letter: "E",
        text: "Enumerate the threat actors and attack vectors relevant to the deployment.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CE", source_c: "CE", source_e: "CE" },
    explanations: {
      claude:
        "To estimate likelihood and impact, you first need two inventories. One is the assets the deployment touches and how sensitive each one is (C), which drives impact. The other is the relevant threat actors and attack vectors (E), which drives likelihood. Recommending mitigations and accepting residual risk (B, D) and documenting the outcome for the risk committee (A) all come after threats are assessed, so they cannot be prerequisites.",
      source_e:
        "Discussion:\nSelected Answer: C,E - Threat assessment requires an inventory of what must be protected and who or what may threaten it. Asset identification should cover prompts, retrieved documents, credentials, model outputs, audit logs, tools, external systems, and sensitive business or personal data. Sensitivity classifications establish the potential confidentiality, integrity, safety, and availability impact of compromise. Threat actors and attack vectors must then be enumerated so likelihood and impact can be assessed against specific assets. Mitigation recommendations, residual-risk acceptance, ownership, and final documentation follow the analysis; they cannot be completed coherently before the threats are understood. Anthropic's security transparency materials similarly emphasize maintaining threat models that reflect relevant attacker tactics and techniques. Anthropic Transparency Hub",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 10,
    kind: "multi",
    text: "You are compiling guardrail tactics for a customer-facing assistant. Which two tactics belong on the guardrail list? Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Embed approved override phrases that users can invoke to bypass guardrails.",
      },
      {
        letter: "B",
        text: "Lower sampling temperature globally to eliminate all variability in responses.",
      },
      {
        letter: "C",
        text: "Validate the model output against a structured schema before downstream actions are taken.",
      },
      {
        letter: "D",
        text: "Layer prompt-level guardrails with runtime content checks rather than relying on either alone.",
      },
      {
        letter: "E",
        text: "Rely on a single hardened system prompt as the only guardrail mechanism.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "CD", source_c: "CD" },
    explanations: {
      claude:
        "C belongs on the list because checking output against a structured schema stops malformed or unsafe output before any downstream action runs. D belongs because layered defense works better: prompt-level instructions combined with runtime content checks cover each other's gaps. A is wrong because built-in override phrases are a known bypass that defeats the guardrails. B is wrong because a lower temperature reduces variability but doesn't make the output safe or correct. E is wrong because a single system prompt is a single point of failure that prompt injection can get past.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 11,
    kind: "single",
    text: "You are diagnosing a Claude Code session whose subagent uses 50,000 tokens of context before the engineer types a single message. Which root cause is most likely?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The developer's keyboard layout or input-method configuration is the cause of the elevated context consumption, introducing extra tokens before the engineer types any message.",
      },
      {
        letter: "B",
        text: "Many MCP servers are configured, each contributing tool definitions to the context budget; Tool Search is not enabled, so all definitions load upfront.",
      },
      {
        letter: "C",
        text: "The model has internal personal preferences or default behaviors that silently consume large portions of context budget before any user message is processed, independent of tool configuration.",
      },
      {
        letter: "D",
        text: "The font rendering or display-scaling settings of the IDE are converting visual output into additional context tokens, causing the high pre-session context consumption.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "B", source_c: "B" },
    explanations: {
      claude:
        'Before any user message is sent, context is used by the system prompt, CLAUDE.md/memory, and tool definitions. When many MCP servers are configured and Tool Search is off, every tool schema loads upfront, which can easily add tens of thousands of tokens. Keyboard layout (A) and font or display settings (D) never reach the model\'s context. The model also has no hidden "preferences" that silently use up context (C).',
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 12,
    kind: "single",
    text: "A team manager wants all engineers working on the same repository to share identical MCP server definitions without manual synchronization. Which configuration approach satisfies this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Managed configuration pushed to all endpoints by the administrator.",
      },
      {
        letter: "B",
        text: "Environment variables set at the operating-system level on each workstation.",
      },
      {
        letter: "C",
        text: "Project-scope .claude/settings.json and .mcp.json files committed to the repository.",
      },
      {
        letter: "D",
        text: "Each engineer maintains a personal ~/.claude/settings.json with the shared definitions.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Project-scoped MCP config (.mcp.json, plus .claude/settings.json) committed to the repo is version-controlled. Every engineer who clones or pulls gets the same server definitions without any manual syncing. Managed configuration (A) is for organization-wide policy that admins enforce, not for per-repo team sharing, and it needs admin rollout. OS environment variables (B) and personal ~/.claude/settings.json files (D) both have to be set up separately on each machine, so they drift out of sync.",
      source_e:
        "Discussion:\nSelected Answer: C - Project-scoped configuration is the appropriate mechanism for repository-specific settings that must remain consistent across collaborators. Claude Code recognizes `.claude/settings.json` as the shared project settings file and `.mcp.json` as the project-level MCP server configuration. When these files are committed to source control, every engineer receives the same definitions through the repository's normal clone, pull, review, and versioning workflow. Anthropic's scope hierarchy distinguishes project configuration from user and local configuration. Files under the user scope apply to one engineer and are not automatically shared. Operating-system environment variables are also workstation-specific and require separate configuration management. Managed settings can be distributed centrally, but they are primarily intended for organization-wide security policies and controls that must be enforced by administrators; they are less appropriate when the configuration belongs specifically to one repository. Shared configuration should contain server definitions and environment-variable references, but not plaintext credentials. Each engineer can resolve required secrets through an approved local secret mechanism while retaining identical server names, transports, arguments, and non-sensitive settings. Project MCP servers also remain subject to workspace trust and approval controls before execution. Study Guide references/topics: [Claude Code configuration scopes](https://docs.anthropic.com/en/docs /claude-code/settings); project-scoped MCP servers; `.mcp.json`; repository-based operational standardization; secure secret separation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 13,
    kind: "single",
    text: "You are supporting an engineer whose Claude Code session reports a permission denial when the engineer expected the action to be allowed. Which resolution step is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Tell the engineer to retry the denied action verbatim repeatedly until the denial stops appearing, without inspecting the active permission rules to determine whether the denial is intentional.",
      },
      {
        letter: "B",
        text: "Disable the permission system entirely across all scopes to remove the denial, eliminating all tool-pattern and deny-rule controls rather than identifying and amending the specific rule.",
      },
      {
        letter: "C",
        text: "Inspect the active permission rules across all scopes—managed, command-line, local, project, and user—to identify which rule is denying the action and confirm whether it should be amended or remain denied.",
      },
      {
        letter: "D",
        text: "Grant the engineer unrestricted Bash access to bypass the specific rule causing the denial, removing all tool-pattern constraints rather than amending only the rule in question.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Claude Code combines permission rules from several scopes: managed, command-line, local, project and user. Deny rules win, and managed settings can't be overridden. So the right fix is to find the specific rule causing the denial (for example with /permissions) and decide whether it should be changed or is deliberate. Retrying over and over (A) changes nothing and skips the diagnosis. Turning off the permission system (B) or giving unrestricted Bash (D) removes all safety controls just to fix one rule, which breaks least privilege.",
      source_e:
        "Discussion:\nSelected Answer: C - Claude Code permission decisions can be affected by multiple configuration scopes. The appropriate diagnostic action is to inspect the effective rules and identify the exact deny pattern. Managed policy has the highest precedence, and a deny rule from any applicable scope cannot be overridden by an allow rule elsewhere. The architect must then determine whether the denial represents an intentional security boundary or an incorrectly scoped rule. If correction is justified, only the specific rule should be amended. Repeated retries cannot change a deterministic permission decision. Disabling permissions or granting unrestricted Bash access removes safeguards far beyond the reported problem and violates least privilege. Anthropic's permission documentation explicitly describes scope precedence and deny-first evaluation. Claude Code permissions",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 14,
    kind: "single",
    text: "You are integrating Claude Code into the team's pull-request workflow. The team wants AI-assisted review without removing human approval. Which integration design best fits this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Claude Code reviews the pull request and posts a structured analysis as a comment, while a human reviewer retains the approval decision under the existing branch-protection rules.",
      },
      {
        letter: "B",
        text: "Claude Code merges every pull request automatically after completing its analysis, bypassing human approval and the existing branch-protection rules.",
      },
      {
        letter: "C",
        text: "Claude Code disables all existing branch-protection rules to streamline the merge process, removing human approval as a required gate.",
      },
      {
        letter: "D",
        text: "Claude Code silently deletes pull requests it assesses as low quality without posting a comment or notifying the author.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "Option A is the only design that adds AI-assisted review and still keeps human approval. Claude Code posts a structured analysis as a PR comment, and a human reviewer still approves under the existing branch-protection rules. B auto-merges and C disables branch protection, so both remove the human approval gate. D silently deletes PRs, which is destructive, can't be audited, and gives the author no feedback.",
      source_e:
        "Discussion:\nSelected Answer: A - Option A augments the existing review process without transferring final accountability to the model. Claude Code can inspect the change in repository context, identify logic defects, security weaknesses, regressions, and maintainability concerns, and publish structured findings for human evaluation. Existing branch protection then preserves required approvals and separation of duties. Automatic merging or disabling protection rules would convert an advisory capability into an uncontrolled authorization mechanism. Silent deletion would eliminate transparency and prevent authors from challenging or correcting the assessment. Anthropic's Code Review documentation states that findings are posted as comments and do not approve or block the pull request, leaving the established review workflow intact. Claude Code Review",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 15,
    kind: "single",
    text: "A platform team operates a self-hosted multi-agent system on Kubernetes that orchestrates seven specialized agents for invoice processing. The team spends approximately 40 percent of engineering capacity on infrastructure maintenance, message bus reliability, and agent state recovery. The CFO has asked you to evaluate moving to managed agent infrastructure to reclaim engineering capacity. The security officer requires that all customer financial data remain within an approved network boundary.\n\n Which factor should most heavily influence your recommendation?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Whether the current seven agents map cleanly to the patterns supported by managed agents.",
      },
      {
        letter: "B",
        text: "Whether managed agents reduce per-invoice token costs across the existing processing volume.",
      },
      {
        letter: "C",
        text: "Whether managed agents support the current bus topology used by the platform team.",
      },
      {
        letter: "D",
        text: "Whether managed agent data handling satisfies the network boundary required by security.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "The security officer's network boundary is a hard requirement. If managed agents can't keep customer financial data inside it, the move is ruled out no matter how much engineering time it saves. Pattern fit (A) can be worked around by redesigning the agents. Token cost (B) isn't what the CFO asked about, since the goal is getting engineering time back. Matching the current bus topology (C) misses the point, because that self-run infrastructure is what managed agents would replace.",
      source_e:
        "Discussion:\nSelected Answer: D - The network-boundary requirement is a mandatory architectural constraint; therefore, Option D must be resolved before evaluating operational savings. Managed infrastructure can reduce responsibility for agent loops, sandboxes, session state, recovery, and orchestration, but those advantages are immaterial if financial data leaves the approved boundary. Anthropic describes Claude Managed Agents as a hosted agent harness and provides configurable data-residency controls . The architect must still validate inference location, session persistence, encryption, subprocessors, credential handling, auditability, and deletion behavior against the organization's exact security policy. Options A, B, and C affect migration effort or economics, but they cannot override a non-negotiable data-governance requirement. Study Guide references/topics: Architectural constraints; managed versus self-hosted agents; data boundaries; residency; security-gated decision-making.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 16,
    kind: "multi",
    text: "You are producing an architecture guide for a new deployment and must complete the planning steps before drafting each section. Which two steps must be completed BEFORE drafting each section of the guide? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Identify the audience and the questions the guide must answer for that audience.",
      },
      {
        letter: "B",
        text: "Translate the guide into the supported regional languages before drafting.",
      },
      {
        letter: "C",
        text: "Validate the guide with the implementation team and incorporate corrections.",
      },
      {
        letter: "D",
        text: "Establish the document under version control and assign a review cadence.",
      },
      {
        letter: "E",
        text: "Outline the guide sections covering the overview, components, contracts, flows, runbooks, and limitations.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AE", source_c: "AE", source_e: "AE" },
    explanations: {
      claude:
        "Before drafting any section, you must know who the guide is for and what questions it must answer (A). You also need a section outline covering the overview, components, contracts, flows, runbooks and limitations (E). Together these set the scope and structure that drafting fills in. Translation (B), validation with the implementation team (C) and version control with a review cadence (D) all happen during or after drafting, not before it.",
      source_e: "Discussion:\nSelected Answer: B,C",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 17,
    kind: "yesno",
    text: "You are evaluating retrieval-strategy claims used by a peer team. For each claim, select yes if the statement is generally accurate. Otherwise, select no.",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Dense vector retrieval is well suited to recovering paraphrased intent against unstructured text.",
        options: ["Yes", "No"],
      },
      {
        letter: "B",
        text: "Sparse term-matching retrieval recovers exact terms (such as identifiers and rare tokens) more reliably than dense alone.",
        options: ["Yes", "No"],
      },
      {
        letter: "C",
        text: "Structured query retrieval is the right fit for filter-and-aggregate workloads against a relational store with schema and indexes.",
        options: ["Yes", "No"],
      },
      {
        letter: "D",
        text: "Hybrid retrieval is identical to dense-only retrieval and shares the same recall characteristics.",
        options: ["Yes", "No"],
      },
      {
        letter: "E",
        text: "Random sampling of a data store is a sound retrieval strategy for production Q&A.",
        options: ["Yes", "No"],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: { A: "Yes", B: "Yes", C: "Yes", D: "No", E: "No" },
      source_c: { A: "Yes", B: "Yes", C: "Yes", D: "No", E: "No" },
      source_e:
        "Yes | Yes | Yes | No | No (Dense vector for semantic paraphrases: Yes, Sparse BM25 for exact tokens/IDs: Yes, Structured query for relational aggregations: Yes, Hybrid identical to dense: No, Random sampling for production Q&A: No)",
    },
    explanations: {
      claude:
        "A is true because dense embeddings match on meaning, so they can find paraphrased intent in unstructured text. B is true because sparse methods like BM25 match exact tokens, so they find identifiers, codes and rare terms more reliably than embeddings alone. C is true because filter-and-aggregate work on a relational store with a schema and indexes is what structured queries like SQL are built for. D is false because hybrid search combines dense and sparse results, so its recall is different from dense alone and usually better on exact terms. E is false because random sampling ignores the query, so it can't reliably find relevant evidence for production Q&A.",
      source_e:
        "Hotspot Solution:\n| Retrieval-Strategy Claim | Accurate? |\n| :--- | :--- |\n| **Dense vector retrieval matches paraphrases and conceptually related language** | **Yes** |\n| **Sparse lexical retrieval (BM25) retains strong sensitivity to exact tokens, IDs, and product codes** | **Yes** |\n| **Structured query retrieval is appropriate for explicit predicates, joins, and aggregations** | **Yes** |\n| **Hybrid retrieval is identical to dense retrieval alone** | **No** |\n| **Random sampling is an effective relevance strategy for production Q&A** | **No** |\n\n### Explanation:\n- Dense embeddings capture semantic similarity, sparse BM25 captures exact lexical tokens, and structured queries handle relational aggregations. Hybrid search combines dense and lexical retrieval with rank fusion/reranking, whereas random sampling provides no relevance guarantees.\n\nDiscussion:\nSelected Answer: A\nDense embeddings capture semantic similarity, sparse BM25 captures exact lexical tokens, and structured queries handle relational aggregations. Hybrid search combines dense and lexical retrieval with rank fusion/reranking, whereas random sampling provides no relevance guarantees.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 18,
    kind: "multi",
    text: "A Claude-based research assistant begins producing responses that confidently contradict its retrieved source documents despite no change to the retrieval pipeline. Which two diagnostic actions most directly identify the root cause of this behavior? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Increase the context-window size to allow more retrieved chunks per query.",
      },
      {
        letter: "B",
        text: "Switch the retrieval index to a denser embedding model to improve chunk-relevance scores.",
      },
      {
        letter: "C",
        text: "Determine whether the failure reproduces on the previous model version to test for a model mismatch.",
      },
      {
        letter: "D",
        text: "Reduce the temperature setting to lower response variance across all query types.",
      },
      {
        letter: "E",
        text: "Inspect the system-prompt grounding instructions to determine whether citation constraints remain intact.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "CE",
      source_c: "CE",
      source_e: "CE",
      source_e_dup_2: "C",
    },
    explanations: {
      claude:
        "Retrieval didn't change, so the cause is probably either the model or the prompt. Option C tests whether the failure also happens on the previous model version, which isolates a model mismatch. Option E checks whether the system prompt's grounding and citation rules were changed or weakened, which would let the model override its sources. Options A, B and D change settings instead of diagnosing anything: they target retrieval coverage, relevance or randomness, and none of those explains confident contradiction of documents that were already retrieved.",
      source_e:
        "Discussion:\nSelected Answer: C,E - The retrieval pipeline is stated to be unchanged, so the first investigation should isolate changes in generation behavior and grounding instructions. Replaying the failing cases on the previous model version determines whether the regression follows the model upgrade or current model-prompt combination. Inspecting the system prompt establishes whether source-use rules, uncertainty behavior, citation requirements, or prohibitions against unsupported claims were removed or weakened. Increasing context or replacing the embedding model changes a component for which no failure evidence exists and may introduce additional noise. Lowering temperature may reduce variation but does not explain systematic contradiction of retrieved evidence. The investigation should compare identical requests, retrieved passages, prompts, and model versions before applying a fix. Define success criteria and evaluations",
    },
    confidence: { claude: "high" },
    flags: { source_e_dup_2: "marks 1, question asks for two" },
  },
  {
    id: 19,
    kind: "single",
    text: 'A solutions architect is analyzing stakeholder feedback collected after the first quarter of a Claude-powered procurement automation deployment. The feedback includes four statements: (1) "Our procurement team is processing 3x more purchase orders per analyst per day." (2) "We have eliminated the manual data entry role entirely and redeployed those staff to vendor relationship management." (3) "The API integration costs are running 40% over the projected per-transaction budget." (4) "Response latency during end-of-month batch runs is averaging 11 seconds, against our committed 5-second SLA." Which of the following correctly identifies the primary business value pillar each stakeholder statement represents?',
    images: [],
    choices: [
      {
        letter: "A",
        text: "Statement 1: Efficiency; Statement 2: Transformation; Statement 3: Solution Cost; Statement 4: Performance SLA",
      },
      {
        letter: "B",
        text: "Statement 1: Productivity; Statement 2: Efficiency; Statement 3: Solution Cost; Statement 4: Performance SLA",
      },
      {
        letter: "C",
        text: "Statement 1: Transformation; Statement 2: Productivity; Statement 3: Solution Cost; Statement 4: Efficiency",
      },
      {
        letter: "D",
        text: "Statement 1: Efficiency; Statement 2: Productivity; Statement 3: Performance SLA; Statement 4: Solution Cost",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "Statement 1 measures more output per analyst, which is productivity. Statement 2 removes a manual labor role, so the same work is done with fewer resources, which is efficiency. Statement 3 is about budget overruns (solution cost), and statement 4 is a latency breach of a committed SLA (performance SLA). A calls the output-per-person gain efficiency, C mislabels statements 1, 2 and 4, and D swaps cost and SLA.",
      source_e:
        "Discussion:\nSelected Answer: A - Statement 1 measures efficiency because the same operating unit-one procurement analyst-now processes three times as many purchase orders per day. It reflects increased throughput and reduced effort per transaction within the existing procurement process. Statement 2 represents transformation. The organization has not merely accelerated manual data entry; it has eliminated that role from the workflow and redirected employees toward higher-value vendor relationship management. This is a structural redesign of responsibilities and operating practices. Statement 3 is a solution-cost issue because the measured API integration expense exceeds the approved per- transaction financial model by 40%. The architect must investigate token consumption, model routing, caching, retrieval overhead, tool calls, and integration charges while protecting the required quality level. Statement 4 directly concerns the performance SLA. The observed 11-second latency is compared with an explicit contractual or operational target of five seconds. This is not simply an efficiency complaint; it is a measurable breach of a defined service-level commitment. The architect should map each stakeholder statement to its dominant value pillar before recommending remediation because throughput, organizational transformation, cost control, and SLA compliance require different architectural responses. Study Guide references/topics: Business-value pillars; efficiency; transformation; solution cost; performance SLAs; stakeholder-outcome classification.",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 20,
    kind: "yesno",
    text: "You are a solution architect evaluating candidate use cases for a Claude-based program. For each scenario, select Yes if Claude is appropriate as the primary solution at the architectural level. Otherwise, select No.",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Drafting first-pass investigative reports from semi-structured incident logs for analyst review.",
        options: ["Yes", "No"],
      },
      {
        letter: "B",
        text: "Computing real-time fraud scores at sub-50-millisecond latency on a streaming pipeline.",
        options: ["Yes", "No"],
      },
      {
        letter: "C",
        text: "Long-context contract review with structured clause extraction and deviation flagging.",
        options: ["Yes", "No"],
      },
      {
        letter: "D",
        text: "Replacing a vector index for semantic retrieval over a multi-million-document corpus.",
        options: ["Yes", "No"],
      },
      {
        letter: "E",
        text: "Routing inbound support tickets into 30 categories with reasoning for the chosen routing.",
        options: ["Yes", "No"],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: { A: "Yes", B: "No", C: "Yes", D: "No", E: "Yes" },
      source_c: { A: "Yes", B: "No", C: "Yes", D: "No", E: "Yes" },
      source_e:
        "Yes | No | Yes | No | Yes (Drafting reports: Yes, Sub-50ms fraud scoring: No, Long-context contract review: Yes, Replacing vector index: No, Routing support tickets: Yes)",
    },
    explanations: {
      claude:
        "A, C and E suit Claude's strengths. A is drafting from semi-structured text with a human reviewing the result. C is long-context reading plus structured extraction. E is classification that also explains its reasoning. B needs deterministic scores in under 50 ms on a streaming pipeline, which LLM inference latency can't reliably meet, so a purpose-built ML model fits better. D is wrong because Claude doesn't replace a vector index. Retrieval over millions of documents needs embeddings and an ANN index, with Claude at most working on top of the retrieved results.",
      source_e:
        "Hotspot Solution:\n| Candidate Scenario | Appropriate for Claude? |\n| :--- | :--- |\n| **Drafting first-pass investigative reports from semi-structured incident logs for analyst review** | **Yes** |\n| **Computing real-time fraud scores at sub-50-millisecond latency on a streaming pipeline** | **No** |\n| **Long-context contract review with structured clause extraction and deviation flagging** | **Yes** |\n| **Replacing a vector index for semantic retrieval over a multi-million-document corpus** | **No** |\n| **Routing inbound support tickets into 30 categories with reasoning for the selected route** | **Yes** |\n\n### Explanation:\n- Claude is well suited to language-intensive analysis, summarization, extraction, classification, and drafting. A sub-50-millisecond fraud-scoring path requires deterministic real-time processing, and Claude consumes rather than replaces a vector retrieval index over millions of documents.\n\nDiscussion:\nSelected Answer: A\nClaude is well suited to language-intensive analysis, summarization, extraction, classification, and drafting. A sub-50-millisecond fraud-scoring path requires deterministic real-time processing, and Claude consumes rather than replaces a vector retrieval index over millions of documents.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 21,
    kind: "single",
    text: "You are an architect supporting the iteration phase of a deployed Claude-based system. Which activity most directly fits this phase?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Rebuild the entire system architecture from scratch at the start of every iteration cycle regardless of what production telemetry, evaluations, and stakeholder feedback indicate is needed.",
      },
      {
        letter: "B",
        text: "Stop measuring production outcomes once the deployment has successfully launched, treating the go-live milestone as the end of the evaluation and iteration cycle.",
      },
      {
        letter: "C",
        text: "Discard the evaluation framework and reference set once the deployment is in production, accepting that future iterations will have no structured basis for measuring the impact of changes.",
      },
      {
        letter: "D",
        text: "Review production telemetry, sampled output evaluations, and stakeholder feedback to identify the highest-impact change for the next cycle, then plan the change against the evaluation framework.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "The iteration phase is a feedback loop. You use production telemetry, sampled output evaluations and stakeholder feedback to pick the highest-impact change, then plan and check that change against the existing evaluation framework. A wastes effort by rebuilding everything without using the evidence. B ends measurement at launch, and C throws away the evaluation baseline. Both remove what you need to judge whether a change helped.",
      source_e:
        "Discussion:\nSelected Answer: D - Iteration is an evidence-driven lifecycle phase. Option D combines three essential inputs: production telemetry, sampled output evaluation, and stakeholder feedback. Telemetry exposes latency, cost, errors, tool failures, retrieval behavior, and operational anomalies. Output sampling identifies quality, safety, grounding, or consistency failures that infrastructure metrics may not reveal. Stakeholder feedback establishes whether the system continues to satisfy real business and user needs. The architect should prioritize the highest-impact validated problem, define the intended improvement, and test the proposed change against the existing evaluation framework and reference set. Anthropic emphasizes that evaluations make behavioral changes visible before they affect users and that their value compounds throughout an agent's lifecycle. Demystifying Evals for AI Agents Option A replaces targeted iteration with unnecessary redesign. Option B incorrectly treats deployment as the end of measurement. Option C removes the baseline needed to distinguish genuine improvement from regression or noise. A mature iteration cycle preserves evaluation continuity, adds production failures as new test cases, validates changes offline, conducts controlled rollout, monitors results, and updates documentation and known limitations. Study Guide references/topics: Production iteration; telemetry; sampled evaluation; stakeholder feedback; regression testing; evaluation continuity; change prioritization.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 22,
    kind: "classification",
    text: "You are classifying chunking strategies by the corpus type each is best suited to. For each chunking strategy, select the appropriate corpus type: 'Long Structured Documents,' 'Heterogeneous Short Records,' or 'Code or Hierarchical Specifications.'",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Function-level or section-level chunking for code modules",
        options: [],
      },
      {
        letter: "B",
        text: "Tree-aware chunking that follows code or specification hierarchy",
        options: [],
      },
      {
        letter: "C",
        text: "Per-record chunking where each record is one chunk",
        options: [],
      },
      {
        letter: "D",
        text: "Semantic chunking along clause or paragraph boundaries",
        options: [],
      },
      {
        letter: "E",
        text: "Fixed-size chunking with overlap for short records of similar length",
        options: [],
      },
      {
        letter: "F",
        text: "Hierarchical chunking that mirrors document section structure",
        options: [],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: {
        A: "Code or Hierarchical Specifications",
        B: "Code or Hierarchical Specifications",
        C: "Heterogeneous Short Records",
        D: "Long Structured Documents",
        E: "Heterogeneous Short Records",
        F: "Long Structured Documents",
      },
      source_c: {
        A: "Code or Hierarchical Specs",
        B: "Code or Hierarchical Specs",
        C: "Heterogeneous Short Records",
        D: "Long Structured Documents",
        E: "Heterogeneous Short Records",
        F: "Long Structured Documents",
      },
      source_e:
        "Code/Hierarchical Specs | Code/Hierarchical Specs | Heterogeneous Short Records | Long Structured Documents | Heterogeneous Short Records | Long Structured Documents",
    },
    explanations: {
      claude:
        "Code and hierarchical specs are best chunked along functions, sections or the syntax tree, which is why A and B go there. Short records are self-contained, so they are chunked per record, or fixed-size with overlap when lengths are similar (C and E). Long structured documents are best split along clauses or paragraphs, or by mirroring their section hierarchy so each chunk keeps its heading context (D and F).",
      source_e:
        "Hotspot Solution:\n| Chunking Strategy | Target Corpus Type |\n| :--- | :--- |\n| **Function-level or section-level chunking for code modules** | **Code or Hierarchical Specifications** |\n| **Tree-aware chunking that follows code or specification hierarchy** | **Code or Hierarchical Specifications** |\n| **Per-record chunking where each record is one chunk** | **Heterogeneous Short Records** |\n| **Semantic chunking along clause or paragraph boundaries** | **Long Structured Documents** |\n| **Fixed-size chunking with overlap for short records of similar length** | **Heterogeneous Short Records** |\n| **Hierarchical chunking that mirrors document section structure** | **Long Structured Documents** |\n\n### Explanation:\n- Code and hierarchical specifications require function/tree-aware boundaries. Heterogeneous short records map cleanly to per-record or fixed-size chunks. Long structured documents benefit from semantic clause/paragraph and section-hierarchy chunking.\n\nDiscussion:\nSelected Answer: A\nCode and hierarchical specifications require function/tree-aware boundaries. Heterogeneous short records map cleanly to per-record or fixed-size chunks. Long structured documents benefit from semantic clause/paragraph and section-hierarchy chunking.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 23,
    kind: "yesno",
    text: "You are evaluating prompting claims in a peer's design document. For each claim, select yes if the claim reflects sound practice. Otherwise, select no.",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Zero-shot is appropriate as a starting point for closed-set classification when categories and descriptions are provided in the prompt.",
        options: ["Yes", "No"],
      },
      {
        letter: "B",
        text: "Adding a few-shot example set with exact field names anchors output formatting on extraction tasks.",
        options: ["Yes", "No"],
      },
      {
        letter: "C",
        text: "Chain-of-thought should be the default on every task regardless of complexity.",
        options: ["Yes", "No"],
      },
      {
        letter: "D",
        text: "Leading-question framing is best mitigated by asking for an even-handed comparison with stated criteria.",
        options: ["Yes", "No"],
      },
      {
        letter: "E",
        text: "Behavioral differences across model versions can be ignored once a prompt has been validated on one version.",
        options: ["Yes", "No"],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: { A: "Yes", B: "Yes", C: "No", D: "Yes", E: "No" },
      source_c: { A: "Yes", B: "Yes", C: "No", D: "Yes", E: "No" },
      source_e:
        "Yes | Yes | No | Yes | No (Zero-shot baseline for closed-set classification: Yes, Few-shot examples for schema extraction: Yes, Chain-of-thought unconditional default for all tasks: No, Neutral criteria mitigate leading-question bias: Yes, Prompts never need re-evaluation across model versions: No)",
    },
    explanations: {
      claude:
        "A: Yes. When the prompt lists the categories and describes each one, zero-shot is a sensible place to start. You add examples only if evals show you need them. B: Yes. A few examples that use the exact field names anchor the output format and keep it consistent. C: No. Chain-of-thought adds delay and cost, so use it where the task needs reasoning, not on every task. D: Yes. To counter a leading question, ask for an even-handed comparison against stated criteria. E: No. Behavior can change between model versions, so re-run your evals whenever you upgrade or migrate.",
      source_e:
        "Hotspot Solution:\n| Prompting Claim | Sound Practice? |\n| :--- | :--- |\n| **Zero-shot prompting is a reasonable baseline for a clearly defined closed-set classifier** | **Yes** |\n| **Few-shot examples containing exact field names improve extraction consistency** | **Yes** |\n| **Chain-of-thought should be enabled unconditionally for every routine task regardless of latency** | **No** |\n| **Even-handed comparison governed by explicit criteria mitigates leading-question bias** | **Yes** |\n| **Validated prompts automatically transfer to new model versions without regression testing** | **No** |\n\n### Explanation:\n- Zero-shot is a solid baseline for closed-set classification and few-shot examples steer structured extraction. Chain-of-thought adds token and latency overhead so it should be applied selectively, neutral framing prevents bias, and model migrations always require regression evaluation.\n\nDiscussion:\nSelected Answer: A\nZero-shot is a solid baseline for closed-set classification and few-shot examples steer structured extraction. Chain-of-thought adds token and latency overhead so it should be applied selectively, neutral framing prevents bias, and model migrations always require regression evaluation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 24,
    kind: "single",
    text: "You are assessing a Claude-based system whose dominant risk is silent quality drift on safety-relevant outputs after a model-version upgrade. Which assessment activity most directly addresses this risk?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Disable adversarial evaluation entirely during model-version upgrade cycles to reduce evaluation cost, accepting that safety drift will go undetected until it appears in production.",
      },
      {
        letter: "B",
        text: "Rotate adversarial inputs randomly so no two upgrades are scored on the same set.",
      },
      {
        letter: "C",
        text: "Skip evaluation on each model-version upgrade and rely on user-submitted complaints to surface safety drift after the upgraded model has already served production traffic.",
      },
      {
        letter: "D",
        text: "Maintain an adversarial evaluation set with version-attributed scoring so each upgrade is measured against the same set before promotion.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "The risk is drift that nobody notices between model versions. Catching it means comparing each new version against the old one on the same fixed adversarial set, with scores tracked per version, before the upgrade goes live. That is what D does. B changes the test set every time, so a score change could come from the new set rather than the new model, and drift can't be measured. A and C drop pre-promotion evaluation altogether, so problems would only show up once production traffic is already affected.",
      source_e:
        "Discussion:\nSelected Answer: D (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 25,
    kind: "single",
    text: "You are responding to an adversarial input pattern in which users include text claiming admin authority and instructing the model to bypass safety restrictions. Which combination of controls most effectively mitigates this attack pattern?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Trusting that the model will intrinsically recognize and reject all bypass attempts without prompt-level instructions, runtime classifiers, scoped permissions, or audit logging.",
      },
      {
        letter: "B",
        text: "Prompt-level instructions that treat user content as untrusted data, runtime classifiers that detect override attempts, scoped tool permissions that cannot be elevated by user content, and audit logging of attempts.",
      },
      {
        letter: "C",
        text: "Removing all safety restrictions and guardrails to eliminate the attack surface that bypass attempts target, accepting that this makes the assistant unrestricted for all inputs.",
      },
      {
        letter: "D",
        text: "Granting users any privilege level they assert in their message content, on the assumption that cooperative behavior requires honoring self-declared authority without independent verification.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "B", source_c: "B" },
    explanations: {
      claude:
        "B is defense in depth. The prompt treats user content as untrusted data, so a claim of admin authority grants nothing. Runtime classifiers catch override attempts. Tool permissions are scoped outside the conversation, so user text can't raise them. Audit logs let you spot and respond to attempts. A relies only on the model's own judgment with no backup controls. C removes the guardrails the attacker is trying to get around, which hands them the win. D gives privileges to anyone who claims them without checking, which is exactly the weakness this attack exploits.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 26,
    kind: "multi",
    text: "An operations engineer reports that a Claude-based pipeline began returning malformed JSON responses after a scheduled maintenance window, causing downstream processing failures. Which two investigative steps most directly isolate the root cause? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Clear the prompt cache and resubmit all pending requests to eliminate stale cached prefixes.",
      },
      {
        letter: "B",
        text: "Compare the current system prompt and output schema configuration against the last known good version from before the maintenance window.",
      },
      {
        letter: "C",
        text: "Switch to a different Claude model tier to rule out provider-side changes as a contributing factor.",
      },
      {
        letter: "D",
        text: "Increase the max_tokens limit to determine whether output truncation is causing incomplete JSON structures.",
      },
      {
        letter: "E",
        text: "Replay a set of pre-maintenance requests against the current configuration and inspect the raw model output before downstream parsing.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "BE", source_c: "BE" },
    explanations: {
      claude:
        "The failures began after maintenance, so B compares the current system prompt and schema settings against the last version that worked to find what changed. E replays known-good requests and inspects the raw model output before parsing, which shows whether the model or the downstream parser is at fault. A doesn't apply because cached prefixes don't change outputs. C adds a new variable instead of isolating one. D only tests the truncation guess, and the raw output in E would already show truncated JSON.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 27,
    kind: "single",
    text: "Engineering leadership wants to roll out Claude Skills to 280 developers across 14 teams. Skills will encode internal coding standards, code-review checklists, and incident-postmortem templates. Leadership has asked how to govern Skill authorship so that Skills remain trustworthy without bottlenecking on a single central team. Which governance model should you recommend?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Per-developer authorship across the 280 engineers with no team-level coordination required.",
      },
      {
        letter: "B",
        text: "Centralized authorship by a single platform team responsible for every Skill produced.",
      },
      {
        letter: "C",
        text: "Fully decentralized authorship across the 14 teams with no review before publication.",
      },
      {
        letter: "D",
        text: "Federated authorship across the 14 teams with a central review and publication gate.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "D", source_c: "D" },
    explanations: {
      claude:
        "Federated authorship lets each of the 14 teams write Skills for its own area, so no single team becomes a bottleneck. A central review and publication gate checks every Skill for quality, consistency and safety before it goes out, which keeps Skills trustworthy. Option B makes one platform team the bottleneck that leadership wants to avoid. Options A and C have no review step, so the Skills could become inconsistent, conflicting or untrustworthy.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 28,
    kind: "single",
    text: "You are transitioning a Claude-based deployment from design into implementation. Which handoff package most directly supports a clean transition?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The most recent set of design presentation slides without component-level diagrams, interface contracts, an evaluation framework with a reference set, runbooks, or a known-limitations register.",
      },
      {
        letter: "B",
        text: "A verbal walkthrough conducted on the day of handoff with no written architecture overview, ADRs, component contracts, evaluation framework, runbooks, playbook, or known limitations.",
      },
      {
        letter: "C",
        text: "Architecture overview, ADRs, component contracts, evaluation framework with reference set, runbooks, on-call playbook, and known limitations.",
      },
      {
        letter: "D",
        text: "Source code alone with no integrating architecture overview, ADRs, component contracts, evaluation framework, runbooks, on-call playbook, or known-limitations register to support the delivery team.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Option C is the only package that covers everything the delivery team needs. It includes the architecture overview and ADRs (what was decided and why), component contracts (the interfaces), an evaluation framework with a reference set (a way to check quality and catch regressions), runbooks and an on-call playbook (how to run it), and known limitations (the risks they take on). Options A, B and D give only slides, a spoken walkthrough, or source code. Each one leaves out the contracts, evaluation baseline and operations documents, so the team would have to rebuild that knowledge or guess.",
      source_e:
        "Discussion:\nSelected Answer: C - Option C provides the minimum coherent package required to move from architectural intent to implementable and supportable delivery. The architecture overview establishes system boundaries and component relationships. Architecture Decision Records preserve the context and trade-offs behind key choices. Component contracts define interfaces, schemas, responsibilities, failure behavior, and integration assumptions. The evaluation framework and reference set allow the implementation team to confirm that prompts, models, retrieval components, and tool integrations continue to meet the defined quality, safety, latency, and cost thresholds. Runbooks translate operational knowledge into repeatable procedures, while the on-call playbook defines detection, escalation, containment, and recovery actions. The known-limitations register prevents unsupported behavior from being mistaken for an implementation defect and helps stakeholders manage residual risk. Options A and B depend excessively on slides or undocumented verbal knowledge. Option D provides implementation material without explaining the system-level decisions, operating model, acceptance criteria, or limitations. Source code cannot substitute for architectural and operational documentation. A clean transition does not mean the architect can never be consulted. It means routine implementation and support do not depend on undocumented knowledge held by a single individual. Study Guide references/topics: Design-to-implementation handoff; ADRs; component contracts; reference evaluations; runbooks; operational playbooks; limitations management.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 29,
    kind: "multi",
    text: "A security audit uncovers two issues: (1) all end users share a single API key, and (2) tool calls are executed without logging the initiating user. Which two mitigations directly address these specific findings? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Validate structured outputs against a schema before downstream actions are executed.",
      },
      {
        letter: "B",
        text: "Enforce RBAC at the retrieval layer before content enters the model context.",
      },
      {
        letter: "C",
        text: "Move credentials out of the prompt context and resolve them from a server-side secret store.",
      },
      {
        letter: "D",
        text: "Add actor attribution to tool-call logs so each call records the initiating user identity.",
      },
      {
        letter: "E",
        text: "Replace the shared API key with per-user OAuth tokens carrying scope-restricted permissions.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "DE", source_c: "DE", source_e: "DE" },
    explanations: {
      claude:
        "E fixes finding 1. It replaces the shared key with per-user OAuth tokens, so each request has its own identity and only the permissions it needs. D fixes finding 2. Each tool-call log entry records which user started the call, so actions can be traced back to a person. A (schema validation) and B (access control on retrieval) are useful controls, but they don't address either finding. C protects credentials from leaking through the prompt, but a shared key stored server-side is still shared, and the user still isn't logged.",
      source_e:
        "Discussion:\nSelected Answer: D,E - Per-user, scope-restricted OAuth tokens directly eliminate the shared-credential weakness. Each token represents a distinct user or delegated identity, carries only the permissions required for that user's role, and can be revoked independently. This supports least privilege, limits the blast radius of credential compromise, and enables authorization decisions to be tied to a specific principal instead of an undifferentiated shared API key. Actor attribution in tool-call logs directly resolves the second finding. Each audit event should record the authenticated user, delegated service identity, session or request identifier, tool name, authorization decision, relevant resource, timestamp, and outcome. This establishes accountability and permits incident investigators to reconstruct who initiated a consequential action. Moving credentials into a server-side secret store is sound secret-management practice, but it does not by itself correct the shared-identity problem: a centrally stored key can still represent every user as the same principal. Schema validation protects downstream processing, while retrieval-layer RBAC protects information access; neither addresses the two specific audit findings. These controls should be reinforced by short-lived tokens, server-side authorization enforcement, sensitive- field redaction, and tamper-resistant audit-log retention. Study Guide references/topics: [Claude Code security](https://docs.anthropic.com/en/docs/claude-code /security); [MCP authentication and OAuth] (https://docs.anthropic.com/en/docs/claude-code/mcp); least privilege; identity propagation; auditable tool execution.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 30,
    kind: "multi",
    text: "An architect is reviewing a Claude-based candidate-screening tool prior to deployment. A stakeholder asserts that because the model was not trained on company data, no bias evaluation is necessary. Which two responses most accurately challenge this assertion? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Transparency obligations are satisfied by disclosing that an AI system is in use, without further evaluation.",
      },
      {
        letter: "B",
        text: "Fairness testing is required only when the training dataset is known to contain protected-class labels.",
      },
      {
        letter: "C",
        text: "The model may carry demographic biases from pretraining that manifest in screening outcomes regardless of fine-tuning.",
      },
      {
        letter: "D",
        text: "The system should be evaluated on outcome-disparity metrics across protected groups before deployment.",
      },
      {
        letter: "E",
        text: "Bias evaluation is unnecessary when the model provider has published a responsible-use policy.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CD", source_c: "CD", source_e: "CD" },
    explanations: {
      claude:
        "C is correct because bias can come from pretraining, not only from company data, so it can affect screening results even if the model was never trained on company data. D is correct because the right fix is to measure outcome disparities across protected groups before deployment. A is wrong because telling people an AI is in use does not replace testing it for fairness. B is wrong because a model can produce disparate outcomes through proxy features even when the data has no protected-class labels. E is wrong because the provider's responsible-use policy does not test how this specific deployment behaves.",
      source_e:
        "Discussion:\nSelected Answer: C,D - The absence of company-specific training does not establish unbiased behavior. A foundation model may reflect demographic associations or unequal treatment patterns originating from pretraining data, model behavior, prompt framing, retrieval content, or the surrounding decision workflow. Because candidate screening can materially affect employment opportunities, the complete system must be evaluated across relevant protected groups before deployment. Appropriate measures include selection-rate differences, false- positive and false-negative rates, calibration, intersectional slices, and human override patterns. Disclosure that AI is used does not replace empirical fairness testing. Protected-class labels need not have been explicit in training data for proxy variables or inferred attributes to produce disparities. Provider policies similarly do not validate a customer's specific implementation. Anthropic system cards document discriminatory-bias evaluations, reinforcing the need for application-level testing. Claude model system card",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 31,
    kind: "single",
    text: "You are distinguishing functional from non-functional requirements during discovery. Which item is a non-functional requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The system must extract a defined set of specific fields from invoice attachments and populate a downstream data record.",
      },
      {
        letter: "B",
        text: "The system must produce a draft response that a human reviewer can edit before sending.",
      },
      {
        letter: "C",
        text: "The system must classify inbound tickets into a defined set of categories.",
      },
      {
        letter: "D",
        text: "The system must respond at p95 latency under 800 milliseconds at the expected request volume.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "D is the non-functional requirement. A p95 latency under 800 ms at the expected request volume describes how well the system has to perform, which is a quality attribute. A, B and C are functional requirements because they describe what the system does: extract invoice fields into a record, produce an editable draft for a human reviewer, and sort tickets into set categories.",
      source_e:
        "Discussion:\nSelected Answer: D - Option D defines a measurable performance characteristic rather than a business capability. The requirement specifies a percentile-based latency threshold-under 800 milliseconds at the 95th percentile-and ties that threshold to the expected workload volume. It therefore describes how well the system must operate under defined conditions. Options A, B, and C are functional requirements. They describe actions the solution must perform: extracting fields and creating a downstream record, producing an editable draft, and assigning tickets to categories. Functional requirements define observable system behaviors or outputs. A strong non-functional requirement must include a metric, threshold, measurement method, and operating condition. For Option D, the architect should further define whether latency is measured end-to-end or only at the model API, the test duration, concurrency, input-size distribution, cache state, timeout behavior, geographic region, and treatment of failed requests. Without those details, teams may report incompatible results while claiming to satisfy the same requirement. Non-functional requirements for Claude solutions commonly address latency, availability, throughput, cost, privacy, security, recoverability, observability, scalability, and regulatory compliance. Study Guide references/topics: Structured discovery; functional requirements; non-functional requirements; p95 latency; workload conditions; measurable acceptance criteria.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 32,
    kind: "classification",
    text: "You are sequencing decomposed components in an invoice-processing pipeline. For each of the decomposed components, select the execution layer it belongs to: 'Pre-Processing,' 'Model Stage,' or 'Post-Processing.'",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Claude-based classification of invoice type",
        options: [],
      },
      {
        letter: "B",
        text: "Persistence of validated records to the system of record",
        options: [],
      },
      {
        letter: "C",
        text: "Schema validation of the extracted fields",
        options: [],
      },
      {
        letter: "D",
        text: "Claude-based extraction of structured invoice fields",
        options: [],
      },
      {
        letter: "E",
        text: "PII redaction on extracted text prior to model invocation",
        options: [],
      },
      {
        letter: "F",
        text: "Optical character recognition on scanned invoice images",
        options: [],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: {
        A: "Model Stage",
        B: "Post-Processing",
        C: "Post-Processing",
        D: "Model Stage",
        E: "Pre-Processing",
        F: "Pre-Processing",
      },
      source_c: {
        A: "Model Stage",
        B: "Post-Processing",
        C: "Post-Processing",
        D: "Model Stage",
        E: "Pre-Processing",
        F: "Pre-Processing",
      },
      source_e:
        "Model Stage | Post-Processing | Post-Processing | Model Stage | Pre-Processing | Pre-Processing",
    },
    explanations: {
      claude:
        "OCR (F) and PII redaction (E) prepare the input before Claude is called. Redaction is explicitly 'prior to model invocation', so both are Pre-Processing. Classification (A) and field extraction (D) are the Claude calls, so they belong to the Model Stage. Schema validation (C) is a deterministic check on the model's output, and persistence (B) happens only after records pass validation, so both are Post-Processing.",
      source_e:
        "Hotspot Solution:\n| Decomposed Component | Execution Layer |\n| :--- | :--- |\n| **Classify invoice type from unstructured text** | **Model Stage** |\n| **Validate extracted JSON against target schema** | **Post-Processing** |\n| **Persist verified invoice record to system of record** | **Post-Processing** |\n| **Extract structured line-item attributes** | **Model Stage** |\n| **Optical character recognition (OCR) on scanned images** | **Pre-Processing** |\n| **Redact PII prior to model invocation** | **Pre-Processing** |\n\n### Explanation:\n- OCR and pre-invocation PII redaction prepare inputs in Pre-Processing. Invoice classification and unstructured attribute extraction use Claude in the Model Stage. Deterministic schema validation and database persistence occur in Post-Processing.\n\nDiscussion:\nSelected Answer: A\nOCR and pre-invocation PII redaction prepare inputs in Pre-Processing. Invoice classification and unstructured attribute extraction use Claude in the Model Stage. Deterministic schema validation and database persistence occur in Post-Processing.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 33,
    kind: "multi",
    text: "A pilot AI assistant for procurement specialists shows 89 percent first-response acceptance, but follow-up surveys reveal that specialists frequently override the assistant’s vendor recommendations after considering criteria the assistant did not evaluate. The pilot owner wants to ship the assistant unchanged because of the strong acceptance rate.\n\nWhich two Discernment-competency observations should you raise BEFORE approving the launch? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The acceptance rate alone proves readiness for general production use.",
      },
      {
        letter: "B",
        text: "The survey response rate may not be statistically representative of all specialists.",
      },
      {
        letter: "C",
        text: "The unconsidered criteria represent a scope gap in the assistant's input space.",
      },
      {
        letter: "D",
        text: "Acceptance does not establish whether recommendations remain correct after specialist review.",
      },
      {
        letter: "E",
        text: "The pilot duration was probably too short to demonstrate reliability across the full year.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CD", source_c: "CD", source_e: "CD" },
    explanations: {
      claude:
        "C and D are the two Discernment issues because both come straight from the evidence that specialists override recommendations. D: an 89% first-response acceptance rate only shows that people took the first answer, not that the vendor choice was still right after expert review. The overrides show that acceptance and correctness have come apart. C: specialists are overriding because of criteria the assistant never looked at, so there is a gap in what the assistant evaluates, and that needs fixing before launch. A is the exact mistake you are pushing back on. B and E are general sampling and duration concerns that the scenario gives no evidence for, and they are not the core Discernment problem.",
      source_e:
        "Discussion:\nSelected Answer: C,D - The assistant is making recommendations without considering information that specialists regard as material. That is a direct input-scope and requirements gap, not merely a presentation issue. The 89 percent acceptance metric is also incomplete because initial acceptance does not reveal whether recommendations remain correct after users apply the omitted criteria. Production readiness requires outcome-focused evaluation, including final recommendation agreement, override reasons, financial impact, supplier risk, and performance across representative procurement scenarios. Options B and E raise possible concerns, but the scenario supplies no evidence that response rate or pilot duration is the demonstrated deficiency. Option A incorrectly treats a single proxy metric as sufficient. Anthropic recommends multidimensional, task-specific success criteria aligned with the actual user outcome. Define success criteria and evaluations",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 34,
    kind: "multi",
    text: "A revenue projection assistant has missed its monthly cost target by 38 percent. Profiling shows three contributors: a 6,000-token policy preamble repeated on every call (45 percent of cost), retrieval of historical sales chunks averaging 3,000 tokens per call (30 percent), and inference on a flagship-tier model (25 percent). Stakeholders require that projection accuracy remain unchanged. Which two optimizations should you sequence first to reduce cost without affecting accuracy? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Reduce the number of historical sales chunks retrieved across each query run.",
      },
      {
        letter: "B",
        text: "Truncate the policy preamble to remove non-essential clauses from the prompt.",
      },
      {
        letter: "C",
        text: "Enable prompt caching on the static policy preamble across the recurring calls.",
      },
      {
        letter: "D",
        text: "Switch the workload to a smaller, faster Claude model tier across all queries.",
      },
      {
        letter: "E",
        text: "Cache common retrieved sales chunks accessed across many of the daily queries.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "CE",
      source_c: "CE",
      source_e: "E",
      source_e_dup_2: "CE",
    },
    explanations: {
      claude:
        "Prompt caching the static 6,000-token preamble (C) targets the biggest cost driver (45%) and leaves the prompt content unchanged. Caching commonly retrieved sales chunks (E) cuts the 30% retrieval cost while the model still gets the same context. Both lower cost without affecting accuracy. Fewer chunks (A), a truncated preamble (B) or a smaller model (D) each change what the model receives or how capable it is, so they risk accuracy and would need evaluation first.",
      source_e:
        "Discussion:\nSelected Answer: AC A and C attack the two largest cost drivers (75% combined) purely through caching, making them the correct first moves. upvoted 1 time Submit Cancel\n\n---\n\nA and C attack the two largest cost drivers (75% combined) purely through caching, making them the correct first moves.",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 35,
    kind: "single",
    text: "A technical team is debating whether to implement a new capability for generating regulatory filings from internal data as a Claude Skill or as an MCP server. The capability requires a fixed authoring procedure with embedded examples, does not need to call live external systems, and must be portable across three Claude deployments: claude.ai, an internal API integration, and Claude Code. Which factor most strongly favors implementing the capability as a Skill?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The capability needs to query a live database for the most recent regulatory filings.",
      },
      {
        letter: "B",
        text: "The capability must also be callable from a developer's command-line interface.",
      },
      {
        letter: "C",
        text: "The capability requires direct authentication against the corporate identity provider.",
      },
      {
        letter: "D",
        text: "The capability is procedural knowledge with no live external-system calls required.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "Skills package procedural knowledge: instructions, templates and embedded examples. Claude loads them as needed, and the same skill works in claude.ai, the API and Claude Code. Because the capability makes no live external calls, it doesn't need an MCP server. Options A and C (a live database query and identity-provider authentication) are reasons to use MCP instead. Option B doesn't decide anything, because Skills and MCP servers both work from Claude Code's command-line interface.",
      source_e:
        "Discussion:\nSelected Answer: D - A Skill is the appropriate packaging mechanism for reusable procedural knowledge, instructions, templates, examples, and supporting resources. The filing capability follows a defined authoring method and requires no live external-system interaction, so an MCP server would introduce unnecessary transport, authentication, hosting, and operational complexity. MCP becomes appropriate when Claude must invoke live databases, APIs, or enterprise services. Command-line availability does not independently determine the design because Skills can be used across supported Claude environments. Direct identity-provider authentication would favor an integration or MCP service rather than a self-contained Skill. Anthropic describes Agent Skills as portable packages that provide agents with specialized procedural and organizational expertise. Agent Skills",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 36,
    kind: "yesno",
    text: "You are auditing a procurement-assistant agent whose defined responsibility is to draft purchase requests for review. For each tool currently configured on the agent, select yes if the tool should remain after a least-privilege audit. Otherwise, select no if it should be removed.",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "A read-only catalog lookup tool that returns vendor and SKU information",
        options: ["Yes", "No"],
      },
      {
        letter: "B",
        text: "An inbox-send tool that emails purchase requests to vendors directly",
        options: ["Yes", "No"],
      },
      {
        letter: "C",
        text: "A draft-write tool that creates purchase-request drafts in the review queue",
        options: ["Yes", "No"],
      },
      {
        letter: "D",
        text: "A production-database admin tool unrelated to procurement",
        options: ["Yes", "No"],
      },
      {
        letter: "E",
        text: "A read-only policy-document tool that returns the relevant procurement policies",
        options: ["Yes", "No"],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: { A: "Yes", B: "No", C: "Yes", D: "No", E: "Yes" },
      source_c: { A: "Yes", B: "No", C: "Yes", D: "No", E: "Yes" },
      source_e:
        "Yes | No | Yes | No | Yes (Catalog lookup: Yes, External inbox-send to vendor: No, Policy-document lookup: Yes, Production DB admin tool: No, Draft-write to review queue: Yes)",
    },
    explanations: {
      claude:
        "The agent's only job is to draft purchase requests for review. To do that it needs to read catalog data (A), read procurement policy (E) and write drafts into the review queue (C), so those three stay. The inbox-send tool (B) lets the agent email vendors directly, which skips the human review step and goes beyond drafting. The production-database admin tool (D) has nothing to do with procurement and carries high privilege, so it should be removed.",
      source_e:
        "Hotspot Solution:\n| Configured Agent Tool | Retain After Least-Privilege Audit? |\n| :--- | :--- |\n| **Catalog lookup tool (read vendor & SKU data)** | **Yes** |\n| **Inbox-send tool (transmit purchase orders directly to external vendors)** | **No** |\n| **Policy-document reader (check procurement rules)** | **Yes** |\n| **Production database administrator tool** | **No** |\n| **Draft-write tool (save draft request to human review queue)** | **Yes** |\n\n### Explanation:\n- Under least privilege, an agent responsible only for drafting purchase requests for human review should retain read access to catalogs/policies and write access to the review queue, while external vendor transmission and production DB admin tools must be removed.\n\nDiscussion:\nSelected Answer: A\nUnder least privilege, an agent responsible only for drafting purchase requests for human review should retain read access to catalogs/policies and write access to the review queue, while external vendor transmission and production DB admin tools must be removed.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 37,
    kind: "yesno",
    text: "You are evaluating model-selection claims used by a peer team. For each statement, select yes if the statement is generally true. Otherwise, select no.",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Heavier-reasoning models typically consume more of the rate limit and run more slowly than lighter models on the same input.",
        options: ["Yes", "No"],
      },
      {
        letter: "B",
        text: "A representative-sample evaluation on the target workload is the right basis for confirming a model selection.",
        options: ["Yes", "No"],
      },
      {
        letter: "C",
        text: "The most capable model is always the right choice regardless of the workload profile.",
        options: ["Yes", "No"],
      },
      {
        letter: "D",
        text: "Tiered routing can serve routine traffic with a lighter model while reserving a heavier model for traffic that needs its capability.",
        options: ["Yes", "No"],
      },
      {
        letter: "E",
        text: "Selecting a model based on which version was most recently announced is the right basis for production decisions.",
        options: ["Yes", "No"],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: { A: "Yes", B: "Yes", C: "No", D: "Yes", E: "No" },
      source_c: { A: "Yes", B: "Yes", C: "No", D: "Yes", E: "No" },
      source_e:
        "Yes | Yes | No | Yes | No (Higher reasoning uses more compute/latency: Yes, Representative workload testing required: Yes, Strongest model always best for production: No, Tiered routing escalates complex cases: Yes, Newest model should replace production without evaluation: No)",
    },
    explanations: {
      claude:
        "A is true: on the same input, models that reason more use more tokens and rate-limit budget and respond more slowly. B is true: you confirm a model choice by evaluating it on a representative sample of the real workload. D is true: tiered routing sends routine traffic to a cheaper model and saves the stronger model for requests that need it. C is false because the best model depends on cost, speed and how hard the task is. E is false because a newer release date says nothing about how well a model fits your workload.",
      source_e:
        "Hotspot Solution:\n| Model-Selection Claim | Generally True? |\n| :--- | :--- |\n| **More capable reasoning configurations generally require greater computation and latency** | **Yes** |\n| **Representative workload testing on actual prompts and data is essential** | **Yes** |\n| **The largest, most capable model is automatically the right production choice for every workload** | **No** |\n| **Tiered routing serves routine traffic with an efficient model and escalates complex cases** | **Yes** |\n| **A newly released model should immediately replace a validated production model without evaluation** | **No** |\n\n### Explanation:\n- Model selection balances capability, latency, cost, and throughput using representative evaluations on real workload data. Tiered routing optimizes cost and latency, and new models must pass regression and safety gates before production cutover.\n\nDiscussion:\nSelected Answer: A\nModel selection balances capability, latency, cost, and throughput using representative evaluations on real workload data. Tiered routing optimizes cost and latency, and new models must pass regression and safety gates before production cutover.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 38,
    kind: "multi",
    text: "The engineering lead at Trenova Systems, Inc. is evaluating two proposals for improving developer workflows using Claude-assisted tooling. \n\nProposal A adds Claude Code to the IDE for inline code generation and review. \n\nProposal B routes all code-generation requests through a shared Slack bot without IDE integration. \n\nWhich two observations most accurately evaluate these proposals against workflow-improvement objectives? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Proposal B is superior because centralizing requests in Slack creates an auditable log of all code-generation activity.",
      },
      {
        letter: "B",
        text: "Proposal B introduces workflow friction by requiring developers to leave the IDE, undermining the productivity objective.",
      },
      {
        letter: "C",
        text: "Proposal A reduces context switching by providing AI assistance at the point of development without requiring a separate tool.",
      },
      {
        letter: "D",
        text: "Proposal B improves workflow velocity because Slack notifications create an asynchronous review queue.",
      },
      {
        letter: "E",
        text: "Both proposals are equivalent because the model capabilities are identical regardless of the integration point.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BC", source_c: "BC", source_e: "BC" },
    explanations: {
      claude:
        "The goal here is to improve developer workflow, so the main question is where the help shows up, not how strong the model is. Proposal A gives help inside the IDE where developers already work, which cuts context switching (C). Proposal B makes developers leave the IDE and copy code and context back and forth through Slack, which adds friction and hurts productivity (B). Options A and D point to side benefits (audit logs, an async queue) that don't address the productivity goal, and an async queue actually slows the loop. Option E is wrong because the same model can still produce very different workflow results depending on where it's integrated.",
      source_e:
        "Discussion:\nSelected Answer: B,C - Workflow improvement depends on where assistance is delivered, not solely on the underlying model. IDE integration makes code, selections, diagnostics, diffs, and repository context available at the point where developers work. This reduces context switching and avoids repeatedly transferring code between systems. Routing every request through Slack introduces an additional interaction surface, separates assistance from development context, and increases friction. A Slack record may support auditability, but it does not outweigh the stated productivity objective, and equivalent audit data can be captured through approved telemetry and repository history. Notifications do not inherently improve engineering velocity. Anthropic's Claude Code integrations are designed to place agentic coding capabilities directly within terminal and IDE workflows.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 39,
    kind: "single",
    text: "A document analysis service processes legal filings averaging 80,000 tokens each. Each filing is queried by attorneys an average of 14 times during a case. The current architecture sends the full filing on every query. The CFO has asked you to reduce per-query costs while preserving response quality. The security officer requires that filing contents not be stored outside the organization's tenancy. Which optimization approach should you recommend?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Summarize each filing once at intake and run all subsequent queries against the summary.",
      },
      {
        letter: "B",
        text: "Cache the filing as the prompt prefix for reuse across the 14 queries per case.",
      },
      {
        letter: "C",
        text: "Index filings in a vector store and retrieve only the relevant passages per query.",
      },
      {
        letter: "D",
        text: "Move the workload to a smaller Claude model to reduce the per-token cost paid.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "Caching the 80,000-token filing as the prompt prefix means repeat queries are billed at about 10% of the normal input price for the cached part. Quality is unchanged because the model still sees the whole filing every time. The cache is temporary (it expires after a set time) and is not lasting storage outside the tenancy. A summary (A) drops detail, and retrieval (C) can miss context spread across the filing while also adding a stored index of its contents. A smaller model (D) risks worse answers and still sends the full filing on every query.",
      source_e:
        "Discussion:\nSelected Answer: C (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 40,
    kind: "multi",
    text: "You are designing a test strategy for a Claude-based pipeline that handles sensitive financial data. Which two test types should be prioritized to cover both safety under attack and cross-component correctness? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Adversarial tests using prompt-injection and malformed-input cases.",
      },
      {
        letter: "B",
        text: "Regression tests against a stable reference set of previously known-good outputs.",
      },
      {
        letter: "C",
        text: "Smoke tests that verify core paths after each deployment.",
      },
      {
        letter: "D",
        text: "Integration tests that verify end-to-end pipeline behavior across all components.",
      },
      {
        letter: "E",
        text: "Unit tests targeting only individual prompt-template rendering logic.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "AD",
      source_c: "AD",
      source_e: "AD",
      source_e_dup_2: "D",
    },
    explanations: {
      claude:
        "Adversarial tests (A) cover safety under attack. Prompt-injection and malformed-input cases check that the pipeline doesn't leak or mishandle sensitive financial data. Integration tests (D) cover correctness across components by checking end-to-end behavior where parts hand data to each other. Regression (B) and smoke (C) tests only catch drift or basic breakage, not attacks or problems between components. Unit tests on template rendering (E) look at a single piece and don't cover either goal.",
      source_e:
        "Discussion:\nSelected Answer: A,D - Adversarial tests directly evaluate behavior under attack, including prompt injection, malformed records, malicious document content, credential-extraction attempts, and unauthorized tool requests. Integration tests provide the complementary coverage required by the question: they verify authentication, retrieval, prompt construction, model invocation, validation, logging, and downstream actions as one end-to-end system. Regression, smoke, and unit testing remain valuable, but they do not jointly satisfy the two stated objectives. A stable regression set measures previously established behavior; smoke tests provide shallow availability confirmation; and prompt-rendering unit tests cover only one component. Anthropic recommends explicit prompt-injection defenses and task-specific evaluations that represent both normal and edge-case traffic. Prompt-injection mitigation",
    },
    confidence: { claude: "high" },
    flags: { source_e_dup_2: "marks 1, question asks for two" },
  },
  {
    id: 41,
    kind: "multi",
    text: "The platform team at Trenova Systems, Inc. needs to reduce per-query cost and p95 latency for a high-volume Claude pipeline without degrading output quality on the core use case. Which two optimizations directly target both cost and latency simultaneously? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Enable prompt caching on the static system-prompt prefix to reduce billable input tokens on repeated calls.",
      },
      {
        letter: "B",
        text: "Route straightforward query types to a smaller, faster Claude model and reserve the full model for complex cases.",
      },
      {
        letter: "C",
        text: "Increase max_tokens to reduce the frequency of truncated responses requiring follow-up calls.",
      },
      {
        letter: "D",
        text: "Add a retrieval step that fetches the full source corpus into the context window before generation.",
      },
      {
        letter: "E",
        text: "Expand the system prompt to include additional few-shot examples on every request.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "AB",
      source_c: "AB",
      source_e: "A",
      source_e_dup_2: "AB",
    },
    explanations: {
      claude:
        "A: Prompt caching on the static system-prompt prefix means cache reads are billed at a fraction of normal input price. It also cuts time-to-first-token because the cached prefix isn't processed again. B: Sending simple queries to a smaller, faster model makes each of those calls cheaper and quicker, while complex cases still go to the full model, so core quality holds. C does not reliably lower either cost or latency, since longer outputs cost more and take longer. D and E add input tokens, which raises both cost and latency.",
      source_e:
        "Discussion:\nSelected Answer: DE (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 42,
    kind: "multi",
    text: "You are evaluating a Claude-based deployment for adherence to a specific regulation. Which two steps must be completed BEFORE mapping deployment data flows to specific regulatory clauses? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Compare the in-place controls against the regulatory requirements to identify any compliance gaps.",
      },
      {
        letter: "B",
        text: "Identify the applicability of the regulation based on data types, jurisdiction, and audience.",
      },
      {
        letter: "C",
        text: "Schedule the remediation work with the engineering team based on the prioritized gap findings.",
      },
      {
        letter: "D",
        text: "Document the identified gaps along with recommended remediations and residual risk for signoff.",
      },
      {
        letter: "E",
        text: "Inventory the vendor-provided compliance tooling and confirm which compliance affordances are in place.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BE", source_c: "BE", source_e: "BE" },
    explanations: {
      claude:
        "A compliance review first decides whether the regulation applies, based on data types, jurisdiction and audience (B). It then lists the controls and vendor compliance features already in place (E). Only then can data flows be mapped to clauses with known coverage. Gap analysis (A), documenting gaps and leftover risk (D), and scheduling fixes (C) all come after the mapping.",
      source_e:
        "Discussion:\nSelected Answer: B,E - Regulatory assessment must begin by establishing scope. Option B determines whether the regulation applies by examining processed data, affected jurisdictions, users, and deployment purpose. Without this analysis, clause mapping could apply irrelevant obligations or omit applicable ones. Option E establishes the platform's existing compliance capabilities, including audit records, retention controls, access governance, data residency, and compliance-export functionality. Anthropic's Trust Center provides control and certification information, while the Compliance API supports programmatic access to activity and governance records. Options A and D occur after regulatory clauses have been mapped and gaps identified. Option C follows prioritization and approval of remediation actions. Study Guide references/topics: Regulatory applicability; compliance affordance inventory; control mapping; gap assessment; residual risk; remediation sequencing.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 43,
    kind: "multi",
    text: "A research summarization assistant has been deployed for six months. A user has flagged that a generated summary contained a fabricated citation. Which two Diligence-competency actions should you take? (Select two.) \n\nEach correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Sample recent summaries to estimate the fabrication frequency across the population.",
      },
      {
        letter: "B",
        text: "Disable the assistant immediately for all current users without any prior diagnostic analysis.",
      },
      {
        letter: "C",
        text: "Review whether citation-grounding controls exist anywhere in the current generation pipeline.",
      },
      {
        letter: "D",
        text: "Communicate to users that the assistant does not fabricate output as a matter of design.",
      },
      {
        letter: "E",
        text: "Treat the incident as an anecdotal isolated case and take no further investigative action.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AC", source_c: "AC", source_e: "AC" },
    explanations: {
      claude:
        "Diligence means investigating a reported failure in proportion to its size. Sampling recent summaries (A) estimates how often citations are fabricated across all outputs. Reviewing whether the pipeline has citation-grounding controls (C) finds the likely root cause and where to fix it. B shuts the assistant down for everyone before any diagnosis, which is out of proportion. D tells users something false. E ignores a real signal of a problem.",
      source_e:
        "Discussion:\nSelected Answer: A,C - A single confirmed fabrication requires investigation, but it does not establish the population-level failure rate. Sampling recent summaries determines prevalence, affected content types, and whether the incident correlates with particular prompts, documents, or model versions. The architecture must also be examined for grounding controls, including source-constrained generation, citation rendering, claim-to-source verification, and rejection of unsupported statements. Anthropic recommends making factual outputs auditable through citations and requiring supporting quotations for important claims. Immediate universal shutdown may become necessary if the risk is severe, but doing so before establishing scope is not the most disciplined first response. Options D and E dismiss evidence without validation and would prevent corrective action. Reducing hallucinations",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 44,
    kind: "multi",
    text: "A security team is evaluating two proposed controls. \n\nControl A adds an outbound tool allowlist with destination restrictions and per-call review. \n\nControl B scores responses against a stable adversarial evaluation set after each model-version change. \n\nWhich two risk categories are correctly matched to these controls? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Control A - prompt injection from adversarial content in retrieved data",
      },
      {
        letter: "B",
        text: "Control A - silent quality drift after a model-version upgrade",
      },
      {
        letter: "C",
        text: "Control A - data exfiltration via outbound tool calls",
      },
      {
        letter: "D",
        text: "Control B - data exfiltration via outbound tool calls",
      },
      {
        letter: "E",
        text: "Control B - silent quality drift after a model-version upgrade",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CE", source_c: "CE", source_e: "CE" },
    explanations: {
      claude:
        "Control A (an outbound tool allowlist with destination restrictions and per-call review) limits where data can go, so it directly prevents data exfiltration through tool calls (C). Control B (a stable adversarial evaluation set re-run after each model-version change) is a regression check that catches silent quality drift after upgrades (E). Control A can reduce the damage from prompt injection but doesn't detect or prevent the injection itself (A), and it does nothing about drift (B). An offline evaluation set doesn't stop data leaving at runtime (D).",
      source_e:
        "Discussion:\nSelected Answer: C,E - Control A directly constrains the outbound action surface. An allow-list limits which tools and destinations may receive data, while per-call review introduces an approval boundary before information leaves the controlled environment. These measures therefore address data exfiltration through outbound tool calls, making Option C correct. Anthropic's security guidance recommends least privilege, narrowly scoped permissions, sandboxing, and limiting access to sensitive information and actions so that a compromised agent can cause minimal damage. Mitigate Jailbreaks and Prompt Injections Control B addresses model-version drift. Running a stable adversarial evaluation set after each version change creates a consistent comparison baseline and detects regressions that might otherwise remain invisible during routine testing. This correctly maps Control B to silent quality drift, making Option E correct. Anthropic's migration guidance repeatedly calls for workload reevaluation because instruction following, style, reasoning, and agent behavior can differ between versions. Model Migration Guide Control A may limit the consequences of successful prompt injection, but it does not prevent or directly detect adversarial instructions in retrieved content. Control B measures behavioral performance but does not impose outbound authorization controls. Each control must therefore be mapped to the risk it most directly mitigates. Study Guide references/topics: Tool governance; least privilege; exfiltration controls; adversarial evaluations; model-change regression testing; defense in depth.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 45,
    kind: "multi",
    text: "You are selecting a model for a new production workload and must complete the upstream steps before testing candidate models empirically. Which two steps must be completed BEFORE running a representative sample on a candidate model? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Select the lightest model that consistently meets the quality bar across the sample.",
      },
      {
        letter: "B",
        text: "Retest the model choice when a new model version becomes available.",
      },
      {
        letter: "C",
        text: "Choose a candidate model based on the requirements profile and known capabilities.",
      },
      {
        letter: "D",
        text: "Define the quality bar, latency tolerance, and expected volume for the workload.",
      },
      {
        letter: "E",
        text: "Sign off the production rollout plan with the platform and security teams.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CD", source_c: "CD", source_e: "CD" },
    explanations: {
      claude:
        "The order is: first define the requirements (quality bar, latency tolerance, volume), then pick a candidate model that fits that profile and its known capabilities, and only then run a representative sample on it. A happens after testing, because you can only pick the lightest model that meets the bar once you have results. B is ongoing upkeep after the choice is made. E is a deployment-governance step and isn't needed before an empirical model test.",
      source_e: "Discussion:\nSelected Answer: C,E",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 46,
    kind: "single",
    text: "You are preparing an operational runbook for a Claude-based service. Which content is essential to include in the runbook?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Dashboard and log references only, without alert definitions, triage steps, escalation paths, or rollback procedures for the on-call engineer to act on.",
      },
      {
        letter: "B",
        text: "Common alerts and their triage steps, escalation paths, rollback procedures, and references to the relevant dashboards and logs.",
      },
      {
        letter: "C",
        text: "Alert definitions and triage steps only, without escalation paths, rollback procedures, or references to dashboards and logs for on-call use.",
      },
      {
        letter: "D",
        text: "Escalation paths and rollback procedures only, without alert definitions, triage steps, or dashboard references to guide initial incident response.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "A runbook is only useful if the on-call engineer can follow it from start to finish. That means knowing which alert fired and how to triage it, having the dashboards and logs to diagnose it, knowing who to escalate to, and having a rollback procedure to fix it. Option B is the only choice that covers all of these. A, C and D each leave out key parts, such as the triage steps, the escalation and rollback steps, or the dashboard and log references, so the responder would be stuck partway through an incident.",
      source_e:
        "Discussion:\nSelected Answer: B - An actionable runbook must connect detection, diagnosis, containment, recovery, and escalation. Option B supplies that complete operational chain: alerts identify abnormal conditions; triage procedures guide initial investigation; dashboards and logs provide evidence; escalation paths assign authority; and rollback procedures restore a known-safe state. The runbook should cover model errors, latency degradation, rate limits, tool failures, prompt regressions, cost anomalies, data-governance events, and dependency outages. Anthropic's operational materials demonstrate incident workflows in which alerts lead responders to logs and runbooks before corrective action. Options A, C, and D each omit information required for an on-call engineer to progress from notification to controlled resolution. Procedures should be tested through exercises and updated after incidents. Study Guide references/topics: Claude operational and observability patterns ; incident response; triage; escalation; rollback; operational readiness.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 47,
    kind: "single",
    text: "You are designing a feedback session for a deployment in flight. Which structure best supports productive stakeholder feedback?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Hold an open-ended meeting with no pre-distributed agenda or artifacts, and rely on participants' memory to carry decisions and follow-up owners forward.",
      },
      {
        letter: "B",
        text: "Define a focused agenda, share the artifacts in advance, capture decisions and follow-ups in writing, and confirm action owners and dates.",
      },
      {
        letter: "C",
        text: "Distribute artifacts at the session start rather than in advance, so stakeholders review materials in real time without preparation before the discussion begins.",
      },
      {
        letter: "D",
        text: "End the session without recording decisions, follow-up items, action owners, or dates, relying on participant memory to carry the session's outcomes forward.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "B is the only option with a complete structure. A focused agenda keeps the session on topic. Sharing artifacts in advance lets stakeholders arrive prepared with useful feedback. Writing down decisions and follow-ups, with named owners and dates, means the outcomes actually get acted on. A and D rely on people's memory, so decisions and responsibilities get lost. C hands out materials at the start, so people have no time to prepare and their feedback stays shallow.",
      source_e:
        "Discussion:\nSelected Answer: B - A structured feedback session must enable informed review, traceable decisions, and accountable follow- through. Option B allows stakeholders to examine architecture diagrams, evaluation results, risk registers, or prototypes before the meeting. The focused agenda keeps discussion aligned with decisions that must be made rather than allowing the session to become an unstructured status conversation. Written decision records prevent different participants from leaving with incompatible interpretations. Assigning an owner and due date to every action converts feedback into executable delivery work. Options A, C, and D depend heavily on memory, provide inadequate preparation time, and create weak decision traceability. In-flight deployments particularly require documented feedback because accepted changes may affect scope, cost, risk, testing, and release timing. Study Guide references/topics: Stakeholder feedback; decision records; action ownership; lifecycle alignment; communication planning.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 48,
    kind: "single",
    text: "You are integrating AI-assisted tooling into the team's documentation workflow. The team wants generated documentation that stays grounded in the actual code. Which integration approach best fits this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Generate documentation from the model's training-data recall without reading any of the actual repository code, accepting that the output will not reflect the current implementation.",
      },
      {
        letter: "B",
        text: "Have the subagents publish generated documentation directly to the public-facing site without passing through the team's normal review workflow or any human approval step.",
      },
      {
        letter: "C",
        text: "Configure subagents that read the relevant code files via filesystem and code-search tools, generate the documentation, and emit changes through the team's normal review workflow.",
      },
      {
        letter: "D",
        text: "Disable all filesystem and code-search tools so the subagents cannot read any repository code, accepting that documentation generation will be entirely disconnected from the actual implementation.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "C", source_c: "C" },
    explanations: {
      claude:
        "Option C keeps the docs tied to the real code: the subagents read the current source with filesystem and code-search tools before writing. Their changes then go through the team's normal review workflow, so a person still checks them. A and D cut the docs off from the code, because they rely on training-data recall or block reading the repository, so the output won't match the current implementation. B skips human review and publishes straight to a public site, which risks putting wrong or unreviewed content online.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 49,
    kind: "yesno",
    text: "You are reviewing a peer's end-to-end design for a Claude-based platform expected to scale to thousands of concurrent users. For each statement, indicate Yes if it reflects sound architectural practice. Otherwise, select No.",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Authentication and authorization run before retrieval so retrieval can filter by identity.",
        options: ["Yes", "No"],
      },
      {
        letter: "B",
        text: "An asynchronous queue absorbs bursty traffic between intake and the model invocation layer.",
        options: ["Yes", "No"],
      },
      {
        letter: "C",
        text: "Tax computation is encoded directly in the system prompt rather than in code.",
        options: ["Yes", "No"],
      },
      {
        letter: "D",
        text: "Conversation logs include unredacted government identifiers to maximize signal for tuning.",
        options: ["Yes", "No"],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: { A: "Yes", B: "Yes", C: "No", D: "No" },
      source_c: { A: "Yes", B: "Yes", C: "No", D: "No" },
      source_e:
        "Yes | Yes | No | No (Auth before retrieval: Yes, Async queue for burst traffic: Yes, Tax computation in system prompt: No, Unredacted government IDs in logs: No)",
    },
    explanations: {
      claude:
        "A is sound: authenticating and authorizing before retrieval lets you filter by identity, so content the user isn't allowed to see never reaches the model's context. B is sound: a queue between intake and model calls smooths out traffic spikes and works with rate limits when thousands of users are active. C is unsound: tax math must be exact, testable and auditable, so it belongs in code (for example, a tool Claude calls), not in the system prompt where the model may get it wrong. D is unsound: logging unredacted government IDs breaks data-minimization and privacy rules; redact or tokenize PII before logging or tuning.",
      source_e:
        "Hotspot Solution:\n| Architectural Design Statement | Sound Practice? |\n| :--- | :--- |\n| **Authentication and authorization run before retrieval so retrieval can filter by identity** | **Yes** |\n| **An asynchronous queue absorbs bursty traffic between intake and the model-invocation layer** | **Yes** |\n| **Tax computation is encoded directly in the system prompt rather than in code** | **No** |\n| **Conversation logs include unredacted government identifiers to maximize tuning signal** | **No** |\n\n### Explanation:\n- Authentication and authorization must precede retrieval so unauthorized data never enters context. An asynchronous queue handles burst absorption and backpressure. Deterministic tax calculation belongs in code/tools rather than prompts, and unredacted government identifiers violate data minimization.\n\nDiscussion:\nSelected Answer: A\nAuthentication and authorization must precede retrieval so unauthorized data never enters context. An asynchronous queue handles burst absorption and backpressure. Deterministic tax calculation belongs in code/tools rather than prompts, and unredacted government identifiers violate data minimization.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 50,
    kind: "single",
    text: "You are presenting an architectural decision to a mixed audience that includes an executive sponsor and the engineering leads who will implement the decision. Which presentation strategy best serves both audiences?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Open with a deep dive into low-level implementation details targeted at engineering leads, and stop there without addressing the business outcomes or trade-offs the executive sponsor needs.",
      },
      {
        letter: "B",
        text: "Lead with the decision, the business outcomes it serves, and the trade-offs accepted; follow with the technical rationale, alternatives, and implementation implications for the engineering audience.",
      },
      {
        letter: "C",
        text: "Skip the rationale, alternatives, and trade-off discussion entirely and simply announce the chosen decision, leaving both audiences without the context needed to implement or validate it.",
      },
      {
        letter: "D",
        text: "Present a single undifferentiated narrative that addresses technical and business concerns with equal weight throughout, treating both audiences as requiring the same depth on every section.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        'The answer is B. Its layered, "bottom line up front" structure opens with the decision, the business outcomes and the trade-offs, which is what the executive sponsor needs. It then goes into the technical rationale, the alternatives and what implementation will involve, so the engineering leads have enough context to build and check the decision. A leaves out the business view the sponsor needs. C gives no rationale, so neither group can judge or carry out the decision. D gives both groups the same depth everywhere, so the executive gets lost in detail and the engineers get less depth than they need.',
      source_e:
        "Discussion:\nSelected Answer: B - Option B uses progressive disclosure to meet the decision needs of both audiences. The executive sponsor first receives the selected direction, intended business outcomes, major constraints, cost or performance implications, and accepted trade-offs. This establishes why the decision matters and whether it remains aligned with strategic objectives. The presentation can then move into the technical rationale required by engineering leads: component responsibilities, integration contracts, model and retrieval choices, security controls, rejected alternatives, implementation dependencies, evaluation gates, operational consequences, and migration requirements. This structure gives engineers enough evidence to implement the decision without forcing the executive audience to interpret unnecessary low-level detail. Option A excludes the sponsor's concerns and fails to connect technical design to business value. Option C removes the context required for governance and implementation, making the decision appear arbitrary. Option D assumes that all participants require identical information density, which usually produces a presentation that is too technical for executives and insufficiently precise for engineers. The strongest communication pattern is layered but internally consistent: one decision, one rationale, and multiple levels of detail tailored to the responsibilities of the audience. Study Guide references/topics: Mixed-audience communication; progressive disclosure; business outcomes; architectural trade-offs; technical rationale; implementation implications.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 51,
    kind: "single",
    text: "You are selecting a pattern for a compliance Q&A assistant that must answer policy questions with citations to the authoritative internal source set. Latency, cost, and audit predictability are prioritized. Which pattern is the best fit?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Augmented LLM with retrieval-augmented generation over the indexed authoritative corpus and citation rendering on each answer.",
      },
      {
        letter: "B",
        text: "Multi-agent orchestration with a planner, researcher, and writer agent for every query.",
      },
      {
        letter: "C",
        text: "A pure agent loop with open web-browsing tools to surface the most current policy information, without constraining retrieval to the authoritative internal corpus.",
      },
      {
        letter: "D",
        text: "A static prompt with the entire policy corpus concatenated into every request.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "An augmented LLM using RAG over the indexed authoritative corpus is the simplest pattern that works here. Each query gets one retrieval step and one model call, so latency and cost stay low, behaviour is predictable for audits, and every answer can cite the source documents. B adds planner, researcher and writer agents to every query, which costs more, adds latency and makes runs less predictable, with no benefit for simple Q&A. C pulls from the open web instead of the authoritative source set, so it breaks the citation and audit requirement. D sends the whole corpus with every request, which is expensive and slow, doesn't scale as the corpus grows, and makes precise citations harder.",
      source_e:
        "Discussion:\nSelected Answer: C (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 52,
    kind: "single",
    text: "You are a platform architect designing an internal Claude-based assistant that serves both finance analysts and external auditors. Each population must access only documents permitted by its role. Where should role-based access control be enforced in the pipeline?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Inside the system prompt as a natural-language instruction for Claude to ignore unauthorized documents.",
      },
      {
        letter: "B",
        text: "At the retrieval layer, before any role-restricted content reaches the prompt-construction step or the model.",
      },
      {
        letter: "C",
        text: "Nowhere in the pipeline; rely on the model's general refusal behavior to reject unauthorized document access without any enforced access control.",
      },
      {
        letter: "D",
        text: "After the response is generated, by post-filtering content that should not have been retrieved.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "Access control has to be enforced deterministically, before restricted content ever reaches the model. If the retrieval layer filters by the user's role, the model can never see unauthorized documents, so it cannot leak them through prompt injection or by mistake. A system-prompt instruction (A) is only probabilistic guidance and can be bypassed. Relying on the model's refusal behavior (C) is not access control at all. Post-filtering (D) happens after the model has already seen the data, and it is unreliable because restricted information can show up paraphrased or summarized in the response.",
      source_e:
        "Discussion:\nSelected Answer: B - Authorization must be enforced before restricted information enters model context. The retrieval service should authenticate the user, resolve role and document permissions, and filter candidate records before prompt construction. This prevents unauthorized content from appearing in prompts, model traces, cached context, tool results, or generated responses. A system-prompt instruction is behavioral guidance, not an enforceable access-control boundary. Post-generation filtering is also inadequate because the model has already received and processed the restricted data, creating exposure through output, logging, or indirect inference. Relying on general refusal behavior provides no deterministic authorization. The correct architecture treats RBAC as an application and data-layer control, with the model receiving only information the requesting principal is entitled to access. Study Guide references/topics: Retrieval-layer RBAC; authorization before inference; least privilege; sensitive-context isolation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 53,
    kind: "single",
    text: "You are designing a content moderation classifier that processes high volumes of usergenerated comments under a tight per-message latency budget using well-defined classification labels. Which model selection best aligns with the workload?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Opus, because every moderation decision requires maximum reasoning depth regardless of classification complexity.",
      },
      {
        letter: "B",
        text: "Haiku, because its latency and cost profile align with high-volume classification workloads that require limited reasoning depth.",
      },
      {
        letter: "C",
        text: "Sonnet, because larger general-purpose models are preferred even when workload latency requirements are strict.",
      },
      {
        letter: "D",
        text: "Sonnet with extended thinking enabled, because deeper reasoning should be applied to every moderation request to improve edge-case handling.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "The job is high-volume classification with clearly defined labels and a strict per-message latency budget. It needs little reasoning, so Haiku is the right fit: it's the fastest and cheapest model tier and handles this kind of classification well. Option A (Opus) and option C (Sonnet) add latency and cost without a matching gain on well-defined labels. Option D (extended thinking on every request) adds the most latency and token cost, which breaks the latency budget. A better way to handle edge cases is to send only the uncertain ones to a stronger model.",
      source_e:
        "Discussion:\nSelected Answer: D (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 54,
    kind: "multi",
    text: "A Claude architect is implementing safety controls for a customer-facing advice assistant that must never provide regulated investment recommendations. Which two guardrail implementations most directly enforce this constraint? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Increase response temperature to introduce variability that reduces the likelihood of specific recommendations.",
      },
      {
        letter: "B",
        text: "Add an output classifier that detects and blocks responses containing regulated investment recommendation language.",
      },
      {
        letter: "C",
        text: "Limit session length to reduce the volume of queries processed per user per day.",
      },
      {
        letter: "D",
        text: "Log all user queries to a SIEM for post-hoc compliance review.",
      },
      {
        letter: "E",
        text: "Define explicit out-of-scope categories in the system prompt with fixed refusal phrasing for investment advice requests.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BE", source_c: "BE", source_e: "BE" },
    explanations: {
      claude:
        "B puts a check on the output side: a classifier catches and blocks any response that contains regulated recommendation language before it reaches the user. E works on the input side: the system prompt lists the out-of-scope categories and gives fixed refusal wording, so investment-advice requests get turned down in a consistent way. Used together, they enforce the rule directly and back each other up. Raising the temperature (A) makes outputs less predictable, which works against compliance. Session limits (C) only reduce how much gets used, and SIEM logging (D) only finds problems after the fact. None of A, C or D stops a recommendation from being made.",
      source_e:
        "Discussion:\nSelected Answer: B,E - The required control is best implemented through layered prevention. The system prompt should explicitly classify personalized investment recommendations as out of scope, instruct Claude not to recommend particular securities or transactions, and provide standardized refusal language. Fixed refusal behavior reduces ambiguity and gives the model a clear alternative response when users request prohibited advice or attempt to reframe it indirectly. An output classifier supplies an independent enforcement layer after generation but before delivery. It should detect prohibited recommendation language, individualized buy-or-sell instructions, portfolio allocations, and equivalent regulated content. A detected violation must block or replace the response rather than merely record it. This protects against prompt circumvention, unexpected phrasing, and occasional model noncompliance. Increasing temperature makes responses less predictable and weakens control reliability. Session-length limits regulate volume, not content. SIEM logging is valuable for monitoring, investigation, and compliance evidence, but it is detective rather than preventative: the prohibited recommendation may already have reached the customer. The completed design should evaluate both layers using adversarial prompts, paraphrases, multi-turn escalation, and classifier false-negative testing. Study Guide references/topics: [Mitigating jailbreaks and prompt injections](https://docs.anthropic.com/en /docs/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks); layered guardrails; explicit scope boundaries; standardized refusals; output classification; pre-delivery enforcement.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 55,
    kind: "single",
    text: "You are responding to a stakeholder request that adds significant scope to a deployment already in flight. Which response best aligns expectations while respecting the stakeholder's underlying need?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Hide the scope-addition request from the broader delivery team to avoid a difficult conversation, allowing the change to proceed without team awareness of its timeline implications.",
      },
      {
        letter: "B",
        text: "Decline the request outright without acknowledging the stakeholder's underlying need or offering alternatives such as deferral, descoping, or timeline extension.",
      },
      {
        letter: "C",
        text: "Acknowledge the request, describe the scope and timeline implications transparently, and propose options—defer it, descope something else, or extend the timeline—for the stakeholder to choose.",
      },
      {
        letter: "D",
        text: "Accept the additional scope into the current release without describing the timeline or descoping implications, allowing the delivery plan to absorb unacknowledged changes until they surface as delays.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Option C is best. It acknowledges what the stakeholder needs, is open about how the extra scope affects the timeline, and gives them real choices: defer it, drop something else, or extend the timeline. Option A hides the change from the delivery team, which damages trust and coordination. Option B ignores the stakeholder's need and offers no alternatives. Option D lets hidden scope creep through until it shows up later as delays.",
      source_e:
        "Discussion:\nSelected Answer: C - Option C preserves both transparency and stakeholder agency. The architect acknowledges the underlying business need while making the delivery consequences explicit. Presenting controlled alternatives converts an unbounded request into a governed decision: defer the capability, exchange it for existing scope, or accept a later release date. The selected option should be documented with revised success criteria, dependencies, risk, cost, ownership, and approval. Concealing the request prevents accurate planning and creates unmanaged delivery risk. Rejecting it without exploring alternatives ignores legitimate stakeholder value. Quietly absorbing additional work produces scope creep and makes later delays appear unexpected. Effective lifecycle communication does not promise every requested capability; it presents the trade-offs necessary for an informed decision. Study Guide references/topics: Scope governance; expectation alignment; transparent trade-offs; change control; stakeholder decision rights.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 56,
    kind: "single",
    text: "You are assessing data-exfiltration risk in a Claude-based assistant that has tools for both internal-document retrieval and outbound HTTP calls. Which scenario most directly indicates a data-exfiltration risk?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The outbound HTTP tool returns a 200 response when the assistant calls an allow-listed domain to fulfil a user-initiated data-lookup request.",
      },
      {
        letter: "B",
        text: "The user submits a routine question and receives a routine answer.",
      },
      {
        letter: "C",
        text: "Adversarial content in a retrieved document instructs the model to call the outbound HTTP tool and send sensitive content to an attacker-controlled URL.",
      },
      {
        letter: "D",
        text: "The internal-document retrieval tool returns a document that the user is authorized to view.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "C", source_c: "C" },
    explanations: {
      claude:
        "Option C is the classic indirect prompt-injection pattern. Untrusted content that the assistant retrieves takes control of an outbound tool and sends sensitive data to a URL the attacker controls. Having read access to private data and an outbound channel in the same agent is exactly what makes exfiltration possible. A is a normal user-initiated call to an allow-listed domain. B is ordinary use. D is authorized access, so none of these three signals exfiltration.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 57,
    kind: "multi",
    text: "You are building an ethics-review checklist for deployments supported by artificial intelligence. Which two checks belong on the list? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Confirm that vendor licensing terms permit the planned production use of the model.",
      },
      {
        letter: "B",
        text: "Verify that outputs do not rely on generalizations about people that the underlying data does not support.",
      },
      {
        letter: "C",
        text: "Confirm that high-impact decisions retain human accountability rather than being attributed to the model.",
      },
      {
        letter: "D",
        text: "Restrict ethics review to outputs that exceed a defined model-confidence threshold.",
      },
      {
        letter: "E",
        text: "Confirm that latency and throughput targets are met across supported user populations.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "BC", source_c: "BC" },
    explanations: {
      claude:
        "B is an ethics check against bias: outputs should not rely on generalizations about people that the data doesn't support. C is an accountability check: a person, not the model, stays responsible for high-impact decisions. A (licensing) is a legal or procurement check, and E (latency and throughput) is a performance check. D would weaken the review, because harmful outputs can have any confidence level, so all outputs need review.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 58,
    kind: "multi",
    text: "You are listing characteristics of robust guardrail design for an enterprise deployment. Which two characteristics belong on the list? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Centralized log retention for guardrail violations with quarterly review by the security team.",
      },
      {
        letter: "B",
        text: "Per-role tool allow-lists enforced at the orchestration layer before any tool call executes.",
      },
      {
        letter: "C",
        text: "User feedback channels that route reported guardrail failures into the product backlog for triage.",
      },
      {
        letter: "D",
        text: "Periodic refresh of the system prompt wording to keep refusal language current and clear.",
      },
      {
        letter: "E",
        text: "Adversarial-input coverage in the evaluation set with regression tracking on guardrail performance.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BE", source_c: "BE", source_e: "BE" },
    explanations: {
      claude:
        "B is a deterministic control: per-role tool allow-lists are checked at the orchestration layer, so a forbidden tool call is blocked before it runs. E tests guardrails against adversarial inputs and tracks regressions, which catches weakening after model or prompt changes. A (logs reviewed quarterly) and C (user reports sent to a backlog) only react after a failure, and slowly. D only rewords the prompt, which depends on the model following instructions and is not a reliable guardrail.",
      source_e: "Discussion:\nSelected Answer: A,D",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 59,
    kind: "single",
    text: "You are integrating human review into a high-volume classification pipeline where reviewing every output is infeasible. Which sampling strategy best balances throughput with quality oversight?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "No sampling, relying entirely on user complaints to reveal quality and safety problems after they affect users.",
      },
      {
        letter: "B",
        text: "Risk-stratified sampling that reviews all low-confidence and high-impact outputs and a smaller random sample of high-confidence routine outputs.",
      },
      {
        letter: "C",
        text: "Inverse sampling that reviews only high-confidence routine outputs and skips low-confidence and high-impact outputs.",
      },
      {
        letter: "D",
        text: "Universal review of every output regardless of confidence or throughput impact.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "Risk-stratified sampling sends human review where errors are most likely (low-confidence outputs) or most costly (high-impact outputs). It also keeps a small random sample of high-confidence routine outputs, which catches overconfident errors and calibration drift without slowing throughput. A only finds problems after users are already affected. C reviews the safest outputs and skips the riskiest. D is infeasible at this volume.",
      source_e:
        "Discussion:\nSelected Answer: B (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 60,
    kind: "single",
    text: "A business sponsor has requested an AI solution to 'improve customer experience.' The sponsor cannot articulate which customer journey is failing, which metric reflects the failure, or which decisions the AI should support. The sponsor is asking you to begin design work next week. Which delegation-competency action should you take first?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Recommend that the sponsor revise the request and resubmit it later for evaluation.",
      },
      {
        letter: "B",
        text: "Begin prototyping a generic assistant against the broad request before the next deadline.",
      },
      {
        letter: "C",
        text: "Propose a fixed scope that you commit to by default based on your own assumptions.",
      },
      {
        letter: "D",
        text: "Facilitate a structured discovery to define the failing decision and the target metric.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "D", source_c: "D" },
    explanations: {
      claude:
        "Delegation competency means turning a vague goal into a well-defined problem before you hand it to AI. Here, that means running a structured discovery with the sponsor to identify the failing journey, the decision the AI should support, and the metric that will show success. A is a passive handoff that leaves the sponsor with no help. B builds something with no defined problem or way to measure it. C swaps your own unchecked assumptions for the sponsor's real needs, so the scope may be wrong and nobody has agreed to it.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 61,
    kind: "multi",
    text: "A loan pre-qualification assistant shows 94 percent approval recommendations that match the human underwriter decision. The fairness team has reviewed approval rate parity across protected groups and reported no significant difference. A board member has asked whether this evidence is sufficient to declare the assistant fair. Which two Discernment-competency findings should you report? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Approval rate parity does not by itself assess error rate parity across protected groups.",
      },
      {
        letter: "B",
        text: "Match with human underwriters does not establish freedom from underwriter-introduced bias.",
      },
      {
        letter: "C",
        text: "The 94 percent match rate is sufficient evidence of fairness for the assistant's decisions.",
      },
      {
        letter: "D",
        text: "The fairness team's review process likely missed at least some of the protected groups studied.",
      },
      {
        letter: "E",
        text: "A larger sample is needed before any meaningful fairness claim can be made about the model.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AB", source_c: "AB", source_e: "AB" },
    explanations: {
      claude:
        "A: Similar approval rates across groups (demographic parity) can still hide different false-positive and false-negative rates by group. That means qualified applicants in one group could be wrongly denied more often, so error-rate parity has to be checked separately. B: Agreeing with human underwriters only shows that the assistant copies their decisions, and that can include any bias they already have. The baseline isn't neutral. C is the very conclusion that the evidence doesn't support. D and E assume flaws (missed groups, too small a sample) that the scenario gives no evidence for, so they aren't findings you can justify from it.",
      source_e:
        "Discussion:\nSelected Answer: A,B - Approval-rate parity measures whether groups receive positive recommendations at similar rates. It does not establish whether false approvals, false denials, sensitivity, specificity, or calibration are comparable across those groups. A system can therefore satisfy aggregate approval parity while imposing materially different error burdens on protected populations. The evaluation must include subgroup confusion matrices, false- positive and false-negative rates, calibration, intersectional analysis, and confidence intervals. The 94 percent agreement rate measures fidelity to human underwriter decisions, not fairness. Human decisions are not automatically unbiased ground truth. If historical underwriting practices contain structural, procedural, or measurement bias, a model that reproduces those decisions accurately can reproduce the same bias. The reference labels must therefore be independently assessed for legitimacy, consistency, and potential discriminatory effects. Nothing in the scenario establishes that protected groups were omitted, so D is unsupported. Similarly, sample size may require examination, but the scenario provides no statistical information proving that sample size is the principal deficiency. The evidence already contains two identifiable conceptual gaps regardless of sample size. Study Guide references/topics: [Defining multidimensional evaluation criteria](https://docs.anthropic.com/en /docs/build-with-claude/develop-tests); fairness measurement; subgroup error analysis; label and benchmark bias; human-baseline limitations; governance evidence.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 62,
    kind: "single",
    text: "You are operating an interactive assistant whose dominant performance constraint is per-turn latency. Quality on routine turns is already acceptable. Which configuration adjustment most directly improves latency without disproportionately damaging quality?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Disable prompt caching entirely to ensure fresh context processing on every request, preventing stale prefix content from affecting latency-sensitive interactions.",
      },
      {
        letter: "B",
        text: "Reduce retrieval depth to the top-k passages that historically cover the answer, and cache stable system-prompt content.",
      },
      {
        letter: "C",
        text: "Increase retrieval depth to the corpus maximum to improve recall regardless of latency.",
      },
      {
        letter: "D",
        text: "Switch every turn to the heaviest available model to maximize output quality, accepting that the increased model latency will worsen the per-turn SLO rather than improve it.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "B", source_c: "B" },
    explanations: {
      claude:
        "The constraint is latency, and quality on routine turns is already fine. Option B cuts the number of input tokens by limiting retrieval to the top-k passages that have historically covered the answer, so recall stays about the same. It also caches the stable system prompt, which lowers time-to-first-token for that repeated prefix. Option A removes caching, which makes latency worse and doesn't fix any real staleness problem. Option C adds latency in return for recall the assistant doesn't need. Option D openly accepts a worse latency SLO.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 63,
    kind: "multi",
    text: "You are building a feedback-and-alignment routine for a multi-stakeholder deployment. Which two practices belong in the routine? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Record each session and distribute the recording to stakeholders who could not attend live.",
      },
      {
        letter: "B",
        text: "Escalate any disagreement among stakeholders to the executive sponsor for binding resolution.",
      },
      {
        letter: "C",
        text: "Rotate facilitation among the participating stakeholder groups to share ownership of the routine.",
      },
      {
        letter: "D",
        text: "Set a regular cadence for revisiting expectations and assumptions as conditions evolve over time.",
      },
      {
        letter: "E",
        text: "Reconcile divergent stakeholder positions explicitly rather than papering over them in the moment.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "DE", source_c: "DE", source_e: "DE" },
    explanations: {
      claude:
        "D and E are the two practices that actually keep stakeholders aligned. D sets a regular cadence for revisiting expectations and assumptions, so alignment keeps up as conditions change. E means openly resolving positions that conflict instead of hiding them, so real agreement is reached. A (recordings) helps with communication but doesn't align anyone. B sends every disagreement to the executive sponsor, which skips the collaborative reconciliation the routine is meant to do. C (rotating who runs the sessions) is a small ownership tactic, not a core alignment practice.",
      source_e:
        "Discussion:\nSelected Answer: D,E - Alignment is an ongoing governance process rather than a one-time approval. Option D creates a predictable cadence for reassessing objectives, constraints, assumptions, risks, service levels, and success measures as business and technical conditions change. Option E requires disagreements to be surfaced and reconciled explicitly, preserving decision traceability and preventing unresolved conflicts from reappearing during implementation or operation. The routine should document decisions, owners, accepted trade-offs, action items, and conditions that trigger reconsideration. Recording meetings may improve accessibility but does not itself produce alignment. Rotating facilitation is optional and may weaken accountability. Automatically escalating every disagreement to an executive sponsor bypasses normal architectural negotiation and should be reserved for material deadlocks. Study Guide references/topics: Stakeholder alignment; feedback cadence; assumption management; conflict reconciliation; decision records; lifecycle governance.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 64,
    kind: "multi",
    text: "An architect is reviewing a set of architecture documentation packages before handing off a Claude-based pipeline to an implementation team. Which two characteristics indicate that a documentation package is sufficient to support implementation without ongoing architect involvement? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The document specifies integration contracts, configuration schemas, and expected input/output shapes for each component.",
      },
      {
        letter: "B",
        text: "The document includes a decision log that records the rationale for key architectural choices and the alternatives rejected.",
      },
      {
        letter: "C",
        text: "The document provides a high-level narrative description of the system without component-level detail.",
      },
      {
        letter: "D",
        text: "The document includes the architect's contact information for questions during implementation.",
      },
      {
        letter: "E",
        text: "The document lists all Claude models that were evaluated but does not specify which was selected or why.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AB", source_c: "AB", source_e: "AB" },
    explanations: {
      claude:
        "A is correct because integration contracts, configuration schemas and input/output shapes give implementers concrete specs they can build to without having to ask anyone. B is correct because a decision log that records the rationale and the rejected alternatives lets the team make consistent choices when edge cases come up, without going back to the architect. C is wrong because a high-level narrative with no component detail isn't enough to implement from. D is wrong because contact information assumes the architect will stay involved, which is the opposite of a self-sufficient package. E is wrong because listing the models that were evaluated without saying which one was chosen, or why, leaves a key decision unresolved.",
      source_e:
        "Discussion:\nSelected Answer: A,B - Implementation-ready documentation must provide both executable specifications and preserved architectural reasoning. Option A supplies the contracts an implementation team needs to build components independently: configuration schemas, accepted inputs, produced outputs, validation requirements, and integration boundaries. These details prevent teams from inventing incompatible assumptions about data structures, tool behavior, error handling, or component ownership. Option B complements the technical contracts with a decision log. Recording the selected design, underlying constraints, alternatives considered, and reasons for rejection enables implementers to distinguish deliberate architectural decisions from accidental omissions. It also prevents previously rejected approaches from being reintroduced without new evidence. A high-level business narrative in Option C may explain purpose but cannot direct component-level implementation. Contact information in Option D provides an escalation route, but documentation is not sufficient if routine progress still depends on the architect's availability. Option E records activity rather than a decision; a model list without the selected model and selection rationale leaves critical cost, latency, capability, and evaluation assumptions unresolved. A strong handoff package should permit implementation, testing, and support teams to proceed while escalating only genuinely new architectural questions. Study Guide references/topics: Architecture documentation; interface contracts; configuration schemas; Architecture Decision Records; implementation handoff; decision traceability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 65,
    kind: "single",
    text: "You are reviewing a peer's draft system prompt that contains contradictory instructions: one section says never to speculate beyond the supplied source, while another says to confidently fill in any gaps. Which response is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Add a priority instruction directing the model to evaluate all instructions and apply whichever appears most contextually appropriate on each request.",
      },
      {
        letter: "B",
        text: "Remove or rewrite the gap-filling instruction so the prompt consistently constrains the model to source-supported content.",
      },
      {
        letter: "C",
        text: "Increase temperature so output randomness masks the contradiction.",
      },
      {
        letter: "D",
        text: "Keep both instructions and rely on the model to decide which one to follow on each request.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "B", source_c: "B" },
    explanations: {
      claude:
        "The two instructions contradict each other, and that makes the model's behavior unpredictable. The fix is to resolve the conflict in the prompt itself by removing or rewriting the gap-filling instruction so the model sticks to what the source supports, which also reduces hallucination. Options A and D leave the conflict in place and let the model pick a side on each request, so results stay inconsistent and hard to test. Option C makes things worse, because a higher temperature adds randomness and does nothing about the conflicting instructions.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 66,
    kind: "single",
    text: "You are comparing patterns for a batch document-classification job that follows fixed steps: extract metadata, classify, summarize, and persist. Which pattern is the best fit and why?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "A workflow pattern, because agentic patterns do not support tool invocations and therefore cannot execute the persist step that writes results to the downstream store.",
      },
      {
        letter: "B",
        text: "An agentic pattern, because the open-ended planning capability of agents produces more consistent structured outputs than a fixed workflow graph on classification tasks.",
      },
      {
        letter: "C",
        text: "An agentic pattern, because agents are categorically more accurate than workflows and therefore always preferable regardless of step predictability.",
      },
      {
        letter: "D",
        text: "A workflow pattern, because the steps are well-defined and predictable per-request token cost is preferred over flexibility.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "The job always runs the same steps in the same order: extract metadata, classify, summarize, persist. That is the case Anthropic's guidance gives for workflows, which follow a predefined code path. They are predictable, consistent, cheaper and easier to debug than agents. A is wrong because agents can call tools, so they could do the persist step. B and C are wrong because agents are not more consistent or always more accurate. Agents fit open-ended problems where the steps can't be known in advance, and they cost more and add uncertainty in return for flexibility.",
      source_e:
        "Discussion:\nSelected Answer: D - A workflow is appropriate when processing stages and transitions are known in advance. Metadata extraction, classification, summarization, and persistence can be represented as deterministic nodes with explicit schemas, validation rules, retry policies, and failure handling. This provides predictable execution, cost, observability, and testability without paying for repeated model-driven planning. Anthropic's Building Effective AI Agents distinguishes workflows, where predefined code paths control execution, from agents, where the model dynamically determines its process. Option A reaches the correct pattern for an incorrect reason: workflows and agents can both invoke tools. Options B and C introduce unnecessary autonomy and make unsupported claims about consistency or universal accuracy. Study Guide references/topics: Workflow versus agentic patterns; deterministic orchestration; batch processing; structured outputs; predictable cost; error handling.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 67,
    kind: "multi",
    text: "A managed agent deployment for claims triage has grown from 6 tools to 34 tools over 18 months as product teams added capabilities. Triage accuracy has declined from 91 percent to 78 percent, and average tool-selection latency has increased by 2.3 seconds. A junior engineer has proposed adding a tool-router agent in front of the current agent to filter the tool list per request. \n\nWhich two findings should you present to justify capability decomposition before adding the router? \n\n(Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Tool descriptions overlap across multiple claim categories within the agent's tool set.",
      },
      {
        letter: "B",
        text: "Several tools have not been invoked across the most recent 90 days of traffic.",
      },
      {
        letter: "C",
        text: "The 34 tools serve four distinct claim-workflow domains within the triage scope.",
      },
      {
        letter: "D",
        text: "The router pattern is well documented in the team's internal architecture guide.",
      },
      {
        letter: "E",
        text: "The proposed router introduces an additional model call on every incoming request.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "AC",
      source_c: "AC",
      source_e: "E",
      source_e_dup_2: "CE",
    },
    explanations: {
      claude:
        "C shows the 34 tools fall into four separate workflow domains, so the system splits naturally into specialised subagents with small, focused tool sets. A shows that tool descriptions overlap, which confuses the model and explains the accuracy drop and slower tool selection. Splitting by domain puts those overlapping tools in different scopes, while a router would only filter the same confusing set. B argues for removing unused tools, D is not evidence, and E is a router cost rather than a reason to decompose.",
      source_e:
        "Discussion:\nSelected Answer: CD Claude validates CD upvoted 1 time Submit Cancel\n\n---\n\nClaude validates CD\n\n---\n\nSelected Answer: CD not B (extra model call) is a cost of the router, but it doesn't make a positive case for decomposition. It's also a weaker point than the root-cause findings. upvoted 1 time Submit Cancel\n\n---\n\nnot B (extra model call) is a cost of the router, but it doesn't make a positive case for decomposition. It's also a weaker point than the root-cause findings.\n\n---\n\nSelected Answer: B B. We have latency growth. The router will add an extra hop and extra latency D. If 34 tools serve 4 distinct domains, better to combine them into 4 subagents rather than 34 tools in 1 agent. upvoted 1 time Submit Cancel",
    },
    confidence: { claude: "medium" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 68,
    kind: "single",
    text: "A Claude architect needs to ensure that a security-hardening flag cannot be disabled by any individual engineer after it is set. Which configuration scope correctly enforces this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "User scope (~/.claude/settings.json) on each engineer's machine.",
      },
      {
        letter: "B",
        text: "Environment variable defined in the CI/CD pipeline only.",
      },
      {
        letter: "C",
        text: "Managed configuration applied centrally and marked as non-overridable.",
      },
      {
        letter: "D",
        text: "Project scope (.claude/settings.json) committed to the repository.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "C", source_c: "C" },
    explanations: {
      claude:
        "Managed (enterprise/policy) settings sit at the top of Claude Code's settings precedence. User, project, local and command-line settings can't override them, so a flag set there can't be turned off by any one engineer. User scope (A) is controlled by each engineer. Project scope (D) can be overridden by local or user settings, or changed with a commit. A CI-only environment variable (B) doesn't apply to interactive sessions on engineers' machines.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 69,
    kind: "multi",
    text: "A Claude architect is auditing configuration scope assignments. Which two statements correctly identify an appropriate use of user-scope configuration versus other scopes? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Persisting personal editor theme preferences that follow an engineer across projects.",
      },
      {
        letter: "B",
        text: "Saving a preferred Claude response language that applies to all repositories the engineer uses.",
      },
      {
        letter: "C",
        text: "Enforcing a company-wide policy that must not be overridden by individual engineers.",
      },
      {
        letter: "D",
        text: "Defining MCP server endpoints shared by all contributors to a specific repository.",
      },
      {
        letter: "E",
        text: "Storing API authentication keys so they are not committed to version control.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "AB", source_c: "AB" },
    explanations: {
      claude:
        "User scope is for personal settings that follow one engineer across every project, such as an editor theme (A) or a preferred response language (B). A company policy that can't be overridden (C) belongs in managed (enterprise) settings, which take precedence over user settings. MCP servers shared by everyone on one repository (D) belong in project scope (.mcp.json or .claude/settings.json), committed to the repo. Keeping secrets out of version control (E) is the job of local scope (settings.local.json, which git ignores) or environment variables, so it doesn't define user scope.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 70,
    kind: "multi",
    text: "You are compiling factors that should drive the choice between Model Context Protocol (MCP), direct API integration, and agent-to-agent handoff. Which two factors belong on the list? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Whether the vendor publishes detailed reference documentation for each candidate protocol.",
      },
      {
        letter: "B",
        text: "Whether the team has prior implementation experience with any of the candidate protocols.",
      },
      {
        letter: "C",
        text: "Whether the underlying transport supports encryption in transit between the integrated services.",
      },
      {
        letter: "D",
        text: "Whether the integration must be portable across multiple AI clients in the ecosystem.",
      },
      {
        letter: "E",
        text: "Whether the interaction is stateless and latency-sensitive or stateful and longer-running.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: "DE",
      source_c: "DE",
      source_e: "E",
      source_e_dup_2: "DE",
    },
    explanations: {
      claude:
        "The choice should rest on how the integration is built, not on things that are the same for every option. If the integration has to be reused by several AI clients, that favors MCP's standard interface over a custom direct API integration (D). Whether the work is a quick, stateless, latency-sensitive call or a stateful, longer-running task decides between a direct call or tool and a handoff to another agent (E). Encryption in transit (C) is a baseline requirement for all three options, so it doesn't separate them. Documentation (A) and the team's past experience (B) affect how easy each option is to adopt, not which design fits the integration.",
      source_e:
        "Discussion:\nSelected Answer: BE (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 71,
    kind: "single",
    text: "You are selecting a protocol for a single low-latency stateless tool call from a Claude-based assistant to an internal pricing service that already exposes a stable HTTP API. Which integration mechanism is the most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "A direct API call to the existing endpoint with the appropriate scoped credentials.",
      },
      {
        letter: "B",
        text: "A long-lived stateful session protocol for a stateless single-call interaction.",
      },
      {
        letter: "C",
        text: "A bespoke streaming protocol layered over an unrelated asynchronous message bus.",
      },
      {
        letter: "D",
        text: "An agent-to-agent handoff that introduces another Claude-based agent in front of the pricing service.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "The pricing service already has a stable HTTP API, and the interaction is one stateless, low-latency call. The simplest fit is to call that endpoint directly, exposed to Claude as a tool, using credentials scoped to only what it needs. B adds session state that a one-shot call doesn't need. C adds an unrelated async bus and custom streaming, which only adds latency and complexity. D puts an extra LLM agent in the path, which costs latency and tokens and adds a new way for the call to fail, with no benefit.",
      source_e:
        "Discussion:\nSelected Answer: D (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 72,
    kind: "single",
    text: "A Claude architect observes that after a recent model-version upgrade, grounded responses began including claims not supported by the retrieved source documents. Which mitigation is most directly targeted at this failure mode?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Constrain responses to source-supported content, require citations, and add a verification step.",
      },
      {
        letter: "B",
        text: "Score each new model version against a stable adversarial evaluation set.",
      },
      {
        letter: "C",
        text: "Replace the shared API key with per-user OAuth tokens to improve access control.",
      },
      {
        letter: "D",
        text: "Treat retrieved data as untrusted and apply input classifiers at ingestion time.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "The failure is ungrounded claims (hallucination) in RAG responses. The direct fix is to limit answers to what the sources support, require citations, and add a step that checks each claim against its source. B catches regressions in future upgrades but doesn't stop unsupported claims now, and adversarial sets test robustness, not faithfulness to sources. C (access control) and D (prompt-injection defense at ingestion) target different risks.",
      source_e:
        "Discussion:\nSelected Answer: A - The observed failure is a groundedness defect: the response contains claims that cannot be traced to retrieved evidence. Option A directly constrains generation to the supplied sources, requires visible attribution, and verifies that each material claim has supporting text. Unsupported claims should be removed, qualified, or replaced with an explicit statement that the available sources are insufficient. Regression evaluation in Option B may detect the failure but does not itself prevent unsupported claims. OAuth addresses identity and authorization, while input classifiers address malicious or unsafe retrieved content; neither verifies factual support. Anthropic recommends citations, supporting quotations, and post-generation claim verification to reduce hallucinations in document-grounded applications. Reducing hallucinations",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 73,
    kind: "single",
    text: "You are defining escalation criteria for ambiguous cases in an automated workflow. Which set of criteria best supports consistent escalation?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "No escalation criteria; the model decides independently on every turn whether to escalate, without explicit confidence thresholds, impact categories, or classifier-based ambiguity flags.",
      },
      {
        letter: "B",
        text: "Escalation only after an affected customer has contacted support to complain, after the automated workflow has already completed without human review.",
      },
      {
        letter: "C",
        text: "Escalation at the discretion of whoever is available when the team's on-call engineer has spare capacity, without a defined threshold, category, or ambiguity criterion.",
      },
      {
        letter: "D",
        text: "A confidence score below a defined threshold, presence of high-impact decision categories, ambiguity flags raised by content classifiers, and the user's explicit request for review.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "Option D sets explicit, checkable triggers: a confidence score below a set threshold, high-impact decision categories, ambiguity flags from classifiers, and the user's own request for review. Because these triggers are objective, the same case gets escalated the same way every time, and that can be checked. Option A leaves escalation to the model's judgment with no criteria, so results will vary. Option B is reactive: escalation happens only after harm is done and a customer complains. Option C depends on who happens to be free, which is arbitrary and inconsistent.",
      source_e:
        "Discussion:\nSelected Answer: D - Option D defines observable and repeatable escalation triggers. Confidence thresholds identify cases where the system lacks sufficient certainty. High-impact categories ensure that legally, financially, medically, or operationally consequential decisions receive human attention regardless of nominal confidence. Classifier- generated ambiguity flags add an independent control, while an explicit user request preserves the individual' s ability to obtain review. These triggers should be documented, tested, logged, and mapped to reviewer authority and response-time objectives. Options A and C make escalation discretionary and inconsistent. Option B is purely reactive because the potentially harmful automated action has already occurred. A sound workflow escalates before consequential execution and records the reason, evidence, reviewer, decision, and outcome. Study Guide references/topics: Human-in-the-loop governance; escalation thresholds; ambiguity detection; consequential decisions; review auditability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 74,
    kind: "single",
    text: "After a prompt-template update, several previously passing test cases now produce unexpected outputs. Which test type is specifically designed to detect this category of failure?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Integration tests that verify end-to-end behavior across pipeline components.",
      },
      {
        letter: "B",
        text: "Adversarial tests designed to probe for safety and injection vulnerabilities.",
      },
      {
        letter: "C",
        text: "Regression tests scored against a stable reference set of known-good behavior.",
      },
      {
        letter: "D",
        text: "Smoke tests that verify core paths are reachable after each deployment.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Here a change (the prompt-template update) broke behavior that used to work, and catching that is exactly what regression testing is for. Scoring outputs against a fixed reference set of known-good behavior shows which cases got worse. Integration tests (A) check that pipeline components work together, not whether output quality dropped after a change. Adversarial tests (B) look for safety and injection problems. Smoke tests (D) only check that core paths still run, so they would miss subtle changes in output.",
      source_e:
        "Discussion:\nSelected Answer: A (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 75,
    kind: "multi",
    text: "A Claude architect at a health services organization is defining evaluation metrics for a clinical-summary pipeline. The pipeline must remain within a per-query cost ceiling and must never surface patient data to unauthorized roles. Which two metrics directly address these requirements? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "BLEU score computed against a human-annotated reference summary set.",
      },
      {
        letter: "B",
        text: "Role-based access-control enforcement rate measured on a red-team dataset.",
      },
      {
        letter: "C",
        text: "Throughput measured as successful requests processed per minute.",
      },
      {
        letter: "D",
        text: "Per-query token cost measured against the defined cost ceiling.",
      },
      {
        letter: "E",
        text: "Response latency at the 95th percentile across a one-week sample window.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BD", source_c: "BD", source_e: "BD" },
    explanations: {
      claude:
        "There are two requirements, and each one maps to a single metric. Measuring per-query token cost against the ceiling (D) checks the cost limit directly. Measuring how often role-based access control holds up on a red-team dataset (B) checks that patient data is never shown to unauthorized roles, including under adversarial inputs. BLEU (A) only measures how closely summaries match reference text. Throughput (C) and p95 latency (E) are performance metrics. None of those three tells you about cost or data access.",
      source_e:
        "Discussion:\nSelected Answer: B,D - The evaluation metrics must map directly to the two stated requirements. Role-based access-control enforcement rate, tested against a red-team dataset, measures whether requests from unauthorized identities, roles, or access paths are consistently denied. It converts the privacy and authorization requirement into an observable security metric and exposes bypass conditions that ordinary functional tests may miss. Because the requirement says patient data must never reach unauthorized roles, the acceptance threshold should be effectively 100% enforcement across representative and adversarial cases. Per-query token cost directly measures compliance with the financial constraint. The metric should include uncached input, cache reads and writes where applicable, output tokens, thinking tokens, and any other billable components attributed to the request. Results can then be compared with the defined ceiling across normal, boundary, and worst-case inputs. Anthropic's evaluation guidance identifies privacy preservation and price as distinct success criteria and emphasizes that criteria must be specific, measurable, and relevant to the application. Define Success Criteria and Build Evaluations BLEU may assess textual similarity but does not test authorization or cost. Throughput and percentile latency are valuable operational metrics, yet neither directly answers the two requirements in the scenario. Study Guide references/topics: Multidimensional evaluation; privacy preservation; authorization testing; red- team datasets; token-cost measurement; requirement-to-metric traceability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 76,
    kind: "single",
    text: "You are choosing the level of detail for an implementation guide. The audience is a delivery team that will build the deployment. Which guidance composition best serves them?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Component responsibilities, contracts between components, sequence diagrams of the dominant flows, configuration parameters with defaults, and operational runbooks.",
      },
      {
        letter: "B",
        text: "Component responsibilities and interface contracts only, without sequence diagrams of the dominant flows, configuration parameters with defaults, or runbooks to guide operational tasks.",
      },
      {
        letter: "C",
        text: "An architecture overview and sequence diagrams for the dominant flows, without interface contracts, configuration-parameter tables, or operational runbooks for the delivery team to follow.",
      },
      {
        letter: "D",
        text: "An architecture overview and a list of known limitations, without component-level diagrams, interface contracts, configuration parameters, or operational runbooks to support implementation.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "A delivery team that builds and runs the deployment needs everything required to implement and operate it. That means what each component does, the contracts between components, sequence diagrams of the main flows, configuration parameters with defaults, and runbooks for operations. Options B, C and D each leave out pieces the builders need. B has no flows, config or runbooks. C has no contracts, config or runbooks. D is only a high-level overview, which suits executives, not implementers.",
      source_e:
        "Discussion:\nSelected Answer: A - A delivery team needs implementation-level direction rather than an executive architecture summary. Component responsibilities establish ownership and boundaries, while interface contracts define schemas, accepted inputs, outputs, errors, and behavioral expectations. Sequence diagrams show how components interact across dominant and failure flows. Configuration tables with defaults prevent inconsistent assumptions between environments. Operational runbooks ensure that deployment, recovery, monitoring, and routine maintenance are addressed during implementation rather than improvised after release. Options B, C, and D omit one or more elements required to translate architectural intent into a buildable and supportable system. The guide should enable normal delivery work without continuous dependence on undocumented knowledge held by the architect. Study Guide references/topics: Implementation documentation; component contracts; sequence diagrams; configuration management; operational readiness.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 77,
    kind: "single",
    text: "You are identifying the highest-impact optimization for a deployment whose token cost is dominated by a long, repeated system prompt and a large retrieved context per request. Which optimization most directly targets the dominant cost driver?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Increase retrieval depth on every request to maximize recall, worsening the dominant cost driver by adding more retrieved tokens per request rather than reducing them.",
      },
      {
        letter: "B",
        text: "Add additional repeated content to the system prompt to give the model more guidance.",
      },
      {
        letter: "C",
        text: "Move the long, repeated system prompt into a cacheable prefix and trim retrieved context to the spans relevant to each query.",
      },
      {
        letter: "D",
        text: "Switch every request to the heaviest available model to maximize output quality, accepting that higher per-request inference cost compounds rather than addresses the dominant cost driver.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "The cost comes from two places: a long system prompt that repeats on every request, and a large retrieved context. C targets both. Putting the system prompt in a cacheable prefix means later requests read it from the cache at a much lower price instead of paying full price for those input tokens each time. Trimming the retrieved context to the parts relevant to each query cuts the other large block of input tokens. A adds more retrieved tokens, B makes the repeated prompt longer, and D raises the cost per token, so all three make the main cost driver worse.",
      source_e: "Discussion:\nSelected Answer: A",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 78,
    kind: "single",
    text: "You are defining transparency practices for a customer-facing assistant whose responses are materially shaped by AI. Which transparency practice most directly supports responsible deployment?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Misrepresent the AI's role in producing responses in order to make the assistant feel more trustworthy or more human, undermining informed user consent and organizational transparency.",
      },
      {
        letter: "B",
        text: "Refuse to answer any user question about how the responses were produced or whether AI was involved, treating the AI's role as confidential operational information.",
      },
      {
        letter: "C",
        text: "Disclose AI involvement to end users in line with the organization's transparency policy and provide a documented path to reach a human when needed.",
      },
      {
        letter: "D",
        text: "Disclose AI involvement only to internal staff and operators while withholding that information from the end users whose interactions are materially shaped by the AI system.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "C is the answer. It tells end users that AI is involved, following the organization's transparency policy, and gives them a documented way to reach a human. That supports informed consent and gives users a way to escalate. A misrepresents the AI's role. B refuses to say whether AI was involved. D tells only internal staff and keeps the information from the users whose interactions the AI shapes. All three undermine transparency toward the people affected.",
      source_e:
        "Discussion:\nSelected Answer: C - Responsible deployment requires users to receive an accurate representation of the system with which they are interacting. Option C provides that transparency while also establishing a practical escalation path. Disclosure should be proportionate to the material role AI plays, expressed in language appropriate to the audience, and aligned with organizational policy and applicable regulatory obligations. A documented human-contact route is important when the assistant cannot resolve an issue, produces a disputed result, encounters a high-impact exception, or handles a matter requiring human authority. Anthropic' s Responsible Scaling Policy recognizes escalation to human reviewers as an appropriate safeguard for edge cases and situations requiring human judgment. Responsible Scaling Policy Options A and D intentionally conceal material AI involvement from affected users, weakening informed decision-making, auditability, and trust. Option B is also unsuitable because transparency does not require revealing proprietary prompts, confidential controls, or internal security mechanisms; however, it does require an honest explanation of AI involvement and the system's operational role. The correct design combines disclosure, understandable limitations, human escalation, and records demonstrating that the organization's transparency requirements are consistently applied. Study Guide references/topics: AI transparency; informed user interaction; human escalation; responsible deployment; disclosure policy; operational accountability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 79,
    kind: "multi",
    text: "An engineering organization is adopting Claude Code across 200 developers. A team lead proposes that AI-generated pull requests bypass standard code review for changes under 50 lines. Which two Diligence-competency objections should you raise? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Removing review eliminates the verification mechanism required for AI-generated output across the workflow.",
      },
      {
        letter: "B",
        text: "Code-review capacity should be expanded to handle every code change submitted across the team.",
      },
      {
        letter: "C",
        text: "The threshold should be increased to 200 lines to capture more changes.",
      },
      {
        letter: "D",
        text: "AI-generated pull requests should be rejected by default across the organization.",
      },
      {
        letter: "E",
        text: "Line count is a poor proxy for the actual risk introduced by a code change.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AE", source_c: "AE", source_e: "AE" },
    explanations: {
      claude:
        "Diligence means people stay responsible for checking and taking ownership of AI-generated output. If review is skipped for these PRs, that check disappears (A). Line count also tells you little about risk: a 5-line change to auth, security or config logic can be more dangerous than a 500-line refactor (E). B is about how much review capacity there is, not the principle being violated. C keeps the same flawed line-count idea. D overcorrects by rejecting AI work outright instead of reviewing it properly.",
      source_e:
        "Discussion:\nSelected Answer: A,E - AI-generated code requires verification through the same controlled engineering workflow as human-authored changes. Removing review eliminates the gate that can detect incorrect assumptions, security defects, missing tests, and unintended behavior. Line count is not a defensible risk measure: a one-line authorization change, dependency alteration, or command-execution defect can be more consequential than a large documentation update. Review requirements should instead be determined by affected components, privilege, data sensitivity, reversibility, test coverage, and deployment impact. Expanding capacity may be operationally useful but is not the central diligence objection. Raising the threshold retains the same flawed proxy, while rejecting all AI-generated changes discards legitimate productivity benefits. Anthropic states that users remain responsible for reviewing proposed code and commands. Claude Code security",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 80,
    kind: "single",
    text: "You are defining an SLA for a Claude-based assistant. Which SLA definition is most operationally meaningful?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "A target tied to a stakeholder sentiment measure such as “the team feels satisfied,” which cannot be measured objectively or used to trigger a documented breach response.",
      },
      {
        letter: "B",
        text: "A measurable target with a defined metric, threshold, evaluation window, and consequence for breach—for example, 'p95 per-request latency under 800 ms over a 28-day window.'",
      },
      {
        letter: "C",
        text: "A qualitative commitment such as “the system will be fast and reliable,” which names no metric, threshold, or evaluation window.",
      },
      {
        letter: "D",
        text: "A target that names the metric and threshold but omits the evaluation window and breach consequence, leaving compliance periods and remediation triggers undefined.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "B is the only option that can actually be run as an SLA. It names a metric (p95 per-request latency), a threshold (800 ms), an evaluation window (28 days) and a consequence for breach, so compliance can be measured objectively and a breach can trigger a response. A depends on sentiment, which can't be measured objectively. C names no metric at all. D has a metric and threshold but no window or breach consequence, so nobody can say when the target was missed or what should happen next.",
      source_e:
        "Discussion:\nSelected Answer: B - An operational SLA must be objectively measurable and enforceable. Option B defines the metric, percentile, threshold, and observation window, allowing both parties to determine whether service performance complied with the agreement. A complete SLA also defines what follows a breach, such as escalation, remediation, service credits, capacity changes, or architectural review. Percentile latency is preferable to an average because it exposes degraded tail performance experienced by a meaningful portion of users. Anthropic provides usage, cost, and operational data that can support monitoring and alerting through the Usage and Cost API . Options A and C are subjective. Option D remains incomplete because neither assessment periods nor breach handling can be applied consistently. Study Guide references/topics: SLA construction; p95 latency; thresholds; evaluation windows; breach consequences; operational measurement.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 81,
    kind: "multi",
    text: "A Claude architect is designing a HIPAA-compliant pipeline that processes patient records. Which two design decisions directly support HIPAA compliance requirements? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Setting max_tokens to a low value to minimize the volume of text generated per request.",
      },
      {
        letter: "B",
        text: "Selecting the highest-capability Claude model to maximize diagnostic accuracy.",
      },
      {
        letter: "C",
        text: "Enforcing role-based access controls so that PHI is retrievable only by authorized personnel.",
      },
      {
        letter: "D",
        text: "Ensuring patient data is never included in training feedback loops sent to the model provider without a BAA in place.",
      },
      {
        letter: "E",
        text: "Using streaming responses to reduce perceived latency for clinical users.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CD", source_c: "CD", source_e: "CD" },
    explanations: {
      claude:
        "C supports compliance because HIPAA's Security Rule requires access controls, so PHI can be reached only by authorized people. D also does: PHI must not go to a vendor (for example, in feedback or training data) unless a Business Associate Agreement and proper safeguards are in place. A (max_tokens), B (model choice) and E (streaming) affect cost, accuracy or speed, not HIPAA's privacy or security requirements.",
      source_e:
        "Discussion:\nSelected Answer: C,D - Role-based access control directly supports HIPAA's access-control and minimum-necessary principles. The retrieval and orchestration layers must verify the authenticated user's role before protected health information enters the model context. Authorization should be applied to individual records, data sources, tools, and actions, with audit events recording the requesting identity, accessed resource, purpose, and result. Model instructions alone are not a security boundary. Patient information must also remain within services and processing activities covered by the organization's Business Associate Agreement. Anthropic states that PHI processing requires a HIPAA-ready organization and an accepted BAA, and that only specified eligible services and configurations are covered. Patient data must not be submitted through training, feedback, beta, third-party, or integration pathways that fall outside the applicable agreement. A BAA is not blanket authorization; architects must verify feature eligibility and disable inappropriate data-sharing mechanisms. Reducing max_tokens, selecting a more capable model, and enabling streaming affect output length, quality, or latency. They do not establish authorization, contractual coverage, minimum-necessary access, or compliant PHI handling. Study Guide references/topics: Anthropic Business Associate Agreement requirements ; HIPAA-ready services; PHI access control; minimum necessary; eligible-service boundaries; auditability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 82,
    kind: "multi",
    text: "You are designing a human-in-the-loop validation workflow for a new Claude-based deployment and must complete the design steps before piloting the workflow with a representative subset of traffic. Which two steps must be completed BEFORE piloting the workflow with a representative subset of traffic? \n\n(Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Define the sampling strategy and the escalation criteria at each oversight point in the pipeline.",
      },
      {
        letter: "B",
        text: "Iterate the workflow design based on observed pilot findings before broader rollout to production.",
      },
      {
        letter: "C",
        text: "Onboard the reviewer pool with role-specific training on the check criteria and escalation procedures.",
      },
      {
        letter: "D",
        text: "Document the workflow with check criteria, escalation paths, and service-level agreements (SLAs) for each step.",
      },
      {
        letter: "E",
        text: "Identify the decision points in the pipeline that require human oversight by impact and reversibility.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "AE", source_c: "AE" },
    explanations: {
      claude:
        "The design steps before a pilot are, first, identifying which decision points need human oversight based on impact and reversibility (E), then defining the sampling strategy and escalation criteria at each of those points (A). The pilot then tests that design. B depends on what the pilot finds, so it happens afterwards. Full documentation with SLAs (D) and formal reviewer onboarding (C) should use the design as revised by the pilot, so they come before broader rollout, not before the pilot.",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 83,
    kind: "multi",
    text: "You are compiling team-setup practices for a Claude Code rollout across an engineering organization. Which two practices belong on the list? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Use project scope for team-shared Model Context Protocol (MCP) servers and permission rules under version control.",
      },
      {
        letter: "B",
        text: "Apply managed configuration centrally for security-critical settings that must not be overridden by individual engineers.",
      },
      {
        letter: "C",
        text: "Use local scope for security-critical permission rules so each engineer can adapt them to ongoing work.",
      },
      {
        letter: "D",
        text: "Use user scope for team-shared MCP servers so every engineer on the team has consistent access.",
      },
      {
        letter: "E",
        text: "Use project scope for personal editor preferences so the preferences apply consistently within the project.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AB", source_c: "AB", source_e: "AB" },
    explanations: {
      claude:
        "A is correct. Project scope (.mcp.json and .claude/settings.json) is checked into version control, so every engineer gets the same MCP servers and permission rules, and changes go through review. B is correct. Managed settings sit at the top of the precedence order and can't be overridden by user, project or local settings, so they are the right place for security-critical controls. C is wrong because local scope is personal and gitignored, so security rules there would be inconsistent and easy to change. D is wrong because user scope is per-person and isn't shared. E is wrong because personal preferences belong in user or local scope, not in shared project config.",
      source_e:
        "Discussion:\nSelected Answer: A,B - Project scope is designed for repository-specific configuration shared through version control, including MCP server definitions, project permissions, hooks, and team instructions. This gives every contributor a consistent baseline while keeping changes reviewable. Managed configuration is appropriate for mandatory security and compliance controls because administrators can deploy it centrally and prevent lower scopes from overriding it. Local scope is machine-specific and unsuitable for organization-wide enforcement. User scope follows one engineer across projects, so it cannot guarantee that an entire team receives identical MCP definitions. Personal editor preferences belong in user or local configuration, not project scope, unless the team has explicitly standardized them. Anthropic's settings hierarchy distinguishes managed, project, local, and user responsibilities. Claude Code settings",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 84,
    kind: "single",
    text: "You are reviewing a customer-support agent's configuration. Each candidate tool falls into one of four categories: \n\n(1) required to complete defined tasks, \n\n(2) frequently used and reduces handoffs, \n\n(3) occasionally useful for unrelated work, \n\n(4) speculative future utility. \n\nWhich categories should typically remain in the agent configuration?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Only category 3, because occasionally useful tools for unrelated work provide broader coverage and should take priority over tools required for the agent's defined tasks.",
      },
      {
        letter: "B",
        text: "Only category 4, because speculative future-utility tools provide the most flexibility and should be configured even when no defined task currently requires them.",
      },
      {
        letter: "C",
        text: "Categories 1 and 2 only, because they map to defined tasks and the agent's regular hand-offs.",
      },
      {
        letter: "D",
        text: "All four categories, because broader tool access is categorically better for agent performance regardless of whether the tools map to defined tasks or regular hand-offs.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "The agent should keep tools that are needed for its defined tasks (category 1) and tools it uses often that cut down on handoffs (category 2). Giving an agent extra tools makes it harder for it to pick the right one, so tools for unrelated work (category 3) or possible future needs (category 4) should be left out. Option D is wrong because more tools do not automatically mean better performance. Options A and B are wrong because they drop the tools the agent actually needs to do its job.",
      source_e:
        "Discussion:\nSelected Answer: C - Category 1 tools are necessary for the agent to complete its approved responsibilities and must remain. Category 2 tools are also justified when they are regularly used and eliminate predictable hand-offs without expanding the agent beyond its defined operating role. Categories 3 and 4 create capability bloat. A tool that is occasionally useful only for unrelated work does not belong to this agent's responsibility boundary. A speculative tool has no validated requirement and adds attack surface, context consumption, authorization complexity, evaluation burden, and operational dependencies without demonstrated value. Tool inclusion should be based on task traceability: every configured capability should map to a documented user journey, responsibility, permission scope, and evaluation case. Anthropic recommends least privilege so that a successful injection or model error can cause minimal damage. Mitigate Jailbreaks and Prompt Injections The architect should periodically review tool-call telemetry and remove unused capabilities. New tools can be added when a validated workflow requires them, after security review and evaluation. The objective is not the smallest possible catalog regardless of usefulness; it is the smallest catalog that reliably completes the agent's approved tasks. Study Guide references/topics: Capability-bloat analysis; tool necessity; hand-off reduction; least privilege; attack-surface management; tool lifecycle review.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 85,
    kind: "single",
    text: "You are documenting an architectural decision to support future audit and onboarding. Which artifact is the strongest fit?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "A slide deck in a presentation folder with no accompanying written rationale.",
      },
      {
        letter: "B",
        text: "A code comment in a single file that contains an opinion of one engineer.",
      },
      {
        letter: "C",
        text: "An Architecture Decision Record that states the context, the decision, the alternatives considered, the consequences, and the date and authors.",
      },
      {
        letter: "D",
        text: "A short verbal note shared during a hallway conversation with no written record.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "C", source_c: "C" },
    explanations: {
      claude:
        "An Architecture Decision Record (ADR) is a lasting written record of the decision. It captures the context, the decision itself, the alternatives considered, the consequences, the date and the authors, which is what audits and onboarding need. A slide deck with no written rationale doesn't explain why the decision was made. A code comment holds one engineer's opinion in one place, so it is hard to find and isn't a reviewed record. A hallway conversation leaves no record at all, so it can't support an audit.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 86,
    kind: "single",
    text: "During an architectural review, the security team identifies a risk that adversarial content injected into retrieved documents could manipulate the model's behavior. Which mitigation most directly addresses this threat?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Treat all retrieved content as untrusted input and apply input classifiers with output validation.",
      },
      {
        letter: "B",
        text: "Require citations for each claim and constrain responses to source-supported content.",
      },
      {
        letter: "C",
        text: "Restrict outbound tool calls to an approved destination allow-list.",
      },
      {
        letter: "D",
        text: "Score outputs against a stable adversarial evaluation set on each model-version change.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "A", source_c: "A" },
    explanations: {
      claude:
        "The threat here is indirect prompt injection through retrieved documents. The most direct fix is to treat everything retrieved as untrusted data rather than as instructions, screen it with input classifiers, and check outputs before they're used. That covers both the way the attack gets in and its effect. B (citations and grounding) helps with hallucination, but it won't stop injected instructions from steering the model. C (an allow-list for outbound calls) only limits one possible effect, data exfiltration, and doesn't stop the manipulation itself. D (adversarial evals when the model version changes) tests for regressions but doesn't protect anything while the system is running.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 87,
    kind: "single",
    text: "You are evaluating an evaluation set used to score a Claude-based hiring-support tool. The set is drawn from one geographic region and one tenure band. Which response is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Discard all quantitative evaluation and replace it with qualitative impressions collected from a small, convenience-selected group that may not represent the tool's full user population.",
      },
      {
        letter: "B",
        text: "Expand the evaluation set to cover the geographic regions and tenure bands the tool will serve, and rescore the system on the expanded set before broader release.",
      },
      {
        letter: "C",
        text: "Reduce the evaluation set further to a single demographic subgroup to simplify score interpretation, narrowing coverage rather than expanding it to match the intended user population.",
      },
      {
        letter: "D",
        text: "Continue using the narrow evaluation set drawn from one region and one tenure band because the existing benchmark scores are already high on that subset.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "The evaluation set only covers one region and one tenure band, so its scores tell you nothing about how the tool performs for everyone else it will be used on. That matters a lot for a hiring tool, where uneven performance across groups is a fairness risk. B fixes this by expanding the set to match the population the tool will serve and rescoring before wider release. A drops measurable evaluation in favor of opinions from an unrepresentative group. C makes the coverage gap worse. D treats high scores on a narrow subset as if they applied everywhere.",
      source_e:
        "Discussion:\nSelected Answer: C - An evaluation set must represent the populations, operating conditions, and use cases that the deployed system will encounter. A dataset drawn from only one geographic region and one tenure band cannot reliably demonstrate that the hiring-support tool performs consistently across its intended users. Expanding the evaluation set enables architects to identify regional performance differences, tenure-related errors, unsupported generalizations, and potentially discriminatory outcomes before broader deployment. The system should then be rescored using the expanded dataset, with results examined across relevant population slices rather than relying only on an aggregate score. Options A and B preserve or worsen the representation gap. Option D is also inappropriate because qualitative feedback can supplement structured evaluation but cannot replace measurable, repeatable testing of accuracy, fairness, and reliability across the intended deployment population.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 88,
    kind: "single",
    text: "You must present an architectural recommendation to deploy a Claude-based contract review assistant to a steering committee that includes the CFO, the general counsel, and the CIO. Each stakeholder cares about different aspects of the decision. How should you structure the recommendation document?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Lead with the technical architecture diagram and the full component list before any other section.",
      },
      {
        letter: "B",
        text: "Lead with detailed cost projections across the full multi-year horizon before the rationale section.",
      },
      {
        letter: "C",
        text: "Present the same dense narrative throughout with no stakeholder differentiation in any section.",
      },
      {
        letter: "D",
        text: "Lead with the architectural decision, then address each stakeholder's primary concerns directly.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "For a mixed executive audience, the best structure puts the decision first, the way a BLUF (bottom line up front) memo does. After that, give each stakeholder a section that answers what they care about most: cost and ROI for the CFO, legal risk, privilege and data handling for the general counsel, and integration, security and operations for the CIO. Option A puts a technical diagram first, which mainly helps the CIO and loses the CFO and general counsel. Option B puts cost first, which mainly helps the CFO and buries the decision. Option C uses the same dense text for everyone and doesn't address anyone's specific concerns.",
      source_e:
        "Discussion:\nSelected Answer: D - A steering committee needs an answer-first recommendation that states the proposed architectural decision, the business outcome it supports, and the approval or action required. After establishing that common decision frame, the document should address each stakeholder's concerns separately. The CFO requires implementation and operating costs, expected savings, consumption assumptions, financial exposure, and cost-control mechanisms. General counsel needs evidence concerning confidentiality, privilege, data handling, human legal review, explainability, retention, and regulatory risk. The CIO needs integration architecture, security boundaries, availability, scalability, operational ownership, technical dependencies, and lifecycle support. Option A begins at an implementation depth unsuitable for the entire committee. Option B overweights the CFO's concerns and delays the rationale required by the other decision-makers. Option C ignores audience- specific responsibilities and forces every stakeholder to extract relevant information from an undifferentiated narrative. The recommended structure is: decision and executive rationale, expected outcomes, accepted trade-offs, stakeholder-specific impact sections, major risks and controls, implementation implications, success metrics, and the requested governance decision. Technical appendices can preserve component-level detail without overwhelming the principal recommendation. Study Guide references/topics: Executive communication; stakeholder differentiation; decision-first structure; financial, legal, and technology concerns; architectural recommendations.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 89,
    kind: "multi",
    text: "You are compiling a diagnostic toolkit for Claude Code operational issues. Which two diagnostic actions belong in the toolkit? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Increase the model sampling temperature so that intermittent issues surface more frequently for analysis.",
      },
      {
        letter: "B",
        text: "File a support ticket with vendor support before any local reproduction or evidence collection.",
      },
      {
        letter: "C",
        text: "Reproduce the issue with a minimal reproduction case that isolates one variable at a time.",
      },
      {
        letter: "D",
        text: "Roll back to the previous Claude Code version immediately to confirm whether the issue is version specific.",
      },
      {
        letter: "E",
        text: "List the configured Model Context Protocol (MCP) servers and inspect server status to identify connection failures.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "CE", source_c: "CE", source_e: "CE" },
    explanations: {
      claude:
        "C (a minimal reproduction that changes one variable at a time) and E (running `claude mcp list` or `/mcp` to check server status and spot connection failures) are both evidence-based diagnostic steps. A is wrong because raising temperature just adds randomness and can hide the real cause. B skips local evidence collection, so support gets a ticket they can't act on. D jumps straight to a fix before any evidence shows the problem depends on the version.",
      source_e:
        "Discussion:\nSelected Answer: C,E - A minimal reproduction and MCP status inspection are foundational diagnostic actions because they produce direct, interpretable evidence. A minimal reproduction removes unrelated prompts, tools, settings, hooks, and repository state while changing one variable at a time. This determines whether the failure follows a particular configuration, server, command, model request, or project artifact. It also creates a reproducible evidence package if escalation later becomes necessary. MCP inspection addresses a common Claude Code failure domain. `claude mcp list` displays configured servers and their health states, including connected, authentication-required, pending-approval, and failed-to- connect conditions. `claude mcp get < name > ` provides server-specific details, while `/mcp` exposes status within an interactive session. These checks distinguish model behavior from transport, authentication, configuration, and workspace-trust failures. Increasing temperature reduces repeatability and introduces additional variation, making root-cause isolation more difficult. Filing a support ticket before collecting local evidence reverses the appropriate diagnostic sequence. An immediate rollback may eventually be used as a controlled version comparison, but it changes the environment before a baseline has been captured and is therefore not a primary toolkit action. Study Guide references/topics: [Managing and diagnosing MCP servers](https://docs.anthropic.com/en/docs /claude-code/mcp); minimal reproducible cases; controlled-variable troubleshooting; authentication and connection-state diagnostics.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 90,
    kind: "single",
    text: "A Claude Architect is reviewing a post-deployment performance report for an AI-assisted legal-document summarization system. The report includes these observations:\n\nAverage summarization time decreased from 47 minutes to 6 minutes per document.\n\nAssociates spend less time on summaries, but overall billable output has not measurably changed.\n\nInfrastructure costs increased by 22% because redundant retry logic generated additional API calls.\n\nSome summaries require attorney correction, adding an average of 8 minutes of review per document.\n\nWhich analysis correctly attributes each observation to the appropriate business-value pillar?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Observations 1 and 2 both indicate efficiency gains; Observation 3 is a solution-cost issue; Observation 4 is a performance-SLA issue.",
      },
      {
        letter: "B",
        text: "Observation 1 is a transformation outcome; Observation 2 is an efficiency gain; Observation 3 is a performance-SLA degradation; Observation 4 is a solution-cost issue.",
      },
      {
        letter: "C",
        text: "Observations 1 and 4 together indicate a net performance-SLA improvement; Observation 2 is a transformation gap; Observation 3 is a productivity drain from over-engineering.",
      },
      {
        letter: "D",
        text: "Observation 1 indicates an efficiency gain; Observation 2 shows that productivity has not yet been realized; Observation 3 is a solution-cost issue; Observation 4 is an efficiency loss that partially offsets Observation 1.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "D", source_c: "D" },
    explanations: {
      claude:
        "Cutting summarization time from 47 to 6 minutes is an efficiency gain. Associates spending less time with no change in billable output means the freed time hasn't become more output, so productivity isn't realized yet. Extra API calls from redundant retries raise infrastructure spend, which is a solution-cost issue. The 8 minutes of attorney correction is an efficiency loss that partly offsets the time saved. A calls Observation 2 an efficiency gain, B mislabels the cost and correction items, and C treats the retry costs as a productivity drain instead of a cost issue.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 91,
    kind: "single",
    text: "You are supporting an engineer whose newly added MCP server does not appear in their Claude Code session. Which diagnostic step should be tried first?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Disable every MCP server in the configuration to isolate the issue, removing all tool access rather than confirming whether the new server is registered.",
      },
      {
        letter: "B",
        text: "Switch the team to a different Claude product family unrelated to the existing workflow, abandoning the current configuration rather than diagnosing the registration issue.",
      },
      {
        letter: "C",
        text: "Verify the MCP server is registered using the listing command, then reconnect the session if needed, since configuration changes typically require a restart to take effect.",
      },
      {
        letter: "D",
        text: "Reinstall the developer's operating system from scratch, discarding all local configuration and tool state before attempting any targeted diagnostic steps.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "Start with the least disruptive check. Run `claude mcp list` (or `/mcp` inside a session) to confirm the server is registered in the expected scope and to see its connection status. Then restart or reconnect the session, because Claude Code loads MCP config when a session starts. Option A disables all your other tools without checking whether the new server is registered. Options B and D throw away the setup instead of finding the cause.",
      source_e:
        "Discussion:\nSelected Answer: C - The first diagnostic action must establish whether Claude Code has loaded the MCP server configuration and whether it can connect to the registered endpoint. The official management command is claude mcp list; within Claude Code, /mcp can also be used to inspect server status. The listing distinguishes registered and connected servers from configurations that require authentication, approval, or connection troubleshooting. Connect Claude Code to Tools via MCP If the server was added or its configuration changed after the current session began, reconnecting or restarting the relevant Claude Code session is a proportionate next step. This ensures that configuration state and available tool definitions are refreshed before more intrusive troubleshooting begins. If the server is listed but unhealthy, the engineer can then inspect it with claude mcp get < name > and investigate transport, command path, credentials, workspace approval, or endpoint connectivity. Options A, B, and D are operationally unsound because they discard working capabilities or environments before confirming the basic registration state. Disabling all MCP servers eliminates useful diagnostic comparisons; changing product families abandons the relevant configuration; reinstalling the operating system is grossly disproportionate and risks destroying evidence needed for diagnosis. Study Guide references/topics: Claude Code environment configuration; MCP registration; server-status inspection; session refresh; targeted operational troubleshooting.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 92,
    kind: "single",
    text: "You are a solution architect designing a Claude-based assistant with access to 60 internal tools across multiple business domains. Loading every tool definition on every request increases token usage and time to first response. Which design pattern best addresses this issue without sacrificing capability breadth?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Apply progressive tool discovery so a curated initial subset is exposed and additional tools are loaded on demand based on the task.",
      },
      {
        letter: "B",
        text: "Use a separate model call to summarize all 60 tool definitions before each user turn.",
      },
      {
        letter: "C",
        text: "Increase the maximum context length and load all 60 tool definitions on every request, accepting the higher token cost and latency as necessary for full capability.",
      },
      {
        letter: "D",
        text: "Hard-code a fixed set of five tools per request to reduce token usage, regardless of whether those tools are relevant to the current task.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "Progressive tool discovery means starting with a small, curated set of tools and loading the rest on demand, for example through a tool search or tool-loading mechanism. This cuts tokens and time to first response without losing access to any of the 60 tools. B adds an extra model call on every turn and loses detail from the tool schemas. C ignores the problem: it keeps paying the cost and latency, and too many tools can also make tool selection worse. D reduces tokens but loses capability, because it gives the model tools that may not fit the task.",
      source_e:
        "Discussion:\nSelected Answer: B (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 93,
    kind: "multi",
    text: "The compliance team at a firm has approved a Claude Skill that generates client-facing investment summaries. The Skill includes the firm’s required disclaimers and prohibited-language list. A product manager has asked whether additional guardrails are needed at the application layer or whether the Skill alone is sufficient.\n\nWhich two guardrail responsibilities should remain at the application layer rather than the Skill? (Select two.) \n\nEach correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Log every generated summary to the firm's compliance audit trail for retention.",
      },
      {
        letter: "B",
        text: "Verify the requesting user is authorized to generate investment summaries at all.",
      },
      {
        letter: "C",
        text: "Format output sections according to the firm's standardized house style guidelines.",
      },
      {
        letter: "D",
        text: "Apply the disclaimer template that the compliance team has standardized firm-wide.",
      },
      {
        letter: "E",
        text: "Apply the prohibited-language list that the compliance team maintains and updates.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AB", source_c: "AB", source_e: "AB" },
    explanations: {
      claude:
        "Authorization (B) and compliance audit logging (A) are deterministic controls that must be enforced by the application no matter how the model behaves. Authorization has to happen before Claude or the Skill is invoked, and audit retention must reliably capture every output, which a prompt-driven Skill can't guarantee. House style (C), disclaimers (D) and the prohibited-language list (E) are content-generation guidance, which is what the Skill packages.",
      source_e:
        "Discussion:\nSelected Answer: A,B - Authorization and compliance logging must remain enforceable application-layer controls. Option B requires the application to authenticate the requester, resolve the user's role and entitlements, and deny the operation when the user lacks authority. A Skill can instruct Claude how to behave, but it is not a reliable security boundary and cannot replace identity-based access control enforced by the surrounding system. Option A similarly belongs at the application layer. The application must create an authoritative audit event containing the requester, timestamp, Skill and model version, relevant input or content identifiers, generated output, review status, and retention classification. Audit evidence cannot depend on whether the model remembers or chooses to invoke a logging instruction. Options C, D, and E describe reusable generation behavior that appropriately belongs within the approved Skill: house style, the standardized disclaimer, and the prohibited-language policy. The application may still validate their presence after generation, but the Skill remains the primary reusable content package. The correct architecture separates behavioral guidance from deterministic enforcement. Skills supply domain instructions and templates; the application enforces identity, authorization, audit retention, data access, output validation, and consequential-action controls. Study Guide references/topics: Skills versus application controls; authentication; authorization; compliance logging; deterministic guardrails; policy enforcement boundaries.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 94,
    kind: "single",
    text: "You are supporting an EU-based deployment with GDPR obligations. Which combination of measures best supports the deployment's GDPR posture?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Enterprise-tier deployment with a signed Data Processing Addendum, defined data-retention configuration, redaction of personal data not needed for the task, and documented data-subject rights handling.",
      },
      {
        letter: "B",
        text: "Disabling all data-retention configuration, redaction controls, and data-subject-rights handling to simplify the deployment.",
      },
      {
        letter: "C",
        text: "Using a personal Claude account tier for processing EU personal data at scale, with no signed Data Processing Addendum and no documented data-subject-rights handling procedure.",
      },
      {
        letter: "D",
        text: "Pasting full EU personal data into every prompt to “give Claude complete context” without considering purpose limitation, data minimization, or the organization's Data Processing Addendum obligations.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "A", source_c: "A" },
    explanations: {
      claude:
        "Option A brings together the controls GDPR expects. An enterprise tier with a signed Data Processing Addendum sets up the processor relationship (Art. 28). Defined data retention supports storage limitation, redacting personal data the task doesn't need supports data minimization, and a documented process for data-subject rights covers requests to access or delete data. Option B removes those controls. Option C uses a personal account tier with no DPA and no rights process. Option D breaks purpose limitation and data minimization.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 95,
    kind: "multi",
    text: "You are reviewing instrumentation in a multi-agent system. Which two findings constitute valid observability gaps in the instrumentation? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Trace spans for each agent step are exported to the shared distributed-tracing backend.",
      },
      {
        letter: "B",
        text: "Latency and token usage on every span are emitted to the central metrics pipeline.",
      },
      {
        letter: "C",
        text: "Tool-call payloads and outcomes are recorded with redaction applied to known sensitive fields.",
      },
      {
        letter: "D",
        text: "Model identity and version on each turn are not recorded with the turn artifacts.",
      },
      {
        letter: "E",
        text: "Request-scoped correlation identifiers do not propagate across agent and tool calls.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "DE", source_c: "DE" },
    explanations: {
      claude:
        "D is a gap: if the model identity and version aren't recorded with each turn, you can't tell whether a change in behavior came from a model update, and you can't reproduce or compare runs. E is a gap: if correlation IDs aren't passed along through agent and tool calls, you can't link the spans from one request into a full trace across the multi-agent system. A, B and C describe good practices that are already in place: spans are exported centrally, latency and token metrics are emitted, and tool payloads are logged with redaction. None of them is a gap.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 96,
    kind: "single",
    text: "When communicating an architectural decision to a security and compliance reviewer, which content set is most aligned with that audience's primary concerns?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Feature delivery schedule, roadmap dependencies, and scope boundaries for the product manager.",
      },
      {
        letter: "B",
        text: "Implementation timeline, component interfaces, and deployment sequence for the engineering team.",
      },
      {
        letter: "C",
        text: "Threat model, control mappings, residual-risk acceptance criteria, and audit traceability.",
      },
      {
        letter: "D",
        text: "Decision rationale, business outcomes, and high-level risk summary for executive review.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "A security and compliance reviewer mainly needs to know which threats were considered, how controls map to the required frameworks or policies, what residual risk is left and who accepts it, and whether the decision can be traced for audit. Option C covers all of these. Option A is written for a product manager, B for engineers who will build it, and D for executives who want business outcomes and a high-level risk summary. None of those three give the control-level detail a compliance review needs.",
      source_e:
        "Discussion:\nSelected Answer: C - Security and compliance reviewers must determine whether material threats have been identified, whether required controls address those threats, how remaining exposure will be accepted, and whether the decision can be demonstrated during an audit. Option C supplies exactly that evidence. The threat model establishes protected assets, trust boundaries, adversaries, attack paths, and likely failure modes. Control mappings connect technical and procedural safeguards to organizational policies, regulatory requirements, and assurance frameworks. Residual-risk acceptance criteria define which risks may remain after mitigation, who has authority to accept them, and when further treatment is mandatory. Audit traceability connects requirements and decisions to implementation evidence, evaluations, approvals, logs, and operational monitoring. Option A is designed primarily for product management. Option B addresses engineering planning and execution. Option D is appropriate for an executive sponsor who requires business justification and a concise risk summary but normally does not perform detailed control verification. Audience adaptation should not alter the architectural decision itself. It changes the depth, terminology, evidence, and ordering used to communicate the decision. Security and compliance reviewers require verifiable control evidence rather than only schedule, implementation, or business-level summaries. Study Guide references/topics: Audience-specific communication; threat modeling; compliance control mapping; residual-risk acceptance; audit evidence; architectural decision traceability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 97,
    kind: "single",
    text: "You are defining when to introduce a project subagent versus relying on Claude Code's general capabilities. Which scenario most directly justifies a dedicated subagent?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The team has a recurring specialized task, such as database schema review, that requires a focused system prompt, narrow tool permissions, and a specific model selection across many sessions.",
      },
      {
        letter: "B",
        text: "The team has a one-time ad hoc question that will not recur and does not require a focused system prompt, narrow tool permissions, or dedicated model selection.",
      },
      {
        letter: "C",
        text: "The team has no recurring specialized tasks and uses Claude Code only for isolated general-purpose work that does not justify a dedicated system prompt or tool scope.",
      },
      {
        letter: "D",
        text: "The team wants every Claude Code interaction to use the same generic system prompt with no task-specific specialization, narrow tool permissions, or dedicated model selection.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "A", source_c: "A", source_e: "A" },
    explanations: {
      claude:
        "A project subagent (.claude/agents/*.md) is worth it for a recurring, specialized task. It packages a focused system prompt, a limited tool allowlist and a chosen model so they can be reused across many sessions, and database schema review is a good example. B is a one-time question, so a subagent adds overhead for no benefit. C has no recurring specialized work to package. D explicitly rejects specialization, so no subagent is needed.",
      source_e:
        "Discussion:\nSelected Answer: A - A dedicated subagent is justified when specialization is recurring and operationally valuable. Option A allows the team to encode a database-review role once, including its system prompt, triggering description, permitted tools, model, and review criteria. This improves consistency across sessions, isolates specialized context, and applies least privilege by withholding unrelated capabilities. Anthropic's custom subagent documentation supports task-specific prompts, model selection, tool allowlists, permission modes, hooks, skills, and persistent memory. A one-time question does not justify the maintenance overhead of a reusable agent definition, while Options C and D explicitly provide no specialization requirement. The subagent should also have clear invocation conditions, evaluation cases, ownership, and lifecycle review. Study Guide references/topics: Claude Code subagents; task specialization; context isolation; model routing; scoped permissions; reusable automation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 98,
    kind: "single",
    text: "You are identifying signals that a deployment should re-enter design rather than continue iterating in place. Which signal most directly indicates the need for a new design cycle?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "A minor copy edit is requested in a customer-facing string within the existing UI, which can be handled as a localized content change without altering component responsibilities or contracts.",
      },
      {
        letter: "B",
        text: "A dashboard alert threshold needs a small numerical adjustment to reduce false-positive noise, which can be handled as an operational configuration change without a new design cycle.",
      },
      {
        letter: "C",
        text: "A runbook step requires a clarification edit to improve on-call guidance accuracy, which can be handled as a documentation update without changes to component responsibilities or core contracts.",
      },
      {
        letter: "D",
        text: "The system's current architecture cannot meet the new requirements without changes to component responsibilities or core contracts.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "A new design cycle is needed when the current architecture can't meet the new requirements unless component responsibilities or core contracts change. Small tweaks inside the existing design won't fix that. Options A (a copy edit), B (adjusting an alert threshold) and C (clarifying a runbook step) are all small changes to content, settings or documentation. None of them touches responsibilities or contracts, so you can keep iterating in place.",
      source_e:
        "Discussion:\nSelected Answer: D - A new design cycle is warranted when the required change crosses an architectural boundary. Option D explicitly states that the existing architecture cannot satisfy the new requirements without redistributing component responsibilities or altering core contracts. Such changes may affect service ownership, orchestration, data flows, integration interfaces, security boundaries, failure handling, evaluation strategy, and operational accountability. They therefore require renewed discovery, impact analysis, design review, stakeholder approval, and regression planning. Options A, B, and C are localized maintenance activities. Clarifying a runbook improves operational documentation but does not change the deployed system's structure. Adjusting an alert threshold is a controlled operational tuning activity, provided the change remains within established monitoring policy. Editing customer-facing copy is similarly confined to the presentation or content layer. None of these changes inherently invalidates component contracts or architectural assumptions. An architect should distinguish between iteration within an approved design and evidence that the design itself no longer supports the required outcome. Re-entering design for every minor adjustment creates unnecessary governance overhead; continuing local iteration after architectural assumptions have failed creates unmanaged technical and operational risk. Option D is the only signal that establishes a structural incompatibility. Study Guide references/topics: Lifecycle feedback loops; design re-entry criteria; architectural significance; component responsibilities; interface contracts; controlled operational iteration.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 99,
    kind: "multi",
    text: "You are rolling out monitoring for a Claude-based deployment and must complete the specification steps before instrumenting the deployment. Which two steps must be completed BEFORE instrumenting the deployment to emit metrics and traces? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Define the metrics and the slices the deployment will monitor across normal and adversarial traffic.",
      },
      {
        letter: "B",
        text: "Tune the alert thresholds based on observed normal-state distributions to reduce false positives.",
      },
      {
        letter: "C",
        text: "Define the service-level objectives (SLOs) and the error budgets the deployment will be held to.",
      },
      {
        letter: "D",
        text: "Build the dashboards that surface metrics across slices at the cadence the team operates on.",
      },
      {
        letter: "E",
        text: "Document the dashboards, alerts, and runbooks for the on-call rotation that will respond.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AC", source_c: "AC", source_e: "AC" },
    explanations: {
      claude:
        "Before instrumenting, you must specify what you'll measure. That means defining the metrics and slices across normal and adversarial traffic (A) and the SLOs and error budgets those metrics are judged against (C). Tuning thresholds (B) needs observed normal-state data, which only exists after instrumentation. Dashboards (D) need metrics being emitted. Documenting dashboards, alerts and runbooks (E) is a later operational step.",
      source_e:
        "Discussion:\nSelected Answer: A,C - Instrumentation must be driven by an explicit measurement specification. The team must first define the metrics and evaluation slices required to detect performance, cost, quality, safety, or reliability failures. Slices should include representative traffic, adversarial inputs, user segments, tools, and relevant content categories. SLOs and error budgets must also be established before instrumentation because they determine required measurements, aggregation windows, and acceptable failure levels. Alert thresholds cannot be tuned until normal-state data has been collected. Dashboards and on-call documentation depend on the final metric definitions and observed operational behavior. Anthropic supports metrics, event, and trace export through OpenTelemetry, but telemetry is useful only when tied to measurable success and operating objectives. Claude Code monitoring",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 100,
    kind: "multi",
    text: "You are integrating Claude Code into a team workflow and must complete the design and configuration steps before piloting the integrated workflow with a small group. Which two steps must be completed BEFORE piloting the integrated workflow? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Document the integrated workflow with handoff criteria, permission boundaries, and on-call runbooks.",
      },
      {
        letter: "B",
        text: "Identify the workflow steps where AI-assisted tooling adds value and where human authority must remain.",
      },
      {
        letter: "C",
        text: "Negotiate the workflow change with affected teams and obtain formal sign-off from each manager.",
      },
      {
        letter: "D",
        text: "Iterate the integrated workflow based on pilot findings before broader rollout to the team.",
      },
      {
        letter: "E",
        text: "Configure the project-scope MCP servers, permissions, subagents, and persistent project context.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "BE", source_c: "BE" },
    explanations: {
      claude:
        "The question asks for the design and configuration steps. B is the design step: decide where AI-assisted tooling adds value and where people must keep authority. E is the configuration step: set up project-scope MCP servers, permissions, subagents and persistent project context so the pilot is consistent. D comes after the pilot because it uses pilot findings. A's full runbooks should be written once the workflow is settled after the pilot. C's formal sign-off from every manager is unnecessary for a small pilot.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 101,
    kind: "single",
    text: "You are preparing a HIPAA-eligible deployment for a healthcare customer. Which configuration supports HIPAA compliance using Anthropic-offered tools?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Claude Free with no contractual addendum, since consumer products meet HIPAA requirements out of the box.",
      },
      {
        letter: "B",
        text: "Claude Enterprise with a signed Business Associate Agreement, Zero Data Retention enabled, and audit logging configured for compliance tracking.",
      },
      {
        letter: "C",
        text: "Disabling all audit logging so that no PHI is recorded in any log store, on the assumption that the absence of logs satisfies HIPAA requirements without a signed BAA.",
      },
      {
        letter: "D",
        text: "An ad-hoc personal Claude account used by individual clinicians for PHI-related tasks, with no Business Associate Agreement, no Zero Data Retention, and no audit logging configured.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "To be HIPAA-eligible, the customer needs a signed Business Associate Agreement on an eligible commercial or enterprise offering. Zero Data Retention and audit logging add safeguards on top of that. A and D are wrong because consumer or personal accounts have no BAA, so using them for PHI is not compliant. C is wrong because turning off logs does not replace a BAA, and HIPAA actually expects audit controls to be in place.",
      source_e:
        "Discussion:\nSelected Answer: B - Option B is the only configuration establishing the contractual, data-handling, and audit foundations needed for a HIPAA-eligible deployment. Anthropic requires an eligible commercial organization to activate the HIPAA-ready configuration and accept a Business Associate Agreement. A standard Enterprise subscription is not automatically covered merely because it is an enterprise product. Anthropic BAA Guidance Zero Data Retention may be required for particular covered services, including eligible Claude Code configurations, and is enabled per organization for qualified accounts. Audit logging supports access review, configuration monitoring, incident investigation, and compliance evidence. Anthropic provides audit logs for Enterprise organizations. Claude Code Legal and Compliance , Access Audit Logs Options A and D use consumer or personal accounts without the required contractual framework. Option C incorrectly treats the elimination of audit evidence as a substitute for a BAA and compliant configuration. The signed BAA remains the authoritative source for covered products and features. The customer must also configure access control, minimum-necessary data use, workforce policies, retention, integrations, incident response, and vendor-risk controls. The configuration supports compliance; it does not independently guarantee it. Study Guide references/topics: HIPAA readiness; BAA; ZDR; PHI handling; audit logging; eligible services; shared compliance responsibility.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 102,
    kind: "multi",
    text: "You are listing characteristics of strong architectural-decision communication. Which two characteristics belong on the list? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Ownership and review cadence for revisiting the decision when conditions or assumptions change.",
      },
      {
        letter: "B",
        text: "Distribution to a standing review forum with mandatory attendance from senior engineering leaders.",
      },
      {
        letter: "C",
        text: "Omission of rejected alternatives to keep the decision document focused and concise for readers.",
      },
      {
        letter: "D",
        text: "Alternatives considered along with the criteria that were used to evaluate each alternative.",
      },
      {
        letter: "E",
        text: "Use of a consistent template across the team to standardize the visual presentation of decisions.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "AD", source_c: "AD" },
    explanations: {
      claude:
        "The two that belong are A and D. A strong decision record lists the alternatives that were considered and the criteria used to judge each one (D), so readers can see why the choice was made. It also names an owner and sets a review schedule (A), so the decision gets revisited when conditions or assumptions change. C is the opposite of good practice, because dropping rejected alternatives hides the reasoning. B is about meetings and attendance rather than the content of the communication, and E only standardizes how decisions look, without improving the reasoning they convey.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 103,
    kind: "single",
    text: "You are integrating Claude Code into a workflow that runs against a production database. Which guardrail design most directly preserves safety on data-modifying operations?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Allow Claude Code to write directly to the production database without subagent scoping, read-only credential defaults, or human confirmation gates on data-modifying operations.",
      },
      {
        letter: "B",
        text: "Configure the database MCP server with a fully privileged credential that can perform any read or write operation, and allow all operations to proceed without explicit human confirmation.",
      },
      {
        letter: "C",
        text: "Disable all logging and auditing on database operations through the MCP server to reduce alert noise, removing the observability needed to detect unintended data modifications.",
      },
      {
        letter: "D",
        text: "Configure the database MCP server with a read-only credential by default, restrict the subagent's tool list to read-only operations, and require explicit human confirmation on any operation that would modify data.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "D", source_c: "D", source_e: "D" },
    explanations: {
      claude:
        "D layers defense in depth. A read-only credential limits what can go wrong at the database itself. Restricting the subagent to read-only tools limits what Claude can even try. A human confirmation gate catches any change to data before it runs. A and B remove these controls and allow unrestricted writes. C removes the logging and auditing needed to spot unintended changes.",
      source_e:
        "Discussion:\nSelected Answer: D - Option D applies three complementary controls. First, a read-only database credential creates an authorization boundary outside the model; prompt instructions alone cannot convert that credential into write access. Second, restricting the subagent's tool list reduces capability exposure by preventing the agent from selecting unrelated or unnecessarily privileged operations. Third, explicit human confirmation creates a deliberate approval gate before any exceptional data-changing action is executed. This is defense in depth. If Claude misinterprets a request or processes malicious instructions from untrusted content, the restricted credential and tool configuration limit the available action surface. Human review then protects operations with potentially irreversible production consequences. Logging and audit trails should remain enabled to record the actor, request, tool call, approval, affected records, and outcome. Anthropic documents that Claude Code begins with read-only permissions in Manual mode and requests approval for actions that modify the environment. Its permission system also supports granular allow, ask, and deny controls for MCP tools and subagents. Claude Code Security , Configure Permissions Options A and B eliminate least privilege and approval boundaries. Option C removes essential detection and forensic evidence. Study Guide references/topics: Production database safety; least privilege; read-only defaults; MCP permissions; subagent scoping; human confirmation; auditability.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 104,
    kind: "multi",
    text: "You are building an evaluation pipeline for a Claude-based deployment and must complete the specification steps before running the deployment against the dataset. Which two steps must be completed BEFORE running the deployment against the evaluation dataset? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Publish the aggregated metrics to a dashboard and gate releases on threshold checks.",
      },
      {
        letter: "B",
        text: "Curate and label the evaluation dataset to match the defined slices.",
      },
      {
        letter: "C",
        text: "Review failure cases with subject matter experts to refine the scoring rubric.",
      },
      {
        letter: "D",
        text: "Define the metrics and slices the framework will report across representative, edge, and adversarial cases.",
      },
      {
        letter: "E",
        text: "Score the deployment outputs against the reference labels and compute aggregate metrics.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BD", source_c: "BD", source_e: "BD" },
    explanations: {
      claude:
        "The specification work has to come before the run. First you define the metrics and the slices (representative, edge and adversarial cases) (D). Then you curate and label a dataset that matches those slices (B). Scoring outputs (E), reviewing failures with subject matter experts (C), and publishing metrics or gating releases (A) all depend on deployment outputs, so they can only happen after the run.",
      source_e:
        "Discussion:\nSelected Answer: B,D - The evaluation specification must exist before inference begins. Option D defines what the evaluation will measure and how results will be segmented. Representative cases measure normal workload performance, edge cases test boundary behavior, and adversarial cases examine safety, security, or robustness under hostile inputs. Option B then supplies the correctly curated and labeled dataset corresponding to those slices. Labels, expected outcomes, grading rubrics, provenance, and dataset versions must be established before the deployment generates outputs. Otherwise, evaluators risk modifying criteria after seeing results and introducing confirmation bias. Anthropic defines an evaluation as an input combined with grading logic used to measure success. Its evaluation guidance distinguishes tasks, trials, graders, traces, outcomes, and the harness that runs and aggregates them. Demystifying Evals for AI Agents Option E occurs after model execution because outputs must exist before they can be scored. Option A follows scoring and aggregation. Option C is an iterative improvement step performed after failure cases become available, although rubric calibration may also be conducted on separate development data. Study Guide references/topics: Evaluation specification; metrics and slices; representative and adversarial datasets; labeling; scoring; aggregation; release gates.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 105,
    kind: "multi",
    text: "You are rolling out a standardized Claude Code configuration to an engineering team and must complete the planning steps before piloting the configuration. \n\nWhich two steps must be completed BEFORE piloting the configuration with a small group of engineers? \n\n(Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Define the project-scope baseline covering Model Context Protocol (MCP) servers, permission rules, and subagents.",
      },
      {
        letter: "B",
        text: "Onboard every engineer in the organization to the new configuration through mandatory training sessions.",
      },
      {
        letter: "C",
        text: "Roll out the stabilized configuration to additional teams with documentation and a defined support channel",
      },
      {
        letter: "D",
        text: "Identify the team workflows, security boundaries, and which decisions belong to managed configuration versus project scope.",
      },
      {
        letter: "E",
        text: "Iterate the configuration based on the pilot findings and stabilize the baseline before broader rollout.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "AD", source_c: "AD" },
    explanations: {
      claude:
        "Before the pilot, you first identify the team's workflows and security boundaries, and decide which settings go in managed configuration versus project scope (D). You then define the project-scope baseline for MCP servers, permission rules and subagents (A). E depends on pilot findings, so it comes after the pilot. B (training everyone) and C (rolling out to more teams) belong to the broader rollout after the configuration has stabilized.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 106,
    kind: "single",
    text: "A healthcare organization is evaluating two Claude-powered AI architectures for a clinical documentation assistant. Architecture X produces higher output quality scores but costs $0.18 per documentation session and averages 4.2 seconds per response. Architecture Y scores slightly lower on quality metrics but costs $0.09 per session and averages 2.1 seconds per response. The stated SLA requires responses under 3 seconds, and the annual volume is projected at 2 million documentation sessions.\n\n Which evaluation approach correctly applies business value pillar analysis to this decision?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Select Architecture Y based solely on the 50% cost reduction, since solution cost is the most important value pillar in healthcare budget-constrained environments.",
      },
      {
        letter: "B",
        text: "Select Architecture X because the higher quality scores justify the cost premium, and any SLA gap can be addressed through infrastructure optimization after deployment.",
      },
      {
        letter: "C",
        text: "Eliminate Architecture X on SLA grounds, then evaluate Architecture Y against the efficiency and solution cost pillars by calculating annual cost difference and assessing whether the quality delta materially impacts clinical workflow productivity.",
      },
      {
        letter: "D",
        text: "Recommend a hybrid approach using Architecture X for complex cases and Architecture Y for routine cases, without additional analysis, since this preserves quality where it matters most.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "C", source_c: "C" },
    explanations: {
      claude:
        "The 3-second SLA is a firm requirement, so Architecture X (4.2s) is ruled out first. Y is then judged on solution cost (saves $0.09 × 2M = $180K a year) and efficiency (whether its slightly lower quality slows clinical work). A decides on cost alone and ignores the other factors. B ignores the SLA and assumes speed can be fixed after launch. D is a hybrid with no analysis that still sends some traffic to the SLA-breaking architecture.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 107,
    kind: "single",
    text: "You are explaining the precedence of Claude Code configuration scopes to the team. Which precedence ordering, from highest to lowest, is correct?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Local > managed > user > command-line arguments > project",
      },
      {
        letter: "B",
        text: "Project > user > managed > local > command-line arguments",
      },
      {
        letter: "C",
        text: "Managed > command-line arguments > local > project > user",
      },
      {
        letter: "D",
        text: "User > project > local > command-line arguments > managed",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "C", source_c: "C", source_e: "C" },
    explanations: {
      claude:
        "The Claude Code docs give this precedence order: managed (enterprise policy) settings come first and can't be overridden. Next are command-line arguments, then local project settings (.claude/settings.local.json), then shared project settings (.claude/settings.json), and last user settings (~/.claude/settings.json). The other options get this wrong. Some put managed settings near the bottom even though they're meant to be enforced. Others put user settings above project or local settings, but more specific scopes are supposed to override broader ones.",
      source_e:
        "Discussion:\nSelected Answer: C - The correct general precedence is managed configuration, command-line arguments, local configuration, project configuration, and then user configuration. Managed configuration has the highest authority because it contains centrally administered organizational and compliance controls that ordinary engineers must not be able to override. Command-line arguments provide temporary session-level overrides where the relevant setting permits them. Local settings apply to one user within a specific repository and take precedence over the shared project configuration. Project settings apply to every contributor using that repository and override general user preferences. User settings form the lowest tier because they provide personal defaults across projects and apply only when no higher-precedence source supplies a value. Anthropic documents this order explicitly: managed, command line, local, project, and user. It also notes that permission rules may merge rather than behave as simple scalar overrides, and certain security-sensitive keys have specialized precedence behavior. Claude Code Configuration Scopes The ordering allows personal customization without permitting it to defeat repository conventions or centrally mandated security requirements. Architects must still examine the merge behavior of the individual configuration property rather than assuming every array or permission rule is replaced wholesale. Study Guide references/topics: Claude Code configuration; scope precedence; managed policies; local overrides; project settings; user defaults.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 108,
    kind: "multi",
    text: "A Claude architect is leading the discovery phase for a new AI-powered customer service solution. Which two activities are characteristic of structured discovery and requirement gathering for a Claude-based deployment? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Facilitating stakeholder workshops to surface latency, accuracy, and compliance constraints before scoping begins.",
      },
      {
        letter: "B",
        text: "Selecting the Claude model tier based on the architect's prior project experience before stakeholder input is collected.",
      },
      {
        letter: "C",
        text: "Generating an initial prototype and iterating based on user reaction rather than written requirements.",
      },
      {
        letter: "D",
        text: "Documenting explicit success criteria and failure thresholds that will gate production deployment.",
      },
      {
        letter: "E",
        text: "Deferring constraint documentation until the integration design phase to avoid scope creep.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "AD", source_c: "AD", source_e: "AD" },
    explanations: {
      claude:
        "The answer is A and D. Structured discovery means drawing out constraints such as latency, accuracy and compliance from stakeholders before scoping (A). It also means writing down measurable success criteria and failure thresholds that must be met before production deployment (D). B is wrong because it picks a model tier before collecting any requirements. C skips written requirements in favor of building a prototype first. E delays constraint documentation, which is the opposite of good discovery and leads to rework later.",
      source_e:
        "Discussion:\nSelected Answer: A,D - Structured discovery begins by eliciting constraints from the people who own the business outcome, operate the process, manage risk, and will use or support the deployed system. Stakeholder workshops in Option A identify measurable expectations concerning accuracy, latency, throughput, cost, privacy, compliance, escalation, and acceptable failure behavior before the solution is scoped. Option D converts those expectations into production gates. Success criteria must be explicit enough to evaluate empirically, while failure thresholds must determine when the design requires remediation, human review, or rejection. Anthropic's evaluation guidance states that successful LLM applications begin with defined success criteria and evaluations that measure performance against them. It characterizes strong criteria as specific, measurable, achievable, and relevant. Define Success Criteria and Build Evaluations Option B prematurely selects a model before the workload profile is known. Option C can supplement discovery, but reaction-driven prototyping cannot replace documented requirements and acceptance criteria. Option E postpones essential constraints until architectural commitments may already have been made. The discovery output should create traceability from stakeholder objectives to requirements, evaluation metrics, architecture decisions, and deployment gates. Study Guide references/topics: Structured discovery; stakeholder workshops; nonfunctional requirements; success criteria; failure thresholds; production readiness gates.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 109,
    kind: "classification",
    text: "You are classifying token-management tactics by where each tactic applies in the request lifecycle: 'Input Preparation,' 'Prompt Construction,' or 'Output Handling.'",
    images: [],
    choices: [],
    rows: [
      {
        letter: "A",
        text: "Persist the validated output for downstream consumption and audit",
        options: [],
      },
      {
        letter: "B",
        text: "Order the prompt sections so cacheable content sits before per-request content",
        options: [],
      },
      {
        letter: "C",
        text: "Summarize prior conversation history when full history is no longer needed",
        options: [],
      },
      {
        letter: "D",
        text: "Validate the model's structured output against the expected schema",
        options: [],
      },
      {
        letter: "E",
        text: "Move stable repeated content into a cacheable prefix at the head of the prompt",
        options: [],
      },
      {
        letter: "F",
        text: "Trim retrieved passages to spans relevant to the user's question",
        options: [],
      },
    ],
    sources: { source_c: true, source_e: true },
    suggested: {
      claude: {
        A: "Output Handling",
        B: "Prompt Construction",
        C: "Input Preparation",
        D: "Output Handling",
        E: "Prompt Construction",
        F: "Input Preparation",
      },
      source_c: {
        A: "Output Handling",
        B: "Prompt Construction",
        C: "Input Preparation",
        D: "Output Handling",
        E: "Prompt Construction",
        F: "Input Preparation",
      },
      source_e:
        "Output Handling | Prompt Construction | Input Preparation | Output Handling | Prompt Construction | Input Preparation",
    },
    explanations: {
      claude:
        "Summarizing history (C) and trimming retrieved passages (F) make the source material smaller before the prompt is built, so they are Input Preparation. Ordering sections so cacheable content comes first (B) and moving stable content into a cacheable prefix (E) decide the prompt's layout, so they are Prompt Construction. Checking the output against the schema (D) and saving the validated result (A) happen after the model responds, so they are Output Handling.",
      source_e:
        "Hotspot Solution:\n| Token-Management Tactic | Request Lifecycle Stage |\n| :--- | :--- |\n| **Persist the validated output for downstream consumption and audit** | **Output Handling** |\n| **Order prompt sections so cacheable content appears before per-request content** | **Prompt Construction** |\n| **Summarize prior conversation history when full history is no longer needed** | **Input Preparation** |\n| **Validate the model's structured output against the expected schema** | **Output Handling** |\n| **Move stable repeated content into a cacheable prefix at the beginning of the prompt** | **Prompt Construction** |\n| **Trim retrieved passages to spans relevant to the user's question** | **Input Preparation** |\n\n### Explanation:\n- Input preparation curates history and retrieved evidence before prompt assembly. Prompt construction structures ordering and cacheable prefixes. Output handling validates schemas and persists results after generation.\n\nDiscussion:\nSelected Answer: A\nInput preparation curates history and retrieved evidence before prompt assembly. Prompt construction structures ordering and cacheable prefixes. Output handling validates schemas and persists results after generation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 110,
    kind: "single",
    text: "A customer support team has proposed delegating customer refund decisions to a Claude-driven workflow with no human review for refunds under 50 USD. The team's reasoning is that small refunds are low-risk and human review would erase the efficiency gain. Which Delegation-competency principle should guide your response?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Delegation should always include human review on every decision the workflow produces.",
      },
      {
        letter: "B",
        text: "Delegation scope should reflect the type of risk involved, not the transaction size alone.",
      },
      {
        letter: "C",
        text: "Delegation scope should be set primarily by maximizing efficiency gains across the workflow.",
      },
      {
        letter: "D",
        text: "Delegation should be avoided entirely wherever financial transactions occur in the workflow.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "B", source_c: "B" },
    explanations: {
      claude:
        "How much to delegate should depend on what kind of risk is involved, not just how much money is at stake. Small refunds can still carry real risk. Examples include fraud patterns repeated across many small claims, inconsistent or unfair treatment of customers, policy precedents, and how the customer is affected. These need to be weighed alongside the efficiency gain. Option A (review every decision) and option D (never delegate anything financial) are too rigid, and option C puts efficiency ahead of judging risk.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 111,
    kind: "single",
    text: "You are identifying inefficiency in a Claude Code workflow where each engineer manually re-explains the project's conventions and architecture in every session. Which adjustment most directly removes this inefficiency?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Forbid the use of Claude Code on the project entirely to avoid the session-initialization overhead, accepting that the team loses all AI-assisted development productivity for this codebase.",
      },
      {
        letter: "B",
        text: "Capture the project's conventions and architecture in a project-scoped CLAUDE.md (or equivalent persistent project-context file) committed to the repository, so each session loads it automatically.",
      },
      {
        letter: "C",
        text: "Tell each engineer to retype the project conventions and architecture context more quickly at the start of each session, reducing time lost without eliminating the repeated manual effort.",
      },
      {
        letter: "D",
        text: "Remove all documented project conventions and architectural standards so engineers have nothing to re-explain at session start, accepting the loss of consistency and shared coding standards.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "B", source_c: "B", source_e: "B" },
    explanations: {
      claude:
        "The best answer is B. A project-scoped CLAUDE.md committed to the repo loads into every Claude Code session automatically, and the whole team shares it. That gets rid of the repeated manual explanation at its source. C still leaves the repeated effort in place, just faster. A and D remove the overhead only by giving up something worse: AI-assisted productivity in A, and consistent coding standards in D.",
      source_e:
        "Discussion:\nSelected Answer: B - A project-scoped CLAUDE.md converts repeatedly supplied information into persistent, version-controlled context. Claude Code loads applicable CLAUDE.md instructions at session initialization, allowing architecture principles, coding conventions, build commands, repository structure, and verification requirements to be shared consistently across engineers. Anthropic explicitly recommends using CLAUDE. md for information that developers would otherwise explain repeatedly; concise and specific instructions provide stronger adherence. Committing the file also enables normal review and change-control practices. Option C reduces typing speed but preserves the underlying waste and inconsistency. Options A and D remove useful capability or governance rather than correcting the workflow. The implementation should periodically review the file for obsolete, conflicting, or unnecessarily verbose instructions. Study Guide references/topics: Claude Code project memory ; CLAUDE.md; persistent context; repository conventions; workflow standardization.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 112,
    kind: "multi",
    text: "The compliance team has authored a regulatory disclosure procedure that must be applied identically across customer service, sales, and onboarding workflows. Which two design decisions should you include? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Package the procedure as a Claude Skill owned directly by the compliance team.",
      },
      {
        letter: "B",
        text: "Embed the procedure text into each workflow's system prompt at integration time.",
      },
      {
        letter: "C",
        text: "Store the procedure in a shared retrieval corpus accessible to each workflow independently.",
      },
      {
        letter: "D",
        text: "Have each workflow team rewrite the procedure for its own context.",
      },
      {
        letter: "E",
        text: "Reference the same Claude Skill from all three workflow integrations.",
      },
    ],
    rows: [],
    sources: { source_c: true },
    suggested: { claude: "AE", source_c: "AE" },
    explanations: {
      claude:
        "If the compliance team owns the procedure as a Claude Skill (A), there is one authoritative, versioned source of truth that only the compliance team maintains. If all three workflows point to that same Skill (E), they all apply it the same way, and any update reaches every workflow at once. Pasting the text into each system prompt (B) leaves you with copies that drift apart over time. Letting each team rewrite the procedure (D) produces different versions, which defeats the goal of applying it identically. A retrieval corpus (C) only brings back pieces of reference text when they seem relevant. It doesn't guarantee the whole procedure gets applied the same way every time.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 113,
    kind: "multi",
    text: "You are compiling continuity practices that span the deployment lifecycle. Which two practices belong on the list? (Select two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Maintain a stakeholder register and notify the listed parties at every phase transition event.",
      },
      {
        letter: "B",
        text: "Carry the evaluation framework and reference set forward across iterations rather than rebuilding each time.",
      },
      {
        letter: "C",
        text: "Archive every phase deliverable in long-term storage to preserve a record of what was produced.",
      },
      {
        letter: "D",
        text: "Capture lessons learned at the end of each phase and surface them as inputs to the next phase.",
      },
      {
        letter: "E",
        text: "Lock decisions made in early phases to prevent revisiting them as later phases begin.",
      },
    ],
    rows: [],
    sources: { source_c: true, source_e: true },
    suggested: { claude: "BD", source_c: "BD", source_e: "BD" },
    explanations: {
      claude:
        "B and D both carry knowledge forward from one phase or iteration to the next. B keeps the same evaluation framework and reference set across iterations, so results can be compared over time. D records lessons at the end of each phase and uses them as inputs to the next phase. A is about notifying people, not carrying knowledge forward. C only stores records and does not feed them into later work. E is wrong because locking early decisions stops later phases from improving on what was learned.",
      source_e:
        'Discussion:\nSelected Answer: B,D - Lifecycle continuity depends on preserving validated knowledge and feeding operational learning back into subsequent phases. Carrying the evaluation framework and reference set forward, as stated in Option B, creates a stable baseline across prompt changes, model migrations, retrieval adjustments, and architectural revisions. Rebuilding the evaluation system each time would undermine longitudinal comparison because changes in the test framework could be mistaken for changes in solution performance. Option D establishes the second essential continuity mechanism: lessons from discovery, design, implementation, deployment, and production monitoring become explicit inputs to the next phase. This closes the feedback loop and prevents recurring defects, invalid assumptions, and operational findings from being lost at organizational handoffs. Option A is overly mechanical. Stakeholders should receive communications relevant to their responsibilities and decision rights, not indiscriminate notifications at every transition. Option C confuses comprehensive archival with lifecycle continuity; retention must follow business, regulatory, security, and records- management requirements rather than an unconditional "archive everything" policy. Option E is directly contrary to iterative architecture. Decisions should be documented and governed, but material evidence or changed requirements must be allowed to reopen them. Study Guide references/topics: Lifecycle phases; evaluation continuity; reference datasets; feedback loops; lessons learned; decision records; iterative architecture governance.',
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 114,
    kind: "single",
    text: "You are comparing two configurations for an internal compliance Q & A assistant. Configuration X reduces top-k retrieval and uses a lighter model, lowering p95 latency by 38 percent while producing a measured 2 percent reduction in the accuracy benchmark. Configuration Y retains the existing top-k retrieval setting and heavier model, with unchanged p95 latency and no measurable change in accuracy. The deployment's stated priorities are accuracy first and latency second. Which configuration is the better recommendation?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Configuration X, because the 2 percent accuracy reduction falls within normal benchmark variance and is not a meaningful regression.",
      },
      {
        letter: "B",
        text: "Configuration Y, because the deployment's stated priority is accuracy first, and Configuration X produces a measured reduction in accuracy.",
      },
      {
        letter: "C",
        text: "Configuration X, because lower latency generally matters more than accuracy, regardless of the deployment's stated priorities.",
      },
      {
        letter: "D",
        text: "Configuration X, because a 38 percent latency improvement outweighs a 2 percent accuracy reduction as a general rule across compliance deployments.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "B", source_e: "B" },
    explanations: {
      claude:
        "The deployment puts accuracy first and latency second. That means you only trade accuracy for speed if accuracy stays the same, and Configuration X has a measured 2% accuracy drop. For a compliance assistant, wrong answers are expensive, so Y is the right pick. A says the drop is just noise, but the question calls it a measured reduction, so that is an unsupported guess. C and D rely on general rules that ignore the priorities this deployment has stated.",
      source_e:
        "Discussion:\nSelected Answer: B - Configuration Y is the appropriate recommendation because architectural optimization must follow the deployment's explicitly defined priorities and acceptance criteria. Accuracy is the primary requirement for this compliance assistant, and Configuration X introduces a measured two-percent accuracy regression. That reduction cannot be dismissed as ordinary benchmark variation unless repeated evaluation establishes that it is statistically insignificant. In a compliance workload, even a small accuracy decline can increase incorrect guidance, missed policy requirements, human-review effort, and regulatory exposure. Configuration Y preserves the established accuracy level while maintaining the current latency profile. Although its latency does not improve, latency is explicitly the secondary objective. Configuration X could be reconsidered only if further testing eliminates the accuracy regression or stakeholders formally approve a revised trade-off. Options C and D incorrectly impose a general preference for latency over the documented deployment priorities.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 115,
    kind: "hotspot",
    text: "HOTSPOT You are classifying token-management tactics by where in the request lifecycle each tactic applies. For each of the tactics, select where in the request lifecycle each tactic applies: “Input Preparation”, “Prompt Construction”, or “Output Handling”.",
    images: [
      "data:image/png;base64,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/E6PS4tYEs++3A0+GSG38pMfJ8srbuTk46V6DQAUUUUAFFFFABRRRQB4B/wTT/5N18R/9lV+I/8A6nGu17/XgH/BNP8A5N18R/8AZVfiP/6nGu17/QAUUUUAFFFFABRRRQAUUUHgUAFFIDuFKOPpSAQHNJt+b2pAhD5yMU+gAAxRRRTAQnFIzZGRmlZdwoVcUACEleaUjNFFACMOOKFHHvSjpzTdpyTmgBxOBQTigjNIoI60ALTVYk06kUYFACk4FGeM0UY4oAQHcKABSgYFNCce9ADicCgciikx+VAC0UgXbS9zSYBSMSOlLQRkUrMBAQ1DZxxSCPaSadVAMwTSp0pwGKKACkOcjFLSLnHOKAFopMUtABRSEZNLjA4oARm2ilByKTbk880tACN8y8UiDrSqMChs54xQAEnsKUdOaKQjke1AC0UEZpAMfSgBaKQruoVdooAWijtR0oAKMZoooAO9FNXdjnH4U6gApqtlqcaQJg0AKRkU1Iwo9acTiik0Awxe+Pwp9FFMAooooAKKKKAPAP2yP+Tiv2Tv+yq33/qD+K69/PIrwD9sj/k4r9k7/sqt9/6g/iuvf6ViWyMDmnOcDFB4enEZoauCkRbPmzTkPNIeDinhdtCtsULTB8zU88CmKcGmA7aPSgDk+9Jv+b2p2ecUCTuFFFFAwooooAKKKKACiiigAooooAKKKKACiiigAooooA8A/wCCaf8Aybr4j/7Kr8R//U412vf68A/4Jp/8m6+I/wDsqvxH/wDU412vf6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8A/bI/5OK/ZO/7Krff+oP4rr3+vAP2yP8Ak4r9k7/sqt9/6g/iuvf6VxWPzo+KP7cX7QuiQ/tL/EPQtd+Gy+Cf2ffEtxp8fhvUtGlW41e0t7aCeQG9WYbJWErBfkIyAMc19D67/wAFVvg94C1LwZonijXbvR/GPjXRNN1yy0CLTLq9vPJvQAjbYY2+VWyHbomMtgGvEP2bv+CYnhP4vftL/tEeKviv4J127j1P4myajo1t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",
    ],
    choices: [
      {
        letter: "A",
        text: "Output Handling | Prompt Construction | Input Preparation | Output Handling | Prompt Construction | Input Preparation",
      },
      {
        letter: "B",
        text: "Prompt Construction | Input Preparation | Output Handling | Output Handling | Prompt Construction | Input Preparation",
      },
      {
        letter: "C",
        text: "Output Handling | Input Preparation | Prompt Construction | Input Preparation | Prompt Construction | Output Handling",
      },
      {
        letter: "D",
        text: "Input Preparation | Prompt Construction | Input Preparation | Output Handling | Output Handling | Prompt Construction",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Persisting validated output and validating it against a schema both happen after the response arrives, so they are Output Handling. Ordering sections with cacheable content first and moving stable content into a cacheable prefix are both about prompt layout, so they are Prompt Construction. Summarizing old history and trimming retrieved passages cut down the inputs before the prompt is built, so they are Input Preparation. Only option A matches this order; B, C and D each put at least one tactic in the wrong stage, for example C puts summarizing history under Prompt Construction.",
      source_e:
        "Hotspot Solution:\n| Token-Management Tactic | Request Lifecycle Stage |\n| :--- | :--- |\n| **Persist the validated output for downstream consumption and audit** | **Output Handling** |\n| **Order prompt sections so cacheable content appears before per-request content** | **Prompt Construction** |\n| **Summarize prior conversation history when full history is no longer needed** | **Input Preparation** |\n| **Validate the model's structured output against the expected schema** | **Output Handling** |\n| **Move stable repeated content into a cacheable prefix at the beginning of the prompt** | **Prompt Construction** |\n| **Trim retrieved passages to spans relevant to the user's question** | **Input Preparation** |\n\n### Explanation:\n- Input preparation curates history and retrieved evidence before prompt assembly. Prompt construction structures ordering and cacheable prefixes. Output handling validates schemas and persists results after generation.\n\nDiscussion:\nSelected Answer: A\nInput preparation curates history and retrieved evidence before prompt assembly. Prompt construction structures ordering and cacheable prefixes. Output handling validates schemas and persists results after generation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 116,
    kind: "single",
    text: "You are reviewing a peer’s draft system prompt that contains contradictory instructions: one section says to never speculate beyond the supplied source, and another says to confidently fill in any gaps. Which response is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Add a priority-ordering instruction that tells the model to evaluate all available instructions and apply the most contextually appropriate one on each request.",
      },
      {
        letter: "B",
        text: "Increase the temperature setting so that output randomness masks the contradictions.",
      },
      {
        letter: "C",
        text: "Resolve the contradiction by removing or rewording the gap-filling instruction so the prompt consistently constrains the model to source-supported content.",
      },
      {
        letter: "D",
        text: "Keep both contradictory instructions in place and rely on the model to select which one to follow on each individual request, accepting inconsistent behavior as a result.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "C", source_e: "C" },
    explanations: {
      claude:
        "The best fix is to remove the contradiction at its source. Deleting or rewording the gap-filling instruction leaves one clear rule, which keeps the model grounded in the source and less likely to make things up. Option A keeps both conflicting rules and lets the model pick between them on each request, so behavior stays unpredictable. Option B is wrong because raising temperature only adds randomness and doesn't fix the instructions. Option D knowingly accepts inconsistent and unreliable outputs.",
      source_e:
        "Discussion:\nSelected Answer: C (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 117,
    kind: "hotspot",
    text: "HOTSPOT You are classifying chunking strategies by the corpus type each is best suited to. For each chunking strategy, select where in the request lifecycle each applies: “Long Structured Documents”, “Heterogeneous Short Records”, or “Code or Hierarchical Specs”.",
    images: [
      "data:image/png;base64,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igAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKAc0CZ4B/wSd/5RZfs0/8AZKvC/wD6aLWvf68A/wCCTv8Ayiy/Zp/7JV4X/wDTRa17/QMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPAPhz/ylN+Mn/ZKvAf8A6d/Gde/14B8Of+Upvxk/7JV4D/8ATv4zr3+gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkZttLQRmgBqvk06kCgGloAKKKKACgDFFFAHgH/BJ3/lFl+zT/wBkq8L/APpota5v4/8A7f3inTP2kb/4P/Bj4ZN8UvHfh7TYdW8RSXetJo2kaBDNnyI5bhkkLTyAFljVThRkkV0n/BJ3/lFl+zT/ANkq8L/+mi1r5t8OfHvw7/wTT/4Kb/H+7+L8+oeGfCPxqk0rxD4a8VXFnNNpcrwWi2s1g0saN5UqMgcK2AwckUAfYPw9/aGuNP8AgTB4u+Luk6Z8Hr2KRodRtNW1y3ltbRwxUFbrKo6vjKngkdq7Dwz8WvCvjPwL/wAJRpHiXQdU8NeW0x1a01CKayCLyzGZWKADuc8d6+Bf2u/2iPh18ZP2nP2bvix4mNxrH7Odmddt21HUdIuP7LtdZMcaWlzdRSRgiJlEqxSOm3cScjOa8G+MvhVfHfwD/aj8T/CzQNaPwC134geFb+W002xlgttasLeSD+3Z7K3Cgm3YAb9i4k8t8A9aAPvjRv8AgoTp/wAQ/wBv/wAGfC/wXqfg/wAWeDfEng3UfENxrOl6gt5JDdW1zHCIVaJzHtIckgjOcV7ZoP7QXgPxT8RLzwhpnjXwpqPivTwxudGttWglv7cL97fCrF1x3yOK/M+y1j4c/Fz/AIKwQ61+zbplhBPd/A7X7CDWdH0p7DTbnUQ8YtUVyio8kZKZIHHAJyMDzT/gnv8ACzSPHI/Z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4B8G6m/h6FLfSzdaNbzHTolOVSHch8tQeQFwBXcIixoFUBVUYAAwAKAFooooAKKKKAPAP2N/+Tiv2sf+yq2P/qD+FK9/rwD9jf8A5OK/ax/7KrY/+oP4Ur3+gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAprgk06igAooooAKKKKACiiigAooooAK8A/4Kxf8osv2lv+yVeKP/TRdV7/AF8//wDBWD/lFh+0r/2SrxR/6aLqgVj6Aooqvf6ra6WENzc29sJDtTzZAm8+gz1NAyxRQDkUUAFFZll410bUvFV9oVvq2mz63pkUc95p8dyjXVrHJny3kjB3KrYOCQAcHFadABRRRQAUUVHDdRXCsY5I3CEqxVgdpHUH3oAkoqo+u2Mf2bdeWi/bW2W+ZlHntgnCc/McA8D0q3QAUUUUAFFFV9X1e00DSrm/v7m3srGyiae4uJ5BHFBGoLM7MeFUAEkngAUAWKKq6LrVn4k0e11HTru2vrC+iW4trm3kEkVxGwDK6MMhlIIII4INPsdUtdUEptrmC4EEhik8qQP5bjqpx0I9DQBPRRWd4q8X6T4F0WTUtb1Ow0jToWRHur24SCFGdgqguxABLEAc8kgUAaNFIrBlBBBB5BHeobDVbXVVdrW5guVjbY5ikDhW9DjoaAJ6KKKACiiigAooooAKKKKACiiigAooooA8A/Y3/wCTiv2sf+yq2P8A6g/hSvf68A/Y3/5OK/ax/wCyq2P/AKg/hSvf6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8A/wCCsX/KLL9pb/slXij/ANNF1Xv9eAf8FYv+UWX7S3/ZKvFH/pouqAPf6/N39jz9lTwR/wAFTvHXxr+J/wAcNKufHE1j491T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DFfSHw98WS+O/BGl6xPpGq6BNqVus76dqcax3lkSOY5VUsAw74JHvXxj8ffhh49/aF/ZV8BaV4t/ZouNX8U6HA0Vv9h8e2un6j4WvIoliju7e8TBAfBPyNkAAMrdK+l/2K/BHjz4b/sp+BNC+J+tDxF4+0zSo4da1ES+cbicE9ZMDewUqpfA3FSe9AHqFFFFABRRRQAUUUUAeAf8E0/+TdfEf/ZVfiP/AOpxrte/14B/wTT/AOTdfEf/AGVX4j/+pxrte/0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUrAFFFFMAooooAKKKKACiiigAooooAKKKKACiiigAooooAKMUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV4B/wAFLP8Ak3Xw5/2VX4cf+pxoVe/14B/wUs/5N18Of9lV+HH/AKnGhUAe/wBFFFABRRRQByXxK+APgT4zTW8njDwV4S8VyWilYG1nR7e/aEHkhTKjbR9K6Dw74b07wfoltpmk2Flpem2aCO3tLSBYIIFHRURQFUewFXaKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8A/4Jp/8m6+I/wDsqvxH/wDU412vf68A/wCCaf8Aybr4j/7Kr8R//U412vf6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8A/4KWf8m6+HP8Asqvw4/8AU40Kvf68A/4KWf8AJuvhz/sqvw4/9TjQqBHv9eaeAP2uPA/xO+AWr/EzR9SnuPCGhjUDd3TWsiPH9heSO5xGRuO1onxgc44616XX49/s0/Dj9o3V/wDglr8UdQ8J/FH4c6N4A87xoy6Rf+EJbu/EIvL7zUNyLhVLN82G2fLkdcUDP1i+EnxT0X43/DHQfGHhy5e80HxL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",
    ],
    choices: [
      {
        letter: "A",
        text: "Code/Hierarchical Specs | Code/Hierarchical Specs | Heterogeneous Short Records | Long Structured Documents | Heterogeneous Short Records | Long Structured Documents",
      },
      {
        letter: "B",
        text: "Long Structured Documents | Code/Hierarchical Specs | Heterogeneous Short Records | Heterogeneous Short Records | Long Structured Documents | Code/Hierarchical Specs",
      },
      {
        letter: "C",
        text: "Code/Hierarchical Specs | Long Structured Documents | Heterogeneous Short Records | Long Structured Documents | Code/Hierarchical Specs | Heterogeneous Short Records",
      },
      {
        letter: "D",
        text: "Heterogeneous Short Records | Code/Hierarchical Specs | Long Structured Documents | Code/Hierarchical Specs | Heterogeneous Short Records | Long Structured Documents",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Function-level or section-level chunking of code modules and tree-aware chunking that follows a code or spec hierarchy both fit Code/Hierarchical Specs. Per-record chunking and fixed-size chunking with overlap for short records of similar length both fit Heterogeneous Short Records. Semantic chunking along clause or paragraph boundaries and hierarchical chunking that mirrors document sections both fit Long Structured Documents. Only option A gives this mapping: Code, Code, Short, Long, Short, Long. B, C and D each put at least one code strategy or document-section strategy under the wrong corpus.",
      source_e:
        "Hotspot Solution:\n| Chunking Strategy | Target Corpus Type |\n| :--- | :--- |\n| **Function-level or section-level chunking for code modules** | **Code or Hierarchical Specifications** |\n| **Tree-aware chunking that follows code or specification hierarchy** | **Code or Hierarchical Specifications** |\n| **Per-record chunking where each record is one chunk** | **Heterogeneous Short Records** |\n| **Semantic chunking along clause or paragraph boundaries** | **Long Structured Documents** |\n| **Fixed-size chunking with overlap for short records of similar length** | **Heterogeneous Short Records** |\n| **Hierarchical chunking that mirrors document section structure** | **Long Structured Documents** |\n\n### Explanation:\n- Code and hierarchical specifications require function/tree-aware boundaries. Heterogeneous short records map cleanly to per-record or fixed-size chunks. Long structured documents benefit from semantic clause/paragraph and section-hierarchy chunking.\n\nDiscussion:\nSelected Answer: A\nCode and hierarchical specifications require function/tree-aware boundaries. Heterogeneous short records map cleanly to per-record or fixed-size chunks. Long structured documents benefit from semantic clause/paragraph and section-hierarchy chunking.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 118,
    kind: "single",
    text: "You are designing the prompt for a ticket-triage classifier with thirty well-defined categories and clear category descriptions in the prompt. Which technique is most appropriate as the starting point?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "a prompt that demands the model invent new categories when the supplied ones do not fit",
      },
      {
        letter: "B",
        text: "a chain-of-thought prompt for a routing decision that does not require multi-step reasoning",
      },
      {
        letter: "C",
        text: "a zero-shot prompt that specifies the categories with their descriptions and the required output format",
      },
      {
        letter: "D",
        text: "a prompt with no category descriptions, expecting the model to infer the category set",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "C", source_e: "C" },
    explanations: {
      claude:
        "The categories are well defined and already described in the prompt, so the simplest approach to start with is a zero-shot prompt that lists the categories, their descriptions, and the exact output format. Add few-shot examples later only if evaluation shows a need. Option A makes the output unpredictable because the model could return labels outside your fixed set. Option B adds chain-of-thought cost and delay to a single routing decision that doesn't need multi-step reasoning. Option D removes the descriptions, which are the most useful guidance the model has, and forces it to guess the category set.",
      source_e:
        "Discussion:\nSelected Answer: C (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 119,
    kind: "multi",
    text: "The compliance team has authored a regulatory disclosure procedure that must be applied identically across customer service, sales, and onboarding workflows. The procedure changes when regulators issue updates, currently four to six times per year. You are designing how the procedure will be packaged for use by Claude across all three workflows. Which two design decisions should you include? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Package the procedure as a Claude Skill owned directly by the compliance team.",
      },
      {
        letter: "B",
        text: "Embed the procedure text into each workflow's system prompt at integration time.",
      },
      {
        letter: "C",
        text: "Store the procedure in a shared retrieval corpus accessed by all three workflows.",
      },
      {
        letter: "D",
        text: "Have each workflow team rewrite the procedure for its own context.",
      },
      {
        letter: "E",
        text: "Reference the same Claude Skill from all three workflow integrations.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "AE", source_e: "AE" },
    explanations: {
      claude:
        "If the compliance team owns the procedure as a single Claude Skill (A), they can update it whenever regulators issue changes, without involving each workflow team. If all three workflows point to that same Skill (E), every workflow applies the procedure identically and picks up updates right away. Embedding the text in each system prompt (B) or having each team rewrite it (D) creates copies that drift apart and must be redeployed four to six times a year. A retrieval corpus (C) may return only pieces of the procedure, so it can't guarantee the full procedure is applied the same way every time.",
      source_e:
        "Discussion:\nSelected Answer: A,E - The procedure should have one authoritative implementation and one accountable owner. Packaging it as a compliance-owned Skill allows the instructions, examples, templates, and prohibited patterns to be maintained together. Referencing that same Skill from all three workflows ensures that updates propagate consistently without requiring separate prompt changes. Embedding copies in multiple system prompts or allowing workflow teams to rewrite the procedure creates configuration drift and inconsistent regulatory behavior. A retrieval corpus is appropriate for searchable reference material, but the requirement concerns a fixed operational procedure that Claude must follow, making a Skill the stronger abstraction. The Skill should be versioned, reviewed, tested, and released through a controlled publication process. Claude Code Skills",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 120,
    kind: "multi",
    text: "You are running a discovery engagement for a new Claude-based capability and must complete the requirements-gathering steps before validating with stakeholders. Which two steps must be completed BEFORE validating the captured requirements with stakeholders? (Select two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Produce architecture decision records that capture the rationale for major design choices.",
      },
      {
        letter: "B",
        text: "Capture the business goals, success criteria, and the in-scope user population for the engagement.",
      },
      {
        letter: "C",
        text: "Document the consolidated requirements with traceability to the source stakeholder for each item.",
      },
      {
        letter: "D",
        text: "Schedule the rollout milestones and dependencies with engineering and product partners.",
      },
      {
        letter: "E",
        text: "Identify the non-functional constraints covering latency, cost, audit, data sensitivity, and regulatory needs.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "BE", source_e: "BE" },
    explanations: {
      claude:
        "The usual discovery order is: capture business goals, success criteria and user population (B); identify non-functional constraints like latency, cost, audit, data sensitivity and regulation (E); validate these with stakeholders; then document the consolidated requirements with traceability (C). C is a close call, but 'consolidated' points to the final record written after validation. Architecture decision records (A) and rollout milestones (D) are later design and delivery work, not requirements gathering.",
      source_e:
        "Discussion:\nSelected Answer: B,E - Requirements must first establish what the capability is expected to accomplish, who will use it, and which constraints bound the solution. Option B captures the business purpose, success criteria, and intended user population. Option E identifies critical non-functional requirements that will influence model selection, integration patterns, deployment boundaries, evaluation design, and operational controls. These inputs must exist before stakeholders can validate whether the captured requirements accurately represent their needs. Architecture decision records are produced after meaningful alternatives and design decisions exist. Detailed traceability is important but follows the initial elicitation and consolidation process. Rollout scheduling occurs later, after requirements and architecture have been validated. Anthropic likewise recommends defining measurable success criteria and empirical evaluation methods before optimizing prompts or finalizing the implementation. Anthropic: Prompt engineering overview",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 121,
    kind: "multi",
    text: "You are selecting a model for a new production workload and must complete the upstream steps before testing candidate models empirically. Which two steps must be completed BEFORE running a representative sample on a candidate model? (Choose two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Sign off the production rollout plan with the platform and security teams.",
      },
      {
        letter: "B",
        text: "Select the lightest model that consistently meets the quality bar across the sample.",
      },
      {
        letter: "C",
        text: "Choose a candidate model based on the requirements profile and known capabilities.",
      },
      {
        letter: "D",
        text: "Retest the model choice when a new model version becomes available.",
      },
      {
        letter: "E",
        text: "Define the quality bar, latency tolerance, and expected volume for the workload.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "CE", source_e: "C" },
    explanations: {
      claude:
        "You first have to define the requirements: the quality bar, latency tolerance and expected volume (E). Then you pick a candidate model that fits those requirements, based on what the models are known to do well (C). Only after that can you run a representative sample on it. Option B, picking the lightest model that meets the bar, happens after testing. Option D, retesting when a new version comes out, is ongoing upkeep after the choice is made. Option A, signing off the rollout plan, is a deployment step and not part of the steps before testing.",
      source_e:
        "Discussion:\nSelected Answer: CE (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 122,
    kind: "multi",
    text: "You are designing a human-in-the-loop validation workflow. Which two design elements belong in the workflow? (Choose two.) Each correct answer presents a complete solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "capture of reviewer decisions as labeled data that feeds the evaluation set over time",
      },
      {
        letter: "B",
        text: "mandatory reviewer agreement with the model output to maintain consistent reviewer-model alignment",
      },
      {
        letter: "C",
        text: "aggregate reviewer throughput metrics published weekly to leadership for headcount planning",
      },
      {
        letter: "D",
        text: "uniform sampling of all model outputs to give every request an equal chance of review",
      },
      {
        letter: "E",
        text: "risk-stratified sampling that concentrates reviewer attention on low-confidence and high-impact outputs",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "AE", source_e: "A" },
    explanations: {
      claude:
        "E is correct because risk-stratified sampling sends reviewers to low-confidence and high-impact outputs, where catching errors matters most. A is correct because saving reviewer decisions as labeled data keeps the evaluation set growing and improving over time. B is wrong because forcing reviewers to agree with the model makes the review pointless. C is about planning staff numbers and does not help validate outputs. D spreads review effort evenly, so it wastes time on easy, low-risk cases and under-samples the risky ones.",
      source_e:
        "Discussion:\nSelected Answer: AE (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 123,
    kind: "single",
    text: "You are defining where human review must remain in a planned automated pipeline. Which placement reflects sound human-in-the-loop design?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Place a human reviewer only after the irreversible action has already executed, making the review a post-hoc audit rather than a meaningful pre-action check or approval gate.",
      },
      {
        letter: "B",
        text: "Place a human reviewer between the model's output and any high-impact, irreversible action, with explicit criteria for what the reviewer must check before approval.",
      },
      {
        letter: "C",
        text: "Place a human reviewer in the loop for a randomly selected sample of requests, without defining criteria for what the reviewer should check or which output categories require mandatory review.",
      },
      {
        letter: "D",
        text: "Remove all human review steps from the pipeline to maximize throughput, accepting that high-impact and irreversible actions will be taken without any human approval or oversight.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "B", source_e: "B" },
    explanations: {
      claude:
        "Human review is most useful as a pre-action gate. It belongs between the model's output and any high-impact, irreversible action, and the reviewer needs explicit criteria so the check is consistent and meaningful. A is wrong because review after an irreversible action can only audit the damage, not prevent it. C is wrong because random sampling with no criteria lets high-risk outputs skip review and gives reviewers no standard to check against. D is wrong because it removes all oversight from exactly the actions that most need it.",
      source_e:
        "Discussion:\nSelected Answer: B - Sound human-in-the-loop design places review before a high-impact or irreversible action occurs. The reviewer must receive sufficient context and explicit approval criteria so that the checkpoint functions as a meaningful control rather than a ceremonial step. This is especially important when Claude outputs could initiate financial transactions, publish sensitive material, alter access rights, affect employment decisions, or trigger other consequential actions. Option A provides only retrospective auditing and cannot prevent harm. Option C may support monitoring or quality measurement, but random sampling does not protect every case that requires mandatory approval, particularly when review criteria are undefined. Option D removes the accountability and intervention mechanism entirely. Therefore, B provides the strongest design by combining risk-based placement, human authority, and clearly defined verification requirements before execution.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 124,
    kind: "multi",
    text: "A pilot AI assistant for procurement specialists shows 89 percent first-response acceptance, but follow-up surveys reveal that specialists frequently override the assistant’s vendor recommendations after consulting unrelated criteria the assistant did not consider. The pilot owner wants to ship the assistant as is, given the strong acceptance rate. Which two discernment-competency observations should you raise BEFORE approving the launch? (Choose two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Acceptance does not measure whether recommendations are right after specialist review.",
      },
      {
        letter: "B",
        text: "The survey response rate may not be statistically representative of all the specialists.",
      },
      {
        letter: "C",
        text: "The unconsidered criteria represent a scope gap in the assistant’s input space directly.",
      },
      {
        letter: "D",
        text: "The acceptance rate alone is sufficient evidence of readiness for general production use.",
      },
      {
        letter: "E",
        text: "The pilot duration was likely too short to establish reliability across the full year.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "AC", source_e: "A" },
    explanations: {
      claude:
        "Acceptance on the first response is a proxy metric. It doesn't show whether recommendations hold up after specialist review, and frequent overrides suggest they often don't (A). The overrides are driven by criteria the assistant never considers, which is a scope gap in its inputs that must be addressed before launch (C). B and E are generic statistical and duration concerns that don't target the evidence, and D is the flawed reasoning the pilot owner is already using.",
      source_e:
        "Discussion:\nSelected Answer: AC (Official upstream Suggested Answer)",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 125,
    kind: "multi",
    text: "You are rolling out monitoring for a Claude-based deployment and must complete the specification steps before instrumenting the deployment. Which two steps must be completed BEFORE instrumenting the deployment to emit metrics and traces? (Choose two.) Each correct answer presents part of the solution.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Document the dashboards, alerts, and runbooks for the on-call rotation that will respond.",
      },
      {
        letter: "B",
        text: "Build the dashboards that surface metrics across slices at the cadence the team operates on.",
      },
      {
        letter: "C",
        text: "Define the service-level objectives (SLOs) and the error budgets the deployment will be held to.",
      },
      {
        letter: "D",
        text: "Tune the alert thresholds based on observed normal-state distributions to reduce false positives.",
      },
      {
        letter: "E",
        text: "Define the metrics and the slices the deployment will monitor across normal and adversarial traffic.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "CE", source_e: "C" },
    explanations: {
      claude:
        "Before instrumenting, the specification has to set what you are held to (C: SLOs and error budgets) and what you will measure (E: metrics and slices across normal and adversarial traffic). These decide what the instrumentation emits. Building dashboards (B) needs metrics that are already being emitted. Tuning thresholds (D) needs observed normal-state data, which only exists after instrumentation. Documenting dashboards, alerts and runbooks (A) describes artifacts that are built later.",
      source_e:
        "Discussion:\nSelected Answer: CE The logical pipeline is: specify (E, C) → instrument → build dashboards (B) → tune alerts (D) → document (A). Only E and C fall before instrumentation. upvoted 1 time Submit Cancel\n\n---\n\nThe logical pipeline is: specify (E, C) → instrument → build dashboards (B) → tune alerts (D) → document (A). Only E and C fall before instrumentation.",
    },
    confidence: { claude: "high" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 126,
    kind: "single",
    text: "A senior architect is preparing briefing materials on a new retrieval architecture. The executive sponsor has requested a summary of the architectural decision. Which framing is most appropriate for that audience?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Technical alternatives evaluated, implementation implications, and component-level consequences.",
      },
      {
        letter: "B",
        text: "Business outcomes achieved, trade-offs accepted, and high-level risks acknowledged.",
      },
      {
        letter: "C",
        text: "Capabilities delivered, scope implications, and feature-level dependencies on the roadmap.",
      },
      {
        letter: "D",
        text: "Threat model, control mappings, residual-risk acceptance, and audit traceability.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "B", source_e: "B" },
    explanations: {
      claude:
        "An executive sponsor decides on value, investment and risk, so the summary should be framed around business outcomes, the trade-offs accepted, and the main risks at a high level. Option A suits engineering reviewers who care about alternatives and component-level details. Option C suits product or program managers who track features and roadmap dependencies. Option D suits security, compliance or audit teams.",
      source_e:
        "Discussion:\nSelected Answer: B - Executive sponsors generally need architecture decisions translated into business significance. The briefing should explain what outcomes the retrieval architecture enables, why the chosen approach is valuable, which material trade-offs were accepted, and what major risks require awareness or sponsorship. This allows the executive to assess strategic alignment, investment value, and organizational exposure without becoming immersed in component-level implementation details. Option A is more appropriate for architects and engineering teams conducting a technical review. Option C is primarily suited to product and program stakeholders managing features, scope, and roadmap dependencies. Option D is designed for security, compliance, and risk-governance audiences requiring detailed control evidence. Although those perspectives remain important, option B provides the concise, outcome-oriented framing needed for an executive architectural decision summary.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 127,
    kind: "single",
    text: "An engineer inadvertently commits an API key to the repository by placing it in .claude/settings.json. Which configuration design principle was violated?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Project-scope configuration should always override user-scope configuration.",
      },
      {
        letter: "B",
        text: "Managed configuration must be applied before project-scope configuration is read.",
      },
      {
        letter: "C",
        text: "Credentials must be resolved at runtime from a secret store and never stored in version-controlled files.",
      },
      {
        letter: "D",
        text: "MCP server definitions must reside in environment variables to prevent scope conflicts.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "C", source_e: "C" },
    explanations: {
      claude:
        ".claude/settings.json is the project-scope settings file, and it is meant to be committed and shared with the team. That makes it the wrong place for a secret. Credentials should be resolved at runtime from a secret store or environment variables, or kept in uncommitted local or user files such as settings.local.json, so they never end up in version control. Options A and B are about scope order, which has nothing to do with leaking a secret, and A gets the order wrong anyway. D is made up: MCP server definitions don't have to live in environment variables.",
      source_e:
        "Discussion:\nSelected Answer: C - A shared project settings file is intended to be committed so that team-level configuration can travel with the repository. Consequently, it must never contain API keys, access tokens, passwords, or comparable secrets. Credentials should be injected at runtime through an approved secret-management mechanism, environment- specific credential provider, or delegated authentication flow. This separates distributable configuration from sensitive authentication material and supports rotation, revocation, auditing, and least privilege. Options A and B concern configuration precedence rather than secret handling. Option D is incorrect because MCP server definitions may legitimately be stored in project configuration; only their sensitive credential values must remain outside version control. Because the key was exposed, the operational response should also include immediate revocation or rotation and investigation of repository history. Claude Code: Settings files and precedence",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 128,
    kind: "single",
    text: "You are configuring Claude Code for a team that needs every engineer to share the same MCP server set, permission rules, and project context across the engineering monorepo. Which configuration scope best supports this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "User scope, with the MCP server definitions and permission rules placed in each engineer's ~/.claude /settings.json and synchronized manually through a shared setup script outside version control.",
      },
      {
        letter: "B",
        text: "Local scope configured only on the lead architect's machine, with no configuration present on other engineers' machines and no mechanism to distribute MCP servers or permission rules.",
      },
      {
        letter: "C",
        text: "Project scope, with the configuration committed to the repository so every engineer working in the project receives the same MCP servers, permissions, and context.",
      },
      {
        letter: "D",
        text: "User scope configured individually on each engineer's machine, with no shared configuration committed to the repository and no guarantee of consistency across the team.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "C", source_e: "C" },
    explanations: {
      claude:
        "Project scope is the right fit. You commit the shared config to the repo (.mcp.json for MCP servers, .claude/settings.json for permission rules, CLAUDE.md for project context), so every engineer who clones the repo gets the same setup automatically. A and D use user scope, which only applies to one person's machine. Keeping it in sync then depends on manual scripts or nothing at all, so consistency isn't guaranteed. B uses local scope, which is private to one machine and has no way to share the config with anyone else.",
      source_e:
        "Discussion:\nSelected Answer: C - Project scope is designed for configuration that must be shared by everyone working in a repository. Committing the approved configuration provides versioning, review history, repeatable onboarding, and consistent MCP and permission behavior across the monorepo. User scope is intended primarily for individual preferences and personal rules, so independently maintained user files create configuration drift. Local scope affects only one person in one project and is therefore unsuitable for team-wide distribution. A lead architect's local configuration cannot establish a shared environment. Claude Code documentation specifically describes . claude/settings.json as the shared project settings file that teams check into source control. Security-critical policies that must not be overridden should additionally be enforced through managed organizational settings rather than relying exclusively on repository configuration. Claude Code: Settings files and precedence",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 129,
    kind: "multi",
    text: "An architect at Trenova Systems, Inc. is reviewing two draft communication packages for the same architectural decision. Package 1 contains a threat model, residual-risk register, and control-mapping table. Package 2 contains a list of capabilities delivered and feature-level roadmap dependencies. Which two audiences are correctly matched to these packages? (Select two.)",
    images: [],
    choices: [
      { letter: "A", text: "Package 1 # engineering implementation team" },
      { letter: "B", text: "Package 2 # executive sponsor" },
      { letter: "C", text: "Package 1 # security and compliance reviewer" },
      { letter: "D", text: "Package 2 # product manager owning the roadmap" },
      { letter: "E", text: "Package 2 # security and compliance reviewer" },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "CD", source_e: "CD" },
    explanations: {
      claude:
        "Package 1 (threat model, residual-risk register, control mapping) is what a security and compliance reviewer needs to judge risk and whether controls are covered. Package 2 (capabilities delivered, feature-level roadmap dependencies) is what the product manager who owns the roadmap needs for sequencing and planning. Engineers need implementation details such as interfaces, components and how to migrate, not a register of risks. An executive sponsor needs the business outcome, cost and risk summary, not feature-level dependencies. A compliance reviewer gets little from a capability list.",
      source_e:
        "Discussion:\nSelected Answer: C,D - Package 1 is designed for security and compliance review because its threat model identifies relevant threats and attack paths, its residual-risk register documents the risks remaining after controls, and its control- mapping table connects safeguards to organizational or regulatory requirements. Package 2 is designed for the product manager because delivered capabilities and roadmap dependencies directly support prioritization, release planning, sequencing, and lifecycle ownership. An engineering implementation team would ordinarily need component diagrams, interface contracts, configuration schemas, deployment instructions, and operational runbooks rather than primarily risk-governance artifacts. An executive sponsor generally needs a concise outcome, cost, risk, and decision summary instead of feature-level dependency details. Effective architecture communication must therefore adapt the content and level of detail to each audience's responsibilities and decision rights.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 130,
    kind: "multi",
    text: "A Claude architect is configuring a shared Claude Code environment for a twelve-person development team. Which two configuration decisions most directly establish a consistent, secure team environment? (Select two.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Set editor theme and display preferences at the project scope so they are uniform across workstations.",
      },
      {
        letter: "B",
        text: "Apply managed configuration to enforce non-overridable security and compliance policies across all team members.",
      },
      {
        letter: "C",
        text: "Commit shared MCP server definitions and tool permissions in project-scope configuration files alongside the repository.",
      },
      {
        letter: "D",
        text: "Store the team's shared API key in the project-scope settings.json so all engineers use the same credential.",
      },
      {
        letter: "E",
        text: "Instruct each engineer to configure their preferred Claude model in personal user-scope settings.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "BC", source_e: "BC" },
    explanations: {
      claude:
        "B: Managed (enterprise) settings sit at the top of the precedence order, so team members can't override them. That makes them the right place to enforce security and compliance policy. C: Committing .mcp.json and the project .claude/settings.json (MCP servers, permission rules) to the repo gives every engineer the same tools and permissions. A is about cosmetic preferences and does nothing for security. D puts a shared credential in version control, which is a security anti-pattern. E is a personal choice and works against consistency.",
      source_e: "Discussion:\nSelected Answer: B,C",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 131,
    kind: "single",
    text: "You are selecting the documentation set that should accompany a Claude-based deployment at handoff. Which set is most complete?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Architecture overview, ADRs, component-level diagrams, runbooks for common operations, an on-call playbook, and a list of known limitations.",
      },
      {
        letter: "B",
        text: "Code comments scattered across individual source files with no integrating architecture overview, no ADRs, no runbooks, and no on-call playbook to orient operators or new team members.",
      },
      {
        letter: "C",
        text: "A single one-page architecture diagram with no ADRs, no runbooks, no on-call playbook, and no list of known limitations to support operators or future maintainers.",
      },
      {
        letter: "D",
        text: "A verbal handover walkthrough conducted on the day of transition, with no written architecture overview, ADRs, runbooks, playbook, or known limitations captured for future reference.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Option A covers everything a handoff needs. The architecture overview and component diagrams show how the system fits together. ADRs record why decisions were made. Runbooks and an on-call playbook let operators run the system and respond to incidents. The list of known limitations tells new owners where the risks are. B (scattered code comments), C (one diagram) and D (a verbal walkthrough with nothing written down) each leave out most of these pieces, so operators and future maintainers would have no lasting written reference.",
      source_e:
        "Discussion:\nSelected Answer: A - A complete handoff package must help different stakeholders understand, operate, troubleshoot, and evolve the Claude-based solution. An architecture overview explains the system's structure and responsibilities, while Architecture Decision Records document important decisions, alternatives, and trade-offs. Component- level diagrams provide implementation context without forcing maintainers to reconstruct dependencies from source code. Operational runbooks and an on-call playbook enable reliable incident detection, diagnosis, escalation, and recovery. Documenting known limitations is particularly important for Claude applications because model behavior can vary with prompts, context, input distribution, and external dependencies. Options B, C, and D each provide only a partial or temporary understanding of the system. They would create knowledge gaps, increase operational risk, and make future maintenance dependent on individuals rather than durable organizational documentation.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 132,
    kind: "single",
    text: "A software vendor wants to build a RAG assistant over its own internal support-ticket archive (not the public web) and needs the same quality of source attribution that citation-grounded answers provide, without sending queries to an external search index. Which feature fits this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Web search tool, because it augments Claude's knowledge with current information regardless of where the documents are hosted.",
      },
      {
        letter: "B",
        text: "Web fetch, because retrieving full page content from specified URLs works equally well for private ticket archives.",
      },
      {
        letter: "C",
        text: "Search results, because it provides citation-quality source attribution for custom knowledge bases outside the public web.",
      },
      {
        letter: "D",
        text: "Code execution, because running retrieval scripts in a sandbox lets the model fetch and cite ticket content directly.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "C", source_e: "C" },
    explanations: {
      claude:
        "The search results content block lets your own RAG pipeline pass retrieved ticket chunks to Claude, each with a source and title. Claude then cites them with the same citation-grounded attribution that web search gives, and no query goes to an external index. Web search (A) sends queries to a public search engine. Web fetch (B) is for publicly reachable URLs, not a private archive. Code execution (D) runs code in a sandbox but has no built-in citation support for your knowledge base.",
      source_e:
        "Discussion:\nSelected Answer: C - Correct answer : C — Search results, because it provides citation-quality source attribution for custom knowledge bases outside the public web. A . Incorrect. The web search tool augments Claude with public web content and is not the mechanism for attributing answers to a private, internal ticket archive. B . Incorrect. Web fetch retrieves content from specified URLs on the web; it is not designed to provide citation attribution over an internal, non-web knowledge base. C . Correct. Search results is built to enable natural citations for RAG applications, achieving web-search-quality citations for custom knowledge bases and internal tools. D . Incorrect. Code execution runs sandboxed code for analysis and file processing; it is not a citation or source-attribution feature for retrieval-augmented answers.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 133,
    kind: "single",
    text: "A long-running autonomous coding agent needs two things in its architecture: automatically clearing stale tool results from context as a session approaches the token limit, and retaining key project facts across separate sessions run days apart. Select all components that correctly satisfy these two needs.",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Context editing, which supports clearing tool results automatically as a conversation approaches the token limit",
      },
      {
        letter: "B",
        text: "The memory tool, which lets Claude store and retrieve information across separate conversations over time",
      },
      {
        letter: "C",
        text: "Fine-grained tool streaming, which reduces latency by streaming tool parameters without JSON buffering",
      },
      {
        letter: "D",
        text: "Compaction, positioned as the sole mechanism that fully replaces context editing for long-running sessions",
      },
      {
        letter: "E",
        text: "Code execution, which runs code in a sandboxed container for data analysis and file processing tasks",
      },
      {
        letter: "F",
        text: "The Files API, which lets uploaded documents be referenced repeatedly without re-uploading their content",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "AB", source_e: "A" },
    explanations: {
      claude:
        "Context editing (A) automatically clears stale tool results as the context nears its token limit. The memory tool (B) keeps project facts across separate sessions. Fine-grained tool streaming (C) only reduces latency, and code execution (E) and the Files API (F) do not manage context or memory. D is wrong because compaction works alongside context editing rather than being the only mechanism that replaces it.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B — Context editing, which supports clearing tool results automatically as a conversation approaches the token limit; The memory tool, which lets Claude store and retrieve information across separate conversations over time A . Correct. Context editing is documented as supporting automatic clearing of tool results when approaching token limits, directly addressing the first need in the scenario. B . Correct. The memory tool is documented as enabling Claude to store and retrieve information across conversations, building knowledge over time, which addresses retaining facts across separate sessions. C . Incorrect. Fine-grained tool streaming reduces latency for large tool-call parameters; it has no role in clearing stale context or retaining cross-session facts. D . Incorrect. Compaction summarizes conversation history automatically, but it is a distinct, separate feature from context editing, not a replacement that makes context editing unnecessary. E . Incorrect. Code execution runs sandboxed code for analysis tasks; it does not manage context size or persist facts across sessions. F . Incorrect. The Files API avoids re-uploading document content across requests, which is useful but does not clear stale tool results or persist project facts across separate sessions.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 134,
    kind: "single",
    text: "A team is choosing between orchestrator-workers and parallelization by sectioning for a document-analysis pipeline. Which statements correctly distinguish orchestrator-workers from parallelization by sectioning?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "In orchestrator-workers, a central LLM determines subtasks at runtime, whereas sectioning requires subtasks predefined before execution",
      },
      {
        letter: "B",
        text: "In orchestrator-workers, worker LLMs run in a fixed, predetermined order, whereas sectioning always runs its subtasks simultaneously",
      },
      {
        letter: "C",
        text: "Orchestrator-workers suits subtasks that vary unpredictably case to case, while sectioning suits tasks that split cleanly into known subtasks",
      },
      {
        letter: "D",
        text: "Parallelization by sectioning always requires a second LLM to evaluate the sectioned outputs before combining them into a final result",
      },
      {
        letter: "E",
        text: "Orchestrator-workers and parallelization by sectioning both aggregate multiple independent votes on one input to reach a majority-based answer",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Anthropic's 'Building effective agents' says the key difference is that in orchestrator-workers the subtasks aren't predefined: a central LLM breaks the input down at runtime and hands the pieces to workers. In sectioning, the developer fixes the split into independent subtasks before execution. C is also accurate, but it describes when to use each pattern, which follows from A, so A is the single best choice. B is wrong because the orchestrator decides at runtime, not in a fixed order. D is wrong because sectioning is combined in code with no evaluating LLM required (that's evaluator-optimizer). E is wrong because it describes voting, not sectioning or orchestrator-workers.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, C — In orchestrator-workers, a central LLM determines subtasks at runtime, whereas sectioning requires subtasks predefined before execution; Orchestrator-workers suits subtasks that vary unpredictably case to case, while sectioning suits tasks that split cleanly into known subtasks A . Correct. The core distinction is that orchestrator-workers decomposes subtasks dynamically at runtime, while sectioning requires the subtasks to be known and fixed before execution starts. B . Incorrect. Orchestrator-workers does not imply a fixed predetermined order for its workers, and this option's framing misstates the relationship between the two patterns. C . Correct. Orchestrator-workers fits unpredictable, case-varying subtask requirements, while sectioning fits tasks that decompose cleanly into known independent pieces ahead of time. D . Incorrect. Sectioning combines independent subtask outputs directly; requiring a second LLM to evaluate and combine them describes evaluator-optimizer, not sectioning. E . Incorrect. Aggregating multiple independent votes on the same input to reach a majority answer describes parallelization by voting, not orchestrator-workers or sectioning.1c",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 135,
    kind: "single",
    text: "A team is building an agent that must audit a large codebase across three distinct dimensions: security vulnerabilities, code quality, and test coverage. Each dimension requires a different set of tools and a different area of focus. Which approach best decomposes this problem using the Agent SDK?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Define an orchestrator agent that invokes specialized subagents through the Agent tool, each configured with a scoped tool set and description matching its subtask domain",
      },
      {
        letter: "B",
        text: "Send one prompt to the main agent instructing it to sequentially perform code quality checks, then security scanning, then test coverage analysis without additional configuration",
      },
      {
        letter: "C",
        text: "Configure a single MCP server that exposes security, quality, and coverage checks as three separate tools, and let the primary agent call each tool directly instead of delegating",
      },
      {
        letter: "D",
        text: "Increase the primary agent's context window and rely on extended thinking so it can reason through all three review dimensions within one continuous session",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "The answer is A. The three dimensions are separate, and each needs its own tools and focus. In the Agent SDK, that is the case for an orchestrator that hands work to specialized subagents through the Agent tool. Each subagent gets its own limited tool set and a description that tells the orchestrator when to use it. Each one also works in its own context, so the main agent's context stays clean. B puts everything in one prompt with no scoping, so tools and context from the three areas get mixed together. C only adds tools and doesn't split the work: one agent still has every tool and does all the reasoning. D tries to fix a design problem with a bigger context window and extended thinking, which still leaves one big, unfocused session.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Define an orchestrator agent that invokes specialized subagents through the Agent tool, each configured with a scoped tool set and description matching its subtask domain A . Correct. The Agent SDK's subagent capability lets an orchestrator delegate focused subtasks to specialized agents, each with its own scoped tools and description, then aggregate their results — the intended decomposition pattern for multi-dimensional review work. B . Incorrect. A single undifferentiated prompt forces one agent to hold all three review contexts and tool needs at once, losing the isolation and specialization benefits of decomposition. C . Incorrect. Exposing checks as tools on one MCP server still leaves a single agent responsible for orchestrating and interpreting all three domains itself, rather than delegating focused reasoning to specialized subagents. D . Incorrect. A larger context window and extended thinking add reasoning depth but do not decompose the task into independently scoped, delegatable units of work.1c:[",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 136,
    kind: "single",
    text: "An enterprise customer's support desk has committed to a contractual 99.9% uptime and sub-2-second p95 response SLA for its Claude-powered ticket triage assistant. During architecture review, the team must select which platform capabilities to prioritize primarily to protect this SLA commitment. Which two capabilities are the most directly relevant to protecting a latency and availability SLA? (Select 2)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Server-side fallback, which retries a refused request against a backup model within the same API call for a timely response",
      },
      {
        letter: "B",
        text: "Choosing a model with faster comparative latency, such as Claude Haiku 4.5, for the latency-sensitive triage path",
      },
      {
        letter: "C",
        text: "Batch processing, which processes large volumes of requests asynchronously at a discounted rate over an extended completion window",
      },
      {
        letter: "D",
        text: "Agent Skills, which extend Claude's capabilities with pre-built instructions and scripts for document-format tasks",
      },
      {
        letter: "E",
        text: "The Files API, which lets documents be uploaded once and referenced across multiple requests without re-uploading content",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "AB", source_e: "A" },
    explanations: {
      claude:
        "B directly addresses the sub-2s p95 latency target by using a faster model such as Claude Haiku 4.5 on the triage path. A protects availability and timeliness: server-side fallback sends the request to a backup model within the same API call, so the user still gets a timely response instead of a failure. C (batch) is asynchronous with a long completion window, which works against real-time SLAs. D (Skills) and E (Files API) add capability and convenience but don't directly protect uptime or latency.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B — Server-side fallback, which retries a refused request against a backup model within the same API call for a timely response; Choosing a model with faster comparative latency, such as Claude Haiku 4.5, for the latency-sensitive triage path A . Correct. Server-side fallback keeps a request from failing outright by automatically retrying against a named backup model within the same call, directly protecting availability and response-time commitments when the primary model declines a request. B . Correct. Selecting a model chosen for faster comparative latency, such as Haiku 4.5, directly targets the sub-2-second p95 requirement on the synchronous triage path, making it a core lever for meeting the SLA. C . Batch processing is designed for asynchronous, non-latency-sensitive workloads with an extended completion window, which is the opposite of what a sub-2-second synchronous SLA requires. D . Agent Skills extend task capability for document-format work such as spreadsheets or slides; they are not a mechanism for protecting response latency or uptime commitments. E . The Files API reduces redundant re-uploading of documents across requests, which helps with convenience and token efficiency but is not a direct lever for latency or availability SLA protection.1c",
    },
    confidence: { claude: "medium" },
    flags: { source_e: "marks 1, question asks for two" },
  },
  {
    id: 137,
    kind: "single",
    text: "A manufacturing client wants a Claude-based quality-inspection assistant that repeatedly analyzes the same reference specification documents alongside new inspection reports throughout the day. The client's stated goal is to reduce redundant token spend on the unchanging reference material while keeping individual inspection turnaround fast. Which architectural choice best serves this efficiency and cost goal?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Use prompt caching so the unchanging reference specification is cached and reused across requests, cutting cost and latency",
      },
      {
        letter: "B",
        text: "Move the entire workload to the Message Batches API so all inspection reports are processed together once per day",
      },
      {
        letter: "C",
        text: "Increase the effort parameter to xhigh on every inspection request so Claude reasons more thoroughly each time",
      },
      {
        letter: "D",
        text: "Re-upload the full reference specification as plain text in every single request to guarantee the model always has the latest version",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Prompt caching suits a large, unchanging prefix (the reference specs) that gets reused across many requests. Cache reads are billed at a small fraction of the normal input price, and they also cut time-to-first-token, so each inspection stays fast. Option B (Batches API) saves money but is asynchronous and can take hours, so it fails the fast-turnaround requirement. Option C raises token spend and latency instead of lowering them. Option D is the redundant spend the client wants to get rid of.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Use prompt caching so the unchanging reference specification is cached and reused across requests, cutting cost and latency A . Correct. Prompt caching is designed exactly for this pattern: providing Claude with recurring background context, such as an unchanging reference document, so subsequent requests reduce both cost and latency instead of reprocessing the same content each time. B . Batch processing trades same-day turnaround for cost savings on non-urgent work, which conflicts with the client's requirement to keep individual inspection turnaround fast throughout the day. C . Raising the effort parameter increases reasoning depth and token usage per request, which adds cost rather than reducing the redundant token spend the client wants to cut. D . Re-uploading the full reference document in every request is the exact redundant-token pattern the client wants eliminated, and it neither reduces cost nor improves turnaround.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 138,
    kind: "single",
    text: "A coding assistant must modify an unknown number of files across a repository to implement a feature, where the exact files and scope of changes can only be determined once the assistant inspects the codebase. Which pattern is most appropriate?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Orchestrator-workers, where a central LLM inspects the repository and dynamically delegates each file edit to a worker LLM",
      },
      {
        letter: "B",
        text: "Prompt chaining, where the assistant edits files in a fixed sequence determined before inspecting the repository",
      },
      {
        letter: "C",
        text: "Parallelization by sectioning, where the assistant edits every file in the repository simultaneously using a predetermined split",
      },
      {
        letter: "D",
        text: "Routing, where the assistant classifies the feature request and sends it to one of several fixed file-editing prompts",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Orchestrator-workers fits tasks where you can't know the subtasks ahead of time. A central LLM looks through the codebase, works out which files need changing, and hands each edit to a worker. Anthropic's \"Building effective agents\" guide uses this exact case (coding changes across many files) as its example. Prompt chaining (B) and sectioning (C) both depend on a fixed sequence or split decided in advance, which you can't do when the scope is unknown. Routing (D) only sends the request to one of several fixed prompts, so it can't handle a variable set of file edits.",
      source_e:
        'Discussion:\nSelected Answer: A - Correct answer : A — Orchestrator-workers, where a central LLM inspects the repository and dynamically delegates each file edit to a worker LLM A . Correct. Anthropic describes the orchestrator-workers pattern as having a central LLM dynamically break down tasks, delegate them to worker LLMs, and synthesize results. Official guidance states this pattern is "well-suited for complex tasks where you can\'t predict the subtasks needed (in coding, for example, the number of files that need to be changed and the nature of the change in each file likely depend on the task)." This matches the scenario of an unpredictable set of repository edits. Anthropic does note that real-time coordination among coding agents is still challenging, but among the available workflow patterns this is the documented fit. B . Incorrect. Prompt chaining uses a predefined sequence in which the output of one step feeds the next. In this scenario, the files and scope of changes cannot be known until the repository is inspected, so a fixed sequence determined before inspection would likely miss the correct edits or require rework. A dynamic delegation pattern such as orchestrator-workers is more appropriate. C . Incorrect. Parallelization by sectioning works when the task can be divided into independent, predictable sections before execution. Here the exact files are unknown and cannot be predetermined before inspecting the codebase. Editing every file simultaneously using a fixed split would be inefficient and could introduce incorrect changes; orchestrator-workers handles dynamic delegation instead. D . Incorrect. Routing classifies an input and sends it to a specialized fixed prompt or workflow, but it does not inspect the repository and dynamically delegate individual file edits as subtasks emerge. The described task requires dynamic planning and delegation, which is characteristic of the orchestrator-workers pattern.21',
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 139,
    kind: "single",
    text: "A developer is building an email-triage agent that reads inbound email bodies via a tool and drafts replies. To harden it against embedded instructions in email bodies, which combination of design choices should the developer apply? (Select all that apply)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "State a system prompt policy that content returned by tools is untrusted data and must never override the system prompt or the user's original request",
      },
      {
        letter: "B",
        text: "JSON-encode the email body when passing it as a tool result so quotes or tags in the content cannot break out of the surrounding structure",
      },
      {
        letter: "C",
        text: "Screen tool outputs with a lightweight classifier model before passing them to the main agent, and strip or flag content if an injection is suspected",
      },
      {
        letter: "D",
        text: "Place the developer's own operating instructions inside the same tool_result block as the email body so both travel together in one message",
      },
      {
        letter: "E",
        text: "Grant the agent broad, unscoped access to the user's full mailbox and account settings so it never needs to ask for additional permissions mid-task",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "ABC", source_e: "A" },
    explanations: {
      claude:
        'The question says both "select all that apply" and "choose exactly one", so I answered with every valid defense. A sets a policy that tool results are untrusted data and can\'t override the system prompt or user request. B JSON-encodes the email body so quotes or tags can\'t break out of their container. C adds a classifier that screens tool outputs before the main agent sees them. D is wrong because it mixes trusted instructions with untrusted email text, and E is wrong because broad unscoped access makes a successful injection more damaging. If only one letter is allowed, choose A.',
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B, C — State a system prompt policy that content returned by tools is untrusted data and must never override the system prompt or the user's original request; JSON-encode the email body when passing it as a tool result so quotes or tags in the content cannot break out of the surrounding structure; Screen tool outputs with a lightweight classifier model before passing them to the main agent, and strip or flag content if an injection is suspected A . Correct. Stating explicitly that tool-returned content is untrusted data that must not override instructions is a core documented mitigation for indirect prompt injection. B . Correct. JSON-encoding untrusted content provides unambiguous delimiters so an attacker cannot break out of the data context into an instruction context. C . Correct. Screening tool outputs with a lightweight classifier before they reach the main conversation is a documented pattern for catching injected instructions in tool results. D . Incorrect. Anthropic explicitly advises against placing your own instructions in tool results, since Claude is trained to treat tool-result content as untrusted data and may ignore or flag instructions placed there. E . Incorrect. This violates the least-privilege principle; broad unscoped access increases the damage a successful injection could cause rather than limiting it.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 140,
    kind: "single",
    text: "A team is building an English-to-Spanish translation feature that will be called repeatedly with different user-submitted text. They want to keep the instructional wording consistent across calls while making it easy to swap in new text and track changes to the instructions separately from the text being translated. Which approach best fits this goal?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Define a prompt template with the fixed instruction text and a placeholder such as {{text}}, substituting only the variable content on each call while the surrounding instructions stay constant.",
      },
      {
        letter: "B",
        text: "Regenerate the complete translation prompt on every call by constructing the instruction string dynamically with the user's text, ensuring that each request carries an up-to-date version of the wording.",
      },
      {
        letter: "C",
        text: "Store the entire prompt containing the fixed instructions and the user's text as one static string, editing the string by hand for each new translation request so the prompt is always up to date.",
      },
      {
        letter: "D",
        text: "Send the fixed instruction text and the user's text to the model in two separate API calls, then concatenate the responses, placing the translation after the instruction output to form the final result.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "A prompt template keeps the instruction text fixed, so it stays consistent and can be version-controlled on its own. Only a placeholder like {{text}} gets filled in with the user's text on each call, which makes swapping in new text easy. B rebuilds the instructions on every call, so the wording can drift and changes are hard to track. C means editing a hard-coded string by hand for each request, which is error-prone and mixes the instructions with the text. D splits the instructions and the text into separate calls, so the model never sees them together and the translation won't work.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Define a prompt template with the fixed instruction text and a placeholder such as {{text}}, substituting only the variable content on each call while the surrounding instructions stay constant. A . Correct. A prompt template separates fixed instructions from variable placeholders like {{text}}. This keeps the instructional wording consistent across calls, lets the variable content change per request, and makes it straightforward to version and track the fixed portion independently of what's being translated. B . Incorrect. Regenerating the complete prompt including instructions on every call defeats the goal of keeping instructional wording consistent, because the surrounding text may drift. It also makes it harder to track changes to the instructions independently from the user's text. C . Incorrect. Storing the entire prompt as one static string and editing it by hand conflates fixed instructions with variable content, making it error-prone and hard to test edge cases. This approach does not allow tracking instruction changes separately from the translated text. D . Incorrect. Splitting into two API calls and concatenating responses adds unnecessary complexity and cost without providing reusable instruction wording. It does not achieve the goal of maintaining consistent, separately trackable instructions.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 141,
    kind: "single",
    text: "An agent runs long tool-use loops involving dozens of file reads per session. The team wants old tool results automatically cleared once input tokens exceed 30,000, while always preserving the 3 most recent tool exchanges and never clearing results from the web_search tool. Which context_management configuration achieves this?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Configure a clear_tool_uses_20250919 edit with trigger set to 30000 input tokens, keep 3 tool uses, exclude_tools set to web_search.",
      },
      {
        letter: "B",
        text: "A clear_thinking_20251015 edit with trigger set to 30000 input tokens, keep set to 3 thinking turns, and exclude_tools set to web_search should be used.",
      },
      {
        letter: "C",
        text: "A clear_tool_uses_20250919 edit with trigger set to tool_uses 30000, with no keep value explicitly set, and with no exclude_tools value explicitly set.",
      },
      {
        letter: "D",
        text: "A clear_tool_uses_20250919 edit with trigger set to 30000 input tokens, keep set to 3 tool uses, and exclude_tools set to file_read should be used.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "clear_tool_uses_20250919 is the context-editing strategy that clears old tool results. Option A sets its trigger to 30,000 input_tokens, keeps the 3 most recent tool uses, and puts web_search in exclude_tools so its results are never cleared. Option B uses clear_thinking, which clears thinking blocks, not tool results. Option C uses the wrong trigger type and leaves out keep and exclude_tools. Option D excludes the wrong tool, so web_search results could still be cleared.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Configure a clear_tool_uses_20250919 edit with trigger set to 30000 input tokens, keep 3 tool uses, exclude_tools set to web_search. A . Correct. clear_tool_uses_20250919 is the appropriate edit for clearing old tool results. Setting the trigger to 30,000 input tokens, keeping the 3 most recent tool uses, and excluding web_search meets all specified requirements: auto-clears at the token threshold, preserves the last 3 exchanges, and never clears web_search results. B . Incorrect. The clear_thinking_20251015 edit is designed to manage extended thinking blocks, not tool results. Using it would fail to clear old file-read outputs, regardless of trigger or exclusion settings. C . Incorrect. This configuration triggers on a tool_uses count of 30,000 instead of the required input token threshold. Additionally, without setting keep or exclude_tools, recent tool exchanges are not preserved, and web_search results are not protected from clearing. D . Incorrect. Excluding file_read instead of web_search results in file_read results being never cleared, while web_search results remain subject to automatic clearing—the opposite of the requirement.1c:[",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 142,
    kind: "single",
    text: "A code-review prompt needs Claude to generate a fix, verify the fix against a set of criteria, and then refine the fix if criteria are not met. The team wants to inspect the intermediate review step and log it separately before the final refinement is produced. Which approach best fits this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Ask Claude to generate, verify, and refine the fix in one response using extended reasoning, but this keeps the review internal and unloggable.",
      },
      {
        letter: "B",
        text: "Break the task into separate API calls: generate a fix, review it against the criteria, then refine the fix, so each step can be logged independently.",
      },
      {
        letter: "C",
        text: "Add <thinking> tags around the review step so Claude places the review inside and the fix outside, and the review can be extracted and logged apart.",
      },
      {
        letter: "D",
        text: "Provide five few-shot examples of correct fixes for Claude to mimic, bypassing the review step, removing the intermediate step and preventing logging.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "B", source_e: "B" },
    explanations: {
      claude:
        "Prompt chaining splits the work into separate API calls: generate the fix, review it against the criteria, then refine it. Each step's output can be inspected and logged before the next call runs, which is the standard self-correction chain pattern. Option A keeps the review inside one response, so the team can't log it as its own step. Option C still produces everything in a single response, so the team can't step in before the refinement is generated, and parsing tags is less reliable than separate calls. Option D removes the review step entirely, which defeats the requirement.",
      source_e:
        "Discussion:\nSelected Answer: B - Correct answer : B — Break the task into separate API calls: generate a fix, review it against the criteria, then refine the fix, so each step can be logged independently. A . Incorrect. Asking Claude to handle everything in one response with extended reasoning keeps the review internal to the model's generation process. The intermediate verification step cannot be extracted or logged separately, which fails to meet the team's logging requirement. B . Correct. Breaking the task into separate API calls implements a self-correction chaining pattern where each phase—generation, review against criteria, and refinement—is isolated. Each step can be independently inspected, logged, or branched on, exactly matching the need for separate logging. C . Incorrect. While adding <thinking> tags might seem to separate the review visually, the entire generation, review, and refinement still occur in a single API response. This makes it impractical to reliably extract and log a clean intermediate review step without mixing it with the draft or refinement content. D . Incorrect. Providing few-shot examples for Claude to mimic bypasses the explicit review-against-criteria step entirely. Without performing a distinct review and refinement cycle, there is no intermediate step to log, so this approach fails to satisfy the requirement.1c:[\"$",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 143,
    kind: "single",
    text: "A platform wants Claude to discover tools using an existing embeddings index rather than the built-in regex or BM25 matching, because tool descriptions are sparse but semantically related through the embedding space. Which implementation matches this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Build a custom tool that runs the embeddings search and returns tool_reference blocks in its tool_result for Claude to expand.",
      },
      {
        letter: "B",
        text: "Enable the built-in BM25 tool search variant, since BM25 ranking approximates embedding-based semantic similarity closely enough.",
      },
      {
        letter: "C",
        text: "Enable the built-in regex tool search variant and rely on broad wildcard patterns to approximate semantic matching.",
      },
      {
        letter: "D",
        text: "Disable tool search and load every tool definition up front so the embeddings index becomes unnecessary.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Claude's tool search can be extended with a custom search tool. Your tool runs its own logic (here, the embeddings index) and returns tool_reference blocks in its tool_result. Claude then expands those references into full tool definitions, with the deferred tools marked defer_loading. B and C stick with built-in lexical matching (BM25 or regex), which can't capture semantic links between sparse descriptions. D drops tool search entirely, which bloats the context and ignores the stated requirement.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Build a custom tool that runs the embeddings search and returns tool_reference blocks in its tool_result for Claude to expand. A . Correct. A custom client-side tool search implementation can run any retrieval method, including embeddings, and return standard tool_result content with tool_reference blocks, which the API expands into full tool definitions. B . BM25 is a term-frequency-based lexical ranking method, not a true semantic embedding similarity search, so it would not reproduce the intended embeddings-based matching. C . Regex matching operates on literal patterns against names and descriptions and cannot capture semantic relationships between sparse, differently worded tool descriptions. D . Loading every definition up front abandons retrieval entirely and reintroduces the context bloat problem that made an embeddings-based discovery approach necessary.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 144,
    kind: "single",
    text: "A support-ticket assistant retrieves passages from a 500-document internal knowledge base for each incoming ticket and must cite the exact source passage in every reply, without re-sending the entire corpus on each request. Which approach best matches this data shape and query pattern?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Return the retrieved passages as search result content blocks from a retrieval tool, each carrying source and title metadata, so Claude generates natural citations per ticket.",
      },
      {
        letter: "B",
        text: "Upload all 500 documents as citable text documents in the system prompt so that Claude can reference any passage directly, and then instruct it to cite the source document and section for every reply.",
      },
      {
        letter: "C",
        text: "Concatenate the full corpus into a single long-context user message with all 500 documents separated by titles, then prompt Claude to extract the relevant passage and cite its source.",
      },
      {
        letter: "D",
        text: "Store the corpus in the memory tool by saving each document as a separate entry, configure assistant to load all entries before answering, and prompt it to cite source document for any retrieved passage.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "The data is a big corpus, and for each ticket the app pulls a few relevant passages. Search result content blocks were built for this RAG pattern. A retrieval tool returns only the passages it found, each tagged with its source and title, and Claude cites them on its own. B and C send all 500 documents on every request, which the question rules out, and that costs a lot of tokens and adds latency. D is wrong because the memory tool keeps the agent's state between sessions; it isn't a retrieval or citation feature, and loading every entry before each answer resends the whole corpus anyway.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Return the retrieved passages as search result content blocks from a retrieval tool, each carrying source and title metadata, so Claude generates natural citations per ticket. A . Correct. This approach uses a retrieval tool to dynamically fetch only relevant passages per query, with each result block including source and title metadata. This enables Claude to generate natural citations without resending the entire corpus, which is efficient and aligns with the need for exact source passage citations. B . Incorrect. Uploading all 500 documents in the system prompt sends the full corpus with every request, defeating the purpose of avoiding corpus resending. It also wastes context on irrelevant passages, making it inefficient for a repeated ticket-answering workflow. C . Incorrect. Concatenating the full corpus into a long user message per request is costly in terms of tokens and degrades accuracy as context grows. It skips the targeted retrieval step that efficiently supplies only relevant passages, which is what this query pattern requires. D . Incorrect. The memory tool is intended for Claude to persist notes across conversation turns, not as a document retrieval index. Storing each document as a memory entry and loading all entries for each query is inefficient and does not support targeted retrieval with source metadata for citations.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 145,
    kind: "single",
    text: "A team originally split their onboarding manual into fixed 500-character chunks with no overlap. They now find that many chunks begin or end mid-sentence, and answers near a chunk boundary are frequently missed because the relevant sentence is split across two separate embeddings. Which chunking adjustment most directly addresses this specific failure?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Split chunks along natural boundaries such as paragraphs or sections, and add a small overlap between adjacent chunks so boundary sentences appear intact in at least one chunk.",
      },
      {
        letter: "B",
        text: "Reduce the chunk size so each chunk contains exactly one sentence, splitting on punctuation such as periods or exclamation points, and drop the fixed character limit to prevent mid-sentence breaks.",
      },
      {
        letter: "C",
        text: "Remove overlap and set a smaller fixed chunk size, such as 250 characters, to lower the vector index count and accelerate semantic search without changing how sentences are split.",
      },
      {
        letter: "D",
        text: "Keep the fixed 500-character boundaries and increase the embedding model's context window so that each vector encodes more surrounding text, reducing missed answers near splits.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "The problem is that fixed-size chunks cut sentences in half at chunk boundaries. A fixes this in two ways. Splitting on paragraphs or sections stops chunks from breaking mid-sentence, and a small overlap means any sentence near a boundary still appears whole in at least one chunk. B goes too far: chunks of one sentence each lose the surrounding context that retrieval needs. C makes the boundary problem worse, because smaller chunks with no overlap create more splits. D doesn't help, since the chunk boundaries stay the same and a bigger embedding context window can't add text that isn't in the chunk.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Split chunks along natural boundaries such as paragraphs or sections, and add a small overlap between adjacent chunks so boundary sentences appear intact in at least one chunk. A . Correct. Chunking on natural document boundaries such as paragraphs or sections, combined with a small overlap, ensures that sentences near chunk edges appear intact in at least one chunk. This directly addresses the problem of split-sentence retrieval failures. B . Incorrect. Reducing chunks to single sentences by splitting on punctuation eliminates mid-sentence breaks, but loses the surrounding context necessary for accurate retrieval. Additionally, multi-sentence ideas are still separated across chunks, which can degrade answer completeness. C . Incorrect. Removing overlap and using smaller fixed-size chunks increases the likelihood that a relevant sentence will be split across a chunk boundary. This strategy worsens the original problem rather than resolving it. D . Incorrect. Increasing the embedding model's context window does not change where the pipeline cuts text; with fixed 500-character boundaries, sentences near the cuts remain split. The retrieval misses at boundaries persist regardless of the model's capacity.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 146,
    kind: "single",
    text: "An agent's project has accumulated a dozen skills, several of which perform side-effecting actions such as sending Slack messages or deleting stale branches. Reviewers notice Claude occasionally auto-triggers these side-effecting skills based on vague description matches, and want to reduce the agent's effective capability surface so these skills only run when a person explicitly invokes them. What is the most direct fix?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Set disable-model-invocation: true in the frontmatter of each side-effecting skill so Claude cannot select them automatically and only the user can invoke them with /name.",
      },
      {
        letter: "B",
        text: "Delete the skill descriptions from the frontmatter of each side-effecting skill so Claude has no basis for automatic matching and only the user can invoke those skills by name.",
      },
      {
        letter: "C",
        text: "Move the side-effecting skills into CLAUDE.md so they load as always-on context, which ensures Claude only uses them when the user explicitly invokes them by name in a request.",
      },
      {
        letter: "D",
        text: "Rewrite the instructions of each side-effecting skill to instruct Claude to ask for confirmation before performing the side effect, without modifying frontmatter fields.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Setting disable-model-invocation: true in a skill's frontmatter is the built-in way to stop Claude from picking that skill on its own. The user can still run it with /name, which is exactly what the reviewers want. B is wrong because removing the description doesn't reliably block auto-invocation, since Claude may fall back to the content. It also makes the skills harder to find and manage. C is wrong because putting the skills in CLAUDE.md makes them always-on context, which widens what Claude can do instead of gating it. D still lets Claude select the skill automatically and relies on a prompt-level confirmation step, so it doesn't actually shrink what Claude can trigger.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Set disable-model-invocation: true in the frontmatter of each side-effecting skill so Claude cannot select them automatically and only the user can invoke them with /name. A . Correct. Setting `disable-model-invocation: true` in the frontmatter hides the skill from Claude's automatic selection, so it cannot be triggered by vague description matches. The skill becomes accessible only when a user explicitly invokes it with `/name`, thus reducing the effective capability surface as intended. B . Incorrect. Deleting skill descriptions may prevent automatic matching, but skills also rely on descriptions for proper discovery and correct invocation by users. This approach is not the documented method for controlling automatic model invocation and could lead to confusion or broken workflows. C . Incorrect. Moving skills into `CLAUDE.md` would load them as always-on context in every session, meaning Claude could still act on them without an explicit user request, potentially increasing the effective capability surface rather than reducing it. D . Incorrect. Adding instructions to ask for confirmation does not prevent Claude from auto-triggering the skill based on description matches; the skill may still be activated automatically, only then prompting for confirmation. This does not restrict invocation to explicit user commands.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 147,
    kind: "single",
    text: 'A team is defining the success criteria for a new claims-summarization feature before building the evaluation dataset. The current draft criterion reads: "the summaries should be concise and helpful." Which revised criterion best follows the SMART framework for evaluation design?',
    images: [],
    choices: [
      {
        letter: "A",
        text: "Require summaries to average at least 4 out of 5 on a completeness rubric across a 500-claim sample",
      },
      {
        letter: "B",
        text: "Require summaries to earn a perfect 5 out of 5 completeness score from every adjuster in the sample",
      },
      {
        letter: "C",
        text: "Require summaries to sound less robotic and read more naturally to the adjusters who review them",
      },
      {
        letter: "D",
        text: "Require every summary to be signed off by a senior adjuster before it counts as acceptable",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Option A is specific (a completeness rubric), measurable (an average of at least 4 out of 5), achievable (it targets an average, not perfection) and relevant to summary quality. It also sets a clear sample of 500 claims. Option B asks for a perfect score from every adjuster, which isn't realistic. Option C is just as subjective and hard to measure as the original draft. Option D is an approval gate run by people, not a success criterion you can measure.",
      source_e:
        'Discussion:\nSelected Answer: A - Correct answer : A — Require summaries to average at least 4 out of 5 on a completeness rubric across a 500-claim sample A . Correct. This criterion is specific (completeness rubric), measurable (numeric threshold), achievable (a 4/5 average rather than perfection), and relevant (tied directly to summary quality), and it defines a concrete sample size for measurement. B . Incorrect. Requiring a perfect score from every adjuster is not achievable in practice; SMART criteria should be realistic targets grounded in frontier model capability, not unattainable perfection. C . Incorrect. "Sound less robotic" and "read more naturally" are not measurable without a defined metric or scale, so this fails the Measurable requirement of SMART criteria. D . Incorrect. This describes a manual sign-off process, not a measurable success criterion for the model\'s output quality, so it does not give the evaluation team a quantifiable target.',
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 148,
    kind: "single",
    text: "A platform engineer sets CLAUDE_CODE_ENABLE_TELEMETRY=1 on every CI runner but the team's OTLP collector never receives any spans, metrics, or logs from Claude Code jobs. No other telemetry variables were configured. What is the most likely cause of the missing data?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The collector rejects every signal until CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1 is also set, regardless of which exporters are chosen",
      },
      {
        letter: "B",
        text: "Telemetry is enabled but no exporter was selected, so OTEL_METRICS_EXPORTER and OTEL_LOGS_EXPORTER default to producing no export at all",
      },
      {
        letter: "C",
        text: "The CLI only emits telemetry once the console exporter has been configured first as a required local fallback",
      },
      {
        letter: "D",
        text: "The organization's Admin API key must be exported through OTEL_EXPORTER_OTLP_HEADERS before the CLI will emit any signal",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "B", source_e: "B" },
    explanations: {
      claude:
        "CLAUDE_CODE_ENABLE_TELEMETRY=1 only turns telemetry on. You must also choose exporters (e.g., OTEL_METRICS_EXPORTER=otlp, OTEL_LOGS_EXPORTER=otlp) and usually set the protocol and endpoint, or nothing is sent to the collector. A is wrong because the enhanced-telemetry beta flag only affects traces, not metrics or logs. C is wrong because the console exporter is an optional debugging aid, not a requirement. D is wrong because no Admin API key is needed; OTLP headers are optional auth that depends on the collector.",
      source_e:
        "Discussion:\nSelected Answer: B - Correct answer : B — Telemetry is enabled but no exporter was selected, so OTEL_METRICS_EXPORTER and OTEL_LOGS_EXPORTER default to producing no export at all A . Incorrect. The enhanced telemetry beta flag is only required to unlock distributed tracing spans; metrics and log events do not depend on it, and it has no bearing on whether an exporter is configured. B . Correct. Enabling telemetry alone does not choose a destination. Each signal has its own exporter switch (OTEL_METRICS_EXPORTER, OTEL_LOGS_EXPORTER, OTEL_TRACES_EXPORTER), and leaving them unset means nothing is exported even though telemetry generation is on. C . Incorrect. The console exporter is one optional choice among several (otlp, prometheus, console, none); it is not a prerequisite the CLI requires before other exporters will function. D . Incorrect. OTEL_EXPORTER_OTLP_HEADERS carries authentication for the collector endpoint, not an Anthropic Admin API key, and its absence would cause auth failures at the collector, not a total absence of any emitted telemetry.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 149,
    kind: "single",
    text: "An agentic coding assistant runs long sessions that accumulate hundreds of tool calls, and the conversation regularly approaches the model's context window limit before the task is finished. Engineers want strategies that let the session continue productively without losing critical state. Which approaches address this goal?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Enable server-side compaction so earlier turns are automatically summarized once the conversation nears the context window limit",
      },
      {
        letter: "B",
        text: "Configure context editing to clear old tool results once a token threshold is reached, keeping only recent tool use/result pairs",
      },
      {
        letter: "C",
        text: "Use the memory tool to persist critical state to durable storage before old context is cleared, so a session recovers quickly",
      },
      {
        letter: "D",
        text: "Lower the effort parameter to low so Claude generates shorter replies, preventing the context window from ever filling up",
      },
      {
        letter: "E",
        text: "Switch the session to the Message Batches API so each turn runs as an independent asynchronous request with fresh context",
      },
      {
        letter: "F",
        text: "Increase the effort parameter to max so Claude reasons more thoroughly and needs fewer total turns to finish the task",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Server-side compaction summarizes earlier turns once the conversation nears the context limit, so the session can continue while keeping its important state. That makes it the most complete single answer. Context editing (B) and the memory tool (C) are complementary but partial: B clears tool results and may lose state, and C saves state without freeing any context unless something else clears it. The effort settings (D and F) don't stop hundreds of tool calls from filling the window, and the Batches API (E) runs separate asynchronous requests that break an interactive agent loop with shared state.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B, C — Enable server-side compaction so earlier turns are automatically summarized once the conversation nears the context window limit; Configure context editing to clear old tool results once a token threshold is reached, keeping only recent tool use/result pairs; Use the memory tool to persist critical state to durable storage before old context is cleared, so a session recovers quickly A . Correct. Server-side compaction is the primary strategy for long-running conversations that approach context window limits: it automatically summarizes earlier turns on the server so the session can continue past the limit. B . Correct. Context editing's tool result clearing removes old tool results once a configured trigger is reached while preserving the most recent tool use/result pairs, directly freeing context space in tool-heavy agentic sessions. C . Correct. The memory tool's multi-session pattern is designed to offload critical state to durable storage before context is cleared or a new session starts, so essential information is not lost when older turns are summarized or removed. D . Lowering effort reduces token spend per turn but does not prevent the accumulated conversation history itself from growing and eventually approaching the context window limit. E . The Batch API is for independent asynchronous requests without immediate responses, not for continuing a single long-running interactive session, and splitting it into fresh-context chunks would lose the conversation's accumulated state. F . Raising effort to max increases token spend per turn for maximum capability; it does not reduce the number of turns needed and does not itself address a growing context window, since higher-effort turns can consume context faster.1c",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 150,
    kind: "single",
    text: "A team wants to lower per-request cost and latency for a chat feature without switching models or losing response quality on genuinely hard questions. They want the model itself to spend fewer tokens on easy turns while still reasoning thoroughly on complex ones. Which lever should they reach for first?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Lower the effort parameter for routine turns, since it reduces token spend while letting Claude think harder when warranted",
      },
      {
        letter: "B",
        text: "Disable prompt caching entirely, since removing all cached writes always guarantees the very lowest possible token count of all",
      },
      {
        letter: "C",
        text: "Force every request through the Message Batches API, since batch requests are billed at a flat discounted rate",
      },
      {
        letter: "D",
        text: "Set max_tokens to a small fixed value on all requests so Claude cannot generate long responses on hard questions",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "The effort parameter is the built-in way to trade token spend against thoroughness. Lowering it cuts tokens and latency on routine turns, and Claude can still reason more deeply when a question needs it. B is wrong because turning off prompt caching usually raises cost and latency rather than lowering them. C is wrong because the Batches API is asynchronous and doesn't suit an interactive chat. D is wrong because a small hard cap on max_tokens would cut off answers to hard questions and hurt quality.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Lower the effort parameter for routine turns, since it reduces token spend while letting Claude think harder when warranted A . Correct. The effort parameter is described as a behavioral signal that trades thoroughness for token efficiency across text, tool calls, and thinking, within a single model. At lower effort, Claude still thinks on sufficiently difficult problems but spends fewer tokens on simpler ones, which is exactly the described goal. B . Cache writes do cost more than base input, but cache reads cost 90% less; disabling caching entirely removes the possibility of cheap cache reads and would generally increase, not decrease, cost for any repeated content. C . The Batch API requires asynchronous processing without immediate responses, which is incompatible with an interactive chat feature, and it does not adapt token spend to per-turn difficulty. D . A small fixed max_tokens risks truncating responses on genuinely hard questions where more output is needed, directly conflicting with the requirement to preserve quality on complex turns.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 151,
    kind: "single",
    text: "Ahead of launch, a product manager sets a success criterion requiring the model to achieve 100% accuracy on an open-ended reasoning task, with zero tolerance for any incorrect or incomplete answer, matching or exceeding what a domain expert could produce. What is the main problem with this success criterion, and how should it be revised?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The target is unachievable because it exceeds realistic frontier-model capability. It should instead be grounded in benchmark results, prior experiments, or comparable industry performance.",
      },
      {
        letter: "B",
        text: "The target is not specific enough because it does not name a single numeric metric, so it should be replaced with a quantifiable percentage like a 95% accuracy score, regardless of feasibility.",
      },
      {
        letter: "C",
        text: "The target is not relevant because reasoning tasks should never have accuracy targets; instead, the criterion should specify maximum latency and cost, which are the only meaningful production metrics.",
      },
      {
        letter: "D",
        text: "The target is not measurable because open-ended tasks cannot be scored automatically under any circumstances, so the criterion should rely on subjective human ratings with no automated evaluation.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        'The criterion breaks the "achievable" part of good success criteria. Demanding 100% accuracy with zero tolerance on an open-ended reasoning task is beyond what current frontier models can realistically do. The target should be based on benchmarks, earlier experiments, or comparable industry results. B swaps in an arbitrary number while ignoring whether it is feasible. C is wrong because accuracy targets are valid for reasoning tasks. D is wrong because open-ended tasks can be measured with rubrics, LLM-based grading, and human review together, so they are not impossible to score.',
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — The target is unachievable because it exceeds realistic frontier-model capability. It should instead be grounded in benchmark results, prior experiments, or comparable industry performance. A . Correct. The target of 100% accuracy with zero tolerance is unachievable because it exceeds realistic frontier-model capability. It should be grounded in benchmark results, prior experiments, or comparable industry performance to ensure the success criterion is realistic and attainable. B . Incorrect. The target is already specific: 100% accuracy is a single numeric metric. The real problem is that it is unachievable, not that it lacks specificity, so replacing it with an arbitrary percentage like 95% without considering feasibility does not address the core issue. C . Incorrect. Accuracy targets are relevant and appropriate for reasoning tasks; the problem is the unrealistic threshold, not the use of an accuracy metric. Additionally, latency and cost are not the only meaningful production metrics—accuracy and safety are also critical. D . Incorrect. Open-ended reasoning tasks can be scored automatically using methods like LLM-based evaluation or rubric-based grading, so measurability is not the main problem. The core issue is that the 100% zero-tolerance target is unachievable and not grounded in realistic performance.1c:[",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 152,
    kind: "single",
    text: "A team has been iterating on a claims-processing prompt using the same 200-example development set for every round of refinement. They now want to declare a final winning version before shipping. What should they do before making that final decision?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Evaluate the leading prompt candidate on a separate held-out test set not used during iteration to confirm that improvements generalize beyond the development set.",
      },
      {
        letter: "B",
        text: "Run one more round of refinement on the same 200-example development set, perhaps switching to a different model or adding few-shot examples, to maximize the score before finalizing the prompt.",
      },
      {
        letter: "C",
        text: "Reduce the development set to only the examples that the current prompt candidate already passes, then present the accuracy on that subset as the final metric to make the score appear higher.",
      },
      {
        letter: "D",
        text: "Ship the candidate that achieves the highest score on the 200-example development set right away, as iteratively refining on that same set already demonstrates its production readiness.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "After many rounds of tuning on the same 200 examples, the prompt has probably overfit to that set, so its score there overstates how well it will do in production. Testing the leading candidate on a separate held-out set that was never used during iteration gives an unbiased check that the gains carry over to new data. B tunes even harder on the same set and makes the overfitting worse. C deliberately inflates the metric by dropping the failures. D treats a score biased by repeated tuning as proof that the prompt is ready to ship.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Evaluate the leading prompt candidate on a separate held-out test set not used during iteration to confirm that improvements generalize beyond the development set. A . Correct. Reusing the same development set throughout iterations risks overfitting, so the candidate may not generalize. Testing on a separate held-out set is essential to confirm that improvements extend beyond the development data. B . Incorrect. Another round of refinement on the same set only deepens overfitting to that specific data, making the prompt less reliable on new examples. Maximizing the development score does not guarantee real-world performance. C . Incorrect. Discarding failing examples creates an artificially high accuracy that masks the prompt's true weaknesses. This cherry-picking prevents fair assessment and leads to an unreliable final metric. D . Incorrect. The highest score on the iteratively used development set likely reflects overfitting to that set's specific patterns. Production readiness requires validation on unseen data to ensure the prompt performs well in practice.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 153,
    kind: "single",
    text: "A team currently runs a moderately complex data-extraction workflow on Claude Haiku 4.5. Which of the following observations would be valid evidence that the workflow has a model-capability mismatch and should be evaluated on a more capable model like Claude Opus 4.8? (Select all that apply.)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "On a use-case benchmark, accuracy on multi-step reasoning subtasks stays below threshold even after prompt revisions.",
      },
      {
        letter: "B",
        text: "The workflow needs nuanced understanding across long chains of interdependent steps where partial errors compound.",
      },
      {
        letter: "C",
        text: "Manual review shows the extraction errors resemble genuine reasoning mistakes rather than missing or truncated input.",
      },
      {
        letter: "D",
        text: "The team's monthly API spend for the workflow is higher than they originally budgeted for the project.",
      },
      {
        letter: "E",
        text: "The workflow occasionally times out because of ordinary network latency between the client and the API.",
      },
      {
        letter: "F",
        text: "The workflow's prompt was designed for an older model and has not been adapted to the current model's capabilities.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "ABC", source_e: "A" },
    explanations: {
      claude:
        'The question says both "select all that apply" and "choose exactly one," which conflict. A, B and C are all valid and equally strong, so the answer is ABC. A: accuracy on reasoning subtasks stays below threshold after prompt revisions, so the limit is the model. B: long chains of dependent steps with compounding errors need a more capable model. C: the errors are genuine reasoning mistakes, not input or truncation problems. D is about cost, E is a network problem, and F is an outdated prompt that should be fixed before judging the model.',
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B, C — On a use-case benchmark, accuracy on multi-step reasoning subtasks stays below threshold even after prompt revisions.; The workflow needs nuanced understanding across long chains of interdependent steps where partial errors compound.; Manual review shows the extraction errors resemble genuine reasoning mistakes rather than missing or truncated input. A . Correct. Accuracy below threshold on multi-step reasoning subtasks that persists after prompt revisions indicates that the model's inherent reasoning capability is insufficient. This persistent underperformance points to a capability ceiling rather than a prompt engineering issue. Evaluating a more capable model like Claude Opus 4.8 is warranted. B . Correct. A workflow that requires nuanced understanding across long chains of interdependent steps, where partial errors compound, is inherently complex and exceeds the typical strengths of a lighter model. Such complexity is a direct signal of a model-capability mismatch. A more capable model is better suited to handle this demanding reasoning. C . Correct. When manual review shows extraction errors are genuine reasoning mistakes rather than issues from missing or truncated input, it highlights a fundamental limitation in the model's reasoning. This suggests the model is failing at logic or understanding, not just input processing. Upgrading the model may address these deep reasoning errors. D . Incorrect. Exceeding the monthly budget is a cost-management concern and does not indicate whether the current model is capable enough for the task. Moving to a more expensive model would likely increase costs, making this observation irrelevant to a capability mismatch. E . Incorrect. Occasional timeouts due to ordinary network latency are an infrastructure issue external to the model. This type of failure does not reflect the model's reasoning ability and can occur with any model regardless of capability. F . Incorrect. A prompt designed for an older model may not leverage the current model's strengths and should be adapted and retested before judging capability. Without prompt optimization, poor performance cannot be attributed to a model-capability mismatch.1c",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 154,
    kind: "single",
    text: "A compliance analyst asks Claude to review a 40-page vendor contract and flag every clause that conflicts with the company's data-retention policy. In early testing, Claude cites clause numbers and language that do not actually appear in the contract. Which prompting change is most effective at grounding the review in the actual document text for this kind of long-document task?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Ask Claude to answer using its general knowledge of standard contract clauses instead of the specific text, since standard clauses are usually representative",
      },
      {
        letter: "B",
        text: "Instruct Claude to summarize the entire contract into three paragraphs first, then perform the compliance analysis using only that summary as its source",
      },
      {
        letter: "C",
        text: "Reduce the max_tokens parameter for the response so Claude produces a shorter, more focused answer that is less likely to drift from the source contract",
      },
      {
        letter: "D",
        text: "Instruct Claude to first extract exact, word-for-word quotes relevant to data retention, and only then analyze compliance by referencing those extracted quotes",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "D", source_e: "D" },
    explanations: {
      claude:
        "The best fix is to have Claude pull exact, word-for-word quotes first and only then do the compliance analysis. This is Anthropic's recommended way to reduce hallucination on long documents. Every flagged clause then points back to text that really is in the contract, and you can check each quote against the source. A makes the problem worse because it tells Claude to rely on general knowledge instead of this contract. B is lossy: a three-paragraph summary drops clause numbers and exact wording, so citations get less accurate. C only shortens the response. It does nothing to tie the answer to the source text.",
      source_e:
        "Discussion:\nSelected Answer: D - Correct answer : D — Instruct Claude to first extract exact, word-for-word quotes relevant to data retention, and only then analyze compliance by referencing those extracted quotes A . Incorrect. Relying on general knowledge instead of the provided document is the hallucination risk being addressed, not a fix for it. B . Incorrect. Summarizing first discards detail and can itself introduce the drift and inaccuracy the task is trying to eliminate. C . Incorrect. Response length has no bearing on whether cited clauses actually appear in the source document. D . Correct. For long documents, having Claude extract word-for-word quotes before analyzing grounds its output in the actual text and reduces hallucinated citations.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 155,
    kind: "single",
    text: "A fintech company's Claude-powered agent can initiate wire transfers through a custom MCP tool. Even though the operations team has configured allowedTools to auto-approve most read and reporting tools, they want every wire-transfer tool call to require a human's explicit approval no matter what permission mode the session is later switched to, including bypassPermissions. Which approach best satisfies this requirement?",
    images: [],
    choices: [
      {
        letter: "A",
        text: 'Register a PreToolUse hook scoped to the wire-transfer tool that returns permissionDecision "ask" for every call, since hooks execute before deny rules, ask rules, the permission mode check, and allow rules, and their decision holds even under bypassPermissions.',
      },
      {
        letter: "B",
        text: "Add a bare allowedTools entry for the wire-transfer tool so it auto-approves, then depend on the canUseTool callback to intercept it, since bare allow rules approve every matching call before canUseTool is ever consulted, so the callback never runs for that tool.",
      },
      {
        letter: "C",
        text: "Switch the session's permission mode to acceptEdits, expecting the wire-transfer tool to fall outside its file-edit scope and always route to canUseTool, though other tools under acceptEdits still fall through to any allow rules that already approve them.",
      },
      {
        letter: "D",
        text: "Add the wire-transfer tool to disallowed_tools with a wildcard pattern so it is blocked by default, then have the canUseTool callback lift the deny rule per call, though deny rules are evaluated before canUseTool runs and cannot be reversed from inside that callback.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "In the Agent SDK's permission order, hooks run first, before deny rules, the permission mode, allow rules and canUseTool. They still run under bypassPermissions, so a PreToolUse hook that always returns \"ask\" for the wire-transfer tool sends every call to a human whatever the mode. B fails because a bare allow rule approves the call before canUseTool runs, so no human is asked. C fails because acceptEdits is just another mode and gives no protection once someone switches to bypassPermissions. D fails because deny rules are checked before canUseTool and can't be lifted from inside it, so the tool would be blocked instead of approved.",
      source_e:
        'Discussion:\nSelected Answer: A - Correct answer : A — Register a PreToolUse hook scoped to the wire-transfer tool that returns permissionDecision "ask" for every call, since hooks execute before deny rules, ask rules, the permission mode check, and allow rules, and their decision holds even under bypassPermissions. A . Correct. Hooks run first in the evaluation order and a PreToolUse hook\'s decision applies regardless of permission mode, including bypassPermissions, guaranteeing the prompt for this tool. B . Incorrect mechanism. A bare allow-rule entry auto-approves every matching call and the call never reaches canUseTool, so this design silently removes the intended approval step. C . Incorrect. acceptEdits only auto-approves file edits and specific filesystem commands; other tools still fall through to normal permission handling, which could still resolve via an existing allow rule rather than always prompting. D . Incorrect. Deny rules are evaluated before canUseTool in the flow, so the callback has no mechanism to reverse a deny decision for a specific call.1c',
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 156,
    kind: "single",
    text: "A solutions architect is scoping the ethical-risk controls for a Claude-based assistant that will draft internal performance-review summaries from manager notes across a multinational workforce. The compliance team wants a set of concrete measures that address bias, fairness, and transparency before launch. Which of the following measures should be included? (Select 3)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Run paired-scenario evaluations comparing summary tone and detail across employee groups given identical underlying performance notes.",
      },
      {
        letter: "B",
        text: "Document, in a form reviewers can inspect, which specific decision factors the assistant is instructed to weigh whenever it drafts a summary.",
      },
      {
        letter: "C",
        text: "Give every employee, regardless of role or seniority, a mechanism to request the specific factors that shaped their own summary.",
      },
      {
        letter: "D",
        text: "Skip bias testing across the initial launch region and only extend testing later if formal complaints get filed after go-live.",
      },
      {
        letter: "E",
        text: "Let each manager's personal phrasing preferences silently override the standardized summary template with absolutely no logging kept.",
      },
      {
        letter: "F",
        text: "Restrict summary review access to a single manager with no secondary sign-off, to keep the rollout process deliberately lightweight.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "ABC", source_e: "A" },
    explanations: {
      claude:
        'The instructions conflict ("Select 3" vs "Choose exactly one"), so I chose the three valid controls; if only one is allowed, A is the strongest. A tests for bias by comparing summaries built from identical notes across employee groups. B documents the decision factors so reviewers can audit them. C lets each employee request the factors behind their own summary, which gives transparency and a way to challenge it. D waits for complaints instead of testing before launch, E hides manager overrides with no log, and F removes second-person review, so all three weaken the controls.',
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B, C — Run paired-scenario evaluations comparing summary tone and detail across employee groups given identical underlying performance notes.; Document, in a form reviewers can inspect, which specific decision factors the assistant is instructed to weigh whenever it drafts a summary.; Give every employee, regardless of role or seniority, a mechanism to request the specific factors that shaped their own summary. A . Correct. Paired-scenario testing across demographic groups is a direct, evidence-based way to detect tone or detail disparities that would indicate bias, mirroring how Anthropic evaluates paired requests for evenhandedness. B . Correct. Documenting the decision factors the assistant weighs gives reviewers a transparent, inspectable basis for the summaries, directly addressing the transparency requirement. C . Correct. Giving employees a way to request the factors behind their own summary extends transparency to the people most affected by the assistant's output, supporting fairness and accountability. D . Incorrect. Deferring bias testing until after complaints arise reverses the compliance team's request for pre-launch controls and lets biased summaries reach employees before any check occurs. E . Incorrect. Unlogged silent overrides of the standardized template reintroduce exactly the kind of unaccounted inconsistency that undermines both fairness and transparency. F . Incorrect. A single reviewer with no secondary sign-off removes an accountability check rather than adding one, working against the governance goals of the review.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 157,
    kind: "single",
    text: "A solutions architect is running the first discovery session with a new prospect before recommending any specific Claude model. According to Anthropic's model-selection guidance, which factors should the architect establish as key criteria during this session?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "The specific capabilities the model must have to meet the prospect's needs",
      },
      {
        letter: "B",
        text: "How quickly the model must respond within the prospect's application",
      },
      {
        letter: "C",
        text: "The prospect's available budget for development and production usage",
      },
      {
        letter: "D",
        text: "The exact number of employees currently working in the prospect's IT department",
      },
      {
        letter: "E",
        text: "Which social media platforms the prospect uses for customer marketing",
      },
      {
        letter: "F",
        text: "The version number of the prospect's internal ticketing software",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Anthropic's model-selection guidance uses three criteria: capabilities, speed (latency) and cost. Capabilities come first because they decide which models can meet the prospect's needs at all. B and C are also part of the guidance, but only one option may be chosen, so A is the best single answer. D, E and F (IT headcount, marketing channels, ticketing software version) don't affect which model to choose.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B, C — The specific capabilities the model must have to meet the prospect's needs; How quickly the model must respond within the prospect's application; The prospect's available budget for development and production usage A . Correct. Capabilities is one of the key criteria Anthropic's guidance lists to establish before choosing a model. B . Correct. Speed, meaning how quickly the model must respond, is explicitly named as a key criterion to evaluate first. C . Correct. Cost, meaning the budget for development and production usage, is explicitly named as a key criterion to evaluate first. D . Incorrect. Headcount in the IT department is not one of the documented model-selection criteria and does not inform capability, speed, or cost decisions. E . Incorrect. Marketing channel usage is unrelated to model capability, speed, or cost requirements and is not a discovery criterion for model selection. F . Incorrect. A third-party ticketing software version is an integration detail, not one of the capability, speed, or cost criteria used to scope model selection.1b",
    },
    confidence: { claude: "medium" },
    flags: {},
  },
  {
    id: 158,
    kind: "single",
    text: "A financial services customer's compliance team says every AI-generated answer referencing internal policy documents must point to the exact sentence it was drawn from, so auditors can verify the source without re-reading the whole document. Which capability addresses this discovery finding?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Citations, which let Claude reference the exact sentences and passages in source documents used to generate a response",
      },
      {
        letter: "B",
        text: "Search results, which enable natural citations for RAG applications by attaching proper source attribution to search results",
      },
      {
        letter: "C",
        text: "Token counting, which determines the number of tokens in a message before it is sent to Claude",
      },
      {
        letter: "D",
        text: "The Files API, which uploads and manages documents so they do not need to be re-sent with every request",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Citations let Claude point to the exact sentences and passages in the documents you give it. That is what auditors need to check an answer at the sentence level. Search results (B) also support citations, but they're meant for RAG pipelines that return search-result blocks, not for citing policy documents directly. Token counting (C) and the Files API (D) only deal with cost/size and document storage, and neither tells you where an answer came from.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Citations, which let Claude reference the exact sentences and passages in source documents used to generate a response A . Correct. Citations is documented as grounding responses in source documents with references to the exact sentences and passages used, matching the auditability requirement described. B . Incorrect. Search results attaches source attribution specifically for RAG applications built around a search tool, which is a narrower fit than directly citing provided internal policy documents. C . Incorrect. Token counting measures message size before sending; it has no role in producing verifiable source references for auditors. D . Incorrect. The Files API avoids re-uploading documents across requests but does not itself produce sentence-level source references in responses.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 159,
    kind: "single",
    text: "A customer support tooling vendor still runs Claude Haiku 3.5 in a legacy component and receives Anthropic's notice that the model is retired outside of Bedrock and Google Cloud. Their engineering stakeholders want to know how this affects their committed timeline. What is the accurate expectation to set?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Direct API and other non-Bedrock/Vertex-hosted traffic on Haiku 3.5 must migrate to a supported model before retirement, while deployments specifically on Bedrock or Google Cloud can keep running it under those platforms' own timelines",
      },
      {
        letter: "B",
        text: "The retirement notice only affects new customers who sign up after the announcement date, so the vendor's existing production traffic is permanently exempt regardless of hosting platform",
      },
      {
        letter: "C",
        text: "Retirement notices apply uniformly across every hosting platform including Bedrock and Google Cloud, so all deployments of Haiku 3.5 everywhere must migrate by the same date",
      },
      {
        letter: "D",
        text: "Model retirement only restricts access to the Console UI for prompting Haiku 3.5, while direct Messages API traffic on any platform continues indefinitely unaffected",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Anthropic's deprecation notes list Claude Haiku 3.5 as retired on the Claude API and other first-party surfaces, but not on Bedrock or Google Cloud Vertex AI. Those platforms run their own model lifecycles. So direct API traffic must move to a supported model, while Bedrock or Vertex deployments follow those platforms' own timelines. B is wrong because retirement applies to all customers, not just new ones. C is wrong because the notice itself excludes Bedrock and Google Cloud. D is wrong because retirement stops API requests, not just Console access.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Direct API and other non-Bedrock/Vertex-hosted traffic on Haiku 3.5 must migrate to a supported model before retirement, while deployments specifically on Bedrock or Google Cloud can keep running it under those platforms' own timelines A . Correct. Haiku 3.5 is documented as retired except on Bedrock and Google Cloud, meaning direct API usage elsewhere must migrate while those two platforms retain their own continuation timelines. B . Incorrect. Retirement affects existing production traffic on the direct API, not just new signups; there is no blanket exemption tied to account age. C . Incorrect. This contradicts the documented exception carved out for Bedrock and Google Cloud, which are explicitly excluded from the retirement on the same schedule. D . Incorrect. Retirement affects the model's availability for actual inference, not merely a Console UI restriction; direct Messages API traffic on the retired platforms is the traffic that must migrate.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 160,
    kind: "single",
    text: "Two months after a customer support assistant goes live, the operations team notices their monthly Claude spend has grown faster than ticket volume and wants to identify which workspace and model combination is driving the increase. Which monitoring approach addresses this?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Query the Usage and Cost Admin API grouped by workspace and model to reconcile spend against token consumption",
      },
      {
        letter: "B",
        text: "Re-run the original evaluation set from the design phase to check whether output quality has regressed",
      },
      {
        letter: "C",
        text: "Increase the agent's allowed_tools scope so it can investigate its own billing records directly",
      },
      {
        letter: "D",
        text: "Ask the support team to manually count tickets handled per day and compare that figure to the invoice total",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "The Usage and Cost Admin API can group token use and cost by workspace and model. That breakdown shows which combination is driving spend and lets the team compare it with token consumption. B checks output quality, not cost. C gives an agent more tool access without need, which is a security risk, and it doesn't produce a cost breakdown. D is manual, error-prone, and can't separate spend by workspace or model.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Query the Usage and Cost Admin API grouped by workspace and model to reconcile spend against token consumption A . Correct - the Usage and Cost Admin API supports grouping by workspace and model, which directly answers where the added spend is coming from. B . Re-running the evaluation set measures output quality, not which workspace or model is responsible for the cost increase. C . Expanding the agent's own tool permissions to inspect billing is unnecessary and unrelated to how usage and cost reporting is retrieved. D . Manually reconciling ticket counts against invoices is far less precise than the granular, per-workspace and per-model data the API already provides.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 161,
    kind: "single",
    text: "A team is documenting the caching architecture for a service where the same large system prompt and tool definitions are sent with nearly every request. The implementation guidance needs to explain how to cut repeated processing cost and latency for that static content. What should the guidance recommend?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Mark the reusable system prompt and tool definitions as cached blocks so repeated requests reuse the prefix instead of reprocessing it.",
      },
      {
        letter: "B",
        text: "Increase the context window to 1M tokens so the large system prompt fits entirely without ever needing to be truncated across requests.",
      },
      {
        letter: "C",
        text: "Move the system prompt into the Files API so it uploads once and Claude re-reads it fresh from storage on every single request.",
      },
      {
        letter: "D",
        text: "Enable batch processing so every request carrying the large system prompt is queued and billed at half price automatically.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "Prompt caching is built for this case. You put cache_control breakpoints on the static prefix (the tool definitions and the system prompt). Later requests then read that prefix from the cache, which costs much less and returns faster than processing it again. B only adds context capacity and does nothing about repeated processing. C is wrong because the Files API doesn't stop the content from being processed again on every request. D's batch processing gives a discount on asynchronous jobs but adds latency, and it doesn't reuse the shared prefix.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Mark the reusable system prompt and tool definitions as cached blocks so repeated requests reuse the prefix instead of reprocessing it. A . Correct. Prompt caching is designed exactly for this scenario: marking the static system prompt and tool definitions as cached lets repeated requests skip reprocessing that content, reducing both cost and latency. B . Incorrect. A larger context window changes how much content fits in a request but does not stop the same static content from being reprocessed on every call. C . Incorrect. The Files API avoids re-uploading file content, but re-reading a stored file on every request still requires reprocessing it, so it does not address the repeated-processing cost. D . Incorrect. Batch processing is for asynchronous bulk workloads with a discount on the whole request, not a mechanism for avoiding repeated processing of a shared prefix on synchronous calls.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 162,
    kind: "single",
    text: "Your coding-agent product is exceeding its latency budget on Claude Opus 4.8. Before proposing a switch to a smaller model, a colleague suggests first tuning the effort parameter. How should you frame this trade-off to the team?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Adjusting effort trades intelligence for latency and cost within the same model; lowering it from the default may recover budget without the accuracy loss that comes from switching to a different, less capable model.",
      },
      {
        letter: "B",
        text: "The effort parameter governs only tool-call count per turn, not the model’s raw inference latency, so the team should focus on switching to a smaller model that fits the latency budget for the coding-agent product.",
      },
      {
        letter: "C",
        text: "Effort on Claude Opus 4.8 can only be increased, never decreased, which prevents the team from lowering latency through this parameter; therefore, the migration to a model family that offers a tunable effort floor is the correct path to meet the latency budget.",
      },
      {
        letter: "D",
        text: "Effort tuning is only available via the Claude API, not in Claude Code, so the coding-agent product cannot lower latency this way; the team should switch to a model family with native effort controls in Claude Code.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "I'd frame it this way: the effort parameter trades intelligence for speed and cost inside the same model. Turning it down from the default (high) cuts thinking and token use, which lowers latency, and you keep the model's capability. Switching to a smaller model can cost more accuracy than that. B is wrong because effort affects all token spend, including thinking and response length, not just how many tool calls happen. C is wrong because effort can be lowered as well as raised. D is wrong because Claude Code also exposes effort settings, and the claim that a product can't use the parameter has no basis.",
      source_e:
        'Discussion:\nSelected Answer: A - Correct answer : A — Adjusting effort trades intelligence for latency and cost within the same model; lowering it from the default may recover budget without the accuracy loss that comes from switching to a different, less capable model. A . Correct. Tuning the effort parameter directly trades off intelligence, latency, and cost within the same model; lowering effort from the default can bring latency back within budget while avoiding the accuracy degradation that typically comes from moving to a less capable model. This approach leverages the existing model’s strengths with a controlled trade-off. B . Incorrect. The effort parameter actually controls reasoning depth and token usage, which directly influences raw inference latency, not just the number of tool calls. It is a global control over model intelligence, so adjusting it can meaningfully reduce latency without immediately resorting to a model switch. C . Incorrect. The effort parameter can be set to levels lower than the default, allowing latency to be reduced on Opus 4.8. There is no restriction preventing decreases; thus, tuning effort is a viable first step before considering model migration. D . Incorrect. Effort tuning is available across all surfaces, including Claude Code and the API. The coding-agent product can adjust effort in both environments, so the option’s assertion that it’s API-only is false, making a switch unnecessary on these grounds.1c:["$",',
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 163,
    kind: "single",
    text: "A solutions architect is designing the initial rollout of Claude Code for a mid-size company with no existing device management. The company has developers on unmanaged laptops, wants centralized visibility into token spend, and needs org-wide policy to reach both local sessions and Claude Code on the web. Which set of decisions correctly matches each requirement to the right mechanism? (Select 3)",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Choose Claude for Teams or Enterprise as the API provider so Claude Code and claude.ai share one per-seat subscription with no infrastructure to run",
      },
      {
        letter: "B",
        text: "Use server-managed settings delivered from the claude.ai admin console, since it reaches both local and web sessions without requiring MDM",
      },
      {
        letter: "C",
        text: "Use the usage dashboard at claude.ai/analytics/claude-code for centralized spend visibility, available on Claude for Teams and Enterprise plans",
      },
      {
        letter: "D",
        text: "Deploy a plist-based managed-settings policy through macOS MDM as the primary policy channel, since it is the strongest enforcement mechanism available",
      },
      {
        letter: "E",
        text: "Rely exclusively on project-level .claude/settings.json files committed to each repository to establish organization-wide policy",
      },
      {
        letter: "F",
        text: "Configure Amazon Bedrock as the API provider so the company can use server-managed settings for centralized policy delivery",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "ABC", source_e: "A" },
    explanations: {
      claude:
        "The question asks for 3 answers, even though the footer says to choose one. A: Claude for Teams or Enterprise gives one per-seat subscription covering Claude Code and claude.ai, with no infrastructure to run. B: server-managed settings come from the claude.ai admin console and reach local and web sessions without MDM. C: the claude.ai/analytics/claude-code dashboard shows spend centrally on Teams and Enterprise plans. D needs MDM, which the company doesn't have, and can't reach web sessions. E can be changed by developers, so it can't enforce company-wide policy. F is wrong because server-managed settings need a Teams or Enterprise plan, not Bedrock.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer s : A, B, C — Choose Claude for Teams or Enterprise as the API provider so Claude Code and claude.ai share one per-seat subscription with no infrastructure to run; Use server-managed settings delivered from the claude.ai admin console, since it reaches both local and web sessions without requiring MDM; Use the usage dashboard at claude.ai/analytics/claude-code for centralized spend visibility, available on Claude for Teams and Enterprise plans A . Correct. For a company with no infrastructure to run and both Claude Code and claude.ai usage, Claude for Teams or Enterprise as the provider is the default recommendation, combining both products under one per-seat subscription. B . Correct. Server-managed settings are delivered from the admin console with no device management infrastructure required, and unlike endpoint-managed settings, they also reach Claude Code on the web, matching the requirement to cover both surfaces. C . Correct. The usage dashboard at claude.ai/analytics/claude-code is included on Claude for Teams and Enterprise plans and provides the centralized spend visibility the architect needs without building custom OpenTelemetry infrastructure. D . Incorrect. The company has no existing device management, so introducing MDM as the primary channel contradicts the stated constraint; server-managed settings are the appropriate fit for unmanaged devices instead. E . Incorrect. Project-level settings are the lowest-precedence tier below managed settings and can be freely overridden by local or user settings, so they cannot establish organization-wide, non-overridable policy. F . Incorrect. Server-managed settings are explicitly not available when using third-party model providers like Amazon Bedrock; choosing Bedrock would require a self-hosted Claude apps gateway instead of native server-managed settings, and it does not unify Claude Code and claude.ai billing as required.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 164,
    kind: "single",
    text: "A platform team is wiring Claude Code into a locked-down CI pipeline where no human is available to approve prompts, and only a pre-approved set of tools defined in permission rules should ever run. Which permission mode fits this pipeline?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "dontAsk mode, which auto-denies anything not covered by an explicit allow rule",
      },
      {
        letter: "B",
        text: "acceptEdits mode, which auto-approves file edits and common filesystem commands",
      },
      {
        letter: "C",
        text: "plan mode, which restricts Claude to reads and a proposed plan with no execution",
      },
      {
        letter: "D",
        text: "auto mode, which relies on a classifier to approve most actions in real time",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "dontAsk mode never asks for approval. It automatically denies any tool that isn't pre-approved by an allow rule, which suits a non-interactive, locked-down CI pipeline. acceptEdits still asks before running other actions and doesn't restrict tools to the allow list. Plan mode stops all execution, so the pipeline can't run its approved tools. Auto mode lets a classifier approve actions as they come up, which goes against the rule that only explicitly pre-approved tools should run.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — dontAsk mode, which auto-denies anything not covered by an explicit allow rule A . Correct. dontAsk mode only executes actions matching pre-approved allow rules and read-only commands, auto-denying everything else instead of prompting, which makes a session fully non-interactive and safe for a CI pipeline with no human available. B . Incorrect. acceptEdits still prompts for Bash commands outside its narrow auto-approved filesystem set, so an unattended CI run could stall waiting on a prompt that no human is present to answer. C . Incorrect. plan mode prevents any execution at all, including of pre-approved tools, so it cannot let a pipeline actually apply pre-approved fixes or changes. D . Incorrect. auto mode uses a classifier to approve actions dynamically rather than restricting execution to a fixed, pre-approved allow list, which does not match the requirement that only pre-approved tools ever run.",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 165,
    kind: "single",
    text: 'During a long debugging session, Claude Code raises "Autocompact is thrashing: the context refilled to the limit..." immediately after automatic compaction completes, and it stops retrying. The team was asking Claude to read an entire 40,000-line production log file to find the root cause of an outage. What is the most effective way to recover and continue the investigation?',
    images: [],
    choices: [
      {
        letter: "A",
        text: "Raise CLAUDE_CODE_MAX_RETRIES so Claude Code keeps retrying compaction until the log file finishes loading successfully.",
      },
      {
        letter: "B",
        text: "Ask Claude to read the log file in smaller chunks, such as a specific line range, or delegate the analysis to a subagent instead.",
      },
      {
        letter: "C",
        text: "Set DISABLE_AUTO_COMPACT so Claude Code stops summarizing history and keeps the entire log output available for reference.",
      },
      {
        letter: "D",
        text: "Run /clear to discard the conversation, then paste only the final error line from the log file into a fresh session.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "B", source_e: "B" },
    explanations: {
      claude:
        "The thrashing error means one large read, the 40,000-line log, fills the context again right after each compaction. So the fix is to make that read smaller. You can read specific line ranges or chunks, or hand the log to a subagent. A subagent works in its own context window and returns only a short summary. A is wrong because more retries just repeat the same refill loop. C is wrong because turning off auto-compaction does not make the log fit; you would simply hit the hard context limit. D is wrong because pasting only the final error line throws away the evidence you need to find the root cause.",
      source_e:
        "Discussion:\nSelected Answer: B - Correct answer : B — Ask Claude to read the log file in smaller chunks, such as a specific line range, or delegate the analysis to a subagent instead. A . Incorrect. CLAUDE_CODE_MAX_RETRIES governs retries of failed API requests, not the compaction-thrashing loop. Thrashing happens because the file itself refills the context after each compaction, so retrying compaction more times does not solve the underlying problem. B . Correct. Auto-compaction succeeded but the oversized file output immediately refilled the context window several times in a row, so Claude Code stopped retrying to avoid wasted API calls. Reading the file in smaller chunks or moving the work to a subagent's separate context window is the documented recovery path. C . Incorrect. Disabling auto-compaction removes the safeguard that prevents the context window from overflowing, so it would make the thrashing problem worse, not better, since the full log would still need to fit in context. D . Incorrect. This is more drastic than necessary and discards useful investigation context. The documented recovery steps are to chunk the file, use a targeted /compact, or delegate to a subagent, not to abandon the conversation entirely.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
  {
    id: 166,
    kind: "single",
    text: "A team's project relies on an internal MCP server for ticket lookups. Running /mcp shows the server status as connected, but Claude reports it has no tools available from that server and cannot look up tickets. What is the correct next step to diagnose the failure?",
    images: [],
    choices: [
      {
        letter: "A",
        text: "Select Reconnect for the server from /mcp, and if the tool count stays at zero, run claude --debug mcp to see the server's stderr output.",
      },
      {
        letter: "B",
        text: "Edit .mcp.json to change the server's command from a relative path to an absolute path, since a relative path always prevents any tools from loading.",
      },
      {
        letter: "C",
        text: "Approve the server from /mcp again, since project-scoped MCP servers silently stop returning tools after the one-time approval expires.",
      },
      {
        letter: "D",
        text: "Restart Claude Code with claude --safe-mode, since a server that reports zero tools while connected is always disabled under safe mode.",
      },
    ],
    rows: [],
    sources: { source_e: true },
    suggested: { claude: "A", source_e: "A" },
    explanations: {
      claude:
        "A \"connected\" status means the server process started and the MCP handshake worked. The failure is in tool discovery, so the right move is to reconnect from /mcp to ask for the tool list again. If it's still zero, run claude --debug mcp to see the server's stderr and find out why it returns no tools (startup error, missing env var or credentials, backend it can't reach). B is wrong because a bad relative path would stop the server connecting at all, not leave it connected with zero tools, and it isn't \"always\" a problem. C invents an approval that expires. D invents a safe-mode behavior and wouldn't diagnose anything.",
      source_e:
        "Discussion:\nSelected Answer: A - Correct answer : A — Select Reconnect for the server from /mcp, and if the tool count stays at zero, run claude --debug mcp to see the server's stderr output. A . Correct. A server that shows connected but lists zero tools has started but isn't returning a tool list. The documented step is to select Reconnect from /mcp, and if the count stays at zero, run claude --debug mcp to inspect the server's stderr output. B . Incorrect. A relative path in command or args typically causes the server to fail to start entirely, which shows as failed in /mcp, not connected with zero tools. That is not the situation described here. C . Incorrect. Project-scoped approval does not silently expire; once approved, a server stays enabled. This does not explain a connected server returning no tools. D . Incorrect. Safe mode disables all MCP servers for the session, so the server would not show as connected at all, let alone connected with zero tools. This is not a diagnostic step for this symptom.1c",
    },
    confidence: { claude: "high" },
    flags: {},
  },
];
