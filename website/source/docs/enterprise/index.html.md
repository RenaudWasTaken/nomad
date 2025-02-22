---
layout: "docs"
page_title: "Nomad Enterprise"
sidebar_current: "docs-enterprise"
description: |-
  Nomad Enterprise adds operations, collaboration, and governance capabilities to Nomad.
  Features include Namespaces, Resource Quotas, Sentinel Policies, and Advanced Autopilot.
---

# Nomad Enterprise

Nomad Enterprise adds collaboration, operational, and governance capabilities to Nomad.  Nomad Enterprise is available as a base Platform package with an optional Governance & Policy add-on module.

Please navigate the sub-sections for more information about each package and its features in detail.

## Nomad Enterprise Platform
Nomad Enterprise Platform enables operators to easily upgrade Nomad as well as enhances performance and availability through Advanced Autopilot features such as Automated Upgrades, Enhanced Read Scalability, and Redundancy Zones.

### Automated Upgrades
Automated Upgrades allows operators to deploy a complete cluster of new servers and then simply wait for the upgrade to complete. As the new servers join the cluster, server logic checks the version of each Nomad server node. If the version is higher than the version on the current set of voters, it will avoid promoting the new servers to voters until the number of new servers matches the number of existing servers at the previous version. Once the numbers match, Nomad will begin to promote new servers and demote old ones.

See the [Autopilot - Upgrade Migrations](https://www.nomadproject.io/guides/operations/autopilot.html#upgrade-migrations) documentation for a thorough overview.

### Enhanced Read Scalability
This feature enables an operator to introduce non-voting server nodes to a Nomad cluster. Non-voting servers will receive the replication stream but will not take part in quorum (required by the leader before log entries can be committed). Adding explicit non-voters will scale reads and scheduling without impacting write latency.

See the [Autopilot - Read Scalability](https://www.nomadproject.io/guides/operations/autopilot.html#server-read-and-scheduling-scaling) documentation for a thorough overview.

### Redundancy Zones
Redundancy Zones enables an operator to deploy a non-voting server as a hot standby server on a per availability zone basis. For example, in an environment with three availability zones an operator can run one voter and one non-voter in each availability zone, for a total of six servers. If an availability zone is completely lost, only one voter will be lost, so the cluster remains available. If a voter is lost in an availability zone, Nomad will promote the non-voter to a voter automatically, putting the hot standby server into service quickly.

See the [Autopilot - Redundancy Zones](https://www.nomadproject.io/guides/operations/autopilot.html#redundancy-zones) documentation for a thorough overview.

## Governance & Policy
Governance & Policy features are part of an add-on module that enables an organization to securely operate Nomad at scale across multiple teams through features such as Namespaces, Resource Quotas, Sentinel Policies, and Preemption.

### Namespaces
Namespaces enable multiple teams to safely use a shared multi-region Nomad environment and reduce cluster fleet size. In Nomad Enterprise, a shared cluster can be partitioned into multiple namespaces which allow jobs and their associated objects to be isolated from each other and other users of the cluster.

Namespaces enhance the usability of a shared cluster by isolating teams from the jobs of others, by providing fine grain access control to jobs when coupled with ACLs, and by preventing bad actors from negatively impacting the whole cluster.

See the [Namespaces Guide](https://www.nomadproject.io/docs/enterprise/namespaces/index.html) for a thorough overview.

### Resource Quotas
Resource Quotas enable an operator to limit resource consumption across teams or projects to reduce waste and align budgets. In Nomad Enterprise, operators can define quota specifications and apply them to namespaces. When a quota is attached to a namespace, the jobs within the namespace may not consume more resources than the quota specification allows.

This allows operators to partition a shared cluster and ensure that no single actor can consume the whole resources of the cluster.

See the [Resource Quotas Guide](https://www.nomadproject.io/docs/enterprise/quotas/index.html) for a thorough overview.

### Sentinel Policies
In Nomad Enterprise, operators can create Sentinel policies for fine-grained policy enforcement. Sentinel policies build on top of the ACL system and allow operators to define policies such as disallowing jobs to be submitted to production on Fridays or only allowing users to run jobs that use pre-authorized Docker images. Sentinel policies are defined as code, giving operators considerable flexibility to meet compliance requirements.

See the [Sentinel Policies Guide](https://www.nomadproject.io/guides/governance-and-policy/sentinel/sentinel-policy.html) for a thorough overview.

### Preemption
When a Nomad cluster is at capacity for a given set of placement constraints, any allocations that result from a newly scheduled service or batch job will remain in the pending state until sufficient resources become available - regardless of the defined priority.

Preemption enables Nomad's scheduler to automatically evict lower priority allocations of service and batch jobs so that allocations from higher priority jobs can be placed. This behavior ensures that critical workloads can run when resources are limited or when partial outages require workloads to be rescheduled across a smaller set of client nodes.

## Try Nomad Enterprise
Click [here](https://www.hashicorp.com/go/nomad-enterprise) to set up a demo or request a trial
of Nomad Enterprise.
