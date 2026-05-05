import { newE2EPage } from '@stencil/core/testing';

describe('dt26-remote-consultation-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-remote-consultation-list></dt26-remote-consultation-list>');
    const element = await page.find('dt26-remote-consultation-list');
    expect(element).not.toBeNull();
  });

  it('emits entry-clicked on add button click', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-remote-consultation-list></dt26-remote-consultation-list>');
    const entryClicked = await page.spyOnEvent('entry-clicked');
    const btn = await page.find('dt26-remote-consultation-list >>> .add-button');
    await btn.click();
    expect(entryClicked).toHaveReceivedEvent();
  });

  it('emits @new when add button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-remote-consultation-list></dt26-remote-consultation-list>');
    const entryClicked = await page.spyOnEvent('entry-clicked');
    const btn = await page.find('dt26-remote-consultation-list >>> .add-button');
    await btn.click();
    expect(entryClicked).toHaveReceivedEventDetail('@new');
  });
});