---
paginate: true
math: false
---

# Treatment Transfer Trees
<!-- _class: lead -->

Nandan Rao
2021

---


## Outline

1. Motivation
2. Problem setup
3. Simulation setup
4. Model
6. Results

---

## Motivation

Imagine you are a policymaker in Bosnia.

You recieve a proposal to fund a program providing micro-credit loans to entrepreneurs in your country. You are interested in increasing business revenues of small businesses in your country.

You can find one empirical study, from Mexico, which shows that the effects of a microcredit program on revenue were positive and significant.

What do you do?

---


## Motivation

Now imagine you find 3 more studies, from Morroco, India, and Ethiopia, which show that the effects of microcredit programs on revenue were not significant, but with positive point estimates.

Now what do you do?

---

## External validity


“...from the perspective of policy choice...What matters is the informativeness of a study for policy making, which depends jointly on internal and external validity.” (Manski 2012)

“It is our belief that creating a rigorous framework for external validity is an important step in completing an ecosystem for social science field experiments, and a complement to many other aspects of experimentation.” (Banjerjee, Chassang, Snowberg 2016)



---

## Methods for joint validity

Qualitative methods (Shadish, Cook, Campbell 2001; Cartwright and Hardy 2013).

Meta-study methods, specifically Bayesian hiearchical methods (Meager 2018).

Transportability of treatment effects (Dahabreh et al. 2020).

---


## Setup

Individual $i$ described by covariates $x_i \in \mathcal{X}$ and potential outcomes of interest $y^1_i, y^0_i \in \mathcal{Y}$ and individual treatment effect: $\tau_i \coloneqq y^1_i - y^0_i$ for treatment $w_i \in \{0,1 \}$.

Individuals belong to separate **domains** $d \in \mathcal{D}$ with different population distributions $P_d(\tau, X)$.

Denote ATE for domain $d$ as: $\tau(d) \coloneqq \mathbb{E}_{P_d(\tau)}[\tau]$

Denote CATE for domain $d$ as: $\tau(x, d) \coloneqq \mathbb{E}_{P_d(\tau)}[\tau | X=x]$

---

## Setup

We have unconfounded samples from $P_d(X, Y, W)$ for domains $\{d_1,\dots,d_K \}$.

Unconfounding: $P_d(X, Y^w) = P_d(X, Y | W = w)$.

We have samples from $P_{d^*}(X)$ from domain of interest, $d^* \notin \{d_1,\dots,d_K \}$.

Object of interest: $\tau(d^*) = \int \underbrace{\tau(X, d^*)}_{?} \underbrace{P_{d^*}(X)}_{\text{estimable}} dX$

---

## Setup


In general, $\tau(x, d^*) \stackrel{?}{=} \tau(x, d)$.

Goal is to find a feature-representation function $f: \mathcal{X} \rightarrow \mathbb{R}^M$ for which $\tau(f(x), d^*) \approx \tau(f(x), d)$.

**Strategy:** search for a $f(\cdot)$ such that $\tau(f(x), d)$ is stable for $d \in \{d_1,\dots,d_K\}$.

**Assumption:** $\{d_1,\dots,d_K \} \in \mathcal{D}, d^* \in \mathcal{D}$.

---

## Data simulation
<!-- _class: sidemath  -->

$$
\begin{aligned}
y_i &= \tau_i w_i + \epsilon_i \\
\tau_i &= f_{\tau}(H_i, Z_i, \alpha, \delta) \\
Z_i &= \mathcal{N}(Q_{d}, R_{d}) \\
H_i &= \mathcal{N}(A_{d}, B_{d}) \\
V_i &= C_{d} H_i + \mathcal{U}(J_{d}, K_{d})
\end{aligned}
$$

![height:225px](../src/img/graph.png)


$Z$ is a visible interacting variable
$H$ is a latent interacting variable
$V$ is a visible proxy for $H$

(Pearl and Bareinboim 2014)

---

## Stability of simulated data

Two candidate models if $f(\cdot)$ consisted of simple variable selection:

$$
\begin{aligned}
\mathbb{E}_{P_d(\tau)}[\tau | Z, V] &= \int \mathbb{E}_{P_d(\tau)}[\tau | Z, H] \ P(H | V) \ dH \\
\mathbb{E}_{P_d(\tau)}[\tau | Z] &= \int \mathbb{E}_{P_d(\tau)}[\tau | Z, H] \ P(H) \ dH \\
\end{aligned}
$$

