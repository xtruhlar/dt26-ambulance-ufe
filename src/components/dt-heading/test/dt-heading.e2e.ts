import { newE2EPage } from '@stencil/core/testing';

describe('dt-heading', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dt-heading></dt-heading>');

    const element = await page.find('dt-heading');
    expect(element).toHaveClass('hydrated');
  });
});
