import { newE2EPage } from '@stencil/core/testing';

describe('dt26-examination-archive', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-examination-archive></dt26-examination-archive>');
    const el = await page.find('dt26-examination-archive');
    expect(el).not.toBeNull();
  });

  it('renders archive entries', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-examination-archive></dt26-examination-archive>');
    const items = await page.findAll('dt26-examination-archive >>> md-list-item');
    expect(items.length).toBeGreaterThan(0);
  });
});