Given the DGP, stability of the models is determined by stability of $P(H)$ vs. stability of $P(H | V)$.

---

## Model

A decision-tree model based on CART (Breiman et al. 1984) and Causal Trees (Athey and G. Imbens 2016).

A tree-based algorithm provides the following advantages:

1. It optimizes over the discrete space of covariates and their interactions with a local, greedy, forward-backward search.
2. It discretizes the continuous input space of covariates.


---


## Model

Denote $\mathcal{S}$ the space of data samples $\{(x_1,y_1,w_1),\dots,(x_N, y_N, w_N)\} \in \mathcal{S}$

Define a random sampling function $S: \mathcal{D} \rightarrow \mathcal{S}$. Notationally denote an expectation of a generic function $g: \mathcal{S} \rightarrow \mathbb{R}$ taken over the realizations of the sampling function as $\mathbb{E}_S[g(S(d))]$.

---



## Model

Define $\Pi$ as a set of discrete partitions of the covariate space $\{\Pi_1, \dots, \Pi_P\} \in \mathcal{P}$.

Define a "leaf" function that finds the correct partition for a given observation:
$$
\lambda(x, \Pi) \coloneqq \{\Pi_j \in \Pi : x \in \Pi_j \}
$$

Define a discretized CATE over a set of partitions $\Pi$:

$$
\tau(x, \Pi, d) \coloneqq \mathbb{E}_{P_d(\tau)}[\tau | X \in \lambda(x, \Pi))]
$$

---


## Model

Define a "tree" function that finds the correct partition for a given observation and returns the sample data in that partition, $tree : (\mathcal{X}, \mathcal{P}, \mathcal{S}) \rightarrow \mathcal{S}$:
$$
tree(x_i, \Pi, s) \coloneqq \{(x, y, w) \in s : x \in \lambda(x_i, \Pi) \}
$$

Let $\bar{y}^w: \mathcal{S} \rightarrow \mathbb{R}$ return the sample average of all outcomes where $w_i = w$.

Define the following estimator $\hat{\tau}: (\mathcal{X}, \mathcal{P}, \mathcal{S}) \rightarrow \mathbb{R}$:

$$
\hat{\tau}(\cdot) =  \bar{y}^1(tree(\cdot)) - \bar{y}^0(tree(\cdot))
$$

---


## Objective function

Oracle squared loss function is given by:

$$
\ell(\hat{\tau}, \tau_i) = (\tau_i - \hat{\tau})^2
$$

Expected oracle loss of a partitioning $\Pi$, given that the conditional treatment estimator is trained on single source domain $d$:

$$
\mathbb{E} \ell(\Pi) = \mathbb{E}_{X, S} [ (\tau_i - \hat{\tau}(x_i, \Pi, S(d)))^2  ]
$$

Where $\tau_i, x_i \in d^*$.

---

## Objective function


**Proposition 1**

The expected oracle loss of a partitioning, $\mathbb{E} \ell(\Pi)$, is estimable given access to $\hat{\tau}(x_i, \Pi, S(d^*))$.

---

## Objective function

$$
\mathbb{E} \ell(\Pi) = \mathbb{E}_{X, S} [ (\tau_i - \hat{\tau}(x_i, \Pi, S(d)))^2  ]
$$

Expand the square.

$$
\newcommand{\Ex}{\mathbb{E}}
\newcommand{\TTs}{\hat{\tau}(x_i, \Pi, S(d))}
\mathbb{E} \ell(\Pi) = \mathbb{E}_{X} [ \tau_i^2] +  \mathbb{E}_{X} [   -2 \mathbb{E}_{S}[ \tau_i \TTs] + \mathbb{E}_{S}[ \TTs^2 ] ]
$$

First term does not depend on $\Pi$.

---

## Objective function


We can write the last term in terms of sample estimates:

