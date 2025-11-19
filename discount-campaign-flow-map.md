# Discount Campaign Creation Flow Map

## Overview
The discount campaign wizard consists of optional tabs. Users can configure discounts for:
- Flat fees
- Variable rates (usage-based)
- Additional modules

Each section is optional and can be skipped based on campaign requirements.

---

## Tab 1: Details (Required Starting Point)

### Overall Information Section
- **Facility Name** (Select/Autocomplete - "Discount by tenant?")
- **Public Only** (Checkbox)
- **Public Description** (Text input)

### Campaign Period Section
- **Campaign Period** (Date range selector)
  - Start Date
  - End Date

### Internal Note Section
- **Internal Note** (Text area/multiline input)

### Concurrent Rules Section
- **Allow Concurrent with Credits** (Checkbox)
- **Allow Concurrent with Discounts** (Checkbox)
- **Allow Cumulative Discount** (Checkbox)

### Internal Type Section
- **Invoicing No.** (Input field)
- **Payment Model 1-6 NT** (Select/dropdown)

### Owner Section
- **Owner** (User selector)
- **Users Allowed/Users NT** (Multi-select user picker)
- **Date API** (Date picker)
- **State (not)** (Select/dropdown)
- **Avg Usage** (Numeric input)
- **Lighting Type** (Select/dropdown)

---

## Decision Point 1: Apply to Flat Fee Discounts?
**If YES** → Proceed to Flat Fee Discount Tab  
**If NO** → Skip to next decision point

---

## Tab 2: Flat Fee Discount (Optional)

### Beneficiaries Section
- **Beneficiaries (no discount)** (Text/info display with note: "Users discount on flat following tenant individual")

### Tariff Discount Applied Section
- **Discount on Offer** (Radio/toggle selection)
  - All Offers (option)
  - Team (option)

### Offer Selection Section
- **Or/Users** (Toggle)
- **Oil Bonus** (Checkbox/toggle)

### Payment Frequency Section
- **Payment Frequency** (Select)
  - Payment Capacity (related field)
  - Any Priced Frequencies (checkbox)

### Offer Details Section
- **Offer** (Select/dropdown)
- **Variable** (Related field)
- **Tariff** (Select)
- **Permanent** (Checkbox)
- **Residence Control** (Related field)

### Membership Fee Configuration Section
- **Value** (Numeric input with note: "Use this when Values are zero Delivery - price handling cannot be applied")

#### Discount Starter Pack (Nested within Membership Fee)
- **Unit** (Input field)
- **Add Transaction Fee** (Checkbox)
- **Fee** (Numeric input)
- **VAT** (Numeric input/percentage)
- **Add Subsidization Fee** (Checkbox)

### Tariff Subsection Section
- **Add VAT for flat discount** (Checkbox)
- **Team** (Select)
- **Add Subsidization Fee** (Additional checkbox)

---

## Decision Point 2: Apply to Variable Rate?
**If YES** → Proceed to Variable Rate Tab  
**If NO** → Skip to next decision point

---

## Tab 3: Variable Rate (Optional)

### Flat Fee Discount Section
- **Flat Fee Discount** (Input field)

### Tariff Discount Applied Section
- **Discount on Offer** (Radio selection)
  - All Offers
  - Team

### Offer Selection Section
- **Or/Users** (Toggle)
- **Oil Bonus** (Checkbox)

### Payment Frequency Section
- **Payment Frequency** (Select)
  - Payment Capacity
  - Any Priced Frequencies

### Membership Fee Configuration Section
- **Offer** (Select/dropdown)
- **Variable Use** (Input)
- **Use Flat** (Checkbox)
- **Variable Rate** (Input field)
- **Municipal** (Checkbox/field)
- **Permanent** (Checkbox)

#### Discount Starter Pack (Nested within Membership Fee)
- **Unit** (Input field)
- **Administration/Payment Fee** (Numeric input)
- **Add Transaction Fee** (Checkbox)
- **Fee** (Numeric input)

### Tariff and Time Configuration Section
- **Sync** (Toggle/checkbox)
- **Tariff Name (not)** (Input field)
- **Team** (Select)
- **Not Needed** (Checkbox)
- **Daily kWh/Hour (not)** (Numeric input)
- **End** (Date/time input)
- **Weeks** (Numeric input)

### Value and Fees Section
- **Value** (Numeric input)
- **Add VAT Flat Discount** (Checkbox)
- **Team** (Select)
- **Add Subsidization Fee** (Checkbox)

---

## Decision Point 3: Apply to Additional Modules?
**If YES** → Proceed to Additional Modules Tab  
**If NO** → Complete and create campaign

---

## Tab 4: Additional Modules (Optional)

### Flat Fee Discount Section
- **Flat Fee Discount** (Input field with note: "What if needs? are note suitable?")

### Tariff Discount Applied Section
- **Discount on Offer** (Radio selection)
  - All Offers
  - Team

### Offer Selection Section
- **Or/Users** (Toggle)
- **Oil Bonus** (Checkbox)

### Payment Frequency Section
- **Payment Frequency** (Select)
  - Payment Capacity
  - Any Priced Frequencies

### Membership Fee Configuration Section
- **Enabled** (Checkbox)
- **Enabled Use** (Related field)
- **Modules** (Multi-select)
- **Modules Use** (Related field)
- **Permanent** (Checkbox)

#### Discount Starter Pack (Nested within Membership Fee)
- **Unit** (Input field)
- **Administration/Payment Fee** (Numeric input)
- **Add Transaction Fee** (Checkbox)
- **Fee** (Numeric input)

### Tariff and Time Configuration Section
- **Sync** (Toggle)
- **Tariff Name (not)** (Input)
- **Team** (Select)
- **Not Needed (not)** (Checkbox)
- **Daily kWh/Hour (not)** (Numeric input)
- **End** (Date/time input)
- **Weeks** (Numeric input)

### Final Configuration Section
- **Value** (Numeric input)
- **Add VAT Flat Discount** (Checkbox)
- **Team** (Select)
- **Add Subsidization Fee** (Checkbox)

---

## Final Step: Campaign Creation

After completing the required Details tab and any optional discount tabs, the user reaches:

**Discount Campaign Created** - Campaign is saved and becomes active based on the configured start date.

---

## Notes

1. **Yellow callout boxes in the flow indicate important validation points:**
   - "What if needs? are note suitable?" - appears in multiple sections
   - These likely trigger validation or confirmation dialogs

2. **The flow is non-linear:**
   - Users can skip entire sections (Flat Fee, Variable Rate, Additional Modules)
   - Only the Details tab is mandatory
   - Each section has a decision point to determine if it should be included

3. **Common patterns across discount tabs:**
   - All discount tabs share similar structures
   - Beneficiaries section
   - Tariff discount configuration
   - Payment frequency options
   - Membership fee configuration with nested Discount Starter Pack
   - Value and fee configurations
   - VAT and subsidization options

4. **Field states and relationships:**
   - Some fields have "(not)" suffix, suggesting they might be optional or negatable
   - "Discount by tenant?" suggests multi-tenant awareness
   - "Users discount on flat following tenant individual" indicates per-tenant customization

5. **Implementation considerations:**
   - Each tab should validate independently
   - Navigation between tabs should preserve state
   - Users should be able to return to previous tabs to modify settings
   - Final submission should validate all active tabs
