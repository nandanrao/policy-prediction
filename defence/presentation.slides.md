---
toc: true
toc-title: Outline
title: "Policy Prediction: The Missing Tool in Experimental Econometrics and a Roadmap to Fix It"
author: Nandan Rao
date: September, 2019
bibliography: ../bibs/master/master.bib
---

# Introduction

## Takeaway

Causal indentification is not sufficient for transportability and for policy prediction.

## U.S. Department of Education

![](./doe-1.png){height=350px}


## The Randomista Fight

- Experimental and quasi-experimental methods have become the standard, with RCTs as the gold standard. Including for "evidence-based research."

- Indentification police!

- Many prominent econometricians have rasied concerns that such methods tend to be especially difficult to generalize. @Heckman2008, @Manski2013, @Deaton2010, @Deaton2018


## Policy Decisions

- Evidence-based policy decision making is an act of extrapolation: from evidence to future effects of a policy.

- Experimental studies tend to be silent on the question of external validity. @Manski2013

- Few tools exist to prove the same results will apply elsewhere.

- Few tools exist to predict the results in a specific elsewhere, given "evidence" from past studies.

- Small but growing literature, showing RCTs whose results fail to extrapolate, underlines the need for such tools. @Pritchett2016, @Allcott2015, @Bisbee2017, @Rosenzweig2019


## Prediction is Prediction

- Machine learning is good at prediction.

- Domain adaptation formalizes the problem of moving from one domain, with labeled data, to another domain with unlabeled data.

- The formulation fits!

- I will show why this is needed and...


# Validity and Counterfactual Identification

## Taxonomy of validities [^1]

\textbf{Statistical Conclusion Validity:} The validity of inferences about the correlation (covariation) between treatment and outcome.

\textbf{Internal Validity:} The validity of inferences about whether observed covariation between A (the presumed treatment) and B (the presumed outcome) reflects a causal relationship from A to B as those variables were manipulated or measured.

\textbf{Construct Validity:} The validity of inferences about the higher order constructs that represent sampling particulars.

\textbf{External Validity:} The validity of inferences about whether the cause-effect relationship holds over variation in persons, settings, treatment variables, and measurement variables.

[^1]: @Shadish2002

## What is inference?

Inference is the process of reasoning and can be broken into two parts:

1. Reasoning from particulars to generals (induction).

2. Reasoning from generals to particulars (deduction).

Nineteenth century economists saw mathematics as a tool for deduction and statistics as a tool for induction. @Morgan1991

## Hume's Problem of Induction

> "As to past Experience, it can be allowed to give direct and certain information of those precise objects only, and that precise period of time, which fell under its cognizance: but why this experience should be extended to future times, and to other objects, which for aught we know, may be only in appearance similar, this is the main question on which I would insist" -- @hume1748

## The Design of Experiments

> "it is possible to draw valid inferences from the results of experimentation... as a statistician would say, from a sample to the population from which the sample was drawn, or, as a logician might put it, from the particular to the general." -- @Fisher1935

## Statistics as Induction

- Allows us to extend conclusions not just to objects similar in appearence, but to a population from a sample.

- Fisher's framework for significance testing falls under the validity of "statistical conclusion validity" in Shadish, Cook, and Campbell's validity taxonomy.

- His theory of experiments randomization fall under "internal validity."

- The causal discovery comes straight from John Stuart Mill's Method of Difference.

## Statistics as Induction

> "Others are concerned with deducing the causes of a given effect. Still others are interested in understanding the details of causal mechanisms. The emphasis here will be on measuring the effects of causes because this seems to be a place where statistics, which is concerned with measurement, has contributions to make." -- @Holland1986

## Counterfactual Models

- The effects of causes is not the same as the causes of a given effect or the details of the causal mechanism.

- Also does not distinguish "cause" from "necessary part of the cause".

- This focus on the effects of causes has led to the success of this framework: it operationalizes Mill's method of difference!

