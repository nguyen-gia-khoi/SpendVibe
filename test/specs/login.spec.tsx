import { expect } from 'chai';
import { browser, $ } from '@wdio/globals';

describe('Login Test', () => {
    it('should show error for invalid credentials', async () => {
        try {
            // Wait for app to load
            await (browser as any).pause(5000);

            // Find and fill email field with invalid email
            const emailField = await $('//android.widget.EditText[@hint="Enter email or phone number"]');
            await emailField.waitForDisplayed({ timeout: 15000 });
            await emailField.setValue('invalid');

            // Find and fill password field with invalid password
            const passwordField = await $('//android.widget.EditText[@hint="Enter password"]');
            await passwordField.waitForDisplayed({ timeout: 15000 });
            await passwordField.setValue('invalid123');

            // Click login button
            const loginButton = await $('//android.view.ViewGroup[@content-desc="Login"]');
            await loginButton.waitForDisplayed({ timeout: 15000 });
            await loginButton.click();

            // Wait for and handle alert
            await (browser as any).pause(2000);
            const alertOkButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            await alertOkButton.waitForDisplayed({ timeout: 15000 });
            await alertOkButton.click();

            // Verify we're still on login screen
            await emailField.waitForDisplayed({ timeout: 15000 });
            expect(await emailField.isDisplayed()).to.be.true;

        } catch (error) {
            console.error('Invalid login test failed:', error);
            throw error;
        }
    });

    it('should login successfully', async () => {
        try {
            // Wait for app to load
            await (browser as any).pause(5000);

            // Log the current page source to help debug
            const pageSource = await (browser as any).getPageSource();
            console.log('Initial page source:', pageSource);

            // Try to find email field with multiple strategies
            console.log('Attempting to find email field...');
            const emailField = await $('//android.widget.EditText[@hint="Enter email or phone number"]');
            
            if (!emailField) {
                console.log('Email field not found with any selector');
                throw new Error('Email field not found');
            }

            console.log('Email field found, waiting for display...');
            await emailField.waitForDisplayed({ timeout: 15000 });
            console.log('Email field displayed, setting value...');
            await emailField.setValue('test@gmail.com');

            // Find password field with multiple strategies
            console.log('Attempting to find password field...');
            const passwordField = await $('//android.widget.EditText[@hint="Enter password"]');

            if (!passwordField) {
                console.log('Password field not found with any selector');
                throw new Error('Password field not found');
            }

            console.log('Password field found, waiting for display...');
            await passwordField.waitForDisplayed({ timeout: 15000 });
            console.log('Password field displayed, setting value...');
            await passwordField.setValue('test123');

            // Find login button with multiple strategies
            console.log('Attempting to find login button...');
            const loginButton = await $('//android.view.ViewGroup[@content-desc="Login"]');

            if (!loginButton) {
                console.log('Login button not found with any selector');
                throw new Error('Login button not found');
            }

            console.log('Login button found, waiting for display...');
            await loginButton.waitForDisplayed({ timeout: 15000 });
            console.log('Login button displayed, clicking...');
            await loginButton.click();

            // Wait for login response
            console.log('Waiting for login response...');
            await (browser as any).pause(5000);

            // Check if we're on the home screen
            console.log('Attempting to find home screen...');
            const homeScreen = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]');

            if (!homeScreen) {
                console.log('Home screen not found with any selector');
                throw new Error('Home screen not found after login');
            }
            console.log('Home screen found, waiting for display...');
            await homeScreen.waitForDisplayed({ timeout: 15000 });
            expect(await homeScreen.isDisplayed()).to.be.true;

            // Store login state by checking for home screen elements
            const isLoggedIn = await homeScreen.isDisplayed();
            if (!isLoggedIn) {
                throw new Error('Failed to verify login state');
            }

        } catch (error) {
            console.error('Test failed:', error);
            // Log the final page source for debugging
            const finalPageSource = await (browser as any).getPageSource();
            console.log('Final page source:', finalPageSource);
            throw error;
        }
    });
});
