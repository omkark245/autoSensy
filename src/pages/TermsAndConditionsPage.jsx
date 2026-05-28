import LegalPage from './LegalPage'
import { TERMS_SECTIONS } from '../data/trustPages'

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      badge="Terms"
      title="Terms and Conditions"
      subtitle="These terms outline general website usage, inquiry handling, demo discussions, pricing information, and third-party platform considerations for AutoSensy."
      sections={TERMS_SECTIONS}
    />
  )
}