- The effects of causes is a context-specific question. It does not ask the question "why". It is a black-box method for causal identification[^2].

[^2]: @Heckman2008

## Agriculture and Medecine

- When contexts can be reproduced, when the population that is sampled from is the same population on which one will infer conclusions, then the "effects of a cause" is exactly the right question.

- In Fisher's context, this was the case. The context for growing corn can be replicated, because one knows the system is encapsulated: sunlight and soil.

- Economics is not like this. Social sciences are different. This is why Shadish, Cook, and Campbell go to such lengths to enumerat threats to external validity.


# The Danger of Informal Inference

## Policy Makers

Policy makers are experts of their target domain. Should they not be the most capable of deciding if an empirical study can extrapolate to their context? Are they not better suited to the job than a researcher?

In the framework of scientific inference, this amounts to reasoning from particulars to particulars.

## The Warning of John Stuart Mill

> "In reasoning from a course of individual observations to some new and unobserved case, which we are but imperfectly acquainted with (or we should not be inquiring into it), and in which, since we are inquiring into it, we probably feel a peculiar interest; there is very little to prevent us from giving way to negligence, or to any bias which may affect our wishes or our imagination, and, under that influence, accepting insufficient evidence as sufficient." -- John Stuart Mill


## Reasoning from Individual Studies

- Individual studies, performed in the counterfactual model, amount to particular experiences.

- Making policy decisions directly on the basis of such particulars is the exact situation that John Stuart Mill warned is fertile ground for bias and imagination.

- The defense against this is a "formal framework."

- Does such a framework exist?


# The Origins of Structure

- Economists were thinking of very different problems than Fisher: changes in behavioral patterns of individuals and groups.

- Certain relations might be more or less "autonomous" to certain changes. These relations form an invariant super-structure to the system. @Frisch1995 @Haavelmo1944

- Following Hume, nature must be uniform (invariant) in some way in order to generate inferences to be used in new times and places.

- ``The most important point is that the concept of structure is relative to the domain of modifications anticipated.'' - @Hurwicz1966


## Super Exogoneity[^engle]

Let $\lambda_1, \lambda_2 \in \lambda$ be "structural" parameters of a model.

If the joint density implied by the model can be factorized as follows:

$$
P(y, z, \lambda) = P(y | z, \lambda_1)P(z | \lambda_2)
$$

and $\lambda_2$ is independent of the structural parameter of interest $\lambda_1$, then the variable $z$ is said to be weakly exogenous to $\lambda_1$.

If, additionally, the conditional distribution, $P(y | z, \lambda_1)$ remains invariant to changes in the marginal $p(z)$, then $z$ is super exogenous.

[^engle]:@Engle1983

## Modern Extensions of Structural Invariance

- Continuation of this line of thought has taken place in the statistics and machine learning literature rather than that of econometrics.

- Many researchers have related Engle's super exogoneity to causality and worked in the reverse fashion, looking for invariant conditionals acrosss multiple datasets and from their inferring causal relationships (@Peters2015, @Heinze-deml2017, @Rojas-carulla2018)

- @Zhang2015 directly addresses Engle's taxonomy and looks for weak exogoneity as a necessary condition to super exogoneity, thus being able to sometimes identify causal direction in the two variable case.


# Domain Adaptation

## Setup for Transfer Learning

Consider a domain, $\D$, which we define as consisting of a feature space, $\mathcal{X}$, and a marginal distribution $P(X)$ where $X = \{x_1,\ldots,x_n\} \in \mathcal{X}$. A task, $\mathcal{T}$, consists of an outcome space, $\mathcal{Y}$ and a true generating mechanism $f: \mathcal{X} \rightarrow \mathcal{Y}$.

Transfer learning is any problem where the task or domain changes between training and prediction.

## Setup for Domain Adaptation

As in @Ben-David2006 @Pan2010:

