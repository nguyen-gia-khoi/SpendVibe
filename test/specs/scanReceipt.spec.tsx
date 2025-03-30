import { expect } from 'chai';
import { browser, $ } from '@wdio/globals';

describe('Scan Receipt Test', () => {
    beforeEach(async () => {
        // Check if we're logged in by verifying home screen elements
        const homeScreen = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]');
        const isLoggedIn = await homeScreen.isDisplayed();
        
        if (!isLoggedIn) {
            throw new Error('User must be logged in before running scan receipt test');
        }
    });

    it('should scan receipt and add transaction successfully', async () => {
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

            // Verify home screen title
            console.log('Verifying home screen title...');
            const screenTitle = await $('//android.widget.TextView[@text="SpendVibe"]');
            
            if (!screenTitle) {
                console.log('Home screen title not found');
                throw new Error('Home screen title not found');
            }

            console.log('Home screen title found, waiting for display...');
            await screenTitle.waitForDisplayed({ timeout: 15000 });
            expect(await screenTitle.isDisplayed()).to.be.true;

            // Click button add transaction
            console.log('Attempting to find Scan Receipt button...');
            const scanReceiptButton = await $('//android.view.ViewGroup[@content-desc=""]');
            
            if (!scanReceiptButton) {
                console.log('Scan Receipt button not found');
                throw new Error('Scan Receipt button not found');
            }

            console.log('Scan Receipt button found, waiting for display...');
            await scanReceiptButton.waitForDisplayed({ timeout: 15000 });
            console.log('Scan Receipt button displayed, clicking...');
            await scanReceiptButton.click();

            //click button scan hoa don
            console.log('Attempting to find Scan Receipt button...');
            const scanButton = await $('//android.widget.Button[@content-desc="SCAN BILL"]');
            
            if (!scanButton) {
                console.log('Scan Receipt button not found');
                throw new Error('Scan Receipt button not found');
            }

            console.log('Scan button found, waiting for display...');
            await scanButton.waitForDisplayed({ timeout: 15000 });
            console.log('Scan button displayed, clicking...');
            await scanButton.click();

            // Wait for camera to initialize
            await (browser as any).pause(3000);

            // Verify we're on the camera screen
            console.log('Verifying camera screen...');
            const cameraView = await $('//android.widget.LinearLayout[@resource-id="com.google.android.providers.media.module:id/bottom_sheet"]');
            
            if (!cameraView) {
                console.log('Camera view not found');
                throw new Error('Camera view not found');
            }

            console.log('Camera view found, waiting for display...');
            await cameraView.waitForDisplayed({ timeout: 15000 });
            expect(await cameraView.isDisplayed()).to.be.true;

            // Select image to scan
            console.log('Selecting image to scan...');
            const imageThumbnail = await $('//android.widget.ImageView[@resource-id="com.google.android.providers.media.module:id/icon_thumbnail"]');
            
            if (!imageThumbnail) {
                console.log('Image thumbnail not found');
                throw new Error('Image thumbnail not found');
            }

            console.log('Image thumbnail found, waiting for display...');
            await imageThumbnail.waitForDisplayed({ timeout: 15000 });
            console.log('Image thumbnail displayed, clicking...');
            await imageThumbnail.click();

            // Wait for image processing
            await (browser as any).pause(3000);

            // Click crop button
            console.log('Clicking crop button...');
            const cropButton = await $('//android.widget.Button[@resource-id="com.nguyengiakhoi.spendvibe:id/crop_image_menu_crop"]');
            
            if (!cropButton) {
                console.log('Crop button not found');
                throw new Error('Crop button not found');
            }

            console.log('Crop button found, waiting for display...');
            await cropButton.waitForDisplayed({ timeout: 15000 });
            console.log('Crop button displayed, clicking...');
            await cropButton.click();

            // Wait for scanning results
            await (browser as any).pause(5000);

            // Verify scanning results
            console.log('Verifying scanning results...');
            const resultText = await $('//android.widget.TextView[contains(@text, "Giải trí & Du lịch")]');
            
            if (!resultText) {
                console.log('Scanning results not found');
                throw new Error('Scanning results not found');
            }

            console.log('Scanning results found, verifying content...');
            await resultText.waitForDisplayed({ timeout: 15000 });
            const resultContent = await resultText.getText();
            
            // Verify all required fields
            expect(resultContent).to.include('Danh mục: expense');
            expect(resultContent).to.include('Giải trí & Du lịch');
            expect(resultContent).to.include('Tổng tiền: -784788');
            expect(resultContent).to.include('Ngày: 10/05/2017');

            // Click OK button to close results
            console.log('Clicking OK button...');
            const okButton = await $('//android.widget.Button[@resource-id="android:id/button1"]');
            
            if (!okButton) {
                console.log('OK button not found');
                throw new Error('OK button not found');
            }

            console.log('OK button found, waiting for display...');
            await okButton.waitForDisplayed({ timeout: 15000 });
            console.log('OK button displayed, clicking...');
            await okButton.click();

            // Click Add Transaction button
            console.log('Clicking Add Transaction button...');
            const addTransactionBtn = await $('//android.widget.Button[@content-desc="THÊM GIAO DỊCH"]');
            
            if (!addTransactionBtn) {
                console.log('Add Transaction button not found');
                throw new Error('Add Transaction button not found');
            }

            console.log('Add Transaction button found, waiting for display...');
            await addTransactionBtn.waitForDisplayed({ timeout: 15000 });
            console.log('Add Transaction button displayed, clicking...');
            await addTransactionBtn.click();

            // Wait for navigation back to home screen
            await (browser as any).pause(3000);

            // Click on Chi tiêu tab
            console.log('Clicking Chi tiêu tab...');
            const chiTieuTab = await $('//android.view.ViewGroup[@content-desc="Chi tiêu"]');
            
            if (!chiTieuTab) {
                console.log('Chi tiêu tab not found');
                throw new Error('Chi tiêu tab not found');
            }

            console.log('Chi tiêu tab found, waiting for display...');
            await chiTieuTab.waitForDisplayed({ timeout: 15000 });
            console.log('Chi tiêu tab displayed, clicking...');
            await chiTieuTab.click();

            // Wait for transaction list to load
            await (browser as any).pause(3000);

            // Verify the new transaction exists
            console.log('Verifying new transaction in list...');
            const newTransaction = await $('//android.view.ViewGroup[@content-desc="Giải trí & Du lịch, -7847.88 K, 10/05/2017"]');
            
            if (!newTransaction) {
                console.log('New transaction not found in list');
                throw new Error('New transaction not found in list');
            }

            console.log('New transaction found, waiting for display...');
            await newTransaction.waitForDisplayed({ timeout: 15000 });
            expect(await newTransaction.isDisplayed()).to.be.true;

            console.log('Successfully completed receipt scanning and transaction verification');

        } catch (error) {
            console.error('Test failed:', error);
            // Log the final page source for debugging
            const finalPageSource = await (browser as any).getPageSource();
            console.log('Final page source:', finalPageSource);
            throw error;
        }

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
    });

    it('should navigate to account section and logout successfully', async () => {
        try {
            // Wait for home screen to be fully loaded
            await (browser as any).pause(3000);

            // Click account button
            console.log('Clicking account button...');
            const accountButton = await $('//android.widget.TextView[@text=""]');
            await accountButton.waitForDisplayed({ timeout: 15000 });
            await accountButton.click();

            // Verify we're on account screen
            console.log('Verifying account screen...');
            const accountScreen = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]');
            await accountScreen.waitForDisplayed({ timeout: 15000 });
            expect(await accountScreen.isDisplayed()).to.be.true;


            // Check daily summary
            console.log('Checking daily summary...');
            const dailyButton = await $('//android.view.ViewGroup[@content-desc="Ngày"]');
            await dailyButton.waitForDisplayed({ timeout: 15000 });
            await dailyButton.click();
            await (browser as any).pause(2000);

            // Check monthly summary
            console.log('Checking monthly summary...');
            const monthlyButton = await $('//android.view.ViewGroup[@content-desc="Tháng"]');
            await monthlyButton.waitForDisplayed({ timeout: 15000 });
            await monthlyButton.click();
            await (browser as any).pause(2000);

            // Check yearly summary
            console.log('Checking yearly summary...');
            const yearlyButton = await $('//android.view.ViewGroup[@content-desc="Năm"]');
            await yearlyButton.waitForDisplayed({ timeout: 15000 });
            await yearlyButton.click();
            await (browser as any).pause(2000);

            // Click logout button
            console.log('Clicking logout button...');
            const logoutButton = await $('//android.view.ViewGroup[@content-desc="Logout"]');
            await logoutButton.waitForDisplayed({ timeout: 15000 });
            await logoutButton.click();

            // Verify we're back on login screen
            console.log('Verifying login screen...');
            const loginScreen = await $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]');
            await loginScreen.waitForDisplayed({ timeout: 15000 });
            expect(await loginScreen.isDisplayed()).to.be.true;

            console.log('Successfully completed account section test');

        } catch (error) {
            console.error('Test failed:', error);
            // Log the final page source for debugging
            const finalPageSource = await (browser as any).getPageSource();
            console.log('Final page source:', finalPageSource);
            throw error;
        }
    });
}); 