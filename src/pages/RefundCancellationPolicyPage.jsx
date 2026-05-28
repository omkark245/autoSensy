import LegalPage from './LegalPage'
import { REFUND_SECTIONS } from '../data/trustPages'

export default function RefundCancellationPolicyPage() {
  return (
    <LegalPage
      badge="No Refunds"
      title="Refund and Cancellation Policy"
      subtitle="Important notice: AutoSensy does not provide refunds or cancellations after payment, subscription confirmation, onboarding, setup, or service confirmation."
      sections={REFUND_SECTIONS}
      tone="warning"
    />
  )
}