$\mathcal{T}$ is constant and the feature space, $\mathcal{X}$ is the same across all domains. There is a target domain, $\D_T$ from which one has samples $\{x_1,\ldots,x_n\} \in X$ and (one or more) source domain(s), $\D_S$, from which one has paired samples $\{(y_1, x_1),\dots,(y_n, x_n)\} \in (\mathcal{Y}, \mathcal{X})$.


## Setup for Treatment Effect Experiments

Allow $\mathcal{X} = \{\mathcal{W}, \mathcal{Z}\}$, where $\mathcal{W} = \{W_0, W_1\}$ a binary treatment and $\mathcal{Z} = {Z_1,\ldots,Z_P}$ a set of covariates.

Construct validity of treatment and covariates implies consistency of feature space.



## Covariate Shift Assumption

Tasks consistency implies $P_S(Y | X) = P_T(Y | X)$.

This is the "covariate shift" assumption:

$P_S(X) \neq P_T(X)$


## Importance Estimation

@Shimodaira2000 shows that the optimum likelihood function for a maximum likelihood estimator of $P_T(Y | X)$, given sufficiently large sample size, is obtained by weighting: $w(x) = \frac{P_T(x)}{P_S(x)}$

The use of this weighting ratio, $w(x)$ (referred to as the \textit{importance}) has led to many other importance estimation techniques to deal with covariate shift. @Suigyama2007 @Pan2010

**GOAL**: Formulate policy prediction problems such that the covariate shift assumption holds.


## Domain Adaptation in Econometrics

- Sample selection bias[^manski]: The fundamental statistical problem is the same and solutions related to importance estimation for solving covariate shift.

- Structural economics has always claimed external validity: if the assumptions hold anywhere, they hold everywhere!

- While interesting, I'm not engaging with structural economics here.

[^manski]:@Manski1977

## @Hotz2005

- One of the only canonical models in the experimental econometrics literature for extrapolating from a source context with experimental data and measuring predictions in a target context.

- Method uses matching with replacement from @Abadie2006, running regression on bootstrapped source domain. Statistically, this can be seen as a form of importance estimation.

- They separate into two groups due to predetermined treatment heterogeneity. They try adding personal covariates to no avail. They relate t-tests in treatment and control distributions.

- @Gechter2015 extends this idea of a t-test on the control group and creates bounds.

## Goals

1. A theoretical justification for the technique in terms of the assumptions involved, related to observable and unobservable variables, that may or may not fail in practice.

2. A formal framework for model selection that determines which covariates to condition on and which to marginalize out to enable a transportable prediction.

3. A focus on treatment effects rather than outcomes.


## Exogoneity and Covariate Shift - Motivation

- I would like to make explicit the relationship between super exogoneity and the covariate shift assumption for a model $P(Y|Z)$.

- This follows from more comprehensive proofs of transportability of @Pearl2014.

## Exogoneity and Covariate Shift - Setup

Consider a source domain, $\D_S$ and a target domain $\D_T$, with feature space defined as $\mathcal{X} = \mathcal{Z} \cup \mathcal{H}$. $Z \in \mathcal{Z}$ is a set of observable covariates, where $P_S(Z) \neq P_T(Z)$, and $H \in \mathcal{H}$ a set of unobservable covariates.

## Exogoneity and Covariate Shift - proposition {.allowframebreaks}

\begin{prop}
  The covariate shift assumption may be violated for $P(Y|Z)$ if the variable set $Z$ is not super exogenous.
\end{prop}

\begin{proof}
  This follows directly from the definition of super exogoneity: a failure of super exogoneity implies that the conditional distribution $P(Y|Z)$ is not invariant to changes in $P(Z)$, which implies that, potentially, $P_T(Y|Z) \neq P_S(Y|Z)$ given the assumption that $P_S(Z) \neq P_T(Z)$.
\end{proof}

\framebreak

\begin{prop}
  The covariate shift assumption holds for $P(Y|Z)$ if the variable set $Z$ is super exogenous and $P_S(Y|Z, H) = P_S(Y | Z)$.
\end{prop}

