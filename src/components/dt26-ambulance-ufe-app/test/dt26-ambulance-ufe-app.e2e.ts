import { newE2EPage } from '@stencil/core/testing';

describe('dt26-ambulance-ufe-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt26-ambulance-ufe-app></dt26-ambulance-ufe-app>');

    const element = await page.find('dt26-ambulance-ufe-app');
    expect(element).toHaveClass('hydrated');
  });
});
