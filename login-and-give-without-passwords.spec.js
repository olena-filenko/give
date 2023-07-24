describe('give - login', () => {
    beforeEach(async() => {
        await browser.maximizeWindow();
        await browser.url('https://give-dev.intervarsity.org');
        await browser.pause(5000);});
        console.log(`>>Browser Object: + ${JSON.stringify(browser)}`);

    it('valid login', async() => {

        //dev password field
        const devPassword =  await $('//*[@name="ivcf_trap_auth_code"]');
        await devPassword.setValue('hidden')
        //login dev button
        const loginDevButton =  await $('//*[@class="btn btn-large btn-primary"]');
        await loginDevButton.click();
        //continue button. Here is a new selector should be coz previous selects 2
        const contDevButton =  await $('//*[@class="btn btn-success"]');
        await contDevButton.click();
        

        //login button
        const loginButton =  await $('//*[@href="/user/login"]');
        await loginButton.click();
        //email address
        const emailAddress =  await $('//*[@name="username"]');
        await emailAddress.setValue('hidden@gmail.com')
        //continue button
        const contButton =  await $('//*[@name="action"]');
        await contButton.click();
        //password
        const password =  await $('//*[@name="password"]');
        await password.setValue('hidden')
        //continue button
        const continueButton =  await $('//*[@data-action-button-primary="true"]');
        await continueButton.click();
        await browser.pause(2000);
        const successfulLoginHeader = $('h1');
        await expect(successfulLoginHeader).toHaveText('Give to InterVarsity');
        
    });
    it('One time donation paid by existing BA PM', async() => {
        //search GAU
        const searchGauField =  await $('#edit-search');
        await searchGauField.setValue('Adam Salloum');
        await browser.pause(3000);
        browser.keys("\uE007");
        await browser.pause(5000);
        //Choose one time frequency
        const oneTimeFrequency = await $('//*[@for="edit-frequency-select-o"]');
        await oneTimeFrequency.click();
        //Choose gift amount
        const setAmountO = await $('#edit-other-amount-o');
        await setAmountO.setValue('33');
        //Choose existing PM
        const existingPM = await $('//label[contains(text(),"Savings ending in x0707")][1]');
        await existingPM.click();
        //Submit
        const submitDonationButton = await $('#edit-submit');
        await submitDonationButton.click();
        //Check Thank You page
        const successfulDonation = $('h1');
        await expect(successfulDonation).toHaveText('Thank you!');
        await browser.pause(3000);    

        
    });
    it('One time donation paid new PM - credit card', async() => {
        //search GAU
        const searchGauField =  await $('#edit-search');
        await searchGauField.setValue('Adam Salloum');
        await browser.pause(3000);
        browser.keys("\uE007");
        await browser.pause(5000);
        //Choose one time frequency
        const oneTimeFrequency = await $('//*[@for="edit-frequency-select-o"]');
        await oneTimeFrequency.click();
        //Choose gift amount
        const setAmountO = await $('#edit-other-amount-o');
        await setAmountO.setValue('33');

        //Choose new PM
        const newPM = await $('#edit-account-method-0-new');
        await newPM.click();
        await browser.pause(3000);
        //Choose CC
        const newCC = await $('#edit-payment-methods-credit-card');
        await newCC.click();
        await browser.pause(3000);
        //Set CC data
        
        /*const creditCardNumber = await $('//*[@name="braintree-hosted-field-number"]');
        await browser.pause(3000);
        await creditCardNumber.click();
        await browser.pause(10000);*/

        //try another selector
        const creditCardNumber2 = await $('#card-number');
        await creditCardNumber2.click();
        await creditCardNumber2.addValue('4111111111111111');
        const expirationDate  = await $('#expiration-date');
        await expirationDate.setValue('092029');
        const cvv  = await $('#cvv');
        await cvv.setValue('999');

        //Submit
        const submitDonationButton = await $('#edit-submit');
        await submitDonationButton.click();
        //Check Thank You page
        const successfulDonation = $('h1');
        await expect(successfulDonation).toHaveText('Thank you!');
        await browser.pause(3000);      

        
    });
    
});