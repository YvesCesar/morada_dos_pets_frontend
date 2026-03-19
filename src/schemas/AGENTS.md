# Schemas — AGENTS.md

## Purpose

Zod validation schemas for all application forms. Used with vee-validate's `useForm` + `toTypedSchema` for real-time validation with per-field error messages.

## Structure

| File | Domain |
|------|--------|
| `common.ts` | Reusable field schemas (email, password, name, phone, CPF, CEP, date) |
| `auth.ts` | Login, register (step 1 & 2), change password |
| `contact.ts` | Contact form |
| `profile.ts` | User profile editor |
| `payment.ts` | Credit card, debit card |
| `pet.ts` | Pet creation/editing |
| `dashboard.ts` | Admin user form, coupon form, testimonial |
| `newsletter.ts` | Newsletter email |
| `service-request.ts` | Service request selects |
| `index.ts` | Barrel export |

## Shared Fields (`common.ts`)

| Schema | Format | Error message |
|--------|--------|---------------|
| `emailSchema` | valid email | "E-mail inválido" |
| `passwordSchema` | min 6 chars | "Mínimo 6 caracteres" |
| `nameSchema` | min 2 chars | "Nome deve ter pelo menos 2 caracteres" |
| `phoneSchema` | `(##) #####-####` | "Celular inválido" |
| `cpfSchema` | `###.###.###-##` | "CPF inválido" |
| `cepSchema` | `#####-###` | "CEP inválido" |
| `dateSchema` | `DD/MM/AAAA` | "Data inválida (DD/MM/AAAA)" |
| `requiredString(label)` | non-empty | `"${label} é obrigatório"` |

## Usage Pattern

```typescript
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema } from '@/schemas'

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => { /* typed values */ })
```

Template:
```html
<input v-model="email" v-bind="emailAttrs" :class="{ 'form-input--error': errors.email }" />
<span v-if="errors.email" class="form-error-message">{{ errors.email }}</span>
```

## Conventions

- Error messages in **pt-BR**
- Regex patterns validate **formatted** values (after maska applies the mask)
- Use `.refine()` for cross-field validations (e.g. password confirmation)
- Always reuse fields from `common.ts` — never duplicate regex patterns
- Schemas are pure (no Vue dependencies) — testable with `safeParse`

## Creating a New Schema

1. Add file in `src/schemas/` (e.g. `my-form.ts`)
2. Import shared fields from `./common`
3. Export schema with `Schema` suffix (e.g. `myFormSchema`)
4. Add export to `index.ts`
5. Add tests in `tests/schemas/`
