# Nrwl Airlines Angular edition

A sample [Nx](https://nx.dev/) workspace generated using the Nx Angular
workspace preset.

Structure-wise a somewhat realistic client-side workspace loosely based on
examples from the book "[Enterprise Angular Monorepo Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book)"
by [Nrwl](https://nrwl.io/).

The two domains _booking_ and _check-in_ each have two Angular application, one
for mobile and one for desktop. They are meant to be served using an adaptive
layout approach, that is user agent sniffing.

The _seatmap_ sub-domain is shared between both of the top-level domains.

The applications share root-level concerns through workspace libraries. The
top-level domains use a feature shell library to orchestrate initialization,
configuration, and routing.

A few presentational workspace libraries are shared between all domains.

The three domains each have a data acccess library with feature state. The
booking and seatmap domains have routed feature libraries.

Projects are tagged and workspace linting rules are set up to enforce
architectural boundaries.
