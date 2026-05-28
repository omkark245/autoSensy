import LegalPage from './LegalPage'
import { PRIVACY_SECTIONS } from '../data/trustPages'

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="Privacy"
      title="Privacy Policy"
      subtitle="This policy explains how AutoSensy may collect, use, and handle information shared through the website, WhatsApp, email, phone, and demo inquiries."
      sections={PRIVACY_SECTIONS}
    />
  )
}

