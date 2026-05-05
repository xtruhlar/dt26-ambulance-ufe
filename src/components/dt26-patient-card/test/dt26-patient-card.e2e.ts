import { newE2EPage } from '@stencil/core/testing';

describe('dt26-patient-card', () => {
  it('renders known patient', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-patient-card entry-id="1"></dt26-patient-card>');
    const el = await page.find('dt26-patient-card');
    expect(el).not.toBeNull();
    const text = await el.getProperty('innerText');
    expect(text).toBeDefined();
  });

  it('emits editor-closed on back button', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-patient-card entry-id="1"></dt26-patient-card>');
    const editorClosed = await page.spyOnEvent('editor-closed');
    const btn = await page.find('dt26-patient-card >>> md-filled-button');
    await btn.click();
    expect(editorClosed).toHaveReceivedEvent();
  });
});