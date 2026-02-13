# Section Components

Sections are page-specific layout blocks, organized by route.

## Structure

```
sections/
├── cadastro/         # Registration page
│   ├── RegisterBanner.vue
│   └── RegisterCard.vue
├── contato/          # Contact page
│   ├── ContactBanner.vue
│   ├── ContactFormSection.vue
│   └── ContactInfoSection.vue
├── dog-spa/          # Dog Spa service page
│   ├── BenefitsSection.vue
│   ├── DescriptionSection.vue
│   ├── DogSpaServicesSection.vue
│   └── HeroBannerDogSpa.vue
├── dog-taxi/         # Dog Taxi service page
│   ├── BenefitsSection.vue
│   ├── DescriptionSection.vue
│   └── HeroBannerDogTaxi.vue
├── entrar/           # Login page
│   ├── LoginBanner.vue
│   └── LoginCard.vue
├── hospedagem/       # Boarding/daycare page
│   ├── BenefitsSection.vue
│   ├── CrechePricingSection.vue
│   ├── DescriptionSection.vue
│   ├── HeroBannerHospedagem.vue
│   ├── HospedagemCarouselSection.vue
│   ├── HospedagemPricingSection.vue
│   └── PricingNoteSection.vue
├── pagamento/        # Payment flow
│   ├── ConfirmationStep.vue
│   ├── CouponInput.vue
│   ├── OrderSummary.vue
│   ├── PaymentCredit.vue
│   ├── PaymentDebit.vue
│   ├── PaymentMethodSelector.vue
│   ├── PaymentPix.vue
│   ├── PaymentStep.vue
│   ├── ProgressBar.vue
│   └── ServiceRequestStep.vue
├── quem-somos/       # About page
│   ├── HeroBannerSection.vue
│   ├── HistorySection.vue
│   ├── MissionVisionValuesSection.vue
│   ├── TestimonialsSection.vue
│   └── UnitsSection.vue
├── servicos/         # Services listing page
│   ├── ClientsCarouselSection.vue
│   ├── DedicationSection.vue
│   ├── HeroBannerServicos.vue
│   └── TutorialSection.vue
└── *.vue             # Home page sections (root level)
    ├── AboutSection.vue
    ├── CtaSection.vue
    ├── FeaturesSection.vue
    ├── HeroSection.vue
    ├── NewsletterSection.vue
    └── ServicesSection.vue
```

## Conventions

- Each route subfolder groups all sections for that page
- Views import and compose these sections (views stay thin)
- Home page sections live at the root of `sections/` (no subfolder)
- Shared patterns like `BenefitsSection` and `DescriptionSection` repeat per service but are NOT shared components — they contain service-specific content
