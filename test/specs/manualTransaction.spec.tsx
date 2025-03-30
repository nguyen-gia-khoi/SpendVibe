import { expect } from 'chai';
import { browser, $ } from '@wdio/globals';

describe('Manual Transaction Test', () => {
    beforeEach(async () => {
        // Check if we're logged in by verifying home screen elements
        const homeScreen = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]');
        const isLoggedIn = await homeScreen.isDisplayed();
        
        if (!isLoggedIn) {
            throw new Error('User must be logged in before running manual transaction test');
        }
    });

    it('should add transaction manually successfully', async () => {
        try {
            // Wait for home screen to be fully loaded
            await (browser as any).pause(3000);

            // Verify we're on the home screen
            console.log('Verifying home screen...');
            const homeScreen = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]');
            
            if (!homeScreen) {
                console.log('Home screen not found');
                throw new Error('Home screen not found');
            }

            console.log('Home screen found, waiting for display...');
            await homeScreen.waitForDisplayed({ timeout: 15000 });
            expect(await homeScreen.isDisplayed()).to.be.true;

            // Click button add transaction
            console.log('Attempting to find Add Transaction button...');
            const addTransactionButton = await $('//android.view.ViewGroup[@content-desc=""]');
            
            if (!addTransactionButton) {
                console.log('Add Transaction button not found');
                throw new Error('Add Transaction button not found');
            }

            console.log('Add Transaction button found, waiting for display...');
            await addTransactionButton.waitForDisplayed({ timeout: 15000 });
            console.log('Add Transaction button displayed, clicking...');
            await addTransactionButton.click();

            // Wait for form to load
            await (browser as any).pause(2000);

            // Enter amount
            console.log('Entering amount...');
            const amountInput = await $('//android.widget.EditText[@text="Nhập số tiền (VD: 100.000)"]');
            await amountInput.setValue('15000000');

            // Select category
            console.log('Selecting category...');
            const category = await $('//android.view.ViewGroup[@content-desc="Thu nhập"]');
            await category.click();
            
            // Select "Luong & Thu nhap" category
            const salaryCategory = await $('//android.view.ViewGroup[@content-desc="Lương & Thu nhập"]');
            await salaryCategory.click();

            // select date
            const dateInput = await $('//android.view.ViewGroup[@content-desc="Chọn ngày"]');
            await dateInput.click();

            // select date 30/03/2025
            const date = await $('//android.view.View[@content-desc="30 March 2025"]');
            await date.click();

            //click ok
            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await okButton.click();

            // Click Add Transaction button
            console.log('Clicking Add Transaction button...');
            const addTransactionBtn = await $('//android.widget.Button[@content-desc="THÊM GIAO DỊCH"]');
            
            if (!addTransactionBtn) {
                console.log('Submit button not found');
                throw new Error('Submit button not found');
            }

            console.log('Submit button found, waiting for display...');
            await addTransactionBtn.waitForDisplayed({ timeout: 15000 });
            console.log('Submit button displayed, clicking...');
            await addTransactionBtn.click();

            // Wait for navigation back to home screen
            await (browser as any).pause(3000);

           // Click button notification
        console.log('Attempting to find Scan Receipt button...');
        const btnNotification = await $('//android.widget.TextView[@text=""]');
        
        if (!btnNotification) {
            console.log('Scan Receipt button not found');
            throw new Error('Scan Receipt button not found');
        }

            console.log('Scan Receipt button found, waiting for display...');
            await btnNotification.waitForDisplayed({ timeout: 15000 });
            console.log('Scan Receipt button displayed, clicking...');
            await btnNotification.click();

            //back to home screen
            const back = await $('//android.widget.TextView[@text=""]');
            await back.click();

        } catch (error) {
            console.error('Error in manual transaction test:', error);
            throw error;
        }
    });
}); 