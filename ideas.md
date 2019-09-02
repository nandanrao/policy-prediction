# Random Implementation Ideas

### Invariance across individuals

Minimizing MSE or similar will naturally tradeoff big gains on few people with small gains on many people. But from a "causal" perspective, something that has big gains on a few people but negative gains on (potentially many) others is definitely not an invariant causal mechanism! Thus, one can consider looking, rather for the relationships that best minimize the MSE, look for relationships that maximize some sort of "stability" across individuals, relationships that always hold, even if they are weak relationships.

- Generate: 
A weak causal relationship, a strong non-causal relationship, but the strong non-causal relationship (say a child of Y) could have another parent which is sometimes inactive and sometimes large and the other parent has an even stronger effect on the child (which dissapears when the parent is not very active).


### Invariant Forests

At each split, look at the information gain _separately_ across each data set, then pick a split that maximizes the minimum gain (or minimizes the spread or something to correspond to invariance rather than information gain in MSE). 


### Targeted Invariant Neighbor Forests

Take each observation from your target domain.

Find the nearest neighbor along one dimension in each dataset. 

Greedily add dimensions. (could be from a random subset, could be with minimum depth)

The dimensions should only be added if they push the estimate from the multiple datasets _closer_ together. Thus, the p(Y|X = x) is more _invariant_.

## Invariance within an environment

If the only thing that needs to change is p(X) of the observed variables, that can be created easily by simply resampling the variables and seeing if the residuals are independent of the "runs" (ala rojas-carulla) -- why is that not valid? 

Invariance across domains must be understoood as a "protection" against latent interacting variables that have a different distribution in different environments or over time... Invariance then implies that there is not an existing latent interacting variable, as long as we can assume the environments tested are varied enough to have found it to be of a different distribution.

## Quantile Forests 

The QRF paper uses random forest trained on a MSE loss, then takes the distribution given by it. There are quantile trees, and Towards Data Science even has an example of a XGB quantile forest grown using a modified quantile loss (to create gradient/hessian needed by XGB)... So... Anyways, take the original data sets from the QRF paper and compare the QRF with these other methods! 
