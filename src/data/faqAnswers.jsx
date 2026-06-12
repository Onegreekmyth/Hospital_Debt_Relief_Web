import { Link } from "react-router-dom";

const linkClass =
  "text-[#3D0BBE] font-semibold hover:underline focus:underline focus:outline-none";

export const trialFaqAnswer = [
  <>
    Getting started with Hospital Debt Relief is completely free. Simply create
    your free account at{" "}
    <a href="https://www.hospitaldebtrelief.com" className={linkClass}>
      hospitaldebtrelief.com
    </a>{" "}
    and your 90-day trial begins instantly. No credit card needed.
  </>,
  <>
    <strong>What&apos;s Included During Your Free Trial:</strong>
  </>,
  <>
    <strong>Your First Hospital Bill is Free:</strong> Submit your first hospital
    bill at no cost. We&apos;ll guide you through the financial assistance
    process with zero upfront commitment.
  </>,
  <>
    <strong>Additional Bill Submissions:</strong> Need to submit more than one
    bill during your trial? A flat fee of $299 applies to each additional bill
    submitted.
  </>,
  <>
    <strong>Upgrade to a Monthly Membership Anytime:</strong> Enroll in a
    membership plan during your trial and your monthly rate is waived until
    your trial ends.{" "}
    <Link to="/plans" className={linkClass}>
      View our membership plans here.
    </Link>{" "}
    You get unlimited bill submissions and billing starts after your 90 days
    only if you decide to keep it. Only hospital bills dated on or after your
    membership start date are eligible for submission.
  </>,
  <>
    <strong>What Happens After Your 90-Day Trial:</strong>
  </>,
  <>
    <strong>No Membership:</strong> A flat fee of $299 applies to each bill you
    submit.
  </>,
  <>
    <strong>Active Membership:</strong> Your monthly rate continues and includes
    unlimited bill submissions. Only bills dated on or after your membership
    start date are eligible.
  </>,
  <>No hidden fees. No long-term contracts. Cancel anytime.</>,
  <>
    Ready to see how much you could save on your hospital bills?{" "}
    <a href="https://www.hospitaldebtrelief.com" className={linkClass}>
      Start your free 90-day trial today at hospitaldebtrelief.com.
    </a>{" "}
    No credit card required.
  </>,
];

export const moneyBackGuaranteeFaqAnswer = [
  <>
    If your bill hasn&apos;t been reduced by more than the cost of our service
    within 60 days of submitting your completed application and documents, you
    are eligible for a refund. To request one, go to your &ldquo;
    <a
      href="https://hospitaldebtrelief.com/bill-history"
      className={linkClass}
    >
      Bill History
    </a>
    &rdquo; tab, select the original bill, and upload a copy of your most
    recent revised statement. Enter the new balance and submit your request for
    processing.
  </>,
];

export const pricingFaqAnswer = [
  <>
    <strong>The Non-Member Rate:</strong> A Flat $299 Per Bill. We keep it
    simple, non-members pay a one-time fee of $299 to help lower an existing
    bill. Whether we save you $1,000 or $10,000, your cost stays exactly the
    same.
  </>,
  <>
    Want to avoid future fees and save even more money? Become a member to
    protect your family from future hospital bills at no extra cost. On a yearly
    average, members pay 56% less than non-members and that&apos;s based on just
    one member bill submission vs the non-member rate.{" "}
    <a href="https://hospitaldebtrelief.com/plans" className={linkClass}>
      Memberships start at $7/Month.
    </a>
  </>,
];
