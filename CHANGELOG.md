# Changelog

## [1.1.1](https://github.com/limonify/email-templates/compare/email-templates-v1.1.0...email-templates-v1.1.1) (2026-09-02)


### Bug Fixes

* **layout:** stop templates overflowing on narrow screens ([1ba6ee8](https://github.com/limonify/email-templates/commit/1ba6ee86b11ead2a02753e6e617aa3dae943a733))
* **theme:** follow [@import](https://github.com/import) and default to the app-level palette ([bd9d3c1](https://github.com/limonify/email-templates/commit/bd9d3c1933e19836bbbec0fc0fffd046a839f251))
* **theme:** read real @limonify/ui tokens instead of falling back ([fbaf4e8](https://github.com/limonify/email-templates/commit/fbaf4e818db530a8a2460191de37fe7babcba00a))

## [1.1.0](https://github.com/limonify/email-templates/compare/email-templates-v1.0.3...email-templates-v1.1.0) (2026-08-30)


### Features

* add comprehensive dimension and typography sizing customization for logos, titles, containers, badges, and OTP fields ([23ec01c](https://github.com/limonify/email-templates/commit/23ec01c2097d0c2c4ebf3aaffc9ac7a3e7f1ca00))
* add Daily Newsletter (Tech Briefing) and General Announcement templates (total 26 templates) ([97f27fe](https://github.com/limonify/email-templates/commit/97f27fec05ffad7a1bc2dedec96927749125fa30))
* add dedicated BrandLogo component and interactive logo branding options to CLI ([9f617bc](https://github.com/limonify/email-templates/commit/9f617bc842fce35a4e2bbf23257237ac758ee8fe))
* add interactive live email preview server (bun run preview) ([c30dc50](https://github.com/limonify/email-templates/commit/c30dc50a2c9f1790a0dda084ff52448abd99969d))
* add multi-language i18n support (en, tr, de, es, fr) with locale subdirectories and live preview switcher ([6f81222](https://github.com/limonify/email-templates/commit/6f812223c703b33ac9abf352f7a3f486d2f67e71))
* allow overriding translations via config file, custom ./locales dir, or programmatic API ([71b489d](https://github.com/limonify/email-templates/commit/71b489d688c4c049b7b2c74edd00d986b7cec011))
* complete 24-template master suite including CI/CD DevOps, Team collaboration, Security, and E-commerce ([8c3e74e](https://github.com/limonify/email-templates/commit/8c3e74e2b155def7d2bc8eae98127b82e8fed389))
* complete customization architecture with config loader, card styles, and customizable template props ([e8bd6ba](https://github.com/limonify/email-templates/commit/e8bd6ba448e5325f8be2aeef8f32043f76a09747))
* expand template suite to 12 production-grade SaaS templates across 5 languages ([05107c7](https://github.com/limonify/email-templates/commit/05107c7b349dab5e672eba8c3579f4fda0ca2abe))
* expand to 18 complete SaaS, Security, Billing, and Analytics email templates ([f1ddcd3](https://github.com/limonify/email-templates/commit/f1ddcd33d14c58126ffdf6d7d1efb0f3385ed485))
* initial commit for @limonify/email-templates ([518069d](https://github.com/limonify/email-templates/commit/518069ddbf25f55055221bf48483684e02502c87))
* level up email UI/UX with segmented OTP fields, onboarding steps, device security cards, and Limonify Studio ([35e4c73](https://github.com/limonify/email-templates/commit/35e4c73210be6e2b82ccdda9f179548cce7287a2))
* synchronize default theme tokens with exact Limonify OKLCH neutral palette and native parser ([7889b84](https://github.com/limonify/email-templates/commit/7889b84a8a3dc8bfa086b24e63cb1bf42bef5d5f))


### Bug Fixes

* **ci:** simplify release workflow and add automatic GitHub Release generator ([290aff6](https://github.com/limonify/email-templates/commit/290aff664c1c1f5bf0bdf93e45b6270b6bc9508d))
* include all 26 email templates in git and fix gitignore pattern ([e86cd34](https://github.com/limonify/email-templates/commit/e86cd347493685b7ccc7443bf50661c0328fddbb))
