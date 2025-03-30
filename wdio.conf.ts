import type { Options } from '@wdio/types';

export const config = {
    runner: 'local',
    specs: ['./test/specs/**/*.tsx'],
    maxInstances: 1,
    hostname: 'localhost',
    port: 4723,
    path: '/',
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UIAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:app': 'C:\\Users\\Admin\\Desktop\\Appium\\apkfile\\application-c66b8881-3cee-4363-9ffd-d659b940e9d9.apk',
        'appium:noReset': true,
        'appium:newCommandTimeout': 300
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    services: [],
    mochaOpts: {
        timeout: 60000
    }
} as const;
