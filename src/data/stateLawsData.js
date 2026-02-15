/**
 * State charity care laws content for the State Laws page.
 * Keyed by state code (e.g. "AL", "AZ"). Each state has name and either
 * sections (array of { title, body[] }) or summary (string).
 */
export const stateLawsData = {
  AL: {
    name: "Alabama",
    sections: [
      {
        title: "",
        body: [
          "In Alabama, there is no single state law that mandates a specific amount of \"charity care\" that every hospital must provide. Instead, Alabama's system is a combination of transparency requirements, tax-incentive-based programs, and federal mandates for nonprofit hospitals.",
          "Here is the breakdown of the laws governing charity care in Alabama as of 2026:"
        ]
      },
      {
        title: "1. The Alabama Financial Assistance Disclosure Law",
        body: [
          "Under Alabama Code § 22-21-300, hospitals are not strictly required by the state to offer a specific charity care program, but if they have one, they must follow strict disclosure rules:",
          "Notice on Bills: Every bill or summary of charges issued by a hospital must include a statement notifying the patient that they may qualify for financial assistance.",
          "Conspicuous Signage: Hospitals must post signs in admission and registration areas (including the ER) regarding the availability of financial assistance.",
          "Online Access: If a hospital offers financial assistance, it must prominently post the application and a description of the process on its website."
        ]
      },
      {
        title: "2. Federal Section 501(r) (For Nonprofit Hospitals)",
        body: [
          "Since the majority of hospitals in Alabama are nonprofit (501(c)(3)), they must comply with federal regulations under the Affordable Care Act. This is often what people are referring to when they look for \"charity care laws.\" These hospitals must:",
          "Maintain a written Financial Assistance Policy (FAP).",
          "Limit the amount charged for emergency or other medically necessary care to patients who qualify for assistance (they cannot charge these patients \"gross charges\").",
          "Attempt to determine if a patient is eligible for assistance before engaging in \"extraordinary collection actions\" (like lawsuits or wage garnishment)."
        ]
      },
      {
        title: "3. New for 2026: Alabama Rural Hospital Investment Program",
        body: [
          "As of January 5, 2026, a new state program provides a dollar-for-dollar tax credit for donations to rural hospitals. To be eligible to receive these funds, a rural hospital must meet several requirements, including:",
          "Providing hospital services to indigent patients regardless of their ability to pay.",
          "Maintaining a five-year plan for financial stability.",
          "Providing services to Medicare and Medicaid participants without discrimination."
        ]
      },
      {
        title: "4. County Indigent Care Programs",
        body: [
          "Alabama law (§ 22-21-210 and § 22-21-290) also delegates certain responsibilities to individual counties. Some counties have their own \"Indigent Care Funds\" supported by local taxes. These programs often have their own specific residency and income requirements (e.g., many require the patient to be an Alabama resident with an income below 200% of the Federal Poverty Level)."
        ]
      },
      {
        title: "5. Tax Exemptions for For-Profit Hospitals",
        body: [
          "For-profit hospitals in Alabama can qualify for a partial property tax exemption (up to $75,000 in assessed value) if they certify that at least 15% of their patient treatment in the previous year was performed as \"charity work.\""
        ]
      }
    ]
  },
  AK: {
    name: "Alaska",
    sections: [
      {
        title: "",
        body: [
          "In Alaska, there is no single state law that mandates a specific level of charity care (free or discounted medical services) for all hospitals. Instead, hospital financial assistance is governed by a combination of Federal requirements for nonprofit hospitals and specific Alaska transparency statutes."
        ]
      },
      {
        title: "1. The Federal Standard (IRS 501(r))",
        body: [
          "Most major hospitals in Alaska (like Providence and Fairbanks Memorial) are nonprofits. To keep their tax-exempt status, they must follow Federal Section 501(r) rules, which require:",
          "Written Financial Assistance Policies (FAP): Hospitals must have a clear, written policy outlining who is eligible for free or discounted care.",
          "Limitation on Charges: Hospitals cannot charge patients eligible for financial assistance more than the \"Amounts Generally Billed\" (AGB) to insured patients.",
          "Billing and Collections: They must give patients at least 240 days from the first bill to apply for financial assistance before taking extraordinary collection actions (like lawsuits or credit reporting)."
        ]
      },
      {
        title: "2. Alaska State Statutes",
        body: [
          "While Alaska doesn't mandate \"free care\" percentages, it has laws focused on transparency and payment flexibility:",
          "Health Care Price Transparency (AS § 18.23.400): This is the most significant state law. It requires hospitals to post a list of their most common procedure prices and provide \"Good Faith Estimates\" to patients. If a hospital fails to comply, they can face civil penalties.",
          "Catastrophic Illness Assistance (AS § 47.08.070): To receive state reimbursement under this program, hospitals must offer a payment plan that allows patients at least three years to pay off their balance if they do not qualify for Medicaid.",
          "Property Tax Exemptions (AS § 29.45.030): This law exempts property used \"exclusively for hospital purposes\" from taxes. While it doesn't set a charity care \"quota,\" it is the reason most Alaska hospitals provide financial assistance—to demonstrate they are serving a \"charitable purpose.\""
        ]
      },
      {
        title: "3. Common Eligibility Guidelines (2026)",
        body: [
          "Because Alaska has a higher cost of living, its Federal Poverty Level (FPL) thresholds are higher than the rest of the U.S. (except Hawaii). In 2026, most Alaska hospitals use the following general tiers:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale discount (e.g., 25% to 75% off).",
          "Medical Indigency: Assistance if medical bills exceed a certain % of income (often 10%–20%).",
          "Note: For 2026, the FPL for a single person in Alaska is approximately $19,950. This means a single person earning up to ~$39,900 would typically qualify for full charity care at most Alaska nonprofit facilities."
        ]
      }
    ]
  },
  AZ: {
    name: "Arizona",
    sections: [
      {
        title: "",
        body: [
          "Unlike many states, Arizona does not have a specific state law that mandates hospitals provide a set amount of charity care (free or discounted medical services). Instead, hospital financial assistance is governed by federal requirements for nonprofit hospitals and a robust set of Arizona-specific medical debt protection laws.",
          "Here is the breakdown of the legal framework in Arizona for 2026:"
        ]
      },
      {
        title: "1. The \"No Mandate\" Reality",
        body: [
          "Arizona is a \"no mandate\" state, meaning there is no state statute requiring a hospital to offer a specific percentage of its revenue as charity care. However, because nearly all major health systems in the state (such as Banner Health, Dignity Health, and Mayo Clinic) operate as nonprofit 501(c)(3) organizations, they must comply with Federal IRS Rule 501(r):",
          "Must Have a Policy: Hospitals must maintain a written Financial Assistance Policy (FAP).",
          "240-Day Application Window: You have 240 days from your first bill to apply for financial assistance before the hospital can take \"extraordinary collection actions.\"",
          "Limitation on Charges: They cannot charge eligible patients more than the \"Amounts Generally Billed\" (AGB) to insured patients."
        ]
      },
      {
        title: "2. Arizona's Medical Debt Protection Law (Proposition 209)",
        body: [
          "While Arizona doesn't mandate \"free care,\" it has some of the strongest medical debt protections in the country due to Proposition 209, which was upheld and expanded for 2026.",
          "3% Interest Cap: State law (A.R.S. § 44-1201) caps interest on medical debt at 3% per year (or the one-year Treasury yield, whichever is lower). Before this, interest could be as high as 10%.",
          "Wage Garnishment Limits: Creditors can only garnish 10% of your disposable earnings for medical debt (or as low as 5% if you can prove extreme economic hardship).",
          "Asset Protection: The law protects a significant portion of your assets from being seized to pay medical bills. For 2026, the Homestead Exemption (protecting your primary home) is approximately $450,000 (adjusted annually for inflation)."
        ]
      },
      {
        title: "3. Arizona State Transparency Laws",
        body: [
          "Arizona law requires hospitals to be transparent about what they charge, which helps patients negotiate or seek assistance:",
          "Price Posting (A.R.S. § 36-437): Hospitals must post the \"direct pay price\" for their most common 50 procedures online.",
          "Medical Screening (EMTALA): Under both state and federal law, an Arizona hospital cannot deny you emergency stabilization or labor-and-delivery services based on your ability to pay."
        ]
      },
      {
        title: "4. Governor's Medical Debt Relief Initiative (2025–2026)",
        body: [
          "In a major recent development, the State of Arizona partnered with the nonprofit Undue Medical Debt. Using federal funds, the state has been purchasing and \"forgiving\" billions in medical debt for Arizonans who:",
          "Earn up to 400% of the Federal Poverty Level (FPL).",
          "OR have medical debt that equals 5% or more of their annual household income.",
          "Note: There is no application for this—if your debt is purchased, you will receive a branded letter in the mail notifying you that your balance has been cleared."
        ]
      },
      {
        title: "5. Typical Eligibility in Arizona (2026)",
        body: [
          "Since there is no state-mandated sliding scale, each hospital sets its own. Most major Arizona hospitals use these benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale discount (typically 50% to 80% off).",
          "Over 400% FPL: Generally no discount, but eligible for 3% interest-capped payment plans.",
          "In 2026, 100% of the FPL for a single person in the 48 contiguous states is approximately $15,960."
        ]
      }
    ]
  },
  AR: {
    name: "Arkansas",
    sections: [
      {
        title: "",
        body: [
          "Arkansas does not have a single state law that mandates a specific amount of \"charity care\" for all hospitals. Instead, the state relies on federal regulations for nonprofit hospitals and its own Medicaid expansion program (ARHOME) to manage care for low-income residents.",
          "Here is the breakdown of the legal landscape for charity care in Arkansas in 2026:"
        ]
      },
      {
        title: "1. The Federal Standard (IRS 501(r))",
        body: [
          "Because most hospitals in Arkansas are nonprofit (501(c)(3)), they are governed by federal law rather than a specific Arkansas state statute. Under Section 501(r), these hospitals must:",
          "Maintain a Financial Assistance Policy (FAP): They must have a written policy detailing who is eligible for free or discounted care.",
          "Limit Charges: They cannot charge patients eligible for financial assistance more than the \"Amounts Generally Billed\" (AGB) to insured patients.",
          "Transparent Notification: They must \"widely publicize\" the policy within the community and on their website."
        ]
      },
      {
        title: "2. ARHOME: The \"Arkansas Model\"",
        body: [
          "Rather than a charity care mandate, Arkansas addresses indigent care through its Arkansas Health and Opportunity for Me (ARHOME) program.",
          "Eligibility: This covers adults with incomes up to 138% of the Federal Poverty Level (FPL).",
          "The Difference: Instead of the hospital footing the bill as \"charity,\" the state uses Medicaid funds to buy private insurance plans (Qualified Health Plans) for these residents.",
          "2026 Status: As of January 1, 2026, many ARHOME participants may be subject to new \"Life360\" community engagement requirements or work-related reporting, which can affect their coverage."
        ]
      },
      {
        title: "3. Arkansas State Pricing Transparency Law",
        body: [
          "Under Arkansas Code § 20-9-314, the state enforces federal pricing transparency.",
          "Requirement: Arkansas hospitals must provide clear, accessible pricing information online.",
          "Penalty: If the Arkansas Department of Health finds a hospital is not in compliance with these transparency rules, it can fine the hospital $250 per day."
        ]
      },
      {
        title: "4. Typical Hospital Policies in Arkansas",
        body: [
          "Since there is no state-mandated minimum, eligibility varies significantly by hospital system. Common thresholds in Arkansas for 2026 include:",
          "100% Free Care: Usually offered to those at or below 200% of the FPL.",
          "Sliding Scale Discounts: Often available for those between 201% and 400% of the FPL.",
          "Automatic Discounts: Some systems (like Baptist Health) provide an automatic discount (e.g., ~74%) for any uninsured patient, regardless of income, before the billing process even begins."
        ]
      },
      {
        title: "5. The Arkansas Volunteer Health Care Act",
        body: [
          "While not a hospital mandate, this state law (§ 20-8-801) supports a network of free clinics. It provides civil liability immunity to licensed healthcare professionals who volunteer their services to low-income and uninsured individuals at registered charitable clinics."
        ]
      }
    ]
  },
  CO: {
    name: "Colorado",
    sections: [
      {
        title: "",
        body: [
          "Colorado's charity care law is one of the most comprehensive in the United States. It is primarily governed by the Hospital Discounted Care (HDC) law (House Bill 21-1198), which was significantly strengthened by additional legislation in 2023 and 2024.",
          "As of 2026, here are the specific requirements and protections for patients in Colorado:"
        ]
      },
      {
        title: "1. Eligibility Requirements",
        body: [
          "In Colorado, charity care is not just \"suggested\"—it is a mandatory screening process for all hospitals and free-standing emergency departments.",
          "Income Threshold: You qualify for discounted care if your household income is at or below 250% of the Federal Poverty Level (FPL).",
          "Residency: You must be a Colorado resident to qualify for the state-mandated discounts.",
          "No Asset Testing: Hospitals are prohibited from looking at your assets (savings, retirement, home equity) when determining eligibility. They may only look at your gross income.",
          "Immigration Status: Eligibility is available regardless of citizenship or immigration status."
        ]
      },
      {
        title: "2. Mandatory Screening & Transparency",
        body: [
          "Hospitals are legally required to be proactive. They cannot wait for you to ask for help:",
          "Uninsured Patients: Hospitals must screen every uninsured patient for eligibility for Medicaid (Health First Colorado), CHP+, and the Hospital Discounted Care program.",
          "Insured Patients: If you have insurance but still cannot afford your out-of-pocket costs, you have the right to request a screening.",
          "Notification: Hospitals must provide a \"Patient's Rights\" form in your preferred language before you are discharged and include information about the program on every bill."
        ]
      },
      {
        title: "3. Payment Caps and Debt Forgiveness",
        body: [
          "If you qualify for Colorado Hospital Discounted Care, the law limits how much you can be charged and how long you have to pay:",
          "The \"36-Month Rule\": Any payment plan must be completed within 36 months. Once you have made 36 monthly payments, any remaining balance on the bill must be forgiven in full.",
          "Monthly Payment Caps: Hospital bills cannot exceed 4% of your gross monthly income; physician bills cannot exceed 2%; if the hospital and doctor bill together, the combined cap is 6%.",
          "Interest Cap: Under SB 23-093, interest on medical debt is capped at 3% per year."
        ]
      },
      {
        title: "4. Landmark Credit Protections",
        body: [
          "Colorado has aggressive laws protecting your credit score from medical bills (HB 23-1126):",
          "Credit Reporting Ban: It is illegal for medical debt to be reported to credit bureaus or to appear on your credit report in Colorado.",
          "Void Debt: If a debt collector or hospital does report medical debt to a credit bureau, that debt is legally considered void and the reporter can be held liable for damages.",
          "Background Checks: Landlords and employers in Colorado are prohibited from using medical debt as a negative factor in credit checks."
        ]
      }
    ]
  },
  CT: {
    name: "Connecticut",
    sections: [
      {
        title: "",
        body: [
          "As of February 2026, Connecticut has some of the most robust medical debt and charity care protections in the United States. Recent legislation (including Public Act 25-97 and HB 5320) has significantly expanded eligibility and restricted how hospitals can collect debt.",
          "The \"state charity care law\" is primarily found in Connecticut General Statutes (CGS) § 19a-673, supplemented by recent 2024 and 2025 updates."
        ]
      },
      {
        title: "1. Eligibility for Free or Discounted Care",
        body: [
          "Connecticut law mandates specific protections based on your income relative to the Federal Poverty Level (FPL):",
          "The \"Uninsured\" Threshold (250% FPL): State law defines an \"uninsured patient\" as someone with a household income at or below 250% of the FPL. For these patients, hospitals are prohibited from charging more than the \"cost of services\" (the actual cost to the hospital, which is significantly lower than the sticker price).",
          "Automatic Eligibility (SNAP/WIC): If you are enrolled in SNAP or WIC and your income is verified at or below 250% FPL, hospitals must provide financial assistance for all medically necessary care without requiring an asset test.",
          "Hospital Bed Funds: Hospitals must screen patients for \"Bed Funds\"—private donations specifically designated for free care—before they can even begin the collection process."
        ]
      },
      {
        title: "2. Payment Plan & Interest Protections",
        body: [
          "If you don't qualify for 100% free care but still have a balance, the law limits the burden:",
          "Payment Caps: For patients who apply for assistance but are determined to be over the income limit, hospitals must offer payment plans where the annual payments do not exceed 2% of the patient's household income.",
          "Interest Rate Limit: Interest on hospital-related medical debt is capped at 5% per year (compared to 10% for other types of debt). No interest can be charged if you are eligible for financial assistance."
        ]
      },
      {
        title: "3. Major New Protections (2024–2026)",
        body: [
          "Credit Reporting Ban (Effective July 1, 2024): Hospitals and healthcare providers are strictly prohibited from reporting medical debt to credit rating agencies. Any medical debt that appears on a credit report in Connecticut is considered void.",
          "Electronic Payment Ban (Effective Oct 1, 2025): Under Public Act 25-97, healthcare providers cannot require you to keep a credit card or bank account on file as a condition for receiving treatment.",
          "State-Wide Screening Portal (Launching July 1, 2026): A new online portal managed by the Office of the Healthcare Advocate (OHA) will allow residents to screen themselves for financial assistance and apply for hospital charity care in one central location."
        ]
      },
      {
        title: "4. Automatic Medical Debt Erasure",
        body: [
          "Connecticut currently runs a \"Medical Debt Erasure\" initiative. In partnership with the nonprofit Undue Medical Debt, the state has been automatically canceling debt for residents who: earn at or below 400% of the FPL, or have medical debt that equals 5% or more of their annual income.",
          "Note: There is no application for this; if your debt is purchased by the state for erasure, you will receive a letter in a branded envelope stating your balance has been cleared."
        ]
      },
      {
        title: "What You Should Do Next",
        body: [
          "If you have a pending bill, you should ask the hospital for their \"One-Page Plain Language Summary\" of their Financial Assistance Policy. By law, they must provide this in English and Spanish (and any language spoken by 5% of the local population)."
        ]
      }
    ]
  },
  DE: {
    name: "Delaware",
    sections: [
      {
        title: "",
        body: [
          "In Delaware, charity care and medical debt are governed by a combination of established state mandates and the Medical Debt Protection Act, which was significantly strengthened by new legislation (SB 156) that took effect in late 2025.",
          "As of February 2026, here is the legal framework for charity care in the First State:"
        ]
      },
      {
        title: "1. The 350% FPL Mandate",
        body: [
          "Under 16 Delaware Code § 9311, hospitals and healthcare facilities that are subject to a \"Certificate of Public Review\" (which includes almost all major hospitals) are required to provide charity care to qualifying patients.",
          "Income Eligibility: State law mandates that facilities provide charity care to uninsured or underinsured individuals with annual incomes at or below 350% of the Federal Poverty Level (FPL).",
          "\"Underinsured\" Definition: You qualify as \"underinsured\" in Delaware if your out-of-pocket medical expenses or deductibles equal or exceed 5% of your annual income.",
          "Higher Limits: While the state mandate is 350%, major systems like ChristianaCare and Beebe Healthcare have policies that extend free care to those up to 400% of the FPL."
        ]
      },
      {
        title: "2. Mandatory Payment Plans & Interest Caps",
        body: [
          "The Medical Debt Protection Act (Title 6, Chapter 25J) imposes strict limits on how hospitals can collect money from patients:",
          "5% Payment Cap: For any medical debt totaling $500 or more, the hospital must offer a payment plan. Monthly payments cannot exceed 5% of the patient's gross monthly income.",
          "Interest Ban: Delaware law (effective 2025/2026) bars hospitals and medical debt collectors from adding any interest or late fees to medical debt.",
          "Wait Periods: Hospitals cannot take \"extraordinary collection actions\" (like lawsuits) until at least 180 days after the first bill was sent."
        ]
      },
      {
        title: "3. Landmark Credit Protections (SB 156)",
        body: [
          "As of October 27, 2025, Delaware implemented a total ban on medical debt credit reporting:",
          "Credit Reporting Ban: It is illegal for medical debt to be reported to consumer credit reporting agencies or to appear on your credit report.",
          "Voiding Debt: Any medical debt that is reported in violation of this law is considered void, and the agencies are prohibited from using it to calculate credit scores for employment, housing, or lending decisions."
        ]
      },
      {
        title: "4. Collection Restrictions",
        body: [
          "Delaware provides some of the strongest protections against aggressive debt collection in the country:",
          "No Foreclosures: Hospitals and debt collectors are strictly prohibited from initiating a lien or foreclosing on a patient's primary residence to collect medical debt.",
          "Wage Garnishment Ban: The state prohibits the garnishment of wages, disability benefits, workers' compensation, or unemployment benefits for the purpose of collecting unpaid medical bills."
        ]
      },
      {
        title: "5. Medical Debt Erasure Program",
        body: [
          "Delaware currently operates a state-funded debt relief initiative in partnership with the nonprofit Undue Medical Debt.",
          "Automatic Relief: The state purchases bundles of medical debt and retires them.",
          "Eligibility: There is no application; residents are automatically eligible if their income is at or below 400% FPL or if their medical debt is 5% or more of their annual income. You will receive a letter in the mail if your debt has been cleared."
        ]
      }
    ]
  },
  FL: {
    name: "Florida",
    sections: [
      {
        title: "",
        body: [
          "In Florida, charity care is managed through a combination of federal IRS mandates for nonprofit hospitals, the Florida Health Care Responsibility Act (HCRA), and significant new patient protection laws taking effect in 2026.",
          "Unlike some states, Florida does not have one uniform state-wide income threshold for all hospitals, though it has moved toward stricter regulation of medical debt."
        ]
      },
      {
        title: "1. Eligibility Guidelines (The 200% Rule)",
        body: [
          "While state law formally defines \"charity care\" as services provided to those at or below 150% of the Federal Poverty Level (FPL), the vast majority of Florida hospitals use higher thresholds to comply with federal tax-exempt requirements.",
          "100% Free Care: Most major Florida systems (like Baptist Health, HCA Florida, and Tampa General) provide full charity care for households at or below 200% FPL.",
          "Sliding Scale Discounts: Patients between 201% and 400% FPL typically qualify for significant discounts (often limiting the bill to what Medicare would pay).",
          "Asset Consideration: Florida law allows hospitals to consider your \"monetary assets\" (savings and investments) when determining eligibility, though the first $10,000 is usually excluded."
        ]
      },
      {
        title: "2. Mandatory Overpayment Refunds (Effective Jan 1, 2026)",
        body: [
          "A major new law (SB 1808) went into effect on January 1, 2026, aimed at protecting patients from being \"over-billed\":",
          "30-Day Refund Clock: Hospitals and doctors must refund any patient overpayment within 30 days of determining the overpayment occurred.",
          "Strict Penalties: Facilities that fail to refund money on time can be fined up to $500 per violation, and individual doctors may face professional discipline or license suspension."
        ]
      },
      {
        title: "3. Medical Debt Collection Protections (Effective July 1, 2026)",
        body: [
          "Starting July 1, 2026, Florida will implement new restrictions on \"extraordinary collection actions\" under HB 1271:",
          "Lien & Foreclosure Ban: Medical creditors are strictly prohibited from placing liens on or foreclosing upon a patient's primary residence to satisfy medical debt.",
          "Wage Garnishment Limits: The law bans the garnishment of wages or bank accounts for medical debt if the patient meets certain low-income criteria.",
          "Arrest Threats: It is now explicitly illegal for a medical debt collector to threaten a patient with arrest or \"body attachment\" for unpaid bills."
        ]
      },
      {
        title: "4. The Health Care Responsibility Act (HCRA)",
        body: [
          "This specific Florida law (§ 154.302) places the ultimate financial responsibility for \"indigent\" patients on their county of residence.",
          "If you are a Florida resident and receive emergency care in a county other than your own, your home county may be required to reimburse the hospital if you meet the state's indigency criteria (typically 100% of the FPL)."
        ]
      },
      {
        title: "5. Financial Transparency",
        body: [
          "Under Florida Statute § 395.301, hospitals must:",
          "Provide a written Good Faith Estimate of charges upon request.",
          "Provide a \"Plain Language Summary\" of their financial assistance policy on every bill and at discharge."
        ]
      },
      {
        title: "Summary of Income Thresholds (2026 Estimates)",
        body: [
          "Based on 2026 Federal Poverty Levels for a household of one:",
          "Below $15,960 (100% FPL): Covered by HCRA or Full Charity Care.",
          "Up to $31,920 (200% FPL): Most hospitals provide 100% Free Care.",
          "Up to $63,840 (400% FPL): Sliding scale (usually 50%–80% off)."
        ]
      }
    ]
  },
  GA: {
    name: "Georgia",
    sections: [
      {
        title: "",
        body: [
          "In Georgia, charity care is primarily governed by the Indigent Care Trust Fund (ICTF) and the Georgia Medical Debt Protection Act. As of 2026, Georgia has specific mandates that require hospitals receiving state funds to provide free or discounted care to low-income residents."
        ]
      },
      {
        title: "1. The Indigent Care Trust Fund (ICTF) Mandate",
        body: [
          "Most hospitals in Georgia participate in the ICTF. By law, these hospitals must provide financial assistance to patients based on their household income relative to the Federal Poverty Level (FPL):",
          "At or Below 125% FPL: Hospitals must provide 100% free care (full forgiveness of the bill).",
          "Between 125% and 200% FPL: Hospitals must provide care on a sliding scale (significant discounts).",
          "Eligibility Window: You can apply for this assistance at any time, even after the service has been rendered or if the bill has been sent to collections.",
          "Decision Timeframe: Once you submit a completed application, the hospital is required to give you a written decision within five business days."
        ]
      },
      {
        title: "2. Georgia Medical Debt Protection Act (Effective 2025/2026)",
        body: [
          "Georgia recently implemented comprehensive protections for consumers dealing with medical debt. Under these rules, \"large healthcare facilities\" (all hospitals and many affiliated clinics) must follow these standards:",
          "Payment Caps: For any medical debt over $500, the facility must offer a payment plan. Monthly payments cannot exceed 5% of your gross monthly income.",
          "Interest & Fees: Hospitals and debt collectors are prohibited from charging any interest or late fees on medical debt.",
          "Wait Period: No \"extraordinary collection actions\" (like lawsuits) can be taken until at least 120 days after the first bill was sent.",
          "Credit Reporting: Debt collectors are generally prohibited from reporting medical debt to credit agencies for at least one year after the initial billing."
        ]
      },
      {
        title: "3. Transparency and Notices",
        body: [
          "Under Georgia law, hospitals have proactive duties to inform you of your rights:",
          "Notice Requirement: Hospitals must notify all patients (and the public) that they receive ICTF money and provide instructions on how to apply for help.",
          "Screening: Hospitals are required to help patients apply for financial assistance before or after treatment and cannot deny or delay emergency services based on your ability to pay."
        ]
      },
      {
        title: "Summary of 2026 Income Thresholds (Estimates)",
        body: [
          "Based on the 2026 Federal Poverty Level for a single person ($15,960):",
          "Below $19,950 (125% FPL): 100% Free Care (ICTF Hospitals).",
          "Up to $31,920 (200% FPL): Sliding Scale Discount.",
          "Any Income Level: Eligible for 3% interest-capped payment plans (Max 5% of monthly income)."
        ]
      },
      {
        title: "Common Exceptions",
        body: [
          "Doctor Bills: In Georgia, the ICTF mandate usually applies only to the hospital bill (the facility fee). The doctors who treated you may bill separately, though many nonprofit hospitals encourage their physicians to honor the same charity care policies.",
          "Residency: To qualify for the ICTF state benefits, you must be a resident of Georgia and a U.S. citizen or legal resident."
        ]
      }
    ]
  },
  HI: {
    name: "Hawaii",
    sections: [
      {
        title: "",
        body: [
          "In Hawaii, there is no single state law that mandates a specific percentage of revenue go toward charity care or sets a universal income limit for all hospitals. Instead, hospital financial assistance is governed by Federal IRS rules and a series of strong new consumer protection laws enacted in 2024 and 2025.",
          "Here is the breakdown of the legal landscape in Hawaii for 2026:"
        ]
      },
      {
        title: "1. The Federal Standard (IRS 501(r))",
        body: [
          "As most hospitals in Hawaii (such as Hawaii Pacific Health and Queen's Health System) are nonprofit, they must follow federal mandates to maintain their tax-exempt status:",
          "Written Policies: Hospitals must have a clear, written Financial Assistance Policy (FAP).",
          "Limitation on Charges: Patients who qualify for assistance cannot be charged more than the \"Amounts Generally Billed\" (AGB) to insurance companies.",
          "Wait Periods: Hospitals must wait 240 days after the first bill before taking \"extraordinary collection actions.\""
        ]
      },
      {
        title: "2. Hawaii's Credit Reporting Ban (SB 3026)",
        body: [
          "One of the strongest protections in the country, this law became fully effective recently:",
          "Total Reporting Ban: Healthcare providers, facilities, and emergency services are strictly prohibited from reporting medical debt to credit bureaus.",
          "Credit Score Protection: It is illegal for consumer credit agencies to include medical debt in your credit file or score.",
          "Voiding Debt: Any medical debt reported in violation of this law is legally considered void."
        ]
      },
      {
        title: "3. Medical Debt Protection and Patient Dignity Act (2026)",
        body: [
          "Significant new legislation (expanding on SB 2165) has introduced some of the nation's toughest restrictions on medical debt collection:",
          "Lawsuit Ban for Low Income: Hospitals and medical creditors are prohibited from filing lawsuits to collect medical debt from any patient whose household income is at or below 500% of the Federal Poverty Level (FPL).",
          "Asset Protections: Regardless of income, medical creditors in Hawaii are barred from seizing wages, freezing bank accounts, or placing liens on a patient's primary residence.",
          "Sale of Debt: Hospitals are prohibited from selling or transferring medical debt to third-party debt buyers."
        ]
      },
      {
        title: "4. Typical Eligibility in Hawaii (2026)",
        body: [
          "Because Hawaii has a significantly higher cost of living, the Federal Poverty Level (FPL) used for eligibility is higher than the mainland U.S. For 2026, most Hawaii health systems follow these tiers:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale discount (often 85% off).",
          "Over 400% FPL: May qualify as \"Medically Indigent\" if bills exceed 15% of income.",
          "Note: For 2026, the FPL for a single person in Hawaii is approximately $18,350. This means a single person earning up to ~$36,700 usually qualifies for entirely free care at most facilities."
        ]
      },
      {
        title: "5. Transparency Requirements",
        body: [
          "Under Hawaii state law, all hospitals (both nonprofit and for-profit) must:",
          "Include a notice on every bill stating that financial assistance may be available.",
          "Post conspicuous signs in registration and ER areas about these programs.",
          "Provide a \"Plain Language Summary\" of the application process upon request."
        ]
      }
    ]
  },
  ID: {
    name: "Idaho",
    sections: [
      {
        title: "",
        body: [
          "In Idaho, there is no single state law that mandates a specific income threshold for charity care at all hospitals. Instead, hospital financial assistance is governed by federal regulations for nonprofit hospitals and the Idaho Patient Act, which provides some of the strictest medical billing and debt collection protections in the country.",
          "As of 2026, here is how charity care and medical billing work in Idaho:"
        ]
      },
      {
        title: "1. The Idaho Patient Act (IPA)",
        body: [
          "Passed to end \"surprise\" collections, the IPA (I.C. § 48-301 et seq.) is the most important law for patients facing high bills. It mandates a strict timeline for hospitals:",
          "45-Day Billing Rule: Hospitals and doctors must submit charges to your insurance (or to you, if uninsured) within 45 days of service. If they miss this window, they are often barred from collecting attorney fees or legal costs later.",
          "Consolidated Summary of Services: Within 60 days, the facility must send you a \"Consolidated Summary\" listing every provider who might bill you separately (e.g., the radiologist, the anesthesiologist).",
          "Final Statement: You must receive a \"Final Statement\" (your actual bill) before any collection actions can begin.",
          "180-Day Wait Period: Hospitals cannot take \"extraordinary collection actions\" (like lawsuits or wage garnishments) until at least 180 days after you receive the final statement."
        ]
      },
      {
        title: "2. Federal Requirements (IRS 501(r))",
        body: [
          "Most major health systems in Idaho (such as St. Luke's and Saint Alphonsus) are nonprofits. To maintain their tax-exempt status, they must offer financial assistance:",
          "Written Policy: They must have a clear, written Financial Assistance Policy (FAP).",
          "Discounted Rates: They cannot charge patients who qualify for assistance more than the \"Amounts Generally Billed\" (AGB) to insurance companies.",
          "Credit Reporting: Under federal law, medical debt cannot be reported to credit bureaus until one year after the first bill was sent."
        ]
      },
      {
        title: "3. Typical Eligibility in Idaho (2026)",
        body: [
          "Since the state doesn't set a limit, each hospital defines its own \"charity.\" However, major Idaho systems generally use these benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale discount (often 50% to 80% off).",
          "Catastrophic Limit: Assistance if medical bills exceed 15%–20% of your income.",
          "For 2026, 100% of the FPL for a single person is approximately $15,960."
        ]
      },
      {
        title: "4. Idaho Medical Lien Laws",
        body: [
          "A recent Idaho Supreme Court ruling (2025) and subsequent legislative updates clarified that medical liens are considered \"extraordinary collection actions.\" This means a provider cannot place a lien on your property or legal settlement until they have followed the Idaho Patient Act's rules, including billing your insurance first."
        ]
      },
      {
        title: "5. County Indigent Funds (Repealed/Modified)",
        body: [
          "Historically, Idaho counties had a \"Medically Indigent\" program to pay for those who couldn't afford care. With the expansion of Medicaid in Idaho, much of this program was repealed or significantly limited (I.C. § 31-3502). Most low-income Idahoans are now expected to be covered by Medicaid or private insurance through the Your Health Idaho exchange."
        ]
      }
    ]
  },
  IL: {
    name: "Illinois",
    sections: [
      {
        title: "",
        body: [
          "In Illinois, charity care is governed by two major state laws: the Hospital Uninsured Patient Discount Act and the Fair Patient Billing Act. Illinois has some of the most specific \"math-based\" mandates in the country, ensuring that hospitals cannot simply choose their own limits.",
          "As of February 2026, here is the legal framework for Illinois:"
        ]
      },
      {
        title: "1. Mandatory Free Care (The 200% Rule)",
        body: [
          "Under the Hospital Uninsured Patient Discount Act, Illinois hospitals must provide 100% free care to uninsured patients based on their location and income:",
          "Urban Hospitals: Must provide free care to patients with a household income at or below 200% of the Federal Poverty Level (FPL).",
          "Rural/Critical Access Hospitals: Must provide free care to patients at or below 125% of the FPL.",
          "Presumptive Eligibility: Hospitals must automatically screen patients for \"presumptive eligibility\" (meaning they grant the discount without a full application) if the patient is homeless, deceased with no estate, or enrolled in programs like SNAP, WIC, or TANF."
        ]
      },
      {
        title: "2. Mandatory Discounts for Higher Incomes",
        body: [
          "If you are uninsured but earn too much for free care, you still qualify for a state-mandated discount if your income is at or below 600% of the FPL (for urban hospitals) or 300% of the FPL (for rural hospitals).",
          "The Price Cap: Hospitals cannot charge eligible uninsured patients more than 135% of the hospital's cost for the services.",
          "The 25% Income Cap: A hospital cannot collect more than 25% of a patient's annual family income for healthcare services in a 12-month period."
        ]
      },
      {
        title: "3. Credit Reporting Ban (Effective Jan 1, 2025/2026)",
        body: [
          "Illinois recently passed a landmark law (SB 2933) that provides major protection for your financial health:",
          "Total Ban: It is now illegal for medical debt to be reported to credit bureaus or to appear on your credit report in Illinois.",
          "Voiding Debt: Any medical debt that is reported to a credit agency is considered void under state law, and lenders/landlords are prohibited from using it against you."
        ]
      },
      {
        title: "4. Fair Patient Billing Act Protections",
        body: [
          "This law regulates how hospitals handle your bill:",
          "Mandatory Screening: Before a hospital can start collection actions (like suing or hiring a debt collector), they must screen you for financial assistance and public insurance (Medicaid).",
          "Wait Period: Hospitals must wait at least 240 days from the first bill before taking \"extraordinary collection actions\" against a patient.",
          "Right to a Payment Plan: Hospitals must offer a reasonable payment plan before sending a bill to collections."
        ]
      },
      {
        title: "5. Illinois Medical Debt Relief Program",
        body: [
          "The state has committed to erasing over $1 billion in medical debt for residents.",
          "Eligibility: Illinois residents with a household income at or below 400% FPL or those whose medical debt is 5% or more of their annual income.",
          "No Application: The state purchases the debt directly from hospitals and wipes it out. If your debt is erased, you will receive a letter in a branded \"State of Illinois\" envelope."
        ]
      },
      {
        title: "Summary of 2026 Eligibility (Estimates)",
        body: [
          "For a single person in Illinois:",
          "Up to $31,920 (200% FPL): 100% Free Care at most Illinois hospitals.",
          "Up to $63,840 (400% FPL): Eligible for State Debt Erasure and significant discounts.",
          "Up to $95,760 (600% FPL): Guaranteed Discounted Care (Uninsured Discount Act)."
        ]
      }
    ]
  },
  IN: {
    name: "Indiana",
    sections: [
      {
        title: "",
        body: [
          "In Indiana, the legal landscape for charity care has undergone a massive shift recently. Historically, Indiana did not mandate specific charity care levels, but as of 2026, new state laws (SB 85 and SB 337) have introduced mandatory eligibility tiers and some of the nation's strictest medical debt protections.",
          "Here is the current legal framework for Indiana:"
        ]
      },
      {
        title: "1. Mandatory Charity Care Tiers (SB 337)",
        body: [
          "Effective for 2026, Indiana law requires nonprofit hospitals with annual revenues over $20 million and all county hospitals to provide specific levels of assistance:",
          "100% Free Care: Hospitals must provide full charity care (no cost) to patients with a household income at or below 200% of the Federal Poverty Level (FPL).",
          "Discounted Care (200%–300% FPL): Patients in this bracket must receive a discount based on Medicare reimbursement rates, with the patient paying no more than 25% of the resulting bill.",
          "Catastrophic Discount (300%–400% FPL): Patients qualify for the same Medicare-rate discount if they have incurred medical expenses in the previous 12 months totaling at least 5% of their annual household income."
        ]
      },
      {
        title: "2. Medical Debt & Consumer Protections (SB 85)",
        body: [
          "Indiana has implemented significant barriers to protect patients from aggressive collections:",
          "Mandatory Payment Plans: Hospitals must offer payment plans to any patient earning less than 400% FPL or whose bill exceeds 10% of their monthly income. Plans must last at least 24 months. Monthly payments are capped at 10% of the patient's gross monthly income. Interest is capped at 3% per year.",
          "Wage Garnishment Ban: Debt collectors are prohibited from garnishing the wages of any patient earning at or below 200% FPL. For those above this limit, garnishments are capped at 10% of weekly disposable income.",
          "Primary Residence Protection: Medical debt can no longer result in a lien or the forced sale of a patient's primary home in Indiana."
        ]
      },
      {
        title: "3. Credit Reporting Ban (HB 1051)",
        body: [
          "Effective July 1, 2026, Indiana will join the growing list of states that remove medical debt from the credit system:",
          "Reporting Prohibited: Health care providers and third-party collectors are barred from reporting medical debt to credit bureaus.",
          "Removal Right: If medical debt appears on your report after this date, credit agencies must delete it within five business days of a request."
        ]
      },
      {
        title: "4. Transparency and Notification",
        body: [
          "Under Indiana Code § 16-21-9-7, hospitals have \"proactive notice\" requirements:",
          "Conspicuous Posting: Notices of charity care availability must be posted in the ER, waiting rooms, and the business office.",
          "Billing Notice: Every bill must include information on how to apply for financial assistance, including a phone number and website.",
          "14-Day Response: Large hospitals must respond to a patient's request for an eligibility determination within 14 days."
        ]
      },
      {
        title: "Summary of 2026 Income Thresholds",
        body: [
          "Estimates for a single-person household in Indiana:",
          "Up to $31,920 (200% FPL): 100% Free Care + Garnishment Protection.",
          "Up to $47,880 (300% FPL): Medicare-rate Discount (Max 25% of bill).",
          "Up to $63,840 (400% FPL): Mandatory Payment Plan (3% interest cap)."
        ]
      }
    ]
  },
  IA: {
    name: "Iowa",
    sections: [
      {
        title: "",
        body: [
          "In Iowa, there is no single state law that mandates a specific income threshold for charity care across all hospitals. Instead, Iowa relies heavily on the federal requirements for nonprofit hospitals, alongside specific mandates for county-owned public hospitals.",
          "As of 2026, here is the breakdown of how charity care and medical debt are regulated in the Hawkeye State:"
        ]
      },
      {
        title: "1. County Public Hospital Mandate",
        body: [
          "Iowa is unique in that it has a specific statute (Iowa Code § 347.16) regarding county hospitals.",
          "Mandatory Care: County public hospitals must provide free care and treatment to \"indigent persons\" who are residents of that specific county.",
          "Eligibility: While the state code mentions \"indigent,\" it leaves the specific income definition to the individual county board of trustees. Most Iowa counties define this as households at or below 100% to 200% of the Federal Poverty Level (FPL)."
        ]
      },
      {
        title: "2. Nonprofit Hospital Standards (The Federal Baseline)",
        body: [
          "The majority of large health systems in Iowa (like UnityPoint Health and MercyOne) are private nonprofits. Because Iowa does not have a state-level mandate for these facilities, they follow Federal IRS Rule 501(r):",
          "Written Policy: They must maintain a Financial Assistance Policy (FAP).",
          "Amounts Generally Billed (AGB): If you qualify for assistance, the hospital cannot charge you more than the average amount they receive from insurance companies for that service.",
          "Reasonable Efforts: They must make \"reasonable efforts\" to determine your eligibility before starting aggressive collections."
        ]
      },
      {
        title: "3. Typical Eligibility in Iowa (2026)",
        body: [
          "While not mandated by the state, most major Iowa health systems have standardized their 2026 policies to stay competitive and compliant with federal tax-exempt status:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 300% FPL: Sliding scale (often 50% to 75% discount).",
          "Catastrophic Needs: Assistance if medical bills exceed 15%–20% of annual income.",
          "For 2026, the FPL for a single person is approximately $15,960."
        ]
      },
      {
        title: "4. Medical Debt & Consumer Protections",
        body: [
          "Iowa has relatively fewer state-specific medical debt laws compared to neighbors like Illinois or Colorado, but several protections still apply:",
          "Homestead Exemption: Iowa has an unlimited homestead exemption (with some acreage limits). This means a hospital or debt collector generally cannot force the sale of your primary home to pay off a medical debt, regardless of the debt's size.",
          "No Credit Reporting (National Trend): While not a specific Iowa statute, as of 2026, the three major credit bureaus (Equifax, Experian, and TransUnion) no longer include medical debt under $500 on credit reports, and most larger medical debts are only reported after a year of delinquency."
        ]
      },
      {
        title: "5. The \"Iowa Health and Wellness Plan\" (Medicaid)",
        body: [
          "Because Iowa expanded Medicaid, many people who would traditionally seek \"charity care\" now qualify for the Iowa Health and Wellness Plan.",
          "New for 2026: Iowa has implemented work requirements for certain Medicaid members. If you are an able-bodied adult, you may need to verify employment, community service, or education hours to maintain your coverage."
        ]
      },
      {
        title: "How to Seek Help",
        body: [
          "By law, every hospital bill in Iowa must provide information on how to contact the billing office for financial assistance. You can apply for charity care even after you have received treatment, and many hospitals will allow you to apply even if the bill is already in collections."
        ]
      }
    ]
  },
  KS: {
    name: "Kansas",
    sections: [
      {
        title: "",
        body: [
          "In Kansas, the state does not have a single law that mandates a specific percentage of \"charity care\" for all hospitals. Instead, financial assistance is governed by federal IRS rules for nonprofit hospitals and a specific Kansas program that encourages voluntary free care through liability protections.",
          "As of February 2026, here is the legal and regulatory framework for Kansas:"
        ]
      },
      {
        title: "1. The Kansas Charitable Healthcare Provider Program",
        body: [
          "Kansas law (K.S.A. 75-6120) creates a unique system where the state provides medical malpractice coverage to doctors and clinics that provide free care.",
          "The 300% FPL Limit: Recent regulatory updates in Kansas (as of 2025/2026) have increased the income limit for this program. Providers are now encouraged to provide gratuitous (free) care to \"medically indigent\" patients with household incomes at or below 300% of the Federal Poverty Level (FPL).",
          "Liability Protection: In exchange for providing this care for free, these providers are considered \"state employees\" under the Kansas Tort Claims Act, which protects them from certain lawsuits."
        ]
      },
      {
        title: "2. Nonprofit Hospital Obligations (IRS 501(r))",
        body: [
          "Most major hospitals in Kansas (such as the University of Kansas Health System, Ascension Via Christi, and Stormont Vail) are nonprofits. Because there is no stricter state mandate, they follow the federal baseline:",
          "Written Financial Assistance Policy (FAP): Hospitals must have a clear policy detailing who is eligible for free or discounted care.",
          "Amounts Generally Billed (AGB): Hospitals cannot charge a patient who qualifies for charity care more than the average amount they would receive from an insurance company for the same service.",
          "240-Day Application Window: You have 240 days from your first bill after discharge to apply for financial assistance before the hospital can take \"extraordinary collection actions.\""
        ]
      },
      {
        title: "3. Typical Eligibility in Kansas (2026)",
        body: [
          "While each hospital sets its own specific math, the standard for 2026 across major Kansas systems has trended toward these tiers:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 300% FPL: Sliding scale (often 60% to 80% discount).",
          "Medically Indigent: Assistance if medical bills exceed 50% of your annual income.",
          "For 2026, 300% of the FPL for a single person is approximately $47,880."
        ]
      },
      {
        title: "4. Kansas Consumer Protection Act (KCPA)",
        body: [
          "Kansas does not yet have a total ban on medical debt credit reporting (like Colorado or New Mexico), but medical debt is covered under the KCPA, which provides these protections:",
          "Statute of Limitations: Hospitals generally have 5 years to sue for a debt based on a written contract and 3 years for an oral or open-ended account.",
          "Unconscionable Acts: It is illegal for a collector to use \"unconscionable\" tactics, such as threatening legal action they do not intend to take or misrepresenting the amount you owe.",
          "Verification Rights: You have the right to request written verification of any medical debt within 30 days of the first contact from a collector."
        ]
      },
      {
        title: "5. Rural and Critical Access Hospitals",
        body: [
          "Under House Sub for SB 126 (effective 2025/2026), Kansas has updated how it funds rural and critical access hospitals. While this bill increased provider assessments, it also stabilized funding for these small facilities, many of which are the only source of \"charity care\" in western and rural Kansas counties."
        ]
      }
    ]
  },
  KY: {
    name: "Kentucky",
    sections: [
      {
        title: "",
        body: [
          "In Kentucky, charity care is governed by the Kentucky Charitable Health Care Services Act (KRS 216.940–945) and the Kentucky Hospital Care Program (KHCP). As of 2026, the state has also introduced major new protections concerning medical debt and credit reporting.",
          "Here is the current legal framework for Kentucky:"
        ]
      },
      {
        title: "1. The Kentucky Hospital Care Program (KHCP)",
        body: [
          "Most Kentucky hospitals participate in the KHCP (often referred to as the \"DSH\" or Disproportionate Share program). By state regulation, these hospitals must provide assistance to \"indigent\" patients:",
          "100% Free Care: Hospitals must provide free medically necessary services to patients with a household income at or below 100% of the Federal Poverty Level (FPL).",
          "Asset Test: Unlike some other states, Kentucky law allows hospitals to consider your assets. To qualify for state-mandated free care, your \"liquid assets\" (cash, savings) typically cannot exceed $2,000 for an individual or $4,000 for a family.",
          "Residency: You generally must be a Kentucky resident to qualify for the KHCP state-mandated benefits."
        ]
      },
      {
        title: "2. Voluntary Charity Tiers (The 200%–300% Standard)",
        body: [
          "While the state mandate is 100% FPL, most major Kentucky health systems (such as UK HealthCare, Norton Healthcare, and Baptist Health) have voluntary policies that are more generous to meet federal nonprofit requirements:",
          "Typical 200% Rule: Most large systems provide 100% free care for households up to 200% of the FPL.",
          "Sliding Scale: Patients between 200% and 400% FPL often qualify for significant discounts (usually capping the bill at the \"Amounts Generally Billed\" to insurance companies)."
        ]
      },
      {
        title: "3. Landmark Credit Reporting Ban (HB 231 - 2026)",
        body: [
          "In a significant shift for 2026, Kentucky has moved to protect patients' financial futures:",
          "Reporting Prohibited: Under HB 231, healthcare professionals and facilities are prohibited from reporting medical debt to consumer reporting agencies (credit bureaus).",
          "Void Debt: If a medical debt is reported in violation of this law, it is legally considered void and unenforceable.",
          "Collection Contracts: Any contract between a hospital and a debt collector must now include a clause explicitly forbidding the collector from reporting the debt to credit agencies."
        ]
      },
      {
        title: "4. Wage & Property Protections",
        body: [
          "Kentucky provides specific \"exemptions\" that prevent medical debt collectors from taking everything you own:",
          "Homestead Exemption: Debt collectors cannot seize your primary home if the equity is below a certain threshold (adjusted for inflation in 2026, typically around $5,000–$10,000 under state law, though federal bankruptcy exemptions may offer more).",
          "Wage Garnishment: Collectors cannot take more than 25% of your weekly disposable earnings, and they cannot touch your wages at all if you earn less than $217.50 per week."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "Kentucky hospitals are increasingly using \"presumptive eligibility\" to clear bills. If you are already enrolled in SNAP (Food Stamps), WIC, or Medicaid, many hospitals will automatically grant you charity care for any remaining balances without requiring a separate, lengthy application."
        ]
      },
      {
        title: "Summary of 2026 Income Limits (Estimates)",
        body: [
          "For a single-person household in Kentucky:",
          "Below $15,960 (100% FPL): Mandatory Free Care (if assets <$2,000).",
          "Up to $31,920 (200% FPL): 100% Free Care at most major hospital systems.",
          "Up to $63,840 (400% FPL): Eligible for sliding scale discounts and payment plans."
        ]
      }
    ]
  },
  LA: {
    name: "Louisiana",
    sections: [
      {
        title: "",
        body: [
          "In Louisiana, charity care is distinct from many other states because it is split between a historic State-Supported Charity Hospital System and the policies of private nonprofit hospitals.",
          "As of 2026, Louisiana has also implemented significant new laws regarding how medical expenses are handled in legal cases and has updated its Medicaid eligibility."
        ]
      },
      {
        title: "1. The State Charity Hospital System (LSU Health)",
        body: [
          "Louisiana is one of the few states that still operates a dedicated system for \"medically indigent\" residents through the LSU Board of Supervisors and the LSU Health Care Services Division (LA Rev Stat § 46:6).",
          "Eligibility: Bona fide Louisiana residents who are uninsured or \"medically indigent\" are eligible for treatment at state-supported general hospitals.",
          "Income Threshold: Residents with a household income at or below 200% of the Federal Poverty Level (FPL) are generally eligible for free or highly subsidized non-emergency care.",
          "Emergency Care: By law, emergency treatment cannot be denied to anyone, regardless of their income or residency status."
        ]
      },
      {
        title: "2. Private Nonprofit Hospitals (IRS 501(r))",
        body: [
          "Unlike states like California or Illinois, Louisiana does not have a single state-wide mandate for private hospital charity care. Instead, private nonprofit hospitals (like Ochsner or LCMC Health) follow federal IRS guidelines:",
          "Financial Assistance Policy (FAP): They must have a written policy for free or discounted care.",
          "Typical 200%–250% Rule: Most major Louisiana private systems (e.g., University Medical Center New Orleans) provide 100% free care for those at or below 250% FPL and sliding scale discounts up to 400% FPL.",
          "Asset Testing: Many private hospitals in Louisiana do consider \"monetary assets\" (savings, stocks) when you apply, though they typically exclude your primary residence and the first $10,000 of cash assets."
        ]
      },
      {
        title: "3. Landmark \"Actual Paid\" Law (SB 231 - Effective Jan 1, 2026)",
        body: [
          "Louisiana has introduced a major change in how medical bills interact with the legal system. If you are in a personal injury lawsuit (like a car accident):",
          "No \"Phantom Damages\": Courts now only consider the actual amount paid to the medical provider (by insurance or the patient), rather than the original \"sticker price\" billed by the hospital.",
          "Recovery Limit: You can only recover what was actually paid, plus any outstanding out-of-pocket costs like co-pays or deductibles."
        ]
      },
      {
        title: "4. Medical Debt & Property Protections",
        body: [
          "Homestead Exemption: Under LA Rev Stat § 20:1, Louisiana law provides a strong protection that prevents the seizure or forced sale of your primary residence to satisfy debts arising from a \"catastrophic or terminal illness or injury.\"",
          "Statute of Limitations: Hospitals generally have 3 years (the \"prescriptive period\") to sue for an open account or unpaid medical bill."
        ]
      },
      {
        title: "5. Medicaid Expansion (2026 Updates)",
        body: [
          "Louisiana remains a Medicaid expansion state, covering adults up to 138% FPL.",
          "2026 Income Limit: For a single person, this is roughly $22,025 per year.",
          "New for 2026: Louisiana has implemented more streamlined \"claim-level\" rebate systems, but basic eligibility for low-income adults remains stable despite some federal funding adjustments."
        ]
      },
      {
        title: "Summary of 2026 Income Thresholds (Estimates)",
        body: [
          "For a single person in Louisiana:",
          "Below $22,025 (138% FPL): Eligible for Louisiana Medicaid.",
          "Up to $31,920 (200% FPL): 100% Free Care at LSU/State Charity Hospitals.",
          "Up to $39,900 (250% FPL): 100% Free Care at many private systems (LCMC, Ochsner).",
          "Up to $63,840 (400% FPL): Eligible for sliding scale discounts and payment plans."
        ]
      }
    ]
  },
  ME: {
    name: "Maine",
    sections: [
      {
        title: "",
        body: [
          "In Maine, the state charity care law—known officially as the Maine Free Care program—has been significantly expanded and strengthened as of 2026. Recent updates to the Maine Revised Statutes (Title 22, §1716-A) and the passage of landmark medical debt protection laws have made Maine one of the most protective states for patients in the country.",
          "Here is the legal breakdown for Maine in 2026:"
        ]
      },
      {
        title: "1. Mandatory Free Care (The 200% Rule)",
        body: [
          "Under the updated state mandate, all Maine hospitals are required to provide 100% free care for medically necessary services to eligible residents:",
          "Income Threshold: You qualify for free care if your household income is at or below 200% of the Federal Poverty Level (FPL). (Note: Prior to 2025, the state mandate was only 150%, but this was raised to 200% by the 132nd Legislature).",
          "Asset Testing Ban: Hospitals are generally prohibited from using your assets (savings, retirement, home equity) to deny you charity care. Eligibility is based strictly on your Modified Adjusted Gross Income (MAGI).",
          "Residency: You must be a Maine resident (living in the state with the intent to stay, or entering with a job commitment) to qualify."
        ]
      },
      {
        title: "2. Mandatory Payment Plans (The 4% Rule)",
        body: [
          "If you earn too much for free care but still struggle to pay, Maine law now provides a strict cap on how much a hospital can demand from you:",
          "Eligibility: Patients with incomes between 200% and 400% FPL are entitled to a reasonable payment plan.",
          "Payment Cap: Monthly out-of-pocket payments cannot exceed 4% of your monthly family income.",
          "Interest: Interest on medical debt in Maine is strictly limited, and for those qualifying for assistance, it is often prohibited entirely during the payment plan."
        ]
      },
      {
        title: "3. Landmark Credit Reporting Ban (LD 558)",
        body: [
          "Effective as of September 24, 2025, Maine implemented one of the strongest credit protections in the nation:",
          "Total Ban: It is illegal for medical creditors, debt collectors, or debt buyers to report medical debt to credit bureaus.",
          "Credit Score Protection: Consumer reporting agencies are prohibited from listing medical debt on any Maine resident's credit report.",
          "Impact: This means a medical bill—regardless of size or age—cannot legally lower your credit score or prevent you from getting a car loan, mortgage, or apartment in Maine."
        ]
      },
      {
        title: "4. Patient Transparency & Rights",
        body: [
          "Maine hospitals must adhere to strict communication standards:",
          "Screening Mandate: Hospitals must investigate a patient's eligibility for insurance (MaineCare) or charity care upon admission or before discharge.",
          "Notice Requirement: Hospitals must provide a written notice of the availability of free care to every patient.",
          "Language Access: Charity care applications must be translated into any language spoken by at least 1,000 people in the state or 5% of the community the hospital serves."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "Many Maine hospitals (like MaineHealth and Northern Light Health) use \"presumptive eligibility.\" If you are already enrolled in MaineCare (Medicaid), SNAP, or WIC, you may be automatically approved for free care for any remaining balances without needing to file a separate, complex application."
        ]
      },
      {
        title: "Summary of 2026 Income Limits (Estimates)",
        body: [
          "For a single person in Maine:",
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory).",
          "Up to $63,840 (400% FPL): Mandatory Payment Plan (Capped at 4% of income).",
          "Any Income Level: Medical Debt Credit Reporting Ban."
        ]
      }
    ]
  },
  MD: {
    name: "Maryland",
    sections: [
      {
        title: "",
        body: [
          "In Maryland, charity care and medical debt protections are among the strongest in the nation due to the Maryland Medical Debt Protection Act and the Fair Medical Debt Reporting Act. As of February 2026, the state has nearly eliminated the impact of medical debt on credit scores and mandated generous income-based discounts.",
          "Here is the legal framework for Maryland in 2026:"
        ]
      },
      {
        title: "1. Mandatory Free and Discounted Care",
        body: [
          "Under Maryland Health-General § 19-214.1, all acute and chronic care hospitals are required to have a financial assistance policy with these minimums:",
          "100% Free Care: Hospitals must provide free medically necessary care to patients with a household income at or below 200% of the Federal Poverty Level (FPL).",
          "Reduced-Cost Care (Hardship): Hospitals must provide discounts to patients with incomes up to 500% of the FPL who can demonstrate financial hardship.",
          "Asset Protection: While hospitals can consider assets, they must exclude: The first $10,000 of monetary assets; $150,000 of equity in a primary residence; Retirement assets and one motor vehicle."
        ]
      },
      {
        title: "2. State-Mandated Discount Brackets",
        body: [
          "If you do not qualify for free care but fall between 200% and 500% FPL, Maryland law dictates a specific sliding scale of discounts for regulated hospital services:",
          "201% – 250% FPL: 75% discount.",
          "251% – 300% FPL: 60% discount.",
          "301% – 350% FPL: 50% discount.",
          "351% – 500% FPL: Discounts ranging from 35% to 45%."
        ]
      },
      {
        title: "3. Landmark Credit Reporting Ban (Fair Medical Debt Reporting Act)",
        body: [
          "Effective October 1, 2025, Maryland became one of the first states to implement a near-total ban on medical debt credit reporting:",
          "Reporting Prohibited: Medical providers and debt collectors are forbidden from disclosing any medical debt to credit reporting agencies.",
          "Credit Score Protection: Credit bureaus are prohibited from including medical debt in a consumer's report.",
          "Void Contracts: Any contract between a hospital and a debt collector that allows for credit reporting is legally void and unenforceable."
        ]
      },
      {
        title: "4. Aggressive Collection Restrictions",
        body: [
          "Maryland law places strict limits on how and when a hospital can attempt to collect money:",
          "240-Day Application Window: You have 240 days from your first bill to apply for financial assistance. During this time, the hospital cannot file a lawsuit or start collection actions.",
          "Small Debt Protection: Hospitals are prohibited from filing a lawsuit to collect a debt of less than $500.",
          "Home Protection: Creditors cannot use a court judgment for medical debt to place a lien on your primary residence.",
          "Interest Ban: Hospitals are prohibited from charging interest on bills incurred by \"self-pay\" (uninsured) patients."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "Hospitals must automatically grant free care (without a full application) to patients who are not eligible for Medicaid but participate in certain programs:",
          "SNAP (Supplemental Nutrition Assistance Program), WIC (Women, Infants, and Children), Energy Assistance Program, Free and Reduced-Cost Meal Program (if there is a child in the household)."
        ]
      },
      {
        title: "Summary of 2026 Income Thresholds (Estimates)",
        body: [
          "For a single person in Maryland:",
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory).",
          "Up to $47,880 (300% FPL): 60% – 75% Discount (Mandatory).",
          "Up to $79,800 (500% FPL): Eligible for Reduced-Cost Hardship Care.",
          "Note: While hospital bills (facility fees) are covered by these laws, independent doctors (like anesthesiologists or ER physicians who bill separately) may not be required to follow the same charity care rules, though they are still bound by the credit reporting ban."
        ]
      }
    ]
  },
  MA: {
    name: "Massachusetts",
    sections: [
      {
        title: "",
        body: [
          "In Massachusetts, the state charity care law is a two-pillar system consisting of the Health Safety Net (HSN) and hospital-specific Financial Assistance Policies (FAP). As of February 2026, the state has moved to significantly tighten regulations on medical debt collection and credit reporting.",
          "Here is the legal breakdown for Massachusetts:"
        ]
      },
      {
        title: "1. The Health Safety Net (HSN)",
        body: [
          "Unique to Massachusetts, the HSN (formerly known as the \"Free Care Pool\") pays acute care hospitals and community health centers for services provided to low-income residents.",
          "Full Free Care (0–150% FPL): Residents with a household income at or below 150% of the Federal Poverty Level (FPL) qualify for 100% free care at participating facilities.",
          "Partial Free Care (150%–300% FPL): Residents in this bracket qualify for assistance but may have a deductible based on their income.",
          "Secondary Payer: The HSN can act as a \"safety net\" to cover co-pays and deductibles for people who already have insurance (like private plans or Medicare) but still meet the income requirements."
        ]
      },
      {
        title: "2. Mandatory Hospital Discounts (The 200% Rule)",
        body: [
          "In addition to the HSN, state law (M.G.L. c. 111 § 51L and updated 2025/2026 regulations) requires all hospitals to offer a uniform financial assistance policy:",
          "100% Free Care: Hospitals must provide free care to patients at or below 200% FPL.",
          "Sliding Scale Discounts: Massachusetts has specific state-mandated discount tiers for higher earners: 201% – 300% FPL: 75% discount; 301% – 350% FPL: 50% discount; 351% – 400% FPL: 25% discount."
        ]
      },
      {
        title: "3. Landmark Credit Reporting Ban (Effective 2026)",
        body: [
          "In her January 2026 State of the Commonwealth address, Governor Maura Healey announced a total ban on medical debt credit reporting.",
          "New Regulations: Massachusetts is currently implementing rules that prohibit healthcare providers and debt collectors from reporting medical debt to credit bureaus.",
          "Credit Protection: Medical debt can no longer legally be used to lower your credit score or impact your ability to secure housing or loans in the state."
        ]
      },
      {
        title: "4. Medical Debt Protection Act (2025/2026 Updates)",
        body: [
          "New legislation has introduced some of the country's strictest limits on \"extraordinary collection actions\":",
          "180-Day Wait Period: No collection actions (lawsuits, etc.) can be taken until at least 180 days after the first bill is sent.",
          "Interest Cap: For medical debt judgments entered on or after January 1, 2026, the interest rate is capped at a fixed 3% per annum (down from previous double-digit rates).",
          "Seizure Protections: Up to $5,000 in cash or savings is now exempt from seizure for medical debt, and hospitals are prohibited from placing liens on primary residences for medical debt."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "If you are already enrolled in MassHealth (Medicaid) or ConnectorCare, you are often \"presumptively eligible\" for the Health Safety Net. This means you may be automatically approved for hospital charity care without having to provide additional income documentation."
        ]
      },
      {
        title: "Summary of 2026 Income Limits (Estimates)",
        body: [
          "For a single-person household in Massachusetts:",
          "Up to $23,940 (150% FPL): 100% Free Care (Health Safety Net).",
          "Up to $31,920 (200% FPL): 100% Free Care (Hospital Mandate).",
          "Up to $47,880 (300% FPL): 75% Discount + Health Safety Net with Deductible.",
          "Up to $63,840 (400% FPL): 25% – 50% Discount (State-Mandated Sliding Scale)."
        ]
      }
    ]
  },
  MI: {
    name: "Michigan",
    sections: [
      {
        title: "",
        body: [
          "In Michigan, the legal landscape for charity care and medical debt is currently in a state of major transition. While Michigan has historically relied on federal standards for nonprofit hospitals, the state is in the process of implementing the Hospital Financial Assistance Act and the Medical Debt Protection Act in 2026.",
          "Here is the breakdown of the rules and the new protections for Michigan residents:"
        ]
      },
      {
        title: "1. Mandatory Free & Discounted Care (2026 Standards)",
        body: [
          "Under a package of bills (SB 449–451) moving through the legislature for the 2025–2026 session, Michigan is standardizing charity care across all hospitals:",
          "100% Free Care: Hospitals are moving toward a requirement to provide full charity care for uninsured patients with household incomes at or below 350% of the Federal Poverty Level (FPL).",
          "Catastrophic Protection: You may qualify for assistance if your unpaid medical bills from a single hospital exceed 30% of your annual income, regardless of whether you are insured.",
          "Asset Testing: While many hospitals (like Michigan Medicine or Trinity Health) traditionally looked at assets, the new state standards aim to prioritize income-based metrics to make assistance more accessible."
        ]
      },
      {
        title: "2. Landmark Credit Reporting Ban",
        body: [
          "Michigan has joined the growing list of states that \"de-link\" medical debt from your credit score:",
          "The Ban: As of 2026, Michigan law prohibits consumer reporting agencies from including medical debt on credit reports.",
          "Collector Restrictions: Debt collectors are legally barred from threatening to report your medical debt to a credit bureau as a way to coerce payment.",
          "Federal Context: This aligns with the 2025/2026 national shift (CFPB rules) that removes medical bills from credit reports, but Michigan's state law provides a secondary layer of protection that remains in place regardless of federal changes."
        ]
      },
      {
        title: "3. The Medical Debt Protection Act (SB 702)",
        body: [
          "This law introduces some of the toughest collection restrictions in the Midwest:",
          "3% Interest Cap: Hospitals and debt buyers are prohibited from charging more than 3% annual interest on medical debt.",
          "Extraordinary Collection Actions: Creditors are prohibited from: Foreclosing on or placing a lien on your primary residence; Garnishing wages if you qualify for the hospital's financial assistance; Causing a patient's arrest for unpaid bills.",
          "Refund Requirement: If you paid a bill but were later found eligible for charity care, the hospital must refund the overpayment within 60 days."
        ]
      },
      {
        title: "4. Transparency and Patient Rights",
        body: [
          "Every Michigan hospital is now required to:",
          "Conspicuously publish their financial assistance policy on every bill, on their website, and in physical waiting areas.",
          "Screen patients for potential eligibility before sending a bill to a collection agency.",
          "Provide a \"Plain Language Summary\" of how to apply for help in the patient's primary language."
        ]
      },
      {
        title: "Summary of 2026 Eligibility (Estimates)",
        body: [
          "For a single person in Michigan:",
          "Below $22,025 (138% FPL): Eligible for Healthy Michigan (Medicaid).",
          "Up to $55,860 (350% FPL): 100% Free Care (under new state mandates).",
          "Medical Debt >30% Income: Eligible for Mandatory Financial Assistance.",
          "Any Income Level: Protected from Credit Reporting and 3% Interest Cap."
        ]
      }
    ]
  },
  MN: {
    name: "Minnesota",
    sections: [
      {
        title: "",
        body: [
          "In Minnesota, the legal landscape for charity care and medical debt changed dramatically with the Debt Fairness Act, which became fully effective in late 2024 and 2025. As of February 2026, Minnesota has some of the most comprehensive patient protections in the United States, including a landmark ban on medical debt credit reporting.",
          "Here is the breakdown of the state charity care and medical debt laws for Minnesota:"
        ]
      },
      {
        title: "1. Mandatory Screening (The \"Screen Before Collect\" Rule)",
        body: [
          "Under Minn. Stat. § 144.587, hospitals cannot simply send you a bill and hope for the best. They are legally required to be proactive:",
          "Mandatory Charity Care Screening: Before a hospital can refer any medical debt to collections (including in-house or third-party agencies), they must screen the patient for charity care eligibility.",
          "Insurance Assistance: Hospitals must determine if an uninsured patient is eligible for Medical Assistance (Medicaid) or MinnesotaCare and, if so, assist them with the application process.",
          "Presumptive Eligibility: If you are already enrolled in programs like SNAP or WIC, many Minnesota hospitals are required to automatically grant you charity care without a complex application."
        ]
      },
      {
        title: "2. Landmark Credit Reporting Ban",
        body: [
          "Minnesota is one of the pioneering states to \"de-link\" healthcare from credit scores:",
          "Total Prohibition: Under Minn. Stat. § 332C.03, it is illegal for any party (hospitals or debt collectors) to report medical debt to a consumer reporting agency.",
          "Credit Bureaus: Credit bureaus are prohibited from including medical debt on a Minnesota resident's credit report. This ensures that a medical crisis doesn't ruin your ability to get a car loan, mortgage, or apartment."
        ]
      },
      {
        title: "3. Protection of Care & Service",
        body: [
          "Minnesota law ensures that debt does not prevent you from receiving future treatment:",
          "No Denial of Care: A healthcare provider cannot deny medically necessary treatment to a patient or their family member solely because they have outstanding medical debt with that provider (Minn. Stat. § 62J.807).",
          "Billing Error Rights: If you notify a provider of a potential billing error, they must cease collection activity and review the bill. They cannot resume collections until the error is corrected and you are notified."
        ]
      },
      {
        title: "4. Typical Eligibility in Minnesota (2026)",
        body: [
          "While the state mandates the process for screening, individual hospital systems (like Mayo Clinic, Allina Health, or M Health Fairview) set their own specific income tiers. Most major Minnesota systems in 2026 follow these benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 50% to 75% discount).",
          "Catastrophic Limit: Assistance if medical bills exceed a certain % of annual income.",
          "For 2026, the FPL for a single person in Minnesota is approximately $15,960 (meaning 200% FPL is $31,920)."
        ]
      },
      {
        title: "5. Collection & Garnishment Restrictions",
        body: [
          "Wage Garnishment Caps: Minnesota uses a strict income-based sliding scale that prohibits garnishing the wages of low-income workers for medical debt.",
          "Homestead Exemption: While hospitals can technically place a lien, Minnesota's homestead laws provide significant protection for your primary residence.",
          "Reasonable Payment Plans: Hospitals must offer a reasonable payment plan to any patient who is found ineligible for charity care but still cannot pay the full amount at once."
        ]
      }
    ]
  },
  MS: {
    name: "Mississippi",
    sections: [
      {
        title: "",
        body: [
          "In Mississippi, charity care is notably different from many other states. Mississippi is one of the few states that has not expanded Medicaid (as of early 2026), and it does not have a single, comprehensive \"Patient Bill of Rights\" or a state law that mandates specific income thresholds for all hospitals.",
          "Instead, charity care is managed through a patchwork of old property tax laws, federal requirements, and hospital-specific policies."
        ]
      },
      {
        title: "1. The \"Charity Ward\" Requirement",
        body: [
          "Under Mississippi Code § 27-31-1(f), nonprofit hospitals are granted an exemption from property taxes only if they maintain \"one or more charity wards that are for charity patients.\"",
          "The Definition: The law is famously vague. It does not define what a \"charity ward\" must look like in a modern hospital or exactly how many patients must be served.",
          "The Result: Most hospitals satisfy this by offering a Financial Assistance Policy (FAP) rather than a physical \"ward.\""
        ]
      },
      {
        title: "2. The 135% FPL Benchmark",
        body: [
          "While there is no universal state mandate, many Mississippi hospitals (such as Greenwood Leflore and others) use 135% of the Federal Poverty Level (FPL) as their primary cutoff for free care.",
          "This specific number is often tied to the state's Healthier Mississippi Waiver, which provides Medicaid-like coverage to people who are aged, blind, or disabled but not eligible for Medicare.",
          "Typical Free Care: Residents at or below 135% FPL usually qualify for 100% free medically necessary care.",
          "Typical Discounts: Residents between 136% and 200% FPL often qualify for sliding scale discounts."
        ]
      },
      {
        title: "3. Federal IRS Rule 501(r)",
        body: [
          "Because Mississippi lacks a robust state-level mandate, the federal rule for nonprofit hospitals is the primary protection for patients. Hospitals must:",
          "Limit Charges: They cannot charge a charity-eligible patient more than the \"Amounts Generally Billed\" (AGB) to insurance companies.",
          "Wait to Collect: They must wait at least 120 days before reporting a debt to a credit bureau or taking legal action."
        ]
      },
      {
        title: "4. New for 2026: The Overpayment Refund Act",
        body: [
          "A new piece of legislation (passed as HB 961) took effect recently in Mississippi:",
          "60-Day Refund: Hospitals and medical facilities are now legally required to refund any overpayment to a patient within 60 days of discovering the error.",
          "Automatic Issuance: You do not have to \"request\" the refund; the hospital must issue it automatically via the original payment method or check."
        ]
      },
      {
        title: "5. Medical Debt & Credit Reporting",
        body: [
          "Unlike several \"blue\" states that have banned medical debt credit reporting, Mississippi still allows it.",
          "The $500 Rule: Following national credit bureau standards, medical debts under $500 should not appear on your credit report.",
          "Reporting Delay: Debts must be at least one year old before they can be reported to credit agencies."
        ]
      },
      {
        title: "6. Certificate of Need (CON) Requirements",
        body: [
          "The Mississippi Department of Health uses the Certificate of Need process to regulate hospitals. To be allowed to build or expand, a hospital must prove it provides a \"reasonable amount\" of indigent care compared to other hospitals in the same area."
        ]
      },
      {
        title: "Summary of 2026 Eligibility (Estimates)",
        body: [
          "For a single person in Mississippi:",
          "Below $21,546 (135% FPL): 100% Free Care at most nonprofit/community hospitals.",
          "Up to $31,920 (200% FPL): Likely eligible for 50%–75% discounts.",
          "Asset Test: Many MS hospitals do look at your savings/assets (often a $4,000 limit)."
        ]
      }
    ]
  },
  MO: {
    name: "Missouri",
    sections: [
      {
        title: "",
        body: [
          "In Missouri, charity care is not governed by a single, comprehensive state \"Patient Bill of Rights.\" Instead, it is a patchwork of Federal IRS mandates for nonprofit hospitals, MO HealthNet (Medicaid) rules, and new transparency laws taking effect in 2026.",
          "Here is the breakdown of the legal and regulatory landscape for Missouri in 2026:"
        ]
      },
      {
        title: "1. Federal IRS Rule 501(r) (The Primary Mandate)",
        body: [
          "Since most major Missouri systems (like BJC HealthCare, Mercy, and Saint Luke's) are nonprofits, they must follow federal mandates.",
          "Written Policies: Hospitals must have a clear Financial Assistance Policy (FAP).",
          "Price Caps: They cannot charge a patient eligible for charity care more than the \"Amounts Generally Billed\" (AGB) to insurance companies.",
          "Wait Periods: Hospitals must allow at least 240 days for a patient to apply for assistance before taking \"extraordinary collection actions.\""
        ]
      },
      {
        title: "2. Typical Eligibility in Missouri (2026)",
        body: [
          "While not mandated by state statute, most major Missouri health systems have standardized their 2026 income tiers based on the Federal Poverty Level (FPL):",
          "At or below 200% FPL: Usually 100% Free Care (Full Charity).",
          "201% – 300% FPL: Sliding scale (often 60% to 80% discount).",
          "Catastrophic Hardship: Discounts if bills exceed 10% – 20% of annual income.",
          "For 2026, the FPL for a single person is approximately $15,960; for a family of four, it is approximately $32,470."
        ]
      },
      {
        title: "3. The \"Honest Billing Act\" (Effective Dec 31, 2026)",
        body: [
          "Passed as HB 3152, this new law targets \"facility fees\" that often surprise patients at off-campus clinics.",
          "National Provider Identifier (NPI): Off-campus outpatient departments must use a unique billing code separate from the main hospital.",
          "Enforcement: If a facility fails to bill correctly under this system after December 31, 2026, the hospital cannot hold the patient liable for the charges."
        ]
      },
      {
        title: "4. MO HealthNet (Medicaid) Expansion",
        body: [
          "Missouri's Medicaid expansion (Adult Expansion Group) covers adults aged 19–64 with incomes up to 138% of the FPL.",
          "Mandatory Screening: Missouri hospitals generally require you to apply for MO HealthNet before they will approve you for their private \"charity care\" fund.",
          "Redetermination Note: Starting July 1, 2026, Missouri is moving to six-month eligibility redeterminations, meaning you may need to verify your income twice a year to maintain state coverage."
        ]
      },
      {
        title: "5. Medical Debt & Credit Reporting",
        body: [
          "Missouri does not currently have a state-level ban on medical debt credit reporting (unlike states like Illinois or Colorado).",
          "Federal Context: You are protected by the national 2025/2026 shift where credit bureaus generally exclude medical debts under $500.",
          "State Collections: Under SB 724, a hospital found to be \"materially out of compliance\" with federal price transparency laws may be legally barred from collecting debt from a patient for those specific services."
        ]
      }
    ]
  },
  MT: {
    name: "Montana",
    sections: [
      {
        title: "",
        body: [
          "In Montana, charity care is primarily regulated by Montana Code Ann. § 50-5-121 and a significant new consumer protection law, the Montana Medical Debt Patient Protection Act (HB 273), which became fully effective for all collection actions starting October 1, 2025.",
          "Here is the breakdown of your rights and the legal landscape in Montana for 2026:"
        ]
      },
      {
        title: "1. The Montana Medical Debt Patient Protection Act (2025/2026)",
        body: [
          "This landmark law provides some of the strongest protections in the Northwest against aggressive medical debt collection:",
          "Extraordinary Collection Actions (ECA) Ban: Hospitals and collectors must wait at least 120 days after the first bill is sent before taking any \"extraordinary\" steps (like lawsuits).",
          "30-Day Warning: A provider must give you a final 30-day written notice specifically stating what collection action they intend to take.",
          "Property & Wage Protection: The law prohibits creditors from causing your arrest, placing liens on your primary residence, or foreclosing on your home for medical debt.",
          "Bank Account Exemption: Up to $3,000 in your bank accounts, stocks, or securities is automatically protected from seizure for medical debt.",
          "Insurance Appeal Pause: If you are currently appealing a claim with your insurance company, all collection actions must legally stop until the appeal is resolved."
        ]
      },
      {
        title: "2. Mandatory Charity Care Policies",
        body: [
          "Under MCA § 50-5-121, all Montana hospitals (regardless of whether they are nonprofit or for-profit) must maintain a written charity care policy:",
          "Consistency Rule: Policies must be consistent with \"industry standards\" for the area.",
          "Non-Discrimination: Hospitals are strictly prohibited from discriminating against patients based on their ability to pay.",
          "Transfer Ban: A hospital cannot transfer you to another facility simply because you cannot pay for your care."
        ]
      },
      {
        title: "3. Typical Eligibility in Montana (2026)",
        body: [
          "Since Montana law requires a policy but doesn't set a universal state-wide income cap, individual health systems set their own limits. Most major Montana systems (such as Benefis, Billings Clinic, or St. Patrick) follow these 2026 standards:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 60% to 80% discount).",
          "Catastrophic Limit: Assistance if medical bills exceed 30% of your annual income.",
          "For 2026, 200% of the FPL for a single person is approximately $31,920."
        ]
      },
      {
        title: "4. Credit Reporting and \"Void\" Debt",
        body: [
          "Willful Violation: Under the new Patient Protection Act, if a collection agency willfully violates the law (e.g., reports you to a credit bureau before the 120-day window or ignores an insurance appeal), the medical debt is legally considered void and unenforceable.",
          "Credit Score Impact: While Montana does not have a total ban on credit reporting (unlike some other states), any medical debt under $500 is excluded from credit reports nationally as of 2025/2026."
        ]
      },
      {
        title: "5. Patient Bill of Rights (MCA § 50-5-110)",
        body: [
          "Montana law guarantees you the right to know the financial implications of your treatment choices.",
          "You have the right to request a Good Faith Estimate for any non-emergency service.",
          "If the final bill is more than $400 over the estimate, you have a legal right to dispute the charges through a federal or state mediator."
        ]
      }
    ]
  },
  NE: {
    name: "Nebraska",
    sections: [
      {
        title: "",
        body: [
          "In Nebraska, charity care is not governed by a single state law that sets a universal income limit for all hospitals. Instead, the legal landscape is shaped by Federal IRS rules, specific Nebraska statutes for county-owned hospitals, and a significant new medical debt bill currently being considered in the 2026 legislative session.",
          "As of February 2026, here is the breakdown for Nebraska:"
        ]
      },
      {
        title: "1. The County Hospital Mandate",
        body: [
          "Under Neb. Rev. Stat. § 68-104, the county board in each Nebraska county is designated as the \"overseer of the poor.\"",
          "Legal Duty: County boards have a mandatory duty to provide for \"poor persons\" who are not eligible for other assistance programs.",
          "Hospital Participation: County boards must make use of existing facilities, including tax-supported hospitals and charitable clinics, to provide this care.",
          "Eligibility: Each county can set its own financial criteria, but they generally align with the Federal Poverty Level (FPL)."
        ]
      },
      {
        title: "2. Nonprofit Hospital Obligations (IRS 501(r))",
        body: [
          "Most major Nebraska health systems (like CHI Health, Methodist, and Nebraska Medicine) are private nonprofits. They follow federal mandates to maintain their tax-exempt status:",
          "Written Policy: Hospitals must have a clear Financial Assistance Policy (FAP).",
          "Limitations on Charges: Eligible patients cannot be charged more than the \"Amounts Generally Billed\" (AGB) to insurance companies.",
          "Wait Periods: Hospitals must wait at least 240 days after the first post-discharge bill before taking aggressive collection actions."
        ]
      },
      {
        title: "3. New for 2026: The Medical Debt Protection Act (LB 779)",
        body: [
          "Introduced in the Nebraska Legislature in January 2026, this bill aims to create state-wide standards for hospital billing:",
          "Proposed Rules: It seeks to require health care facilities to screen patients for financial assistance eligibility before referring the debt to a collection agency.",
          "Collection Limits: It would place stricter requirements on collection agencies specifically regarding medical debt, potentially limiting interest rates and legal fees."
        ]
      },
      {
        title: "4. Typical Eligibility in Nebraska (2026)",
        body: [
          "While the state doesn't mandate a specific number, major Nebraska health systems have standardized their 2026 tiers. Most follow these approximate benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 50% to 80% discount).",
          "Catastrophic Needs: Assistance if medical bills exceed 15% – 30% of annual income.",
          "For 2026, the FPL for a single person in Nebraska is approximately $15,960 (meaning 200% FPL is roughly $31,920)."
        ]
      },
      {
        title: "5. Nebraska Medicaid (Heritage Health) 2026 Changes",
        body: [
          "Nebraska expanded Medicaid to cover adults up to 138% FPL. However, a major change is taking effect this year:",
          "Work Requirements: Starting May 1, 2026, Nebraska will begin enforcing work requirements for certain Medicaid members. Eligible adults may need to verify 80 hours of work, education, or volunteering per month to maintain their coverage.",
          "Exemptions: Those who are \"medically frail,\" pregnant, or caregivers are generally exempt from these new rules."
        ]
      }
    ]
  },
  NV: {
    name: "Nevada",
    sections: [
      {
        title: "",
        body: [
          "In Nevada, charity care and medical debt laws have undergone significant updates recently, with the passage of Assembly Bill 204 (2025) and Senate Bill 248, alongside existing mandates in the Nevada Revised Statutes (NRS).",
          "As of February 2026, Nevada has shifted from a state with minimal requirements to one of the more protective environments for patients."
        ]
      },
      {
        title: "1. The 30% Uninsured Discount (NRS 439B.260)",
        body: [
          "Nevada is one of the few states that mandates a \"sticker price\" discount for almost all uninsured patients, regardless of their charity care application status.",
          "Mandatory Reduction: Every \"major hospital\" (nonprofit or for-profit with 200+ beds) must reduce the total billed charges for inpatient services by at least 30% for any patient who has no insurance and is not eligible for public assistance (Medicaid/Medicare).",
          "Notification: Hospitals are legally required to include a notice of this discount on your first billing statement after discharge."
        ]
      },
      {
        title: "2. Mandatory Community Benefit (The 0.6% Rule)",
        body: [
          "Under NRS 439B.320, hospitals in Nevada's larger counties (Clark and Washoe) that have at least 100 beds are required to provide a minimum level of care to indigent patients.",
          "The Threshold: Hospitals must provide care to indigent inpatients in an amount representing at least 0.6% of their net revenue from the preceding year.",
          "Penalty: If a hospital fails to meet this quota, they must pay the difference into a county fund used to compensate other hospitals that exceed their charity care goals."
        ]
      },
      {
        title: "3. Medical Debt Patient Protection Act (AB 204 - Effective Jan 1, 2026)",
        body: [
          "This landmark law, which became fully operational in 2026, drastically limits how hospitals and debt collectors can treat patients:",
          "180-Day Waiting Period: Hospitals and collection agencies are strictly prohibited from taking \"extraordinary collection actions\" (ECAs) until at least 180 days after the first bill was sent.",
          "Extraordinary Action Defined: ECAs now legally include selling your debt to a collection agency, filing a lawsuit, or reporting the debt to a credit bureau.",
          "Total Ban on Foreclosures: Medical creditors are now prohibited from placing a lien on or foreclosing on a patient's primary residence.",
          "Arrest Prohibition: It is illegal for a creditor to cause the arrest of a consumer over medical debt."
        ]
      },
      {
        title: "4. Collection Agency Restrictions (SB 248)",
        body: [
          "Nevada law imposes unique requirements on collection agencies specifically for medical debt:",
          "60-Day Notice: Before any collection action can start, the agency must send a written notice via registered or certified mail and wait 60 days.",
          "Interest and Fee Caps: Collection fees are capped at 5% of the principal medical debt. Interest on medical debt is often prohibited entirely if the patient is eligible for financial assistance."
        ]
      },
      {
        title: "5. Typical Eligibility in Nevada (2026)",
        body: [
          "While the state mandates the discount (30%), it lets hospitals define the free care (100% discount) thresholds. In 2026, major systems like Dignity Health and Sunrise Health typically follow these tiers:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 50% to 75% discount).",
          "Uninsured (Any Income): 30% Mandatory Discount (State Law).",
          "For 2026, the FPL for a single person in Nevada is approximately $15,960 ($31,920 for 200%)."
        ]
      }
    ]
  },
  NH: {
    name: "New Hampshire",
    sections: [
      {
        title: "",
        body: [
          "In New Hampshire, charity care is primarily regulated by NH RSA 151:12-b, which requires hospitals to offer discounts to uninsured patients, and RSA 151:12, which mandates that hospitals have a written financial assistance policy.",
          "As of February 2026, here is the legal and regulatory framework for New Hampshire:"
        ]
      },
      {
        title: "1. The \"Self-Pay\" Discount (RSA 151:12-b)",
        body: [
          "New Hampshire law protects uninsured patients from being charged the full \"sticker price\" for hospital services:",
          "Mandatory Discount: If you are uninsured and do not qualify for other assistance, hospitals must give you a discount on medically necessary services.",
          "The Rate: The discount must be consistent with the rates the hospital accepts from commercial health insurance companies. This prevents hospitals from charging the most vulnerable patients the highest prices."
        ]
      },
      {
        title: "2. Mandatory Financial Assistance Policies",
        body: [
          "Under RSA 151:12, every hospital in New Hampshire must maintain a \"Financial Assistance\" or \"Charity Care\" policy. While the state law does not set a single universal income limit for all hospitals, it requires that these policies:",
          "Be Publicly Available: Hospitals must post their policies clearly in waiting areas and on their websites.",
          "Include Specific Criteria: Policies must outline the income and asset levels required to qualify for free or discounted care.",
          "Application Assistance: Hospitals are required to help patients screen for and apply for state-funded programs (like Medicaid) before denying financial assistance."
        ]
      },
      {
        title: "3. Typical Eligibility in New Hampshire (2026)",
        body: [
          "Because of New Hampshire's high cost of living, many hospital systems (like Elliot Hospital, Concord Hospital, and Dartmouth Health) have set eligibility levels that exceed federal baselines:",
          "At or below 200% – 250% FPL: Usually 100% Free (Full Charity Care).",
          "251% – 400% FPL: Sliding scale (often 50% to 80% discount).",
          "Asset Limits: Some NH hospitals consider assets (e.g., savings >$300k), but your primary home is typically excluded.",
          "For 2026, the Federal Poverty Level (FPL) for a single person is approximately $15,960."
        ]
      },
      {
        title: "4. Landmark Medical Debt Protections (2025/2026)",
        body: [
          "New Hampshire residents have significant protections against aggressive collection of medical debt:",
          "Extraordinary Collection Actions (ECA): Under federal and state alignment, hospitals must wait at least 120 days after the first bill before sending a debt to a collection agency or reporting it to a credit bureau.",
          "Wait to Sue: Hospitals must wait at least 240 days for a patient to submit a financial assistance application before taking legal action.",
          "Credit Reporting: Following national trends and state guidance, medical debts under $500 generally do not appear on credit reports in New Hampshire."
        ]
      },
      {
        title: "5. Granite Advantage (Medicaid Expansion) 2026 Changes",
        body: [
          "New Hampshire's Medicaid expansion program (Granite Advantage) covers adults up to 138% FPL.",
          "Work Requirements: As of January 1, 2026, the state is in the process of re-implementing \"community engagement\" (work) requirements for certain Medicaid members. Eligible adults may need to verify 80 hours of work, education, or volunteering per month to keep their coverage.",
          "Premiums: Enrollees earning over 100% FPL may now be required to pay a small monthly fee to maintain their state health insurance."
        ]
      }
    ]
  },
  NJ: {
    name: "New Jersey",
    sections: [
      {
        title: "",
        body: [
          "In New Jersey, the state charity care law—known officially as the Hospital Care Payment Assistance Program—is one of the most structured in the country. As of 2026, residents are also protected by the landmark Louisa Carman Medical Debt Relief Act, which has fundamentally changed how medical debt is billed and collected.",
          "Here is the breakdown of the legal framework in New Jersey for 2026:"
        ]
      },
      {
        title: "1. Mandatory Free and Reduced Care",
        body: [
          "Under the state's Charity Care program, all acute care hospitals in New Jersey must provide free or discounted medically necessary care to eligible residents. Eligibility is based on income and assets:",
          "At or below 200% FPL: 0% (100% Free Care).",
          "201% – 225% FPL: 20% (80% Discount).",
          "226% – 250% FPL: 40% (60% Discount).",
          "251% – 275% FPL: 60% (40% Discount).",
          "276% – 300% FPL: 80% (20% Discount).",
          "Over 300% FPL: 100% (No Charity Care).",
          "Asset Limits: Unlike many states, New Jersey law includes an asset test. To qualify, individual assets cannot exceed $7,500 and family assets cannot exceed $15,000. If you exceed these, you can \"spend down\" the extra toward your bill to become eligible."
        ]
      },
      {
        title: "2. The Louisa Carman Medical Debt Relief Act (2025/2026)",
        body: [
          "This law, fully in effect as of mid-2025, provides some of the strongest consumer protections in the U.S.:",
          "Credit Reporting Ban: Medical creditors and debt collectors are prohibited from reporting medical debt to credit bureaus for any services performed on or after July 22, 2024.",
          "Credit Bureau Limits: Credit agencies are prohibited from including paid medical debt or any medical debt under $500 on credit reports, regardless of when it occurred.",
          "Interest Rate Cap: Interest on medical debt—including legal judgments—is strictly capped at 3% per year.",
          "Wage Garnishment Ban: Creditors are prohibited from garnishing the wages of any patient whose annual income is less than 600% of the FPL (approx. $95,760 for a single person in 2026)."
        ]
      },
      {
        title: "3. Collection Restrictions",
        body: [
          "Hospitals must follow a strict timeline before they can take any \"collection actions\" (like filing a lawsuit or hiring a third-party collector):",
          "120-Day Wait: No collection action can start until 120 days after the first bill is sent.",
          "Mandatory Payment Plan: Before collecting, the creditor must offer a \"reasonable payment plan\" where monthly payments do not exceed 3% of the patient's monthly income.",
          "Insurance Appeal Pause: All collection activity must stop if an insurance appeal (internal or external) is pending."
        ]
      },
      {
        title: "4. Mandatory \"Uninsured\" Discount",
        body: [
          "If you are an uninsured New Jersey resident and earn too much for Charity Care (between 300% and 500% FPL), you are still protected by state law (P.L. 2008, c. 60). Hospitals cannot charge you more than 115% of the Medicare rate for the services you received. This effectively gives you the \"insurance company price\" rather than the higher \"sticker price.\""
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "New Jersey hospitals are required to check if you are eligible for NJ FamilyCare (Medicaid) before processing a Charity Care application. If you are already enrolled in SNAP, WIC, or are homeless, many hospitals will grant \"presumptive eligibility,\" wiping out the bill with minimal paperwork."
        ]
      },
      {
        title: "Summary of 2026 Protections",
        body: [
          "Estimates for a single-person household in New Jersey:",
          "Up to $31,920 (200% FPL): 100% Free Care (if assets <$7.5k).",
          "Up to $47,880 (300% FPL): Sliding Scale Discounts and 3% interest cap.",
          "Up to $79,800 (500% FPL): Mandatory Uninsured Discount (115% of Medicare).",
          "Up to $95,760 (600% FPL): Total Protection from wage garnishment."
        ]
      }
    ]
  },
  NM: {
    name: "New Mexico",
    sections: [
      {
        title: "",
        body: [
          "In New Mexico, charity care and medical debt protections are governed by some of the most robust patient rights in the country under the Patients' Debt Collection Protection Act.",
          "As of February 2026, the state has essentially banned hospitals from collecting any debt from low-income residents and has provided a state-level backstop for insurance subsidies that ensures healthcare remains affordable."
        ]
      },
      {
        title: "1. Mandatory Free Care (The 200% Rule)",
        body: [
          "Under NMSA 57-32-4, New Mexico law provides absolute protection for \"indigent patients\":",
          "The Mandate: If your household income is at or below 200% of the Federal Poverty Level (FPL), hospitals and medical creditors are prohibited from pursuing any collection actions against you.",
          "Collection Action Defined: This includes a total ban on lawsuits, wage garnishments, liens on property, and seizing bank accounts for this income group.",
          "Screening Mandate: Health care facilities must screen patients for insurance eligibility and financial assistance before attempting to collect any payment."
        ]
      },
      {
        title: "2. State-Mandated Sliding Scale",
        body: [
          "For those who earn more than 200% FPL but are still struggling, New Mexico law (and standard hospital policies) typically follow a sliding scale of discounts:",
          "201% – 225% FPL: Patient typically pays only 20% of the bill.",
          "226% – 250% FPL: Patient typically pays 40%.",
          "251% – 275% FPL: Patient typically pays 60%.",
          "276% – 300% FPL: Patient typically pays 80%."
        ]
      },
      {
        title: "3. Landmark Credit Reporting Protection",
        body: [
          "While a federal rule to ban medical debt from credit reports faced a legal challenge in 2025, New Mexico provides its own layer of protection:",
          "Reporting Ban for Indigent Patients: For any patient at or below 200% FPL, it is illegal for a hospital or debt collector to report adverse information to a credit bureau.",
          "Standard Protections: For all other patients, medical debt under $500 is generally excluded from credit reports nationally, and New Mexico providers are subject to strict \"notice\" requirements before any reporting can occur."
        ]
      },
      {
        title: "4. Special Protections for Bernalillo & Sandoval Counties (UNM Care)",
        body: [
          "If you are a resident of Bernalillo or Sandoval County, you have access to the UNM Care Program:",
          "Immigration Status: Unlike many state programs, UNM Care does not require proof of immigration status to qualify for assistance.",
          "Retroactive Coverage: If approved, the program can often cover medical bills dating back 6 months prior to your application."
        ]
      },
      {
        title: "5. 2026 Healthcare Affordability Fund",
        body: [
          "New Mexico is unique in 2026 for its aggressive stance on insurance costs:",
          "Premium Assistance: The state has allocated 100% of its health insurance premium surtax receipts (starting September 2026) to the Health Care Affordability Fund.",
          "Subsidy Backstop: As federal ACA subsidies fluctuated in late 2025, New Mexico launched state-level subsidies to ensure that many low-income residents can still access health plans for as little as $0 per month through mid-2026."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in New Mexico:",
          "Below $22,025 (138% FPL): Eligible for Medicaid (Centennial Care).",
          "Up to $31,920 (200% FPL): \"Indigent\" Status: No collection actions or lawsuits allowed.",
          "Up to $47,880 (300% FPL): Eligible for Sliding Scale Discounts.",
          "Up to $63,840 (400% FPL): Eligible for State Premium Assistance for insurance."
        ]
      }
    ]
  },
  NY: {
    name: "New York",
    sections: [
      {
        title: "",
        body: [
          "In New York, the state charity care law—known as the Hospital Financial Assistance Law (Public Health Law § 2807-k)—is one of the strongest in the country. As of February 2026, the state has significantly expanded protections, effectively making medical debt a \"non-credit\" event and capping costs for low-to-moderate income residents.",
          "Here is the legal breakdown for New York in 2026:"
        ]
      },
      {
        title: "1. Mandatory Free and Discounted Care",
        body: [
          "By law, all New York hospitals must use a Uniform Hospital Financial Assistance Application and provide help to patients based on their household income relative to the Federal Poverty Level (FPL):",
          "At or below 200% FPL: 100% Free Care (Full Charity).",
          "201% – 300% FPL: Capped at 10% of the Medicaid rate.",
          "301% – 400% FPL: Capped at 20% of the Medicaid rate.",
          "Underinsured: Assistance if medical costs exceed 10% of annual income.",
          "For 2026, the FPL for a single person is $15,960 ($31,920 at 200% and $63,840 at 400%)."
        ]
      },
      {
        title: "2. The Fair Medical Debt Reporting Act (Total Credit Ban)",
        body: [
          "New York has legally \"de-linked\" healthcare from credit scores. Under state law (N.Y. Gen. Bus. Law § 380-tt):",
          "Reporting Prohibited: Hospitals, healthcare professionals, and ambulance providers are strictly prohibited from reporting medical debt to credit bureaus.",
          "Void Debt: If a provider illegally reports medical debt to a credit agency, that debt is legally deemed void and unenforceable.",
          "Automatic Protection: This applies regardless of the amount of the debt or when it was incurred."
        ]
      },
      {
        title: "3. Collection and Legal Protections",
        body: [
          "New York provides robust \"shield\" laws to prevent a medical crisis from causing homelessness or financial ruin:",
          "No Liens or Foreclosures: It is illegal to place a lien on or foreclose on a patient's primary residence to collect a medical debt.",
          "Wage Garnishment Ban: Hospitals and debt collectors are completely prohibited from garnishing a patient's wages to collect unpaid medical bills.",
          "Interest Rate Cap: Interest on medical debt (including court judgments) is capped at a fixed 2% per annum.",
          "Lawsuit Ban: Hospitals are prohibited from filing lawsuits against any patient earning up to 400% of the FPL."
        ]
      },
      {
        title: "4. Billing and Application Rights",
        body: [
          "The \"Wait\" Period: Hospitals cannot send a bill to a collection agency for at least 180 days after the first bill is sent.",
          "Application Window: You have at least 240 days (8 months) after your first post-discharge bill to apply for charity care.",
          "Asset/Immigration Protection: In New York, hospitals cannot consider your assets (like your home or savings) or your immigration status when determining eligibility for charity care.",
          "Payment Plans: If you qualify for assistance but still owe a balance, your monthly payments cannot exceed 5% of your gross monthly income."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "If you are already enrolled in Medicaid, SNAP, or WIC, most New York hospitals are required to grant you \"presumptive eligibility,\" meaning they should clear your bill with little to no additional paperwork."
        ]
      },
      {
        title: "Summary of 2026 Limits (Single Person)",
        body: [
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory).",
          "Up to $63,840 (400% FPL): Immune to Lawsuits, Wage Garnishment, and Liens.",
          "Any Income Level: Protected from Credit Reporting and 2% Interest Cap."
        ]
      }
    ]
  },
  NC: {
    name: "North Carolina",
    sections: [
      {
        title: "",
        body: [
          "In North Carolina, the charity care landscape has been completely transformed as of 2026 by the Medical Debt Relief and Reform Incentive Program (also known as the \"Medical Bill De-Weaponization\" initiative).",
          "This landmark program, tied to the state's Healthcare Access and Stabilization Program (HASP), has standardized financial assistance and debt protection across nearly all acute care hospitals in the state."
        ]
      },
      {
        title: "1. Mandatory Free and Discounted Care (The 300% Rule)",
        body: [
          "As of 2025–2026, participating North Carolina hospitals are required to follow a state-incentivized Medical Debt Mitigation Policy:",
          "100% Free Care: Hospitals must provide full charity care (100% discount) to patients with a household income at or below 200% of the Federal Poverty Level (FPL).",
          "Sliding Scale Discounts: For patients between 200% and 300% FPL, hospitals must provide significant discounts (often 50–75%).",
          "Asset Protection: Unlike some states, North Carolina's new standards focus primarily on income, making it harder for hospitals to deny you care based on your savings or home ownership."
        ]
      },
      {
        title: "2. Presumptive Eligibility (Automatic Approval)",
        body: [
          "Starting January 1, 2026, North Carolina hospitals are required to implement income-based presumptive eligibility screening.",
          "Automatic Qualification: You should be automatically approved for 100% free care if you (or a child in your household) are enrolled in Medicaid, SNAP (Food Stamps), WIC, or if you are experiencing homelessness.",
          "Notification: Hospitals must notify you of your eligibility before issuing a bill."
        ]
      },
      {
        title: "3. Landmark Credit Reporting Protections",
        body: [
          "North Carolina has become a leader in protecting patients' credit scores from medical debt:",
          "Reporting Ban: Participating hospitals are prohibited from reporting medical debt to credit agencies for patients earning at or below 300% of the FPL.",
          "Automatic Removal: For Medicaid enrollees, hospitals were required to relieve and remove outstanding medical debt dating back to January 1, 2014."
        ]
      },
      {
        title: "4. Collection and Interest Restrictions",
        body: [
          "The new 2026 standards impose strict limits on how hospitals can collect money:",
          "3% Interest Cap: Interest on medical debt for patients up to 300% FPL is strictly capped at 3% per year.",
          "Payment Plan Caps: Monthly payments on a medical debt payment plan cannot exceed 5% of your monthly household income.",
          "Seizure Ban: Participating hospitals are prohibited from initiating foreclosures on a primary residence or causing a patient's arrest to collect medical debt.",
          "Wait Period: Hospitals must wait at least 120 days after the first bill before selling debt or taking \"extraordinary\" collection actions."
        ]
      },
      {
        title: "5. Medical Debt Relief (Undue Medical Debt Partnership)",
        body: [
          "North Carolina is the first state to use federal Medicaid funds to incentivize the cancellation of up to $4 billion in old medical debt.",
          "Who Qualifies: Residents with debt dating back to 2014 who are currently on Medicaid, or those with incomes up to 350% FPL whose debt exceeds 5% of their annual income.",
          "No Application Needed: This relief is being processed automatically through 2026. If your debt is cleared, you will receive a yellow letter in the mail from the nonprofit Undue Medical Debt."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in North Carolina:",
          "Below $22,025 (138% FPL): Eligible for NC Medicaid (Expansion).",
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory at HASP hospitals).",
          "Up to $47,880 (300% FPL): Protected from credit reporting and aggressive collections.",
          "Up to $55,860 (350% FPL): Eligible for Automatic Debt Relief (if debt is 2+ years old)."
        ]
      }
    ]
  },
  ND: {
    name: "North Dakota",
    sections: [
      {
        title: "",
        body: [
          "In North Dakota, charity care is not governed by a single state law that sets a universal income mandate for all hospitals. Instead, the state relies on Federal IRS 501(r) regulations for nonprofit hospitals and a specialized state \"Medically Needy\" program.",
          "As of February 2026, here is the legal and regulatory framework for North Dakota:"
        ]
      },
      {
        title: "1. Mandatory \"Medically Needy\" Program",
        body: [
          "Under North Dakota Century Code (N.D.C.C.) § 50-24.1, the state is required to provide medical assistance to \"medically needy\" individuals.",
          "Income Eligibility: North Dakota Medicaid has established specific income levels for the medically needy that are updated annually. As of 2026, families of four can qualify with incomes up to approximately $60,000 annually depending on specific household factors.",
          "Asset Consideration: Unlike many states, North Dakota does consider assets for certain Medicaid categories. However, items like your primary residence and a single vehicle are typically excluded from these calculations."
        ]
      },
      {
        title: "2. Nonprofit Hospital Obligations (The Federal Standard)",
        body: [
          "Most major hospitals in North Dakota (such as Sanford Health, CHI St. Alexius, and Trinity Health) are nonprofits. They must follow federal IRS rules to maintain their tax-exempt status:",
          "Written Financial Assistance Policy (FAP): Hospitals must clearly outline who qualifies for free or discounted care.",
          "No \"Sticker Price\" for Charity Patients: Hospitals cannot charge a patient eligible for financial assistance more than the Amounts Generally Billed (AGB) to insurance companies.",
          "Billing Protections: Hospitals must wait at least 120 days before reporting a debt to a collection agency and 240 days before taking legal action (like a lawsuit)."
        ]
      },
      {
        title: "3. Typical Eligibility in North Dakota (2026)",
        body: [
          "While the state doesn't mandate the exact numbers, major North Dakota health systems have standardized their 2026 tiers. Most follow these approximate benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 50% to 75% discount).",
          "Medical Indigency: Assistance if medical bills exceed 20% of annual income.",
          "For 2026, 200% of the FPL for a single person in North Dakota is approximately $31,920."
        ]
      },
      {
        title: "4. New for 2026: Prior Authorization Transparency",
        body: [
          "Effective January 1, 2026, a new North Dakota law requires that any \"medical necessity\" denial by an insurance company must be reviewed by a licensed physician.",
          "Impact on Charity Care: While this is an insurance law, it reduces the number of \"denied claims\" that often end up as high medical debt for patients, effectively protecting them from needing charity care for services that should have been covered by insurance."
        ]
      },
      {
        title: "5. Medical Debt & Credit Reporting",
        body: [
          "In late 2025 and early 2026, federal rules regarding medical debt changed significantly.",
          "The $500 Rule: Nationally, and followed in North Dakota, medical debts under $500 generally do not appear on credit reports.",
          "Collection Tactics: North Dakota follows the Fair Debt Collection Practices Act, meaning collectors cannot harass you or misrepresent the amount you owe. However, unlike New York or Minnesota, North Dakota has not yet passed a total state-wide ban on medical debt credit reporting."
        ]
      }
    ]
  },
  OH: {
    name: "Ohio",
    sections: [
      {
        title: "",
        body: [
          "In Ohio, charity care is primarily governed by a state program called the Hospital Care Assurance Program (HCAP). As of 2026, Ohio has also moved toward significant new protections for patients under the proposed Ohio Medical Debt Fairness Act, which targets credit reporting and aggressive collection tactics.",
          "Here is the breakdown of the legal landscape in Ohio for 2026:"
        ]
      },
      {
        title: "1. The Hospital Care Assurance Program (HCAP)",
        body: [
          "Ohio law (ORC § 5112.17) mandates that every hospital receiving federal \"Disproportionate Share\" funds must provide free basic, medically necessary hospital-level services to certain low-income residents.",
          "100% Free Care (The 100% Rule): To qualify for mandatory free care, you must be an Ohio resident, not a Medicaid recipient, and have a household income at or below 100% of the Federal Poverty Level (FPL).",
          "Coverage: This covers all medically necessary inpatient and outpatient services typically covered by Medicaid. It does not cover elective procedures, physician/anesthesiologist bills, or take-home prescriptions.",
          "2026 Income Limit: For a single person, the 100% FPL limit in 2026 is $15,960 ($33,000 for a family of four)."
        ]
      },
      {
        title: "2. Mandatory Charity Care Policies (The 400% Standard)",
        body: [
          "While the state mandate (HCAP) only covers up to 100% FPL, federal law for nonprofit hospitals (most major systems in Ohio) requires more generous tiers. As of 2026, many Ohio systems (like OhioHealth, Cleveland Clinic, and Akron Children's) have standardized the following:",
          "Uninsured Discounts: Most hospitals provide 100% free care to patients at or below 200% FPL.",
          "Sliding Scale: Patients with incomes between 200% and 400% FPL typically receive a 50% to 75% discount off their bill.",
          "Medically Indigent: Assistance is often available for \"medically indigent\" patients whose bills exceed a certain percentage of their income, even if they earn more than 400% FPL."
        ]
      },
      {
        title: "3. The Ohio Medical Debt Fairness Act (HB 257 - 2025/2026)",
        body: [
          "This landmark legislation, currently a focal point in 2026, has introduced major protections for Ohioans:",
          "3% Interest Cap: The legal interest rate on medical debt judgments has been slashed from 8% to 3% per annum.",
          "Credit Reporting Ban: The bill prohibits healthcare providers and debt collectors from reporting medical debt to credit reporting agencies.",
          "Wage Garnishment Prohibition: Hospitals and collectors are prohibited from garnishing the wages of patients to satisfy medical debt.",
          "Voiding Debt: If a provider illegally reports medical debt to a credit bureau, the court has the authority to declare the entire debt void and unenforceable."
        ]
      },
      {
        title: "4. Patient Rights & Billing Requirements",
        body: [
          "Screening First: Hospitals must notify all patients of their right to apply for HCAP and screen self-pay patients for eligibility before taking collection actions.",
          "240-Day Window: Under federal/state alignment, you generally have 240 days after your first bill to submit a financial assistance application.",
          "Refunds: If you were eligible for HCAP but accidentally paid a bill, Ohio law requires the hospital to refund the payment if you apply and qualify within the required timeframe."
        ]
      },
      {
        title: "Summary of 2026 Income Limits (Estimates)",
        body: [
          "For a single person in Ohio:",
          "Up to $15,960 (100% FPL): Mandatory Free Care (HCAP).",
          "Up to $22,025 (138% FPL): Eligible for Ohio Medicaid.",
          "Up to $31,920 (200% FPL): 100% Free Care at most major hospital systems.",
          "Up to $63,840 (400% FPL): Eligible for Sliding Scale Discounts."
        ]
      }
    ]
  },
  OK: {
    name: "Oklahoma",
    sections: [
      {
        title: "",
        body: [
          "In Oklahoma, charity care and medical debt protections are primarily governed by the Oklahoma Charity Care Law (Title 63 § 1-723.2) and a significant new credit protection law that took effect in late 2025.",
          "As of February 2026, here is the legal and regulatory framework for Oklahoma:"
        ]
      },
      {
        title: "1. Mandatory Discounts for Self-Pay Patients (Title 63 § 1-723.2)",
        body: [
          "Oklahoma state law requires all hospitals to offer a discount program to \"qualified self-pay patients.\"",
          "Income Eligibility: You qualify for this mandatory discount if your household income is at or below 300% of the Federal Poverty Level (FPL).",
          "The Discount Rate: For those who qualify, the hospital cannot charge more than the Medicare reimbursement rate or the actual cost of services (whichever is greater).",
          "Legal Defense: If a hospital sues you for medical debt, you can use this law as a legal defense. If you prove your income is below 300% FPL, the court is legally required to limit the hospital's collection efforts to that discounted rate."
        ]
      },
      {
        title: "2. Landmark Credit Reporting Protection (HB 1709 - Effective Nov 1, 2025)",
        body: [
          "Oklahoma has significantly restricted how medical debt affects your credit. Under the new law:",
          "Reporting Ban on Emergency Care: Creditors and debt collectors are strictly prohibited from reporting medical debt to credit bureaus if that debt resulted from \"lifesaving and emergency care services\" rendered at an Oklahoma facility.",
          "Credit Bureau Restrictions: Consumer reporting agencies (like Experian or Equifax) are prohibited from including this specific type of emergency medical debt on your credit report.",
          "National Context: In addition to state law, as of 2025/2026, medical debts under $500 are generally excluded from credit reports across the U.S."
        ]
      },
      {
        title: "3. Hospital Financial Assistance Policies (FAPs)",
        body: [
          "While state law sets the 300% FPL discount, individual nonprofit systems (like OU Health or Saint Francis) often offer more generous 100% free care tiers to maintain their federal tax-exempt status:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 300% FPL: Mandatory State Discount (Medicare rates).",
          "301% – 400% FPL: Sliding scale (hospital-specific; often 40% – 60% discount).",
          "For 2026, 200% FPL for a single person is approximately $31,920; 300% FPL is $47,880."
        ]
      },
      {
        title: "4. Collection Protections",
        body: [
          "Under current Oklahoma standards and federal 501(r) regulations:",
          "Wait Period: Hospitals must allow at least 120 days from the first bill before referring a debt to a collection agency.",
          "Application Period: You have up to 240 days (8 months) from your first bill to apply for charity care. If you apply within this window, all \"extraordinary collection actions\" (like lawsuits or garnishments) must be suspended while the application is reviewed."
        ]
      },
      {
        title: "5. Oklahoma Medicaid (SoonerCare) Expansion",
        body: [
          "Oklahoma residents earning up to 138% of the FPL are eligible for SoonerCare.",
          "Pre-requisite: Most Oklahoma hospitals will require you to apply for SoonerCare and receive a denial letter before they will approve you for their private charity care fund.",
          "Presumptive Eligibility: If you are already enrolled in SoonerCare, SNAP, or WIC, many hospitals will grant you \"presumptive eligibility,\" clearing your balance without further documentation."
        ]
      }
    ]
  },
  OR: {
    name: "Oregon",
    sections: [
      {
        title: "",
        body: [
          "In Oregon, the state charity care law (ORS 442.610–442.630) is one of the most comprehensive in the country. As of January 1, 2026, Oregon has implemented a total ban on medical debt credit reporting, alongside \"presumptive eligibility\" rules that require hospitals to screen you for financial help before even sending a bill.",
          "Here is the legal breakdown for Oregon in 2026:"
        ]
      },
      {
        title: "1. Mandatory Free and Discounted Care",
        body: [
          "State law mandates that all nonprofit hospitals and their affiliated clinics provide financial assistance to patients based on their household income relative to the Federal Poverty Level (FPL):",
          "At or below 200% FPL: 100% Free Care (Full Charity).",
          "201% – 300% FPL: 75% Discount.",
          "301% – 350% FPL: 50% Discount.",
          "351% – 400% FPL: 25% Discount.",
          "Note: For 2026, 400% of the FPL for a single person is approximately $63,840. If you fall within these brackets, the hospital must grant you these specific discounts by law."
        ]
      },
      {
        title: "2. Landmark Credit Reporting Ban (Effective 2026)",
        body: [
          "Under Senate Bill 605, Oregon has legally \"de-linked\" healthcare from credit scores:",
          "Reporting Prohibited: Hospitals, clinics, and medical providers are strictly prohibited from reporting medical debt to credit bureaus.",
          "Credit Agency Ban: Consumer reporting agencies are barred from including medical debt on credit reports for Oregon residents.",
          "Void Debt: If a provider illegally reports your debt, a court can declare that debt void and uncollectible as a penalty."
        ]
      },
      {
        title: "3. \"Screen Before Bill\" (Presumptive Eligibility)",
        body: [
          "Since late 2024 and expanding through 2026, Oregon hospitals are required to automatically prescreen patients for financial assistance.",
          "Automatic Approval: If you are uninsured, enrolled in the Oregon Health Plan (Medicaid), or if your bill is over $500 after insurance, the hospital must check if you qualify for charity care before sending you a final bill.",
          "No Opt-Out: Hospitals are required to perform this screening, though you can choose to decline the award and pay the original amount if you wish."
        ]
      },
      {
        title: "4. Collection & Interest Protections",
        body: [
          "Oregon provides strong \"shield\" laws to protect your assets from medical creditors:",
          "Interest Rate Cap: For patients who do not qualify for financial assistance, interest on medical debt is capped at a low market rate. Once a judgment is entered, it cannot exceed the state's standard legal interest rate.",
          "Wage Garnishment Shield: As of 2026, Oregon increased wage-garnishment protections. Creditors cannot take more than 25% of your disposable earnings, and they must leave you with at least $400 per week (up from previous years).",
          "Lawsuit Restrictions: Hospitals must screen you for financial assistance before transferring any debt to a collection agency or filing a lawsuit."
        ]
      },
      {
        title: "5. The OHP Bridge Program",
        body: [
          "If you earn too much for traditional Medicaid but still struggle with costs (between 133% and 200% FPL), you may qualify for OHP Bridge.",
          "Zero Cost: This program offers medical, dental, and behavioral health care with no premiums, no co-pays, and no deductibles.",
          "Transition: Many people who \"age out\" of traditional Medicaid due to slight income increases are now automatically moved to OHP Bridge to prevent medical debt."
        ]
      },
      {
        title: "Summary of 2026 Limits (Single Person)",
        body: [
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory).",
          "Up to $63,840 (400% FPL): Eligible for Sliding Scale Discounts (25%–75%).",
          "Any Income Level: Protected from Credit Reporting and aggressive garnishment."
        ]
      }
    ]
  },
  PA: {
    name: "Pennsylvania",
    sections: [
      {
        title: "",
        body: [
          "In Pennsylvania, charity care is not governed by a single, comprehensive state law. Instead, it is a hybrid system driven by Act 55 of 1997 (the \"Purely Public Charity\" law), Federal IRS 501(r) regulations, and the newly established Medical Debt Relief Program as of 2025–2026.",
          "Here is the breakdown of your rights and the legal landscape in Pennsylvania for 2026:"
        ]
      },
      {
        title: "1. Mandatory Charity Care (Act 55)",
        body: [
          "Under the Pennsylvania Purely Public Charity Act, hospitals must provide a \"substantial\" amount of uncompensated care to maintain their tax-exempt status. While the law does not set a universal income limit, it requires hospitals to:",
          "Provide Free Care: Offer full charity care to residents who cannot afford medically necessary services.",
          "Written Policies: Maintain a written Financial Assistance Policy (FAP) that is accessible to the public.",
          "Standard Practice: Most Pennsylvania systems (like UPMC, Penn Medicine, and Geisinger) use 200% – 300% of the Federal Poverty Level (FPL) as the threshold for 100% free care."
        ]
      },
      {
        title: "2. The Pennsylvania Medical Debt Relief Act (2025/2026)",
        body: [
          "Passed as part of the 2024–2025 budget and fully operational in 2026, this law (HB 79) created the Medical Debt Relief Program:",
          "Debt Forgiveness: The state partners with a \"debt relief coordinator\" to buy and discharge hundreds of millions of dollars in medical debt for Pennsylvanians.",
          "Automatic Eligibility: Residents qualify if their household income is at or below 400% FPL or if their medical debt equals 5% or more of their annual income.",
          "Tax-Free: Forgiven debt under this program is not considered taxable income in Pennsylvania."
        ]
      },
      {
        title: "3. Medical Debt Credit Reporting",
        body: [
          "In 2026, the status of medical debt on credit reports in Pennsylvania is subject to both national trends and state-level fair credit laws:",
          "The $500 Rule: Following national credit bureau standards, medical collections under $500 generally do not appear on credit reports.",
          "Fair Credit Extension Uniformity Act: Pennsylvania law prohibits debt collectors from using \"unfair or deceptive\" acts. If a hospital fails to screen you for charity care before reporting you to a bureau, they may be in violation of this act."
        ]
      },
      {
        title: "4. Collection & Interest Protections",
        body: [
          "120-Day Wait Period: Hospitals must wait at least 120 days after the first billing statement before referring a debt to a collection agency or taking \"extraordinary collection actions.\"",
          "240-Day Application Window: You have up to 240 days (8 months) after your first bill to apply for charity care. If you apply within this window, all collection actions (including lawsuits) must be paused.",
          "Interest Rates: While Pennsylvania has not yet passed a total interest cap like New Jersey, courts generally limit medical debt interest to the state's legal rate (6%) unless a specific contract says otherwise."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "Many Pennsylvania hospitals now use \"Presumptive Eligibility\" screening. If you are enrolled in SNAP, WIC, or Medicaid, the hospital can automatically approve your charity care application without requiring you to submit tax forms or pay stubs."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Pennsylvania:",
          "Up to $22,025 (138% FPL): Eligible for Medical Assistance (Medicaid).",
          "Up to $31,920 (200% FPL): 100% Free Care at most major systems.",
          "Up to $47,880 (300% FPL): Eligible for Sliding Scale Discounts (usually 60–80%).",
          "Up to $63,840 (400% FPL): Eligible for the State Medical Debt Relief Program."
        ]
      }
    ]
  },
  RI: {
    name: "Rhode Island",
    sections: [
      {
        title: "",
        body: [
          "In Rhode Island, charity care and medical debt laws were significantly overhauled by the Rhode Island HEALTH Initiative, with major new protections taking effect on January 1, 2026.",
          "The state now combines mandatory free care for low-income residents with some of the most aggressive medical debt \"shield\" laws in the country."
        ]
      },
      {
        title: "1. Mandatory Free and Discounted Care",
        body: [
          "Under 216-RICR-40-10-23.14, all licensed hospitals in Rhode Island must provide financial assistance based on the Federal Poverty Level (FPL):",
          "At or below 200% FPL: 100% Free Care (Full Charity).",
          "201% – 300% FPL: Partial Charity Care (Sliding scale discount).",
          "Asset Testing: Hospitals have the legal option to apply an \"asset test.\" If you have significant savings (excluding your primary home), they may require you to \"spend down\" those assets before the charity care kicks in."
        ]
      },
      {
        title: "2. Landmark Credit Reporting Ban (Effective Jan 1, 2026)",
        body: [
          "As of January 2026, Rhode Island has legally separated medical bills from credit scores:",
          "Total Prohibition: Under S 0169/H 5184, debt collectors and healthcare providers are strictly prohibited from reporting medical debt to credit bureaus.",
          "Credit Agencies: Consumer reporting agencies (like Experian or Equifax) are barred from including any medical debt transactions on the credit reports of Rhode Island residents."
        ]
      },
      {
        title: "3. Collection and Legal Protections (Effective Jan 1, 2026)",
        body: [
          "New state laws provide a massive \"shield\" for your essential assets:",
          "No Primary Residence Liens: Creditors are prohibited from filing an execution or attachment against your primary home for a judgment based on medical debt.",
          "Wage Garnishment Ban: The 2026 law prohibits creditors from garnishing your wages or salary to satisfy a medical debt judgment.",
          "Interest Rate Cap: Interest on medical debt is now capped by state law (effective since late 2025). It is tied to the one-year Treasury yield, but must be between 1.5% and 4% per annum—far lower than standard credit card rates."
        ]
      },
      {
        title: "4. The Medical Debt Relief Program",
        body: [
          "Rhode Island recently launched a state-funded Medical Debt Relief Program in partnership with the nonprofit Undue Medical Debt:",
          "Eligibility: Residents qualify if their medical debt is 5% or more of their annual income OR if their income is at or below 400% FPL.",
          "Automatic Relief: You do not need to apply. The state buys back qualifying debt (usually debt that is at least one year old) and cancels it. If your debt is forgiven, you will receive a branded \"relief letter\" in the mail."
        ]
      },
      {
        title: "5. Patient Rights & Billing",
        body: [
          "Under R.I. Gen. Laws § 23-17-19.1, you have the following billing rights:",
          "Itemized Bills: You have the right to a summarized bill within 30 days of discharge and an itemized bill upon request.",
          "Explanation of Charges: Hospitals must provide a \"plain-language\" explanation of your bill regardless of who is paying.",
          "Insurance Appeal Pause: Collections must legally stop if you are currently appealing a claim with your insurance company."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Rhode Island:",
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory).",
          "Up to $47,880 (300% FPL): Eligible for Sliding Scale Discounts.",
          "Up to $63,840 (400% FPL): Eligible for the State Debt Buyback Program.",
          "Any Income Level: Immune to Credit Reporting, Home Liens, and Wage Garnishment."
        ]
      }
    ]
  },
  SC: {
    name: "South Carolina",
    sections: [
      {
        title: "",
        body: [
          "In South Carolina, charity care is not governed by a single state law that mandates specific income limits for all hospitals. Instead, it is a hybrid of the Medically Indigent Assistance Program (MIAP), federal requirements for nonprofit hospitals, and new legislative efforts in 2026 to address medical debt and credit reporting."
        ]
      },
      {
        title: "1. The Medically Indigent Assistance Program (MIAP)",
        body: [
          "Under S.C. Code § 44-6-150, South Carolina maintains a state-mandated program to assist \"medically indigent\" residents with inpatient hospital bills.",
          "Income Limit: To qualify for MIAP, your household income typically must be at or below 200% of the Federal Poverty Level (FPL).",
          "Scope: MIAP is primarily designed to cover emergency inpatient hospital stays for residents who do not qualify for Medicaid.",
          "County-Based: Each county in South Carolina contributes to this fund to help hospitals offset the cost of caring for the uninsured.",
          "2026 Income Threshold: For a single person, 200% FPL in 2026 is approximately $31,920 ($66,000 for a family of four)."
        ]
      },
      {
        title: "2. Mandatory Charity Care Policies",
        body: [
          "Most major hospitals in South Carolina (such as Prisma Health, MUSC, and Roper St. Francis) are nonprofits. To keep their tax-exempt status, they must follow federal IRS 501(r) rules, which in South Carolina typically manifest as:",
          "100% Free Care: Most systems offer full charity care for patients earning up to 200% FPL.",
          "Sliding Scale: Patients earning between 201% and 400% FPL usually qualify for a significant discount (often 60%–80%) off the \"Amounts Generally Billed\" to insurance.",
          "Catastrophic Assistance: Assistance is often available if your medical bills exceed 20% of your annual household income."
        ]
      },
      {
        title: "3. Proposed: The Medical Debt Credit Reporting Act (HB 4149)",
        body: [
          "A major legislative focus in 2026 is the effort to ban medical debt from credit reports.",
          "The Goal: If passed, this bill would prohibit South Carolina hospitals and debt collectors from reporting medical debt to credit bureaus.",
          "Current Status: While a total state ban is still under debate in early 2026, South Carolina residents benefit from the national 2025/2026 standard where medical debts under $500 are generally excluded from all credit reports."
        ]
      },
      {
        title: "4. Billing & Collection Protections",
        body: [
          "Statute of Limitations: In South Carolina, a medical provider generally has three years from the date of the last payment or service to sue you for medical debt (S.C. Code § 15-3-530). After three years, the debt is considered \"time-barred.\"",
          "Extraordinary Collection Actions (ECA): Under federal law, hospitals must wait at least 120 days after your first bill before sending it to collections, and 240 days before taking legal action.",
          "Screening Requirement: Hospitals are encouraged (and often required by their own policies) to screen you for Medicaid or MIAP eligibility before initiating aggressive collections."
        ]
      },
      {
        title: "5. Medicaid Expansion (2026 Update)",
        body: [
          "As of early 2026, South Carolina has not yet fully expanded Medicaid under the ACA.",
          "The Gap: This means many adults without children or a disability may not qualify for Medicaid even with $0 income, making hospital charity care policies and MIAP the only safety net.",
          "Medicaid Protection & Expansion Act: There is an active legislative push (H 4383) in the 2026 session to finally adopt Medicaid expansion, which would cover adults up to 138% FPL."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in South Carolina:",
          "Up to $15,960 (100% FPL): Likely eligible for Medicaid (if disabled/caregiver) or MIAP.",
          "Up to $31,920 (200% FPL): 100% Free Care (Mandatory for MIAP inpatient stays).",
          "Up to $63,840 (400% FPL): Eligible for Sliding Scale Discounts (60–80% off).",
          "Over 400% FPL: Catastrophic Hardship (If bills >20% of income)."
        ]
      }
    ]
  },
  SD: {
    name: "South Dakota",
    sections: [
      {
        title: "",
        body: [
          "In South Dakota, charity care is not governed by a single state law that sets a universal income limit for all hospitals. Instead, the legal landscape is shaped by Federal IRS 501(r) regulations for nonprofit hospitals and a significant state protection law—the Medical Debt Protection Act (HB 1058)—which became fully effective in 2025/2026."
        ]
      },
      {
        title: "1. The Medical Debt Protection Act (2025/2026)",
        body: [
          "This law introduced some of the most rigorous billing and collection guardrails in the Midwest:",
          "Total Credit Reporting Ban: Medical creditors and debt collectors are strictly prohibited from reporting any medical debt information to consumer reporting agencies.",
          "Collection Pause for Appeals: Hospitals cannot pursue debt collection if a patient informs them of a pending insurance appeal. The prohibition remains until a final determination is made.",
          "Pre-Collection Screening: A hospital is legally barred from pursuing collections until it has made \"reasonable efforts\" to determine if the patient qualifies for their specific financial assistance program.",
          "Itemized Statement Right: Collection actions cannot begin until the hospital has provided the patient with a full itemized statement of charges.",
          "30-Day Warning: Hospitals must provide 30 days' written notice via certified mail before any collection action can legally commence."
        ]
      },
      {
        title: "2. Mandatory Charity Care Policies",
        body: [
          "Because most major health systems in South Dakota (like Sanford Health, Avera, and Monument Health) are nonprofits, they are federally mandated to provide charity care to maintain their tax-exempt status.",
          "Consistency: Policies must be written, widely publicized, and applied consistently.",
          "AGB Limit: Hospitals cannot charge a patient eligible for financial assistance more than the \"Amounts Generally Billed\" (AGB) to insurance companies. This prevents the uninsured from being charged higher \"sticker prices.\""
        ]
      },
      {
        title: "3. Typical Eligibility in South Dakota (2026)",
        body: [
          "While each system sets its own limits, major South Dakota providers have standardized their 2026 tiers to align with regional standards:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 300% FPL: Sliding scale (often 50% to 75% discount).",
          "Up to 375% FPL: Partial assistance (varies by system, e.g., Sanford).",
          "Asset Limit: Many SD hospitals (like Fall River) have a $50,000 asset cap (excluding your home/primary car).",
          "For 2026, 200% of the FPL for a single person in South Dakota is approximately $31,920 ($66,000 for a family of four)."
        ]
      },
      {
        title: "4. County Indigent Laws (SDCL 28-13)",
        body: [
          "South Dakota law mandates that counties provide for the \"relief and support\" of indigent persons.",
          "Emergency Care: If you are \"medically indigent\" and have an emergency, the county may be responsible for paying your hospital bill if you do not qualify for other assistance.",
          "Application: You must typically apply for this through the County Commission or a designated county welfare office within a strict timeframe (often within 15 days of the start of hospital services)."
        ]
      },
      {
        title: "5. Medicaid Expansion (2026 Constitutional Status)",
        body: [
          "Following the 2022 voter approval of Amendment D, South Dakota expanded Medicaid to adults earning up to 138% of the FPL.",
          "Status for 2026: In the November 2026 election, South Dakota voters will consider a new amendment (Amendment I) that would allow the state to end this expansion if federal funding drops below 90%. As of now, however, coverage remains active for those under the 138% FPL threshold."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in South Dakota:",
          "Up to $22,025 (138% FPL): Eligible for Medicaid (Amendment D).",
          "Up to $31,920 (200% FPL): Usually 100% Free Care (Full Charity).",
          "Up to $47,880 (300% FPL): Sliding Scale (often 50–75% discount).",
          "Up to 375% FPL: Partial assistance (varies by system)."
        ]
      }
    ]
  },
  TN: {
    name: "Tennessee",
    sections: [
      {
        title: "",
        body: [
          "In Tennessee, charity care is governed by Tenn. Code Ann. § 68-1-109, which establishes a framework for \"medical indigence.\" Unlike states with strict income-to-discount tables, Tennessee law gives hospitals significant discretion to define their own eligibility, provided they follow a set of state-mandated guidelines."
        ]
      },
      {
        title: "1. The Legal Definition of Charity Care",
        body: [
          "Under Tenn. Code Ann. § 68-1-109(2), charity care is defined as a reduction in charges based on a patient's indigence or medical indigence.",
          "Medical Indigence: The state defines this as a status where a person has committed all \"available current and expected resources\" to pay for medical bills.",
          "Beyond Poverty Guidelines: Crucially, Tennessee law specifies that medical indigence is not limited to a fixed percentage of the Federal Poverty Level (FPL). This allows you to argue for assistance even if you earn a higher income, provided your medical bills are overwhelming."
        ]
      },
      {
        title: "2. Mandatory Analysis of Resources",
        body: [
          "When a Tennessee hospital evaluates you for charity care, the law requires them to consider your \"total resources,\" which must include:",
          "Assets: Only those convertible to cash and \"unnecessary for the patient's daily living\" (usually excluding your primary home and car).",
          "Liabilities: All existing debts and loans.",
          "Expenses: Your actual daily living costs.",
          "Extenuating Circumstances: The provider is legally encouraged to consider any unique factors affecting your ability to pay."
        ]
      },
      {
        title: "3. The \"Freedom from Medical Debt Act\" (Pending 2026)",
        body: [
          "A major piece of legislation, HB 1859 / SB 1598, was introduced in the Tennessee General Assembly in January 2026. If passed, this would:",
          "Medical Debt Buyback: Require the state to contract with a nonprofit to buy and cancel medical debt for residents earning up to 400% FPL.",
          "Credit Reporting Ban: Prohibit healthcare providers from reporting medical debt to credit agencies.",
          "Status: As of early February 2026, this bill is moving through committees; it is not yet law, but it represents a significant shift in the state's approach to medical debt."
        ]
      },
      {
        title: "4. Typical Eligibility in Tennessee (2026)",
        body: [
          "Because Tennessee has not expanded Medicaid (TennCare) to all low-income adults, hospital charity care is the primary safety net. Most major systems (like Vanderbilt, HCA/TriStar, and Saint Francis) follow these 2026 benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 50% to 80% discount).",
          "Medical Indigence: Case-by-case (based on the \"Total Resources\" test above).",
          "For 2026, 200% of the FPL for a single person is approximately $31,920."
        ]
      },
      {
        title: "5. Collection and Credit Protections",
        body: [
          "The 8-Month Window: In Tennessee, you generally have 240 days (8 months) from the date of your first bill to apply for financial assistance.",
          "IRS 501(r) Compliance: Since most Tennessee hospitals are nonprofits, they must attempt to determine your charity care eligibility before reporting you to a credit bureau or taking legal action.",
          "Interest Rates: Tennessee law generally caps interest on medical debt at the state's legal rate unless a higher rate was agreed upon in writing at the time of service."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Tennessee:",
          "Up to $31,920 (200% FPL): Usually 100% Free Care (Full Charity).",
          "Up to $63,840 (400% FPL): Sliding Scale (often 50–80% discount).",
          "Medical Indigence (any income): Case-by-case based on Total Resources."
        ]
      }
    ]
  },
  TX: {
    name: "Texas",
    sections: [
      {
        title: "",
        body: [
          "In Texas, charity care and medical debt are primarily regulated by the Texas Health and Safety Code (Chapter 311). Texas is known for having some of the most specific \"minimum\" charity care requirements in the country for nonprofit hospitals."
        ]
      },
      {
        title: "1. Mandatory Hospital Charity Standards",
        body: [
          "Texas law requires nonprofit hospitals to provide a specific amount of charity care to maintain their tax-exempt status. Hospitals must meet one of several \"standards,\" the most common being the 5%/4% test:",
          "The Rule: Hospitals must provide community benefits equal to at least 5% of their net patient revenue, with at least 4% of that dedicated specifically to charity care and government-sponsored indigent health care.",
          "Public Reporting: Hospitals must file an annual report with the Texas Department of State Health Services (DSHS) detailing how they met these goals."
        ]
      },
      {
        title: "2. Eligibility Benchmarks",
        body: [
          "While the state gives hospitals some flexibility to set their own policies, standard practice across Texas health systems (like Baylor Scott & White, Texas Health Resources, and Memorial Hermann) generally follows these 2026 tiers:",
          "At or below 200% FPL: 100% Free Care (Financially Indigent).",
          "201% – 400% FPL: Sliding Scale Discounts (often 50%–90%).",
          "Medically Indigent: Assistance if medical bills exceed 5% to 10% of your annual income.",
          "Note: For 2026, the Federal Poverty Level (FPL) for a single person is $15,960. This means a single person earning up to $31,920 (200% FPL) typically qualifies for totally free care at most Texas nonprofit hospitals."
        ]
      },
      {
        title: "3. The \"Timely Billing\" Law",
        body: [
          "Texas has a unique protection called the Timely Billing Law (Texas Civil Practice & Remedies Code § 146.002):",
          "The Deadline: A medical provider must send you a bill no later than the first day of the 11th month after the date of service.",
          "The Penalty: If a hospital misses this 10-month window, they may legally lose the right to collect the debt from you."
        ]
      },
      {
        title: "4. New 2026 Legislative Updates (HB 3708 & HB 18)",
        body: [
          "The 89th Texas Legislature has introduced new standards for 2026:",
          "Mandatory Screening: Nonprofit hospitals are now required to inform every patient of their charity program and screen them for eligibility before sending a bill to a collection agency.",
          "Refund Requirements: If a hospital realizes they made an incorrect determination (e.g., they charged you when you were eligible for a discount), they are legally required to refund the difference to the patient.",
          "Rural Hospital Grants: Under HB 18, the state has established new financial stabilization grants to help rural hospitals remain viable without aggressively pursuing debt from low-income residents."
        ]
      },
      {
        title: "5. Collection and Credit Protections",
        body: [
          "Wage Garnishment Ban: Texas is one of the few states that completely prohibits wage garnishment for consumer debt, including medical bills (except for alimony or child support).",
          "Homestead Protection: Your primary residence (homestead) is generally protected from being seized to pay off medical debt.",
          "Statute of Limitations: In Texas, a medical provider generally has four years to sue you for a debt. Once four years have passed since the debt was due, it is \"time-barred,\" and they cannot win a lawsuit against you.",
          "Credit Reporting: While a 2025 federal court ruling in Texas temporarily blocked a nationwide ban on medical debt credit reporting, most major credit bureaus voluntarily exclude medical debts under $500."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Texas:",
          "Up to $31,920 (200% FPL): 100% Free Care at most nonprofit hospitals.",
          "Up to $63,840 (400% FPL): Sliding Scale Discounts (often 50–90%).",
          "Medically Indigent: Assistance if bills exceed 5–10% of annual income."
        ]
      }
    ]
  },
  UT: {
    name: "Utah",
    sections: [
      {
        title: "",
        body: [
          "In Utah, charity care is not governed by a single, comprehensive \"Charity Care Law\" that mandates specific income-to-discount levels for all hospitals. Instead, the landscape is shaped by Utah's Nonprofit Tax-Exempt Status laws, federal IRS 501(r) regulations, and the policies of major health systems like Intermountain Health and University of Utah Health."
        ]
      },
      {
        title: "1. The \"Property Tax Exemption\" Standard",
        body: [
          "In Utah, nonprofit hospitals must provide a \"community benefit\" (including charity care) to qualify for a property tax exemption under Article XIII of the Utah Constitution.",
          "The Threshold: To keep their tax-free status, hospitals must show that the value of their charity care and community services equals or exceeds the value of the property tax they would have paid.",
          "Notification: State guidelines require hospitals to provide public notice of their financial assistance programs and to have clear, written policies on how to apply."
        ]
      },
      {
        title: "2. Mandatory Discounts for the Uninsured",
        body: [
          "While Utah doesn't mandate \"free\" care for everyone, major health systems have standardized their 2026 financial assistance tiers to align with state expectations:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 50% to 70% discount).",
          "Up to 500% FPL: Assistance for \"Medical Hardship\" at systems like Intermountain.",
          "Medical Hardship Rule: Most Utah hospitals define \"catastrophic\" or \"hardship\" assistance as situations where medical bills (from all sources) exceed 25% of a family's annual income, regardless of their FPL bracket."
        ]
      },
      {
        title: "3. Credit Reporting and Collection Protections",
        body: [
          "The legal environment for medical debt in Utah has seen significant shifts in 2025 and early 2026:",
          "The $500 Rule: Following national standards used in Utah, medical debts under $500 are generally excluded from credit reports.",
          "Wait Periods: Federal 501(r) rules (which apply to Utah's nonprofit hospitals) require a 120-day wait before sending a debt to collections and a 240-day window for you to submit a charity care application.",
          "Lawsuit Protections: If you submit a completed financial assistance application, the hospital must legally pause all \"extraordinary collection actions\" (like lawsuits or wage garnishments) until they make a determination."
        ]
      },
      {
        title: "4. Utah Medicaid Expansion (2026 Status)",
        body: [
          "Utah has expanded Medicaid to adults earning up to 138% of the FPL.",
          "The Rule: Most Utah hospitals will require you to apply for Medicaid and receive a denial letter before they will approve your private charity care application.",
          "Work Requirements: Be aware that as of January 1, 2026, certain Medicaid enrollees in Utah may be subject to updated \"community engagement\" or work reporting requirements to maintain their coverage."
        ]
      },
      {
        title: "5. New for 2026: Advance Health Care Directive Act (SB 134)",
        body: [
          "Effective January 1, 2026, Utah's new Uniform Health Care Decisions Act clarifies patient rights regarding medical decision-making. While this is primarily about medical autonomy, it strengthens the requirement for providers to respect a patient's stated \"best interests,\" which can be a factor in disputing charges for services that were not authorized or in accordance with a patient's directive."
        ]
      },
      {
        title: "Summary of 2026 Limits (Single Person)",
        body: [
          "Estimates for a single-person household in Utah:",
          "Up to $22,025 (138% FPL): Eligible for Utah Medicaid (Expansion).",
          "Up to $31,920 (200% FPL): 100% Free Care at most major systems.",
          "Up to $63,840 (400% FPL): Eligible for Sliding Scale Discounts.",
          "Over 400% FPL: Medical Hardship (If bills >25% of income)."
        ]
      }
    ]
  },
  VT: {
    name: "Vermont",
    sections: [
      {
        title: "",
        body: [
          "In Vermont, charity care and medical debt laws are among the most protective in the United States, especially following the implementation of Act 21 (S.27) in 2025/2026. Vermont has moved toward a model where medical debt is largely treated as a non-credit event and where low-to-middle-income residents are shielded from aggressive collections."
        ]
      },
      {
        title: "1. Mandatory Free and Discounted Care",
        body: [
          "By state law and hospital regulatory standards, Vermont hospitals must provide financial assistance based on your household income relative to the Federal Poverty Level (FPL):",
          "At or below 250% FPL: 100% Free Care (Full Charity).",
          "251% – 400% FPL: Discounted Care (At least a 40% discount).",
          "Medical Indigency: Assistance for \"Catastrophic\" debt (if bills exceed a % of income).",
          "For 2026, the 400% FPL threshold for a single person is approximately $62,600 ($128,600 for a family of four)."
        ]
      },
      {
        title: "2. The Total Credit Reporting Ban (Act 21)",
        body: [
          "Vermont is one of a handful of states that has essentially \"de-linked\" healthcare from credit scores. Under 9 V.S.A. § 2466d:",
          "Reporting Prohibited: Credit reporting agencies are strictly prohibited from including medical debt information in consumer credit reports for Vermont residents.",
          "Collector Restrictions: Hospitals and medical debt collectors are forbidden from reporting medical debts to credit bureaus.",
          "\"Large Health Care Facility\" Rule: Major hospitals and facilities are prohibited from selling medical debt to anyone except 501(c)(3) organizations that intend to abolish the debt."
        ]
      },
      {
        title: "3. The $100 Million Debt Relief Program",
        body: [
          "Effective through 2026, the State Treasurer's Office is utilizing a one-time $1 million investment to purchase and abolish up to $100 million in old medical debt.",
          "Automatic Enrollment: There is no application for this. The state works with the nonprofit Undue Medical Debt to identify qualifying debt.",
          "Eligibility: You are eligible for automatic relief if your income is at or below 400% FPL OR if your medical debt equals 5% or more of your annual household income.",
          "Notification: If your debt is abolished through this program, you will receive a branded \"Notice of Debt Abolition\" in the mail."
        ]
      },
      {
        title: "4. Expansion of Medicare Savings (2026 Update)",
        body: [
          "To solve the \"Medicare Cliff\" (where residents lose Medicaid when they turn 65), a new law effective January 1, 2026, has expanded the Medicare Savings Program (MSP):",
          "Income Limit Increase: The QMB limit (which covers all deductibles and co-pays) has increased from 100% to 150% FPL.",
          "Premium Coverage: The QI-1 limit (which covers the Medicare Part B premium) has increased to 202% FPL.",
          "Impact: Over 14,000 Vermonters are newly eligible for this \"state-level charity care\" for seniors, often saving them over $2,400 per year."
        ]
      },
      {
        title: "5. Collection and Interest Restrictions",
        body: [
          "No Lawsuits for Lower Incomes: Hospitals are generally restricted from taking \"extraordinary collection actions\" (like lawsuits or liens) against patients earning below 400% FPL.",
          "Interest Rates: Interest on medical debt is tightly regulated and often capped at significantly lower rates than general consumer debt.",
          "Presumptive Eligibility: If you are enrolled in SNAP, WIC, or Medicaid, Vermont hospitals are encouraged (and often required by policy) to automatically grant you charity care without further paperwork."
        ]
      },
      {
        title: "Summary of 2026 Limits (Single Person)",
        body: [
          "Income Level / Vermont Legal Status:",
          "Up to $39,900 (250% FPL): 100% Free Care (Mandatory at VT Hospitals).",
          "Up to $62,600 (400% FPL): Eligible for Sliding Scale Discounts & State Debt Relief.",
          "Up to $32,239 (202% FPL): Seniors qualify for Medicare Savings Programs (MSP).",
          "Any Income Level: Protected from Credit Reporting of medical bills."
        ]
      }
    ]
  },
  VA: {
    name: "Virginia",
    sections: [
      {
        title: "",
        body: [
          "In Virginia, charity care and medical debt protections have undergone a major shift with the Medical Debt Protection Act, which becomes fully effective on July 1, 2026. Virginia has moved from a system of voluntary hospital policies to one with strict legal caps on interest and a total ban on medical debt credit reporting."
        ]
      },
      {
        title: "1. The Medical Debt Protection Act (Effective July 1, 2026)",
        body: [
          "This landmark law (Va. Code § 59.1-612) introduces some of the most aggressive consumer protections in the South:",
          "Interest Rate Cap: Interest on medical debt is strictly capped at 3% per annum. Hospitals and debt buyers are prohibited from charging any interest or late fees for the first 90 days after the final invoice.",
          "Total Credit Reporting Ban: Under Va. Code § 59.1-444.4, Virginia hospitals, doctors, and even emergency medical services (ambulances) are prohibited from reporting medical debt to credit bureaus.",
          "Extraordinary Collection Actions (ECAs): Hospitals must wait at least 120 days after the final invoice before taking any major collection action. They must provide you with a 30-day warning and a plain-language summary of their financial assistance policy before proceeding."
        ]
      },
      {
        title: "2. Mandatory Screening and Payment Plans",
        body: [
          "Under Va. Code § 32.1-137.010, Virginia law requires hospitals to act as a safety net before acting as a debt collector:",
          "Screening Mandate: Every hospital must make reasonable efforts to screen uninsured patients for Medicaid eligibility or financial assistance before attempting to collect.",
          "The Right to a Payment Plan: If you are uninsured and qualify for the hospital's financial assistance policy, the hospital must offer you a payment plan.",
          "Renegotiation: You have a legal right to request a renegotiation of your payment plan if your financial situation changes."
        ]
      },
      {
        title: "3. Financial Assistance Thresholds (The 200% Rule)",
        body: [
          "While Virginia law allows hospitals to set their own specific income limits, most major systems (including VHC Health, UVA Health, and VCU Health) have standardized their 2026 tiers to meet state expectations:",
          "At or below 200% FPL: 100% Free Care (Mandatory at many systems).",
          "201% – 400% FPL: Sliding Scale Discounts (typically 50%–75%).",
          "Medical Indigency: Assistance if medical bills exceed 25% of annual income.",
          "For 2026, 200% of the FPL for a single person is approximately $31,920 ($66,000 for a family of four)."
        ]
      },
      {
        title: "4. Asset and Wage Protections",
        body: [
          "Virginia law now provides a \"shield\" for your most important assets:",
          "Garnishment Ban: Hospitals are prohibited from garnishing the wages of any individual who qualifies for their financial assistance policy.",
          "Home and Property: The Medical Debt Protection Act prohibits medical creditors from foreclosing on a patient's real property (home) or placing a lien on personal property to collect a medical debt."
        ]
      },
      {
        title: "5. Statute of Limitations",
        body: [
          "In Virginia, the legal time limit for a hospital or debt collector to sue you for a medical bill is three years from the date the debt became due. Once this three-year window passes, the debt is \"time-barred,\" and they can no longer win a judgment against you in court."
        ]
      },
      {
        title: "Summary of 2026 Limits (Single Person)",
        body: [
          "Income Level / Virginia Legal Status:",
          "Up to $22,025 (138% FPL): Eligible for Virginia Medicaid.",
          "Up to $31,920 (200% FPL): 100% Free Care (Typical) and Immune to Wage Garnishment.",
          "Up to $63,840 (400% FPL): Eligible for Sliding Scale Discounts.",
          "Any Income Level: Protected from Credit Reporting, Home Foreclosure, and 3% Interest Cap."
        ]
      }
    ]
  },
  WA: {
    name: "Washington",
    sections: [
      {
        title: "",
        body: [
          "In Washington, the charity care law (RCW 70.170) is one of the strongest in the country. As of 2026, the state has fully implemented a \"Two-Tier\" system that mandates significant discounts and free care for most residents, along with a landmark ban on medical debt credit reporting."
        ]
      },
      {
        title: "1. The Two-Tier Charity Care System",
        body: [
          "Washington law divides hospitals into two tiers based on their size and ownership. Every hospital in the state must provide free or discounted care based on your household income.",
          "Tier 1 — Large Health Systems & Large Hospitals: Includes Providence, Swedish, MultiCare, UW Medicine, Kaiser Permanente, and any hospital with 300+ beds. At or below 300% FPL: 100% Free Care (Full Charity). 301% – 350% FPL: 75% Discount. 351% – 400% FPL: 50% Discount.",
          "Tier 2 — Smaller, Independent & Rural Hospitals: Includes smaller community hospitals not part of a large multi-hospital chain. At or below 200% FPL: 100% Free Care (Full Charity). 201% – 250% FPL: 75% Discount. 251% – 300% FPL: 50% Discount.",
          "2026 Threshold Example: For a single person, 300% FPL is approximately $47,880. In a Tier 1 hospital, that person is legally entitled to have their entire hospital bill (including deductibles and co-pays) covered for free."
        ]
      },
      {
        title: "2. Landmark Credit Reporting Ban (SB 5480)",
        body: [
          "Effective July 27, 2025, and fully active in 2026, Washington law now treats medical debt as a protected consumer category:",
          "The \"Void\" Rule: If a hospital or debt collector reports your medical debt to a credit bureau, that debt is legally declared void and unenforceable. They lose the right to collect it entirely.",
          "Prohibition: Healthcare providers and collection agencies are strictly forbidden from furnishing medical debt information to any consumer reporting agency.",
          "Consumer Protection: Violating this ban is considered an \"unfair or deceptive act\" under the Washington Consumer Protection Act, allowing patients to sue for damages."
        ]
      },
      {
        title: "3. Patient Residency Requirement (2026 Update)",
        body: [
          "A 2026 legislative update (HB 2250) clarified that while hospitals must provide emergency care to everyone, mandatory charity care eligibility is generally reserved for Washington state residents. This was designed to prevent the \"medical tourism\" of residents from other states seeking free care under Washington's generous laws."
        ]
      },
      {
        title: "4. Billing & Collection Protections",
        body: [
          "Mandatory Screening: Hospitals must screen you for charity care eligibility before attempting to collect payment.",
          "Refund Mandate: If you pay a bill and later qualify for charity care, the hospital is legally required to refund your payment (this was the subject of a major Attorney General settlement in late 2025).",
          "Interest Rate Cap: While a 2026 bill is currently being debated to eliminate interest entirely, current law caps medical debt interest at 9% (far lower than standard credit cards).",
          "240-Day Window: You have up to 240 days after your first post-discharge bill to apply for charity care."
        ]
      },
      {
        title: "5. What is Covered?",
        body: [
          "Included: Medically necessary inpatient and outpatient hospital services, emergency room visits, and any scans or tests done at the hospital.",
          "Not Included: Bills from independent doctors, radiologists, or anesthesiologists who are not employees of the hospital. You must check with these providers separately for their financial assistance policies."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Washington (Tier 1 / large hospitals):",
          "Up to $47,880 (300% FPL): 100% Free Care.",
          "Up to $55,860 (350% FPL): 75% Discount.",
          "Up to $63,840 (400% FPL): 50% Discount.",
          "For Tier 2 (smaller/rural): Up to $31,920 (200% FPL) = 100% Free; up to $39,900 (250% FPL) = 75%; up to $47,880 (300% FPL) = 50%. Any income: Medical debt reported to credit is void and unenforceable."
        ]
      }
    ]
  },
  WV: {
    name: "West Virginia",
    sections: [
      {
        title: "",
        body: [
          "In West Virginia, charity care and medical debt protections are primarily governed by the West Virginia Consumer Credit and Protection Act (WVCCPA) and federal IRS regulations for nonprofit hospitals. As of 2026, the state continues to focus on protecting low-income residents through standard charity care tiers and robust fair debt collection rules.",
          "Unlike some neighboring states, West Virginia does not have a single \"Universal Charity Law\" that mandates a specific discount for all hospitals. Instead, it relies on the following framework."
        ]
      },
      {
        title: "1. Mandatory Nonprofit Hospital Policies",
        body: [
          "The vast majority of hospitals in West Virginia (such as WVU Medicine, Charleston Area Medical Center (CAMC), and Mountain Health Network) are nonprofit organizations. To maintain their tax-exempt status, they must follow federal IRS 501(r) rules:",
          "Written Policies: Every hospital must have a written Financial Assistance Policy (FAP).",
          "AGB Limit: Hospitals cannot charge a patient eligible for charity care more than the Amounts Generally Billed (AGB) to insurance companies.",
          "Screening Requirement: Hospitals must make \"reasonable efforts\" to determine if you are eligible for assistance before they can take extraordinary collection actions (like filing a lawsuit)."
        ]
      },
      {
        title: "2. Typical 2026 Eligibility Benchmarks",
        body: [
          "While individual hospitals set their own exact limits, the standard tiers for major West Virginia health systems in 2026 are:",
          "At or below 200% FPL: 100% Free Care (Full Charity).",
          "201% – 300% FPL: Sliding Scale Discounts (often 50%–80%).",
          "Above 300% FPL: Catastrophic Hardship (If medical bills >25% of annual income).",
          "For 2026, 200% of the FPL for a single person is approximately $31,920."
        ]
      },
      {
        title: "3. The WV Consumer Credit and Protection Act (WVCCPA)",
        body: [
          "West Virginia has some of the strongest consumer protection laws in the country regarding how debt is collected. Under W. Va. Code § 46A-2-128:",
          "Total Ban on Balance Billing: For state-sponsored plans (like PEIA), providers are generally prohibited from \"balance billing\" patients for amounts above the agreed-upon state rate.",
          "Fair Collection Practices: Debt collectors cannot use unfair or unconscionable means. If a collector seeks a statement saying your debt was for the \"necessaries of life\" when it wasn't, they are in violation.",
          "Damages: Violations of the WVCCPA can result in penalties of up to $1,000 per violation, often capped at the amount of the debt or a specific statutory limit (whichever is greater)."
        ]
      },
      {
        title: "4. Collection & Credit Protections",
        body: [
          "Credit Reporting: West Virginia follows the national 2025/2026 standard where medical debts under $500 generally do not appear on credit reports.",
          "Interest Rates (2026 Update): Under HB 4651 (2026), debt collectors can only collect interest or fees if they are expressly authorized by either the original agreement or by state statute. This prevents \"hidden\" fees from ballooning your medical debt.",
          "Statute of Limitations: In West Virginia, a provider generally has ten years for a written contract (like a hospital admission form) or five years for an oral/implied contract to sue for debt. However, once the debt is \"time-barred,\" collectors must disclose that they can no longer sue you."
        ]
      },
      {
        title: "5. Presumptive Eligibility",
        body: [
          "If you are enrolled in Medicaid, SNAP, or WIC, many West Virginia hospitals (especially WVU Medicine) utilize \"Presumptive Eligibility.\" This means they can verify your low-income status through these programs and automatically grant you 100% charity care without requiring a long application or tax forms."
        ]
      },
      {
        title: "Summary of 2026 Limits (Single Person)",
        body: [
          "Income Level / West Virginia Status / Options:",
          "Up to $22,025 (138% FPL): Eligible for West Virginia Medicaid (Expansion).",
          "Up to $31,920 (200% FPL): 100% Free Care (Typical at major systems).",
          "Up to $47,880 (300% FPL): Eligible for Sliding Scale Discounts.",
          "Any Income Level: Protected from Unfair Collections under the WVCCPA."
        ]
      }
    ]
  },
  WI: {
    name: "Wisconsin",
    sections: [
      {
        title: "",
        body: [
          "In Wisconsin, charity care is not governed by a strict state-mandated income table (unlike states like Washington or Oregon). Instead, Wisconsin law focuses on reporting transparency and wage protections, while leaving the specific eligibility tiers to the discretion of individual hospital systems."
        ]
      },
      {
        title: "1. The Reporting Mandate (Wis. Stat. § 153.20)",
        body: [
          "While Wisconsin does not legally force a hospital to provide a specific amount of free care, it requires every hospital (nonprofit and for-profit) to:",
          "File an Annual Plan: Hospitals must submit an annual \"Uncompensated Health Care Service Plan\" to the Department of Health Services (DHS).",
          "Public Notification: This plan must legally describe exactly how the hospital notifies the public that charity care is available and the specific procedure for applying.",
          "Transparency: Hospitals are required to report their \"bad debt\" versus \"charity care\" totals annually, which are published in the Wisconsin Hospital Association (WHA) Uncompensated Care Report."
        ]
      },
      {
        title: "2. Wage Garnishment \"Shield\"",
        body: [
          "Wisconsin provides some of the strongest protections in the nation against having your paycheck seized for medical debt.",
          "The Poverty Ban: Under Wisconsin law, your wages cannot be garnished if your household income is below the Federal Poverty Level (FPL) or if you are currently receiving (or have recently received) need-based public assistance (like BadgerCare+ or SNAP).",
          "The 20% Rule: If garnishment is allowed, it is generally capped at 20% of your disposable income. However, if taking that 20% would push your remaining income below the FPL, the garnishment amount must be legally reduced."
        ]
      },
      {
        title: "3. Typical Eligibility in Wisconsin (2026)",
        body: [
          "Since the state doesn't set the tiers, major Wisconsin systems (like Advocate Aurora, ThedaCare, Froedtert, and SSM Health) generally align their 2026 policies with these benchmarks:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 300% FPL: Sliding scale (often 50% to 75% discount).",
          "Medical Hardship: Discounts if bills exceed 20–25% of annual income.",
          "For 2026, 200% of the FPL for a single person is approximately $31,920 ($66,000 for a family of four)."
        ]
      },
      {
        title: "4. New for 2026: Price Transparency & Debt Collection",
        body: [
          "Under the Price Transparency for Patients Act (2026) currently being implemented:",
          "Compliance Block: Hospitals that are not fully compliant with federal price transparency rules (posting machine-readable files of all rates) are legally prohibited from pursuing debt collection until they come into compliance.",
          "Itemized Billing: Patients have a right to a detailed, itemized bill before a hospital can initiate a lawsuit or transfer debt to a third-party collector."
        ]
      },
      {
        title: "5. Credit Reporting & Federal Standards",
        body: [
          "The $500 Rule: In line with national credit bureau standards, medical debts under $500 generally do not appear on credit reports in Wisconsin.",
          "Nonprofit Obligations: Because most Wisconsin hospitals are nonprofits, they must follow federal IRS 501(r) rules. This means they must wait 120 days before sending you to collections and must give you at least 240 days from your first bill to apply for charity care."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Wisconsin:",
          "Up to $15,960 (100% FPL): Wage garnishment prohibited.",
          "Up to $22,025 (138% FPL): Eligible for BadgerCare+ (Medicaid).",
          "Up to $31,920 (200% FPL): Usually 100% Free Care at major systems.",
          "Up to $47,880 (300% FPL): Sliding Scale (often 50–75% discount). Medical Hardship: If bills >20–25% of income."
        ]
      }
    ]
  },
  WY: {
    name: "Wyoming",
    sections: [
      {
        title: "",
        body: [
          "In Wyoming, charity care and medical debt laws are less centralized than in many other states. Wyoming does not have a single state statute that mandates specific income-to-discount tiers for every hospital. Instead, the landscape is defined by Federal IRS 501(r) regulations and the individual policies of major health systems."
        ]
      },
      {
        title: "1. Mandatory Charity Care (Federal Requirement)",
        body: [
          "Because most Wyoming hospitals (such as Cheyenne Regional, Ivinson Memorial, and Campbell County Health) are nonprofit 501(c)(3) organizations, they must comply with federal law to maintain their tax-exempt status.",
          "Financial Assistance Policy (FAP): Every nonprofit hospital is legally required to have a written policy that clearly states who is eligible for free or discounted care.",
          "Limitation on Charges: Hospitals cannot charge a patient who qualifies for charity care more than the Amounts Generally Billed (AGB) to insurance companies.",
          "Presumptive Eligibility: Many Wyoming hospitals now use \"presumptive\" screening—if you are already enrolled in SNAP, WIC, or Medicaid, the hospital may automatically grant you 100% charity care without requiring a full application."
        ]
      },
      {
        title: "2. Typical 2026 Eligibility Benchmarks",
        body: [
          "While the state does not set these limits, major Wyoming providers have standardized their 2026 tiers to meet community needs:",
          "At or below 200% FPL: Usually 100% Free (Full Charity Care).",
          "201% – 400% FPL: Sliding scale (often 60% to 80% discount).",
          "Medical Hardship: Available at many systems if bills exceed 10–25% of annual income.",
          "Note: For 2026, the Federal Poverty Level (FPL) for a single person is approximately $15,960. A single person earning up to $31,920 (200% FPL) typically qualifies for totally free care at most Wyoming nonprofit hospitals."
        ]
      },
      {
        title: "3. Medical Debt Credit Reporting (2026 Update)",
        body: [
          "The legal status of medical debt on credit reports in Wyoming is currently in flux:",
          "The $500 Rule: Nationally, and within Wyoming, medical debts under $500 are generally excluded from credit reports by the major bureaus (Equifax, Experian, and TransUnion).",
          "State Legislation (HB 0195): There has been a significant legislative push in 2025 and early 2026 to ban medical debt from credit reports entirely. While a total state ban was recently debated, residents currently rely on federal consumer protections and voluntary bureau removals for larger debts that are paid or under a certain age."
        ]
      },
      {
        title: "4. Billing and Collection Protections",
        body: [
          "The 240-Day Rule: Under federal 501(r) rules, you have at least 240 days (8 months) from the date of your first bill to apply for charity care. If you apply within this window, the hospital must pause all collection efforts.",
          "Garnishment and Liens: Wyoming law follows federal standards for wage garnishment. However, unlike some states, Wyoming does not have a total ban on medical debt liens; hospitals can technically place a lien on property for large, unpaid judgments, though this is rare for patients who engage with financial assistance programs early.",
          "Price Transparency (SF 0057): A new 2026 bill requires Wyoming hospitals to list prices for all medical items and services more clearly. Failure to comply can result in civil penalties for the hospital, making it easier for you to dispute \"hidden\" or surprise charges."
        ]
      },
      {
        title: "5. Wyoming Medicaid (2026 Status)",
        body: [
          "As of early 2026, Wyoming has not fully expanded Medicaid under the ACA.",
          "The Gap: This means many low-income adults without children or disabilities may fall into a \"coverage gap.\"",
          "Hospital Safety Net: Because of this gap, Wyoming hospitals often use their charity care funds as the primary safety net for the uninsured. Most will require a Medicaid denial letter before they process your charity care application."
        ]
      },
      {
        title: "Summary of 2026 Limits (Estimates)",
        body: [
          "For a single person in Wyoming:",
          "Up to $31,920 (200% FPL): Usually 100% Free Care at most nonprofit hospitals.",
          "Up to $63,840 (400% FPL): Sliding Scale (often 60–80% discount).",
          "Medical Hardship: If bills exceed 10–25% of annual income (varies by system). Note: No full Medicaid expansion; charity care is the primary safety net for many uninsured adults."
        ]
      }
    ]
  },
  CA: {
    name: "California",
    sections: [
      {
        title: "",
        body: [
          "In California, charity care is primarily governed by the Hospital Fair Billing Act (AB 774), which has been significantly expanded by several recent laws including AB 1020 (2022), AB 2297 (2025), and SB 1061 (2025).",
          "As of 2026, California has some of the strongest medical debt protections in the country."
        ]
      },
      {
        title: "1. Eligibility Requirements",
        body: [
          "California law requires almost all hospitals (except state-run facilities) to provide financial assistance to patients who meet the following criteria:",
          "Income Threshold: You qualify for free or discounted care if your household income is at or below 400% of the Federal Poverty Level (FPL). Example: For a single person in 2026, 400% FPL is approximately $63,480.",
          "High Medical Costs: You also qualify if your annual out-of-pocket medical costs at the hospital exceed 10% of your family income (either for the current year or the prior 12 months).",
          "Asset Protection: Under AB 2297 (effective Jan 1, 2025), hospitals are prohibited from considering your monetary assets (like savings or retirement accounts) when determining eligibility. They can only look at your income (e.g., pay stubs or tax returns)."
        ]
      },
      {
        title: "2. Medical Debt & Credit Protections (SB 1061)",
        body: [
          "Effective January 1, 2025, California implemented landmark protections regarding how medical debt affects your life:",
          "Credit Reporting Ban: Medical debt cannot be reported to credit bureaus and is prohibited from appearing on your credit report.",
          "Negative Factors: Lenders, landlords, and employers are prohibited from using medical debt listed on a credit report as a negative factor when making decisions.",
          "Waiting Period: Hospitals and debt collectors must wait at least 180 days after the initial bill before they can file a lawsuit or take other major collection actions."
        ]
      },
      {
        title: "3. Collections & Interest Caps",
        body: [
          "If a hospital bill goes to a judgment in court, the law limits how much can be collected:",
          "Interest Rate Cap: For medical debt judgments under $200,000, the interest rate is capped at 5% (compared to the standard 10% for other types of debt).",
          "No Property Liens: Hospitals cannot place a lien on, or force the sale of, your primary residence to collect a medical debt.",
          "Judgment Renewals: Medical debt judgments under $200,000 can only be renewed once for 5 years, preventing \"forever debt\" that grows indefinitely."
        ]
      },
      {
        title: "4. Hospital Obligations",
        body: [
          "Hospitals are legally required to be transparent about these programs:",
          "Notice Requirements: Hospitals must provide a \"Plain Language Summary\" of their financial assistance policy and an application at the time of service, at discharge, and with every billing statement.",
          "Application Timing: You can apply for charity care at any time, even after the bill has been sent to a collections agency.",
          "Electronic Notice (SB 862): Starting in 2026, hospitals can send these notices electronically if you consent, but the email must have a specific subject line and cannot be bundled with other advertisements.",
          "Note: If you believe a hospital is violating these laws, you can file a formal complaint through the California Department of Health Care Access and Information (HCAI) via their Hospital Bill Complaint Program."
        ]
      }
    ]
  }
};
