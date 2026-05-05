import { newE2EPage } from '@stencil/core/testing';

describe('dt26-communication-protocol', () => {
  it('renders new protocol form', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-communication-protocol entry-id="@new"></dt26-communication-protocol>');
    const el = await page.find('dt26-communication-protocol');
    expect(el).not.toBeNull();
  });

  it('emits editor-closed on cancel', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-communication-protocol entry-id="@new"></dt26-communication-protocol>');
    const editorClosed = await page.spyOnEvent('editor-closed');
    const btn = await page.find('dt26-communication-protocol >>> md-text-button');
    await btn.click();
    expect(editorClosed).toHaveReceivedEvent();
  });
});