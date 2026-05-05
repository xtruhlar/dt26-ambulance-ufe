import { newSpecPage } from '@stencil/core/testing';
import { Dt26PatientCard } from '../dt26-patient-card';

describe('dt26-patient-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Dt26PatientCard],
      html: `<dt26-patient-card></dt26-patient-card>`,
    });
    expect(page.root).toEqualHtml(`
      <dt26-patient-card>
        <mock:shadow-root>
          <div class="error">Pacient nenájdený</div>
          <md-filled-button>Späť</md-filled-button>
        </mock:shadow-root>
      </dt26-patient-card>
    `);
  });
});