$$
\newcommand{\Ex}{\mathbb{E}}
\newcommand{\TTs}{\hat{\tau}(x_i, \Pi, S(d))}
\newcommand{\TTsi}{\hat{\tau}(x_i, \Pi, S(d_k))}
\newcommand{\Var}{\mathbb{V}}
\begin{aligned}
    &=  \Ex_{S}[\TTs^2 ]   \\
    &=  \Var_{S} [\TTs] +  \Ex_S [\TTs]^2 \\
    &\approx  \hat{\Var}_{S} [\TTs] + \TTs ^2
\end{aligned}
$$

Where $\hat{\mathbb{V}}_{S} \coloneqq \frac{s_t^2}{N_t} + \frac{s_c^2}{N_c}$ is a conservative upper bound (Imbens and Rubin 2015).

---

## Objective function

Middle term: conditional on the value being within a leaf, $\tau_i$ and $\newcommand{\TTs}{\hat{\tau}(x_i, \Pi, S(d))}  \TTs$ become independent:
$$
\newcommand{\Ex}{\mathbb{E}}
\newcommand{\TTs}{\hat{\tau}(x_i, \Pi, S(d))}
-2 \Ex_{X,S}[ \underbrace{\Ex_{X}[ \tau_i | x_i \in \Pi_j]}_{\approx \hat{\tau}(x_i, \Pi, S(d^*))} \ \underbrace{\Ex_{S}[ \TTs | x_i \in \Pi_j]}_{\approx \hat{\tau}(x_i, \Pi, S(d))}]
$$


---

## Estimable function

Which leads to the loss function, estimable with access to $\hat{\tau}(x_i, \Pi, S(d^*)$:
$$
\newcommand{\TTs}{\hat{\tau}(x_i, \Pi, S(d))}
\newcommand{\Var}{\mathbb{V}}
\sum_j \hat{P}(x_i \in \Pi_j) \bigg( -2 \hat{\tau}(x_i, \Pi, S(d^*)) \TTs  + \hat{\Var}_{S} [\TTs] + \TTs ^2 \bigg)
$$

Unforunately, no way to compute $\hat{\tau}(x_i, \Pi, S(d^*)$ without further assumptions.

---

## Pooled estimator

Pooled prediction: $\frac{1}{K} \sum_k \hat{\tau}(x_i, \Pi, S(d_k)$

Objective function:

$$
\newcommand{\Ex}{\mathbb{E}}
\newcommand{\TTsi}{\hat{\tau}(x_i, \Pi, S(d_k))}
\newcommand{\Var}{\mathbb{V}}
\sum_{j} P(x_i \in \Pi_j) \bigg[ -2  \frac{1}{K} \sum^K_k \bigg( \hat{\tau}(\Pi_j, S(d_k)) \frac{1}{P - 1} \sum_{m \neq k}^P \hat{\tau}(\Pi_j, S(d_m)) \bigg) \ + \\ \frac{1}{K^2} \sum_k \hat{\Var}_{S} [\TTsi] + \bigg[ \frac{1}{K} \sum_k \TTsi \bigg]^2 \bigg]
$$

Aggressive variant: swap $\frac{1}{K} \sum^K_k$ for $\min_{k \in \{1,\dots,P \}}$

---



## Results

$$
\begin{aligned}
f_{\tau}^{linear} &= \alpha V_i  + \delta H_i  \\
f_{\tau}^{nl-hard} &= \alpha V_i \cdot  1 \{ V_i > 0 \} + \delta H_i \cdot  1 \{ H_i > 0 \\
f_{\tau}^{nl-simple} &= \alpha \cdot  1 \{ V_i > 0 \}  +  \delta \cdot 1 \{ H_i > 0 \} \\
f_{\tau}^{nl-stacked} &= \sum_{j=-2}^2 \alpha \cdot  1 \{ V_i > j \}  +  \sum_{j=-2}^2 \delta \cdot 1 \{ H_i > j \} \\
\end{aligned}
$$

---

## Results

Transfer R-squared:

$$
R^2_{tr} \coloneqq 1 - \frac{MSE}{\frac{1}{N} \sum_i (\tau_i - \bar{\tau}_{\{d_1,\dots,d_K \}})^2}
$$

Where $\bar{\tau}_{\{d_1,\dots,d_K \}}$ is the oracle average treatment effect on the pooled source domains.


---


## Results: K=4 ($R^2$)

![width:1150px](../tex/png/results-4-r2.png)

---

## Results: K=4 (Details)

![width:1150px](../tex/png/results-4-rest.png)