\begin{proof}
As $Z$ and $H$ encompass all variables and are thus the only possible changes across domains, this follows directly from super exogoneity of $Z$, $P_S(Y|Z, H) = P_S(Y | Z) = P_T(Y | Z)$.
\end{proof}

\framebreak

\begin{prop}
  The covariate shift assumption holds for $P(Y|Z)$ if the variable set $\{ Z \cup H \}$ is super exogenous and $P_S(H|Z) = P_T(H|Z)$.
\end{prop}

\begin{proof}
  Super exogoneity of $\{H \cup Z \}$, given they encompass all variables, implies $P_S(Y|Z,H) = P_T(Y|Z,H)$. Then $P_S(Y|Z) = \int P_S(Y|Z,H)P_S(H|Z) dH = \int P_T(Y|Z,H)P_T(H|Z) dH = P_T(Y|Z)$.
\end{proof}

\framebreak

\begin{prop}
  The covariate shift assumption holds for $P(Y|Z)$ if the variable set $\{ Z \cup H \}$ is super exogenous and $P_S(H|Z) = P_S(H) = P_T(H) = P_T(H|Z)$.
\end{prop}

\begin{proof}
  Super exogoneity of $\{H \cup Z \}$, given they encompass all variables, implies $P_S(Y|Z,H) = P_T(Y|Z,H)$. Then $P_S(Y|Z) = \int P_S(Y|Z,H)P_S(H) dH = \int P_T(Y|Z,H)P_T(H) dH = P_T(Y|Z)$.
\end{proof}

## Example - Microcredit[^microcredits]


- All published in 2015.

- Mexico, Mongolia, India, Bosnia and Herzegovina, Ethiopia, Morocco.

- Used as dataset to examine external validity by @Pritchett2016 @Meager2018

[^microcredits]: @Attanasio2015, @Angelucci2015, @Augsburg2015, @Banerjee2015, @Crepon2015, @Tarozzi2015.


## Microcredit setup

- We assume the feature space is the same (may not be!).

- Assume an unobservable: "Shumpeterianness". Call this $H$.

- Assume a set of proxies for Shumpeterianness, $Z_2$ - observables that are assumed to be _caused_ by $H$.

- $Z_2$ does not directly affect outcome, all correlation through $H$.

## Microcredit - threats to covariate shift

Threats are related to whether the following two facts hold:

1. $P_S(H) = P_T(H)$
2. $P_S(H|Z_2) = P_T(H|Z_2)$

The goal is to show that any method of model transportability needs to search over covariates to find the transportable model, which depends on these assumptions.

## Microcredit - Proofs of covariate shit {.allowframebreaks}

$P_S(H) = P_T(H)$ and $P_S(H|Z_2) \neq P_T(H|Z_2)$

In this case, $P_S(Y|W) = \int P_S(Y|W,H)P_S(H) dH = P_T(Y|W)$, thus the invariant condition is given by $P(Y|W)$. In contrast, $P(Y|W,Z_2)$ will not be invariant: $P_S(Y|W,Z_2) = \int P_S(Y|W,H,Z_2)P_S(H|Z_2) dH \neq P_T(Y|W,Z_2)$.

\framebreak

$P_S(H) \neq P_T(H)$ and $P_S(H|Z_2) = P_T(H|Z_2)$

This will provide an outcome that is the reverse of the above: $P_S(Y|W,Z_2) = \int P_S(Y|W,H,Z_2)P_S(H|Z_2) dH = P_T(Y|W,Z_2)$, thus the invariant condition is given by $P(Y|W,Z_2)$. In contrast, $P(Y|W)$ will not be invariant: $P_S(Y|W) = \int P_S(Y|W,H,Z_2)P_S(H) dH \neq P_T(Y|W)$.

\framebreak

$P_S(H) = P_T(H)$ and $P_S(H|Z_2) = P_T(H|Z_2)$

In this case, both the conditionals will be invariant, the proof is the same as above.

$P_S(H) \neq P_T(H)$ and $P_S(H|Z_2) \neq P_T(H|Z_2)$

