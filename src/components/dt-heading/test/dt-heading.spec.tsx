import { newSpecPage } from '@stencil/core/testing';
import { DtHeading } from '../dt-heading';

describe('dt-heading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DtHeading],
      html: `<dt-heading></dt-heading>`,
    });
    expect(page.root).toEqualHtml(`
      <dt-heading>
        <mock:shadow-root>
          <h1>Ambulance UFE</h1>
        </mock:shadow-root>
      </dt-heading>
    `);
  });
});
