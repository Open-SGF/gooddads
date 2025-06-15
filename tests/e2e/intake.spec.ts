import { test, expect } from '@playwright/test'

test('complete intake process up to disclosure form submission', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login')
  
  // Check if we're on the login page
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible()
  
  // Click on register link (assuming there is one on the login page)
  await page.getByRole('link', { name: /register/i }).click()
  
  // Fill out the user registration form
  await expect(page.getByRole('heading', { name: /register/i })).toBeVisible()
  
  const testEmail = `test${Date.now()}@example.com`
  const testPassword = 'Password123!'
  
  // Fill in registration details
  await page.getByLabel(/first name/i).fill('Test')
  await page.getByLabel(/last name/i).fill('User')
  await page.getByLabel(/email/i).fill(testEmail)
  await page.getByLabel(/phone number/i).fill('5555555555')
  await page.getByLabel(/password/i).fill(testPassword)
  await page.getByLabel(/password confirmation/i).fill(testPassword)
  
  // Submit the registration form
  await page.getByRole('button', { name: /register/i }).click()
  
  // Wait for redirect to participant registration page
  await expect(page).toHaveURL(/.*participantRegister/)
  
  // Fill out participant registration form
  await page.getByLabel(/first name/i).fill('Test')
  await page.getByLabel(/last name/i).fill('Participant')
  
  // Fill in required fields for participant registration
  await page.getByLabel(/date of birth/i).fill('1990-01-01')
  
  // Select ethnicity if there's a dropdown
  const ethnicitySelect = page.getByLabel(/ethnicity/i)
  if (await ethnicitySelect.isVisible()) {
    await ethnicitySelect.selectOption({ index: 1 })
  }
  
  // Select marital status if there's a dropdown
  const maritalSelect = page.getByLabel(/marital status/i)
  if (await maritalSelect.isVisible()) {
    await maritalSelect.selectOption({ index: 1 })
  }
  
  // Fill in address information
  await page.getByLabel(/street address/i).fill('123 Test St')
  await page.getByLabel(/city/i).fill('Springfield')
  await page.getByLabel(/state/i).fill('MO')
  await page.getByLabel(/zip code/i).fill('65804')
  
  // Select region if there's a dropdown
  const regionSelect = page.getByLabel(/region/i)
  if (await regionSelect.isVisible()) {
    await regionSelect.selectOption({ index: 1 })
  }
  
  // Add a child if required
  const addChildButton = page.getByRole('button', { name: /add child/i })
  if (await addChildButton.isVisible()) {
    await addChildButton.click()
    
    // Fill in child details
    await page.getByLabel(/child.*name/i).first().fill('Test Child')
    await page.getByLabel(/child.*date of birth/i).first().fill('2020-01-01')
  }
  
  // Submit the participant registration form
  await page.getByRole('button', { name: /register|submit|continue/i }).click()
  
  // Wait for redirect to disclosure form page
  await expect(page).toHaveURL(/.*disclosure/)
  
  // Complete disclosure form
  // Check several checkboxes for the disclosure form
  // Authorized entities section
  await page.getByLabel(/department of social services/i).check()
  await page.getByLabel(/family support division/i).check()
  
  // Recipients section
  await page.getByLabel(/employer/i).check()
  await page.getByLabel(/employer name/i).fill('Test Employer')
  
  // Make sure the Good Dads recipient is filled
  const otherRecipientField = page.getByLabel(/other recipient details/i)
  if (await otherRecipientField.inputValue() === '') {
    await otherRecipientField.fill('Good Dads/Jennifer Baker (and staff)')
  }
  
  // Purpose of disclosure section
  await page.getByLabel(/eligibility determination/i).check()
  await page.getByLabel(/continuity of services/i).check()
  
  // Information to be disclosed section
  await page.getByLabel(/entire file/i).check()
  
  // Check consent acknowledgment checkbox if present
  const consentCheckbox = page.getByLabel(/understand|consent|agreement|acknowledge/i)
  if (await consentCheckbox.isVisible()) {
    await consentCheckbox.check()
  }
  
  // Sign the form
  const signatureField = page.getByLabel(/signature/i)
  if (await signatureField.isVisible()) {
    await signatureField.fill('Test User')
  }
  
  // Fill in date if needed
  const dateField = page.getByLabel(/date/i).last()
  if (await dateField.isVisible() && await dateField.inputValue() === '') {
    const today = new Date()
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
    await dateField.fill(formattedDate)
  }
  
  // Take a screenshot before submitting
  await page.screenshot({ path: 'disclosure-form-filled.png' })
  
  // Submit the disclosure form
  await page.getByRole('button', { name: /submit|save|continue/i }).click()
  
  // Verify we've successfully completed this step
  await expect(page).not.toHaveURL(/.*disclosure/)
  
  // Additional verification that we've moved past the disclosure page
  // This could be checking for a success message or the next page in the flow
  await expect(page.getByText(/success|submitted|complete|continue/i)).toBeVisible()
})
