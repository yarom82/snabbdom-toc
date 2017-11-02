# snabbdom-toc
[![Greenkeeper badge](https://badges.greenkeeper.io/yarom82/snabbdom-toc.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/yarom82/snabbdom-toc.svg?branch=master)](https://travis-ci.org/yarom82/snabbdom-toc) 

Generates a table of contents for a provided `VNode[]`.

## API

`snabbdomToc(content: VNode[]) => VNode`

## Example

Input:

> ### Blandita quis umeros vomere
>
> #### Ire regnum errent dum
>
> Lorem markdownum magis ad hunc.
>
> #### Omnes ianua si
>
> Interea te vultus Gallicus adpareat praevertunt et sed temptat quae pro quoque
nullisque questus.
>
> #### Et tuum cuius praebebatque
>
> Pavetque Sicelidas aethera coetum Cepheaque torrens ecquid.
>
> Levem si cui, scelerata vulnera!

Output:

> - [Blandita quis umeros vomere](#blandita-quis-umeros-vomere)
>   - [Ire regnum errent dum](#ire-regnum-errent-dum)
>   - [Omnes ianua si](#omnes-ianua-si)
>   - [Et tuum cuius praebebatque](#et-tuum-cuius-praebebatque)
