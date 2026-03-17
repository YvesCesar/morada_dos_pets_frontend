# Section Components

Sections are page-specific layout blocks, organized by route.

## Structure

```
sections/
├── admin-dashboard/  # Admin dashboard page
│   ├── AdminAppointmentsTable.vue
│   └── AdminServiceCards.vue
├── cadastro/         # Registration page
│   ├── RegisterBanner.vue
│   └── RegisterCard.vue
├── contato/          # Contact page
│   ├── ContactBanner.vue
│   ├── ContactFormSection.vue
│   └── ContactInfoSection.vue
├── coupons/          # Admin coupon management
│   ├── CouponFormModal.vue
│   └── CouponsTable.vue
├── customer-dashboard/ # Customer dashboard page
│   ├── CustomerTestimonialSection.vue
│   ├── EditPetModal.vue
│   ├── NewPetModal.vue
│   ├── UserAppointmentsSection.vue
│   └── UserPetsSection.vue
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
├── prices/           # Admin price editor
│   └── PricesEditor.vue
├── profile/          # User profile page
│   └── ProfileForm.vue
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
├── settings/         # Settings & change password
│   └── ChangePasswordForm.vue
├── testimonials/     # Admin testimonial moderation
│   └── AdminTestimonialsSection.vue
├── users/            # Admin user management
│   ├── UserFormModal.vue
│   └── UsersTable.vue
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
- Dashboard sections use `DashboardLayout` as the page wrapper (provided by the view)
- Modal sections (e.g. `CouponFormModal`, `EditPetModal`, `UserFormModal`) extend `BaseModal` from `shared/`
- Dashboard tables/lists use shared `DashboardFilterBar`, `DashboardStatsSection`, `ServiceBadge`, and `StatusBadge` components

## Testing

Shared components (`src/components/shared/`) have tests in `tests/components/shared/`. Modal components require `global: { stubs: { Teleport: true } }` when mounting. See `tests/AGENTS.md` for full testing patterns.