In this case, neither of the conditionals will be invariant, the proof being again the same as above.

## Problems

- $P(H)$ is not observed!

- Existence of $H_2$?

## Solutions

- Collect labeled data from more than one domain.

- Let $g: \mathcal{Z} \rightarrow \mathbb{R}^D$ be a representation function that either selects variables or transforms them.

- Check invariance of all possible predictive conditionals, $P(Y|g(Z))$, directly. @Rojas-carulla2018

- Conversely, learn $g(\cdot)$ to maximize predictive power subject to a penalty on invariance. @Heinze-deml2017

## @Rojas-carulla2018

- Perform an independence test between the residuals of a parametric model for the output and the index label of the domain: $P(Y - f(X^*, S)) = P(Y - f(X^*))$, where $S = \{1,2,\ldots,K \}$ for $K$ source domains.

- They use a $\alpha$ level constraint on that independence test to look for a subset of the features $X^* \in X$ for which conditional invariance holds.

## @Heinze-deml2017


- Image recognition context. Uses a series of images in which the same individual, with the same causal characteristics, is captured across multiple domains subject to shifts in orthogonal features.

- A regularization term is added to the optimization problem of the neural network trained on the source domains. The term penalizes the conditional variance of the prediction $\mathbb{V}\big[ \hat{Y}| g(X) \big]$ for feature representation function $g(\cdot)$ applied to features where the ``causal characteristics'' are known to be the same.

- Through the regularization, the function $g(\cdot)$ learns a representation for which the conditional distribution of the outcome is invariant across domains.

## Treatment Effects - Setup

Let $Z = \{ Z_1, Z_2 \}$ the set of observed covariates,  $H = \{ H_1, H_2 \}$ the set of unobserved covariates, and $W \in \{ W_0, W_1 \}$ a binary treatment variable.

If the outcome is linearly separable, such that:
$$
Y(W,Z,H) = f_t(W,Z_1,H_1) + f_e(Z_1, Z_2, H_1, H_2)
$$

Then the conditional average treatment effect, $\tau(z)$ is parameterized only by $z_1$ and $h_1$::
$$
\tau(z, h) = \mathbb{E} \big[ Y(W_0, Z, H) - Y(W_1, Z, H) | Z = z, H = h \big] = \tau(z_1, h_1)
$$

## Treatment Effects - Benefits

- Weakly fewer variables.

- The correct question for the policy decision making.

## Treatment Effects - Complications

- $\tau_i$ not observed.

- Estimating quantiles not straight forward, subject to additional assumptions. @Firpo2007

- Needs a framework to find heterogeneous treatment effects in a disciplined way (select $Z_1$ from $Z$). @Athey2016


## Proposal

Predict the effect of a policy, $W$, on a new domain $\D_T$, given conditional treatment effect distributions, $P_1(\tau | g(Z_1)),\ldots, P_S(\tau | g(Z_1))$, from source domains $\D_S$ and a learned feature representation function $g(\cdot)$ that enforces conditional invariance such that the covariance shift assumption holds and importance estimation methods can be used to predict effects on a target population.


# Conclusions

## Asymptotic Theory for Experiments

>If we were prepared to carry out enough experiments in varied enough locations, we could learn as much as we want to know about the distribution of the treatment effects across sites conditional on any given set of covariates.'' -- @Banerjee2014

- If the set of covariates in ``any given set of covariates'' is infinite, we are assuming that nature is not uniform in any way and induction is impossible.

- Then, which covariates?

## Research Agenda

1. If the covariate shift assumption holds, importance estimation techniques can be used to predict in new contexts given data in a previous one.
2. In the face of unobservables, the covariate shift assumption must be proven to hold empirically by using labeled data from multiple contexts.
3. If that labeled data is experimental, it can be reasonable to estimate directly the treatment effect, potentially reducing the feature space and increasing the possibility of transportability.

# References

## References{.allowframebreaks}
